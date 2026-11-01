<div align="center">

# Kavindu Dilshan

### Full Stack Developer · UI/UX Designer · Creative Designer

A personal portfolio bringing web development, mobile apps, and visual design together.

[![Live Portfolio](https://img.shields.io/badge/Explore_Portfolio-8B5CF6?style=for-the-badge&logo=googlechrome&logoColor=white)](https://kavindu-dilshan.github.io/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge)](https://www.linkedin.com/in/kavindudilshan84/)
[![Behance](https://img.shields.io/badge/Behance-1769FF?style=for-the-badge&logo=behance&logoColor=white)](https://www.behance.net/kavindu-dilshan)

[![Deploy portfolio](https://github.com/kavindu-dilshan/kavindu-dilshan.github.io/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/kavindu-dilshan/kavindu-dilshan.github.io/actions/workflows/deploy-pages.yml)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)

[Explore the site](https://kavindu-dilshan.github.io/) · [Highlights](#highlights) · [Run locally](#run-locally) · [Customize](#customize)

</div>

---

## About

This is the source code for my personal portfolio, built with React, TypeScript, and Vite. It showcases my development projects, design services, skills, experience, and education through a dark interface with animated interactions.

The portfolio covers full stack web development, Android development, UI/UX design, and graphic design, with links to project repositories and ways to get in touch.

## Built with

| Area | Tools |
| --- | --- |
| Interface | React 18, TypeScript |
| Build | Vite 8 |
| Styling | Tailwind CSS 4, custom CSS |
| Animation | Framer Motion, Lenis |
| Visuals & icons | Paper Design Shaders, Lucide, React Icons |
| Forms & email | React Hook Form, EmailJS |
| Hosting | GitHub Pages, GitHub Actions |

## Featured projects

| Project | Focus | Technologies |
| --- | --- | --- |
| [CeyGo](https://github.com/kavindu-dilshan/CeyGo) | Sri Lanka travel companion | Kotlin, Android Studio, Google Maps |
| [Serendib Estates](https://github.com/kavindu-dilshan/serendib-estates) | Real estate marketplace | React, Node.js, Express, MongoDB, Redux |
| [Medali](https://github.com/kavindu-dilshan/Medali) | Medication tracking and reminders | Swift, Core Data, HealthKit |
| [KMP Pharmacy](https://github.com/kavindu-dilshan/KMP-Pharmacy) | Pharmacy management | MongoDB, Express, React, Node.js |

More projects and team credits are available in the portfolio.

## Run locally

Use **Node.js 22.12 or newer** and npm. The deployment workflow uses Node.js 22.

```bash
git clone https://github.com/kavindu-dilshan/kavindu-dilshan.github.io.git
cd kavindu-dilshan.github.io
npm ci
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

### Production build

```bash
npm run build
npm run preview
```

The build checks TypeScript, bundles the app, and generates static project pages plus `sitemap.xml` in `dist/`. Use the preview server to check those pages before deployment.

## Customize

| What to change | Where to edit |
| --- | --- |
| Name, introduction, social profiles, résumé | `src/data/personal.ts` |
| Project descriptions, technologies, links, team credits | `src/data/projects.ts` |
| Skills | `src/data/skills.ts` |
| Sections and interactions | `src/components/` |
| Project screenshots and design assets | `src/images/` |
| Homepage title and search metadata | `index.html` |
| Static project page layout and sitemap generation | `scripts/build-project-pages.mjs` |
| Deployment workflow | `.github/workflows/deploy-pages.yml` |

Project pages are generated from the same data as the portfolio. Edit the source files and rebuild; changes made directly inside `dist/` will be overwritten.

### Contact form

To use the contact form in your own fork, configure an EmailJS service and template, then update the EmailJS configuration in `src/components/Contact/index.tsx`. Match the template fields to the form before testing delivery.

Browser-side configuration is visible to visitors. Keep private credentials out of client code and Git history.

## Deploy

1. In the repository, open **Settings → Pages → Build and deployment**.
2. Select **GitHub Actions** as the source.
3. Push your changes to `main`.

The workflow installs dependencies, builds the site, and publishes `dist/`. Pull requests run the build without deploying. Generated output and `node_modules/` are excluded from version control.

For a fork or a different domain, update the site URLs in `index.html`, `public/robots.txt`, `public/sitemap.xml`, `package.json`, and `scripts/build-project-pages.mjs`. A repository hosted under a subpath also needs the appropriate Vite base path and asset/link configuration.

## Connect

Interested in a website, app, or design collaboration?

[Portfolio](https://kavindu-dilshan.github.io/) · [LinkedIn](https://www.linkedin.com/in/kavindudilshan84/) · [Behance](https://www.behance.net/kavindu-dilshan) · [Email](mailto:kavindudilshan84@gmail.com)

## Usage & licensing

This repository currently has no `LICENSE` file. Contact me about permission to reuse the code, personal branding, photographs, or design assets. Project and brand references retain their respective ownership.

