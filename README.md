# Portfolio

Personal site for Haris Tahir Rana. Projects, experience, skills, writing and a
downloadable resume, fronted by an interactive terminal where visitors type commands
to move around the site.

Live: <https://portfolio-wheat-sigma-73.vercel.app>

## Pages

| Route | Contents |
| --- | --- |
| `/` | Terminal interface and introduction |
| `/projects` | Project cards with stacks and links |
| `/experience` | Roles and what was built |
| `/skills` | Technologies, grouped |
| `/blog` | Writing |
| `/contact` | Contact form |

## Stack

Next.js App Router and TypeScript. The 3D scene runs on Three.js through React Three
Fiber and Drei, with Framer Motion for transitions and Simple Icons for the tech
marquee. Content is centralised in `src/data/portfolio.ts`. Project reports and the
resume are served as PDFs from `public/`. Deployed on Vercel.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```
