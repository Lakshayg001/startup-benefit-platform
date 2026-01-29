# Startup Benefits Platform 🚀

A premium full-stack platform for startups to browse and claim exclusive SaaS deals, designed to save founders thousands of dollars in their early stages.

## 📋 Table of Contents
- [End-to-End Application Flow](#1-end-to-end-application-flow)
- [Authentication and Authorization Strategy](#2-authentication-and-authorization-strategy)
- [Internal Flow of Claiming a Deal](#3-internal-flow-of-claiming-a-deal)
- [Interaction between Frontend and Backend](#4-interaction-between-frontend-and-backend)
- [Known Limitations or Weak Points](#5-known-limitations-or-weak-points)
- [Improvements for Production Readiness](#6-improvements-required-for-production-readiness)
- [UI and Performance Considerations](#7-ui-and-performance-considerations)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)

---

## 1. End-to-End Application Flow

The application follows a structured path for users to discover and redeem benefits:

1.  **Discovery**: Guest users arrive at the landing page and can browse the "Deals" catalog. They can filter by category (Cloud, Productivity, etc.) or search for specific partners.
2.  **Authentication**: To view specific deal details or claim an offer, users must sign up or log in. The platform supports different roles (Founder, Team Member, Indie Hacker).
3.  **Detail View**: Authenticated users can click on a deal to see full details, including eligibility criteria and expiration dates.
4.  **Claiming**: Users click "Claim This Deal". If the deal is "Verified Only", the user's account status is checked. Upon success, a unique claim code is generated and displayed.
5.  **Tracking**: Users can visit their Dashboard to see a history of all claimed deals, their current status (Pending/Approved), and total estimated savings.

---

## 2. Authentication and Authorization Strategy

-   **Strategy**: We use a JWT (JSON Web Token) based stateless authentication system.
-   **Storage**: Tokens are stored in `localStorage` on the frontend and sent in the `Authorization: Bearer <token>` header for every API request.
-   **Backend Middleware**: A custom `auth` middleware intercepts protected routes, verifies the JWT signature, and attaches the user object to the request.
-   **Authorization**: 
    -   **Authenticated Access**: Only logged-in users can access the dashboard and claim deals.
    -   **Verified-Only Deals**: Certain high-value deals (e.g., Stripe, AWS) require the `isVerified` flag on the user profile to be `true`. This creates a tiered loyalty system for verified startups.

---

## 3. Internal Flow of Claiming a Deal

When a user clicks "Claim This Deal":

1.  **Validation**: The frontend validates if the user is logged in. If not, they are redirected to login with a return path.
2.  **API Request**: A POST request is sent to `/api/claims` with the `dealId`.
3.  **Backend Verification**:
    -   The server checks if the deal exists and is active.
    -   It verifies if the user meets the "isVerified" requirement for that specific deal.
    -   It checks if the deal has reached its `claimLimit`.
4.  **Resource Creation**: A new `Claim` document is created in MongoDB with a default status of `pending` or `approved` (depending on the partner's requirement).
5.  **State Update**: The deal's `claimedCount` is incremented.
6.  **Response**: The server returns the `claimCode`. The frontend updates the UI to show the code and a link to the partner's website.

---

## 4. Interaction between Frontend and Backend

-   **RESTful API**: Communication happens over a standard REST API built with Express.js.
-   **Axios Client**: The frontend uses a centralized Axios instance with interceptors to automatically inject tokens and handle common error states (like 401 Unauthorized).
-   **Data Consistency**: The backend wraps data in consistent envelopes (e.g., `{ user: {...} }` or `{ deals: [...] }`) to ensure predictable parsing on the frontend.
-   **React Lifecycle**: Components use `useEffect` hooks to trigger data fetching from the backend and `useState` to manage loading states and error messages.

---

## 5. Known Limitations or Weak Points

-   **Client-Side Token Storage**: Storing JWTs in `localStorage` is vulnerable to XSS. In a production environment, `httpOnly` cookies would be preferred.
-   **Mock Verification**: User verification (`isVerified`) is currently a toggle in the database rather than a complex KYC/Integration process.
-   **Static Savings Calculation**: The dashboard currently uses a simplified estimation for total savings rather than real-time data from partner APIs.
-   **Limited Searching**: Search is performed using basic MongoDB `$regex`, which might be slow for very large datasets compared to specialized search engines like Algolia or ElasticSearch.

---

## 6. Improvements Required for Production Readiness

-   **Secure Cookies**: Switch to `httpOnly` and `Secure` cookies for token storage.
-   **Email Integration**: Implement actual email notifications (SendGrid/Resend) for claim confirmations and account verification.
-   **Rate Limiting**: Add `express-rate-limit` to prevent brute-force attacks on the auth and claim endpoints.
-   **Comprehensive Testing**: Add Unit (Jest), Integration, and E2E (Cypress/Playwright) tests.
-   **Image Hosting**: Move from static Clearbit URLs to a managed CDN like Cloudinary or AWS S3 for partner logos.

---

## 7. UI and Performance Considerations

-   **Optimistic UI**: Use Framer Motion for micro-interactions to make the platform feel snappy even during data fetching.
-   **Responsive Design**: The entire UI is built with Tailwind's mobile-first approach, ensuring a premium experience on devices of all sizes.
-   **Font Loading**: Using optimized Google Fonts (Inter/Outfit) to ensure high readability and fast initial paint.
-   **Skeleton States**: Implementing skeleton loaders (current state uses spinners) would provide a better perceived performance during initial load.

---

## 🛠 Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, Framer Motion, Lucide React.
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JWT.

## 🚀 Setup Instructions

1.  **Install**: Run `npm install` in both `frontend` and `backend` directories.
2.  **Env**: Set up `backend/.env` with `MONGODB_URI` and `JWT_SECRET`.
3.  **Seed**: Run `npm run seed` in the `backend` folder to populate initial deals.
4.  **Dev**: Run `npm run dev` in both folders.

## 🌐 Deployment (Vercel)

This project is a monorepo. To deploy the frontend on Vercel:

1.  **Project Root**: When importing the project, set the **Root Directory** to `frontend`.
2.  **Env Vars**: Add `NEXT_PUBLIC_API_URL` pointing to your deployed backend.
3.  **Build Settings**: Use the default Next.js build settings.
