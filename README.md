# 8WHIE — Cybersecurity • Research • Technology

> **EXPLORE. BREAK. SECURE.**

Official repository for **8WHIE**, an independent cybersecurity and technology platform founded by **Aryan Thakur**, based in Patna, India.

8WHIE explores ethical hacking, digital security, technology research, OSINT, and the systems that shape the modern internet through practical education and experimentation.

---

## Brand Positioning

8WHIE operates as an independent technical and security laboratory focused on:

- **Cybersecurity & Threat Modeling**
- **Ethical Hacking & Vulnerability Analysis**
- **Security Education & Practical Curricula**
- **Technology Research & Protocol Testing**
- **Digital Security & Privacy Defense**
- **Open-Source Intelligence (OSINT)**
- **Security Tools & Automation**
- **Digital Experimentation**

---

## Tech Stack & Architecture

- **Framework**: React 19 / Next.js / Vite SPA
- **Language**: TypeScript (Strict typing)
- **Styling**: Tailwind CSS v4
- **Backend / API**: Express & Next.js App Router API route (`/api/contact`)
- **Icons**: Lucide React
- **Typography**: Space Grotesk (Editorial Display), Inter (Clean Body Prose), JetBrains Mono (Technical Spec)
- **Design Philosophy**: Cinematic dark palette (`#070707` background, `#F2F2F2` primary, `#929292` secondary, `#B7FF00` electric green accent used with strict restraint)

---

## Project Structure

```
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts         # Contact form API endpoint
│   ├── layout.tsx               # Root Next.js layout & SEO metadata
│   ├── page.tsx                 # Main application page
│   └── globals.css              # Global styling imports
├── components/
│   ├── Navbar.tsx               # Fixed minimal navigation & mobile drawer
│   ├── Intro.tsx                # Cinematic entrance screen with interactive canvas
│   ├── Hero.tsx                 # Editorial typography & lab intro
│   ├── About.tsx                # Mission & interactive system topology inspector
│   ├── Founder.tsx              # Aryan Thakur attribution & profile slot
│   ├── Expertise.tsx            # 6 core security exploration areas
│   ├── Research.tsx             # 8 research tracks & defensive deep dives
│   ├── Projects.tsx             # 8WHIE LAB, ACADEMY, and TOOLS showcase
│   ├── Community.tsx            # Instagram, YouTube, Telegram, X channels
│   ├── Contact.tsx              # Real validated contact form & direct email
│   ├── FinalCTA.tsx             # Dramatic minimal closing action
│   ├── Footer.tsx               # Brand info, copyright & exploration motto
│   ├── Button.tsx               # Reusable accessible button system
│   ├── SectionHeading.tsx       # Reusable editorial section headings
│   ├── TechnicalCanvas.tsx      # Ambient particle & coordinate geometry canvas
│   └── ProjectModal.tsx         # Architectural project specification modal
├── lib/
│   ├── contact.ts               # Contact validation & dispatch pipeline
│   └── utilities.ts             # Text sanitization & utility helpers
├── public/
│   ├── images/
│   │   ├── 8whie-logo.svg       # Official 8WHIE vector logo
│   │   ├── aryan-profile.jpg    # Founder official photograph slot
│   │   └── aryan-profile.svg    # High-fidelity architectural placeholder
│   ├── robots.txt               # Search crawler permissions
│   └── sitemap.xml              # SEO indexation map
├── src/                         # Source components & Vite entry points
├── .env.example                 # Example configuration variables
├── server.ts                    # Full-stack Node.js / Express runner
└── README.md
```

---

## Local Setup & Development

### 1. Prerequisites
- Node.js `v20.x` or `v22.x`
- npm `v10.x` or higher

### 2. Installation
```bash
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Configure your target recipient email:
```env
CONTACT_EMAIL=iaryan9905@gmail.com
PORT=3000
```

### 4. Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Production Build & Deployment

### Build Application
```bash
npm run build
```

### Start Production Server
```bash
npm run start
```

---

## Contact API & Backend Details

The contact form submits to `/api/contact`:

- **Client & Server-Side Validation**: Ensures full name, email format, subject, and message are verified.
- **Input Sanitization**: Strips HTML tags and prevents script injection.
- **Spam Protection**: Silent honeypot field intercepts automated bot submissions.
- **Rate Limiting**: Sliding IP rate limiter prevents form spam.
- **Direct Mail Fallback**: A dedicated direct contact element provides a verified link to `mailto:iaryan9905@gmail.com`.

---

## Official Assets & Image Replacement

- **Logo**: `/public/images/8whie-logo.svg`
  - Rendered in Navbar, Intro, Footer, and Favicon.
- **Founder Photo**: `/public/images/aryan-profile.jpg`
  - Located in `/public/images/aryan-profile.jpg`.
  - When replaced with Aryan Thakur's official photograph, it displays automatically with graceful fallback protection.

---

## Official Channels

- **Website**: [8whie.com](https://8whie.com)
- **Instagram**: [@8whie_](https://instagram.com/8whie_)
- **YouTube**: [@8WHIE](https://youtube.com/@8WHIE)
- **Telegram**: [@Arnxkt](https://t.me/Arnxkt)
- **X**: [@im_aryanthakur](https://x.com/im_aryanthakur)
- **Founder**: Aryan Thakur · Patna, India
- **Direct Email**: `iaryan9905@gmail.com`

---

## Ethical Disclosure & Security Notice

All cybersecurity content published on 8WHIE is intended strictly for authorized, educational and defensive purposes.

© 2026 8WHIE. All rights reserved.  
*Built for learning. Designed for exploration.*
