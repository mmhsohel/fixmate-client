# FixMate — Smart Device & Home Appliance Repair Service Platform (Client)

**FixMate** is a full-stack, role-based on-demand repair service booking platform. Verified technicians list their repair services, customers browse and submit repair requests with step-by-step status tracking, and payments are securely processed online via Stripe **only after** the repair work is completed.

## 🌐 Live Demo & Repositories
* **Live Application:** [https://your-fixmate-live-url.vercel.app](https://your-fixmate-live-url.vercel.app)
* **Server Repository:** [https://github.com/your-username/fixmate-server](https://github.com/your-username/fixmate-server)

---

## 🔐 Demo Credentials (For Evaluation)
> **Note:** Pre-seeded accounts with realistic service listings and active booking pipelines are available for immediate testing.

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@fixmate.com` | `Admin@1234` |
| **Technician** | `tech@fixmate.com` | `Tech@1234` |
| **Customer** | `customer@fixmate.com` | `Customer@1234` |

---

## ✨ Key Features

### 🌍 Public Experience
* **Dynamic Landing Page:** Hero search/CTA, 6 latest approved services, 4-step workflow guide, and interactive category cards.
* **Server-Side Search, Filter & Sort (`/services`):** Filter services by category (`Smartphone`, `Laptop & PC`, `AC`, `Refrigerator`, `TV`, `Washing Machine`, `Electrical`) and service mode (`Home Visit`, `Shop Drop-off`), search by keyword, and sort by price or newest arrivals—persisted via URL query parameters.
* **Service Details (`/services/[id]`):** Complete service breakdown, technician profile summary, and role-restricted repair request modal.

### 👤 Role-Based Dashboards
* **Customer Dashboard (`/dashboard/customer`):**
  * Overview analytics cards (Total Requests, Active Jobs, Completed Jobs).
  * Manage bookings with real-time status badges (`Requested`, `Accepted`, `In Progress`, `Completed`, `Rejected`, `Cancelled`).
  * Cancel pending requests or pay for completed jobs via **Stripe Checkout**.
  * Complete payment history with Stripe transaction IDs.
* **Technician Dashboard (`/dashboard/technician`):**
  * Full CRUD management for repair services with **ImgBB** image uploads and availability toggles.
  * Strict job pipeline management (`Requested` → `Accepted` → `In Progress` → `Completed` with final billing amount).
* **Admin Dashboard (`/dashboard/admin`):**
  * Platform-wide metrics, charts, and total Stripe revenue tracking.
  * Moderate technician service listings (`Approve` / `Reject`).
  * Manage user roles (`Customer`, `Technician`, `Admin`) and monitor all platform bookings and transactions.
* **Shared Profile Management (`/dashboard/profile`):** Update profile picture (ImgBB), contact info, service area, and bio with instant session state synchronization.

---

## 🛠️ Tech Stack & NPM Packages
* **Framework:** Next.js (App Router), React, TypeScript
* **Styling & UI:** Tailwind CSS, shadcn/ui / DaisyUI, Lucide React (Icons)
* **Authentication:** BetterAuth (MongoDB Adapter + Custom Role/Profile Fields) & JWT
* **Payments & Media:** Stripe Checkout (`@stripe/stripe-js`), ImgBB REST API
* **Data Visualization & Feedback:** Recharts (Dashboard Analytics), Sonner / React Hot Toast

---

## ⚙️ Local Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/mmhsohel/fixmate-client.git](https://github.com/mmhsohel/fixmate-client.git)
   cd fixmate-client