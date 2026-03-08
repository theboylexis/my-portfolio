# 🖥️ alexmarfo.dev — Personal Portfolio

> Dark, terminal-inspired developer portfolio — built from scratch with Next.js, vanilla CSS, and Framer Motion.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![CSS Modules](https://img.shields.io/badge/CSS-Modules-1572B6?logo=css3&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0050?logo=framer&logoColor=white)

---

## ✨ Features

- **Terminal-inspired design** — dark theme, glow effects, monospace accents (JetBrains Mono)
- **Smooth animations** — scroll-triggered reveals and staggered fade-ins via Framer Motion
- **Animated particle background** — custom canvas-style hero backdrop
- **Fully responsive** — mobile-first layout with CSS Modules (zero UI libraries)
- **SEO optimized** — Open Graph, Twitter Cards, semantic HTML, proper heading hierarchy
- **Component architecture** — modular sections with scoped styles

## 📂 Project Structure

```
src/
├── app/
│   ├── layout.js          # Root layout + SEO metadata
│   ├── page.js            # Home page (Hero + all sections)
│   ├── globals.css         # Design tokens + global styles
│   └── page.module.css     # Hero section styles
├── components/
│   ├── layout/
│   │   ├── Navbar.js       # Fixed navigation bar
│   │   └── Footer.js       # Site footer
│   ├── sections/
│   │   ├── About.js        # About me (terminal card)
│   │   ├── Projects.js     # Project cards grid
│   │   ├── Skills.js       # Tech stack badges
│   │   ├── Timeline.js     # Journey timeline
│   │   └── Contact.js      # Contact links
│   └── ui/
│       ├── AnimatedBackground.js   # Particle hero backdrop
│       └── SectionReveal.js        # Scroll-triggered reveal wrapper
```

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| UI | React 19 |
| Styling | CSS Modules (vanilla) |
| Animations | Framer Motion 12 |
| Fonts | Inter + JetBrains Mono (via `next/font`) |
| Linting | ESLint |

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/theboylexis/my-portfolio.git

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it locally.

## 📄 License

This project is open source and available for reference. Built by [Alex Marfo Appiah](https://github.com/theboylexis).
