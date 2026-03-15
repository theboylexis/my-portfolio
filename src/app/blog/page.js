import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import styles from './blog.module.css';

export const metadata = {
  title: 'Blog — Alex Marfo Appiah',
  description: 'Technical articles about backend development, Node.js, and building production APIs.',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className={styles.blogPage}>
      <header className={styles.header}>
        <p className={styles.label}>
          <span className={styles.accent}>&gt;</span> blog
        </p>
        <h1 className={styles.heading}>Writing</h1>
        <p className={styles.subtext}>
          Thoughts on backend development, architecture decisions, and lessons
          from building real projects.
        </p>
      </header>

      {posts.length === 0 ? (
        <div className={styles.empty}>
          <p>No posts yet. Check back soon.</p>
        </div>
      ) : (
        <div className={styles.postList}>
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={styles.postCard}
            >
              <article>
                <div className={styles.postMeta}>
                  <time className={styles.postDate}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  <span className={styles.readTime}>
                    {post.readingTime} min read
                  </span>
                </div>
                <h2 className={styles.postTitle}>{post.title}</h2>
                <p className={styles.postExcerpt}>{post.excerpt}</p>
                <div className={styles.postTags}>
                  {post.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}

      <div className={styles.backLink}>
        <Link href="/">← Back to home</Link>
      </div>
    </div>
  );
}
