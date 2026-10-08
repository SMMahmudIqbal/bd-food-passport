# Bangladesh Food Passport (বাংলাদেশ ফুড পাসপোর্ট)

> **Developed by S. M. Mahmud Iqbal**  
> *Interactive Culinary Exploration and Digital Passport Engine across 64 Districts of Bangladesh*

[![Live Demo](https://img.shields.io/badge/Live%20Demo-bd--food--passport.vercel.app-0d9488?style=for-the-badge&logo=vercel&logoColor=white)](https://bd-food-passport.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-0f172a?style=for-the-badge&logo=github)](https://github.com/SMMahmudIqbal/bd-food-passport)
[![Author](https://img.shields.io/badge/Developed%20By-S.%20M.%20Mahmud%20Iqbal-6366f1?style=for-the-badge)](https://github.com/SMMahmudIqbal)
[![License](https://img.shields.io/badge/License-MIT-64748b?style=for-the-badge)](LICENSE)

---

## Overview

**Bangladesh Food Passport** is a client-side Single Page Application (SPA) designed to celebrate the culinary heritage of Bangladesh across all 64 districts. Users can explore authentic regional delicacies on an interactive SVG vector map, log personal food discovery journeys with animated passport stamps, track completion milestones across 5 tiers of mastery, and generate high-resolution exportable social media passport cards.

The application runs entirely client-side with zero tracking, local persistence via Web Storage, full mobile responsiveness, and zero recurring server dependencies.

---

## Key Features

1. **Interactive Vector Map**:
   - High-fidelity SVG map rendering all 64 administrative districts of Bangladesh.
   - Fluid mobile touch support with pinch-to-zoom, panning, and dedicated zoom controls.
2. **District Culinary Database and Rubber Stamp Feedback**:
   - Responsive bottom sheet drawer presenting district name, division, signature dish (bilingual), and historical background.
   - Interactive stamp action with tactile sound feedback, rubber stamp impression animation, and celebratory confetti.
   - Real-time map colorization shifting visited districts to vibrant teal while leaving unexplored regions neutral.
3. **Real-Time Progress Tracking**:
   - Dynamic progress metrics tracking visited districts (e.g., 25/64) with native Bengali numeral support and animated progress indicators.
4. **Mastery Ranking System**:
   - Tier 1 (0 to 10 Districts): Beginner (শুরু)
   - Tier 2 (11 to 25 Districts): Food Explorer (ফুড এক্সপ্লোরার)
   - Tier 3 (26 to 40 Districts): Foodie (ভোজনরসিক)
   - Tier 4 (41 to 55 Districts): Food Master (ফুড মাস্টার)
   - Tier 5 (56 to 64 Districts): Legend (কিংবদন্তি)
5. **High-Resolution Passport Card Exporter**:
   - Generates 1080x1350 pixel social sharing cards (4:5 ratio) optimized for Instagram and Facebook Stories.
   - Includes custom traveler name, profile image (processed strictly on-device), passport serial, issue timestamp, official stamp seals, and customized map illustration.
   - One-click PNG download, Web Share API integration, and deep-link copying.
6. **Local-First Privacy**:
   - All journey records are preserved locally via `localStorage`. No remote account or telemetry required.
7. **Accessibility and Theme Support**:
   - Adaptive dark and light themes with high-contrast text rendering.
   - Deep-linking support via `#make` URL hash for direct card creation modal navigation.

---

## Tech Stack

- **Framework**: React 19 + Vite 6
- **Styling**: Tailwind CSS with custom responsive utilities
- **Typography**: Hind Siliguri (Google Fonts)
- **Icons**: Lucide React
- **Canvas and Export**: `html-to-image` for high-resolution 1080x1350 rendering
- **Celebration Effects**: `canvas-confetti`
- **Hosting**: Vercel

---

## Local Setup

```bash
# Clone the repository
git clone https://github.com/SMMahmudIqbal/bd-food-passport.git
cd bd-food-passport

# Install dependencies
npm install

# Start development server
npm run dev
```

Open `http://localhost:3000` in any modern web browser.

To create an optimized production build:
```bash
npm run build
```
Compiled production assets are output to the `dist/` directory.

---

## Deployment

### Vercel Deployment

Deploy with Vercel CLI:
```bash
npx vercel --prod
```

Or connect the GitHub repository directly to [Vercel](https://vercel.com) using the `Vite` project preset.

### GitHub Pages Deployment
A GitHub Actions workflow is provided in `.github/workflows/deploy.yml` for continuous deployment to GitHub Pages upon pushing changes to the `main` branch.

---

## Data Architecture

District culinary datasets are maintained under `/src/data/foods.js`:
- `id`: Unique district identifier matched to the SVG vector path
- `nameBn`: District name in Bengali
- `nameEn`: District name in English
- `divisionBn`: Administrative division
- `foodBn`: Famous traditional culinary item
- `foodEn`: English item description
- `descriptionBn`: Historical context and culinary significance

---

## Author and Attribution

**Developed by S. M. Mahmud Iqbal**  
- GitHub: [@SMMahmudIqbal](https://github.com/SMMahmudIqbal)

---

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
