import { NextResponse } from 'next/server';

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'theboylexis';
const GITHUB_API = 'https://api.github.com';

export async function GET() {
  try {
    // Fetch user profile and repos in parallel
    const [userRes, reposRes] = await Promise.all([
      fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}`, {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          'User-Agent': 'portfolio-site',
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }),
      fetch(
        `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
        {
          headers: {
            Accept: 'application/vnd.github.v3+json',
            'User-Agent': 'portfolio-site',
          },
          next: { revalidate: 3600 },
        }
      ),
    ]);

    if (!userRes.ok || !reposRes.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch GitHub data.' },
        { status: 502 }
      );
    }

    const user = await userRes.json();
    const repos = await reposRes.json();

    // Calculate total stars
    const totalStars = repos.reduce(
      (sum, repo) => sum + (repo.stargazers_count || 0),
      0
    );

    // Calculate top languages
    const languageCounts = {};
    repos.forEach((repo) => {
      if (repo.language) {
        languageCounts[repo.language] =
          (languageCounts[repo.language] || 0) + 1;
      }
    });

    const topLanguages = Object.entries(languageCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([name, count]) => ({ name, count }));

    // Get recent repos (non-fork, with description)
    const recentRepos = repos
      .filter((repo) => !repo.fork)
      .slice(0, 4)
      .map((repo) => ({
        name: repo.name,
        description: repo.description,
        language: repo.language,
        stars: repo.stargazers_count,
        url: repo.html_url,
        updatedAt: repo.updated_at,
      }));

    const data = {
      username: user.login,
      avatarUrl: user.avatar_url,
      profileUrl: user.html_url,
      publicRepos: user.public_repos,
      followers: user.followers,
      totalStars,
      topLanguages,
      recentRepos,
    };

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      },
    });
  } catch (error) {
    console.error('GitHub API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub data.' },
      { status: 500 }
    );
  }
}
