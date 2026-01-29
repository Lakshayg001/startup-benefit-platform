# Startup Benefits Platform 🚀

A premium full-stack platform for startups to browse and claim exclusive SaaS deals, designed to save founders thousands of dollars in their early stages.

## ✨ Features

- **Exclusive Deals**: High-value offers from partners like AWS, Stripe, Notion, Slack, and more.
- **Dynamic Catalog**: Browse and filter deals by category (Cloud, Marketing, Productivity, etc.).
- **Smart Filtering**: Fast search and verified-only deal filters.
- **Founder Dashboard**: Track claimed deals and view total estimated savings.
- **Secure Authentication**: JWT-based auth for protecting sensitive claim codes.
- **Premium UI**: Modern, responsive design with smooth animations using Framer Motion and Tailwind CSS.

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Auth**: JWT (JSON Web Tokens)
- **Environment**: Dotenv

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Running locally or on Atlas)

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd startup-benefits-platform
   ```

2. **Backend Configuration**
   - Navigate to the `backend` directory.
   - Create a `.env` file based on the provided configuration:
     ```env
     PORT=5000
     MONGODB_URI=mongodb://localhost:27017/startup-benefits-platform
     JWT_SECRET=your-secure-secret-key
     NODE_ENV=development
     ```
   - Install dependencies and start the server:
     ```bash
     npm install
     npm run dev
     ```

3. **Frontend Configuration**
   - Navigate to the `frontend` directory.
   - Install dependencies and start the development server:
     ```bash
     npm install
     npm run dev
     ```

4. **Seed the Database**
   - To populate the platform with the initial set of premium deals, run the seed script from the `backend` directory:
     ```bash
     npm run seed
     ```

## 📂 Project Structure

```text
startup-benefits-platform/
├── frontend/             # Next.js Application
│   ├── src/
│   │   ├── app/         # App Router Pages
│   │   ├── components/  # Atomic UI Components
│   │   ├── context/     # Auth & State Management
│   │   └── lib/         # API Utilities (Axios)
└── backend/              # Express API
    ├── src/
    │   ├── models/      # Mongoose Schemas
    │   ├── routes/      # API Endpoints
    │   ├── controllers/ # Business Logic
    │   └── utils/       # Seeding Scripts
```

## 🤝 Contribution

Contributions are welcome! Please feel free to submit a Pull Request.
