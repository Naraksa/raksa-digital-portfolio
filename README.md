# 🚀 Modern Personal Portfolio — Raksa

A modern, responsive, and performance-optimized personal portfolio web application built with **React**, **Vite**, and **Vanilla CSS**. Features dynamic theme styling, responsive navigation, multi-category project showcases, community activity sliders, interactive photo lightboxes, and Docker deployment configurations.

---

## ✨ Features

- **🎨 Modern Glassmorphic Design**: Built using custom CSS tokens, smooth transitions, HSL color palettes, neon accents, and interactive micro-animations.
- **📱 Ultra-Responsive Layout**: Designed & tested for seamless viewing across desktop, tablet, and mobile screen sizes.
- **🎓 Dual University & Education Showcase**: Interactive section highlighting education (AUPP & IFL) with photo galleries and achievement metrics.
- **💼 Categorized Work & Projects**: Filterable project showcases across **Software**, **Data Science**, **AI**, and **Engineering** with live demo links and `Repository Only` indicators.
- **🤝 Community & Leadership Section**: Interactive hero slider and cards highlighting volunteering, events, and community activities.
- **📝 Tech Blog & Articles**: Responsive blog preview layout for sharing technical knowledge and experiences.
- **🔍 Fullscreen Lightbox & Gallery**: Interactive media viewer with zoom, full-resolution preview, and caption modal support.
- **⚡ High Performance & Lightweight**: Built with Vite HMR, optimized asset loading, lazy rendering, and Oxlint configuration.
- **🐳 Docker & Nginx Ready**: Multi-stage production Docker build served via Nginx with Gzip compression and static caching.

---

## 📂 Project Structure

```text
my-portfolio/
├── public/                 # Static public assets & favicon
├── src/
│   ├── assets/             # Images, certificates, and event galleries
│   ├── components/         # Modular presentational React components
│   │   ├── About.jsx       # Education, skills, timeline & galleries
│   │   ├── Blog.jsx        # Technical articles & blog cards
│   │   ├── Community.jsx   # Community slider & volunteering events
│   │   ├── Contact.jsx     # Contact form & social media links
│   │   ├── Footer.jsx      # Footer layout & copyright
│   │   ├── Hero.jsx        # Interactive hero section & featured cards
│   │   ├── Lightbox.jsx    # Fullscreen image viewer modal
│   │   ├── ProjectCard.jsx # Reusable project card with status indicators
│   │   └── Projects.jsx    # Filterable project portfolio grid
│   ├── data/
│   │   └── portfolioData.js # Central single source of truth for portfolio content
│   ├── styles/             # Dedicated CSS stylesheets for components
│   ├── App.css             # Global layout, sticky navbar & mobile drawer
│   ├── App.jsx             # Main application router & state coordinator
│   ├── index.css           # Design tokens, color system, and resets
│   └── main.jsx            # React root entry point
├── Dockerfile              # Multi-stage Docker production build configuration
├── docker-compose.yml      # Docker Compose setup (Port 8080)
├── nginx.conf              # Nginx server routing & Gzip caching configuration
├── package.json            # Project scripts and dependencies
└── vite.config.js          # Vite build configuration
```

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Vanilla CSS3 (CSS Variables, Flexbox/Grid, Animations)
- **Tooling & Linting**: Oxlint, ESLint
- **Deployment**: Docker, Nginx Alpine

---

## 🚀 Quick Start

### 1. Local Development

Install dependencies and launch Vite development server with Hot Module Replacement (HMR):

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open `http://localhost:5173` in your browser.

### 2. Linting & Code Verification

```bash
# Run oxlint checks
npm run lint
```

### 3. Production Build

Build and optimize static assets for production:

```bash
# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🐳 Docker Deployment

To build and run the application inside a production-ready **Nginx** container:

```bash
# Build and launch with Docker Compose
docker compose up -d --build
```

Access the production site at `http://localhost:8080`.

To stop the container:
```bash
docker compose down
```

---

## ✏️ Modifying Portfolio Content

All dynamic content — including personal bio, education details, programming skills, featured projects, community events, and social links — is centrally managed in:

📄 `src/data/portfolioData.js`

Simply update the data objects in `portfolioData.js` to instantly update content across the website!

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
