# 🐝 WorkBee.lk — Reliable Manpower & Worker Dispatch Platform

[![Web App](https://img.shields.io/badge/PWA-Ready-F59E0B?style=for-the-badge&logo=pwa&logoColor=white)](https://workbee-official-lk.surge.sh)
[![Android App](https://img.shields.io/badge/Android-APK_v1.2.0-3DDC84?style=for-the-badge&logo=android&logoColor=white)](https://workbee-official-lk.surge.sh)
[![License](https://img.shields.io/badge/License-MIT-blue.style=for-the-badge)](#license)

**WorkBee.lk** is Sri Lanka's premier manpower and daily-wage worker dispatch platform. It seamlessly connects verified daily-wage skilled workers (Masons, Carpenters, Painters, Plumbers, Electricians, Helpers, Cleaners, Drivers, etc.) with commercial companies and household clients, managed through a secure **Admin-Controlled Privacy & Dispatch System**.

🌐 **Live Website:** [https://workbee-official-lk.surge.sh](https://workbee-official-lk.surge.sh)  
📱 **Android App:** Download signed installable `WorkBee.apk` from the release section.

---

## 🌟 Key Features

### 🔒 1. Strict Privacy & Admin-Controlled Dispatching
- **Privacy Shield:** Workers and Companies **never see each other's direct contact numbers or personal identities**.
- **Admin Mediation:** All worker dispatches, job assignments, and payments are coordinated strictly through the **WorkBee Admin Panel**.
- **Verified Worker Pool:** Workers are categorized by reference IDs (e.g. `WB-W102`) to ensure safety and quality control.

### 👷 2. Worker Portal (`worker-dashboard.html`)
- **Worker Profile Management:** View registered skill category, district, daily wage rate, and contact info.
- **Availability Status Toggle:** Easily toggle between **AVAILABLE** (ready for work) and **BUSY** (on assignment).
- **Matching Job Opportunities:** Filter and view company job requirements matching the worker's primary skill.
- **One-Click Application:** Apply for job requirements; applications are routed directly to WorkBee Admin for assignment.

### 🏢 3. Company Portal (`company-dashboard.html`)
- **Request Worker Requirements:** Post daily/weekly worker requirements specifying skill type, quantity, date, location, offered daily rate, and special notes.
- **Track Requirement Status:** Monitor live dispatch status (`Awaiting Admin Dispatch` / `Dispatched`).
- **Browse Anonymous Worker Pool:** Filter available workers by skill and district without revealing raw phone numbers.

### 👑 4. Centralized Admin Panel (`admin.html`)
- **Full Contact Visibility:** Only Admin has full permission to view raw phone numbers, NIC numbers, and full addresses of both workers and clients.
- **Interactive Multi-Select Dispatch:** Filter workers by skill/location, select multiple workers via checkboxes, and dispatch them to pending company requirements with 1-click.
- **Requirement Lifecycle Management:** Approve, assign, or mark worker requirements as completed.

### 📱 5. Progressive Web App (PWA) & Mobile Native Features
- **Offline Capability:** Includes Service Worker (`sw.js`) caching for instant page loading even without internet.
- **Smart Install Banners:** Custom iOS Safari instructions and Android 1-click install banner.
- **TWA Android APK:** Packaged into a lightweight (~1.47 MB) signed Android APK ready for direct device installation.

---

## 🛠️ Technology Stack

- **Frontend:** HTML5, Semantic UI, Vanilla JavaScript (ES6+), CSS3 Grid & Flexbox, Google Fonts (Poppins)
- **Design System:** Custom Dark Navy (`#0f172a`) + Amber Gold (`#F59E0B`) Glassmorphism Aesthetic
- **State Management & Auth:** Client-side LocalStorage Session Management (`js/auth.js`)
- **PWA Infrastructure:** Web App Manifest (`manifest.json`), Service Worker (`sw.js`) Cache Strategy
- **Hosting & Deployment:** Surge.sh Permanent CDN (`https://workbee-official-lk.surge.sh`)
- **App Packaging:** Google Trusted Web Activity (TWA) via PWABuilder Cloud APK Pipeline

---

## 📁 Repository Structure

```text
WorkBee.lk/
├── index.html               # Main Public Landing Page
├── login.html               # Multi-Role Authentication Page (Worker / Company / Admin)
├── worker-dashboard.html    # Dedicated Worker Portal & Job Application Manager
├── company-dashboard.html   # Dedicated Company Portal & Worker Requirement Requester
├── admin.html               # Master Admin Dispatching Panel
├── register-worker.html     # Multi-step Worker Onboarding & Skill Collector
├── register-company.html    # Company Registration & Quick Requirement Form
├── workers.html             # Public Worker Directory Preview
├── offline.html             # PWA Fallback Page when disconnected
├── manifest.json            # Web App Manifest & App Icons Registry
├── sw.js                    # Service Worker Offline Caching Logic
├── css/
│   ├── main.css             # Core CSS Variables & Reset Rules
│   ├── components.css       # Reusable UI Cards, Badges, & Buttons
│   └── forms.css            # Custom Form Control Styling
├── js/
│   ├── auth.js              # Authentication, Session Storage, & Route Guard System
│   ├── admin.js             # Admin Panel Controls & Multi-Select Dispatch Engine
│   ├── forms.js             # Form Input Handlers & Validation Logic
│   ├── main.js              # Navbar Controls, PWA Prompts, & Animations
│   └── workers.js           # Worker Directory Search & Filter Engine
└── assets/
    ├── logo.jpg             # WorkBee Official Brand Logo
    └── icons/               # PWA App Icons (48px - 512px)
```

---

## 🚀 Quick Start Guide

### Running Locally

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/WorkBee.lk.git
   cd WorkBee.lk
   ```

2. **Serve with Local HTTP Server:**
   - Using PowerShell script:
     ```powershell
     powershell -ExecutionPolicy Bypass -File start-server.ps1
     ```
   - Or using Node.js / `npx`:
     ```bash
     npx serve .
     ```

3. **Open in Browser:**
   Navigate to `http://localhost:8080` (or `http://localhost:3000`).

---

## 🔑 Default Credentials for Testing

| Role | Username | Password | Default Redirect Page |
|---|---|---|---|
| **Admin** | `admin` | `admin123` | `admin.html` |
| **Worker** | Registered Phone / Username | Set during registration | `worker-dashboard.html` |
| **Company** | Registered BR / Username | Set during registration | `company-dashboard.html` |

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for details.

---

<p align="center">
  Made with ❤️ for Sri Lanka's Skilled Workforce | 🐝 <strong>WorkBee.lk</strong>
</p>
