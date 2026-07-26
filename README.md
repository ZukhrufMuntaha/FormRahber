# FormRahber (فارم رہبر) 📄✨
### AI-Powered Smart Official Form Reader & Step-by-Step Guided Assistant

[![Live Demo](https://img.shields.io/badge/Live%20Demo-FormRahber-2563EB?style=for-the-badge&logo=vercel)](https://form-rahber.vercel.app/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React 19](https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Gemini AI](https://img.shields.io/badge/Google_Gemini_2.5_Flash-8E75B2?style=for-the-badge&logo=google-gemini&logoColor=white)](https://ai.google.dev/)

---

## 🌟 Overview

**FormRahber** (*فارم رہبر*) is an intelligent, bilingual web application designed to eliminate form-filling anxiety and complex bureaucracy for citizens. By uploading a photo or scan of any official paper form — such as **University Admissions, Bank Account Opening, CNIC Applications, Passport Renewal, Job Applications, or Scholarship Forms** — FormRahber automatically analyzes the image, detects all fillable fields, generates easy-to-understand explanations, builds a required document checklist, and guides users step-by-step in **English, Urdu (اردو), or Roman Urdu**.

Once filled, users can interactively align their answers directly on the form canvas using touch or cursor dragging, and export a ready-to-print, high-resolution filled form or PDF.

🔗 **Live Website**: [https://form-rahber.vercel.app/](https://form-rahber.vercel.app/)

---

## 🚀 Key Features

### 🌐 Complete Trilingual Experience (English, Urdu, Roman Urdu)
- Every single screen, navbar, modal, loading state, form explanation, and button supports instant language switching between **English**, **Urdu (اردو)**, and **Roman Urdu**.
- Beautiful typography adapted for Nastaliq/Urdu scripts.

### 🔍 Smart AI Form Vision & Detection
- **Multimodal AI OCR**: Powered by Google's `gemini-2.5-flash` model via `@google/genai` to read printed, typed, or mixed-script official forms in English and Urdu.
- **Form Guardrails & Detection**: Automatically verifies if an uploaded image is a valid official form. If an unsupported image is uploaded (e.g., photos of cars, landscapes, or receipts), FormRahber gracefully alerts the user with helpful guidance to upload an official document.

### 📋 Automatic Form Breakdown & Document Checklist
- **Section Categorization**: Groups fields logically (Personal Information, Educational Background, Financial Details, Declaration).
- **Contextual Explanations**: Plain-language explanations in English & Urdu explaining *why* a specific field is asked and *what* format to provide.
- **Required Documents List**: Detects necessary attachments (Attested Matric Certificate, Passport Photos, CNIC Copies, Income Slips) so users never miss a required submission document.

### 🎙️ Step-by-Step Guided Assistant with Voice Audio
- Walkthrough interface that presents questions one by one in simple terms.
- **Audio Voice Reader**: Integrated Speech Synthesis (TTS) that reads out questions and instructions aloud in Urdu or English for better accessibility.
- **Live Progress & Completion Meter**: Real-time status indicators tracking answered vs remaining questions.

### 👆 Drag-and-Drop Form Canvas & Custom Alignment
- **Direct Interactive Positioning**: Adjust populated text on top of the original form image by dragging with mouse cursor on desktop or touch gestures on mobile.
- **Custom Ink & Styling**: Toggle ink colors (**Blue**, **Black**, **Dark Navy**), adjust font sizes, and zoom in/out for precision alignment.

### 🖨️ Zero-Watermark Export (PDF & High-Res Image)
- Instantly download the filled document as a high-quality PDF or Image ready for printing or digital submission.
- Clean, crisp output without cluttered badges or artificial overlays.

### 🧪 Pre-Loaded Sample Demo Forms
- Test the application instantly without uploading files using built-in templates:
  - 🎓 **University Admission Form**
  - 🏦 **Bank Account Opening Form**
  - 🪪 **CNIC / Identity Registration Form**
  - 📜 **Merit Scholarship Application**

---

## 🛠️ Tech Stack & Architecture

### **Frontend**
- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Motion (Framer Motion)](https://motion.dev/)
- **PDF Generation**: [jsPDF](https://github.com/parallax/jsPDF)
- **Voice / Audio**: Web Speech API (`speechSynthesis`)

### **Backend & AI Proxy**
- **Server**: [Express.js](https://expressjs.com/) (Node.js) with `tsx` development runner & `esbuild` production bundler.
- **AI SDK**: [@google/genai SDK](https://www.npmjs.com/package/@google/genai)
- **Model**: `gemini-2.5-flash` for high-accuracy vision analysis and structured JSON parsing.
- **Security**: Server-side API proxy routing (`/api/analyze-form`) ensuring `GEMINI_API_KEY` is never exposed to the client browser.

---

## 📁 Directory Structure

```
FormRahber/
├── api/
│   └── index.ts               # Express server API endpoints (Gemini proxy & analysis)
├── assets/                    # Sample form template images
├── src/
│   ├── components/
│   │   ├── Header.tsx         # Responsive navbar with trilingual language switcher
│   │   ├── LandingHero.tsx    # Hero section with 3D illustration & quick CTA
│   │   ├── UploadModal.tsx    # Upload modal with camera support & form validation
│   │   ├── AnalysisLoading.tsx# AI processing loading state with progress steps
│   │   ├── FormOverview.tsx   # Analysis breakdown & document checklist page
│   │   ├── GuidedFilling.tsx  # Step-by-step Q&A walkthrough with audio synthesis
│   │   ├── SummaryReview.tsx  # Final answers review & editing screen
│   │   ├── FormExportPreview.tsx # Interactive canvas alignment & PDF export
│   │   ├── AboutPage.tsx      # Application mission & features overview
│   │   └── Footer.tsx         # Site footer with bilingual support
│   ├── data/
│   │   └── sampleForms.ts     # Pre-configured sample form datasets
│   ├── utils/
│   │   └── translations.ts    # Centralized trilingual dictionary (EN, UR, Roman Urdu)
│   ├── App.tsx                # Main application state & screen router
│   ├── main.tsx               # Client entry point
│   ├── types.ts               # Shared TypeScript interfaces & types
│   └── index.css              # Global styles & Tailwind CSS configuration
├── .env.example               # Environment variables template
├── metadata.json              # Applet metadata & permissions
├── package.json               # Dependencies and scripts
├── server.ts                  # Production Express + Vite server entry point
├── vercel.json                # Vercel deployment configuration
└── vite.config.ts             # Vite configuration
```

---

## 💻 Local Development Setup

### **Prerequisites**
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Gemini API Key**: Obtain a free API key from [Google AI Studio](https://aistudio.google.com/)

### **1. Clone the Repository**
```bash
git clone https://github.com/your-username/form-rahber.git
cd form-rahber
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Configure Environment Variables**
Create a `.env` file in the project root directory (refer to `.env.example`):
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### **4. Start Development Server**
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000`.

---

## 📦 Build & Production Deployment

### **Production Build**
To build the application for production deployment:
```bash
npm run build
```
This compiles the Vite React frontend into `dist/` and bundles the Express server into `dist/server.cjs` using `esbuild`.

### **Start Production Server**
```bash
npm run start
```

### **Deploying on Vercel**
This project is pre-configured for deployment on **Vercel** via `vercel.json`:
1. Push your code to GitHub / GitLab.
2. Import the project into your Vercel Dashboard.
3. Add `GEMINI_API_KEY` in Vercel **Environment Variables**.
4. Deploy!

---

## 🛡️ Privacy & Security

- **No Permanent Image Storage**: Form images uploaded by users are processed in-memory for AI analysis and remain client-side for canvas rendering.
- **Secure Key Handling**: Gemini API requests are executed exclusively on the server side; secrets are never leaked to browser networks.

---

## 📄 License

This project is open-source under the **MIT License**.

---

<p align="center">
  Developed with ❤️ by <b>FormRahber Team</b> for citizens everywhere.
</p>
