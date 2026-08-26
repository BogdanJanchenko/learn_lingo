# LearnLingo — Find Your Perfect Language Teacher

A web application for a company that connects students with online language teachers. Users can browse a catalog of teachers, filter them by language, proficiency level and price, book a trial lesson, and save favorite teachers to a personal, authenticated-only page.

## About the Project

The app consists of three main pages:

- **Home** — presents the company's advantages and a call-to-action link that redirects to the Teachers page. The styling is based on the provided design layout with a custom color palette variation.
- **Teachers** — displays a list of teachers that can be filtered by:
  - language taught
  - student proficiency level
  - price per hour
  
  Four teacher cards are rendered initially; more are fetched from the database via a **Load more** button. Each card can be expanded with **Read more** to show detailed information and student reviews, and includes a **Book trial lesson** button that opens a validated booking form in a modal.
- **Favorites** — a private page, available only to authenticated users, listing all teachers the user has added to favorites. Its styling matches the Teachers page.

### Key functionality

- User authentication (sign up, log in, log out, get current user data) via Firebase.
- Registration/login forms and the trial-lesson booking form are built with **react-hook-form** and **yup**, with all fields required and validated.
- Modals close via the close ("×") button, a click on the backdrop, or the **Esc** key.
- Teacher data is stored in Firebase Realtime Database with the following fields: `name`, `surname`, `languages`, `levels`, `rating`, `reviews`, `price_per_hour`, `lessons_done`, `avatar_url`, `lesson_info`, `conditions`, `experience`.
- Clicking the heart icon:
  - as an **unauthenticated** user — shows a modal/notification stating the feature is available only for authenticated users.
  - as an **authenticated** user — adds/removes the teacher from favorites, and the heart's color toggles accordingly. The favorite state persists across page refresh.
- Filtering and page navigation are implemented with React Router equivalents adapted to the Next.js App/Pages Router.

## Tech Stack

- **Next.js** — React framework used for routing, page structure and rendering
- **React** — UI components
- **Firebase (Realtime Database & Authentication)** — backend for teacher data storage and user authentication
- **react-hook-form** — form state management
- **yup** — form validation schemas
- **CSS / CSS Modules (or your styling solution)** — layout and styling based on the provided design

## Design

The layout follows the Figma design provided in the assignment, implemented for desktop resolution with semantic, valid markup.

🔗 Design file: *[add your Figma link here]*

## Project Requirements (Technical Assignment)

This project was built according to the following technical assignment:

1. Implement user authentication with Firebase (sign up, log in, get current user, log out).
2. Build the registration/login form with `react-hook-form` and `yup`; all fields required; modal closes via the close button, backdrop click, or Esc key.
3. Create a `teachers` collection in Firebase Realtime Database with fields: `name`, `surname`, `languages`, `levels`, `rating`, `reviews`, `price_per_hour`, `lessons_done`, `avatar_url`, `lesson_info`, `conditions`, `experience`.
4. Implement the teacher card UI according to the design.
5. Render 4 teacher cards on the Teachers page initially, with additional cards loaded from the database via a **Load more** button.
6. Handle the favorite ("heart") button: prompt unauthenticated users to log in; toggle favorite state and heart color for authenticated users.
7. Persist favorite state across page reloads for authenticated users.
8. Allow removing a teacher from favorites by clicking the heart again.
9. Expand teacher details and reviews via **Read more**.
10. Open a validated trial-lesson booking form (via `react-hook-form` + `yup`) via **Book trial lesson**.
11. Ensure all modals close via close button, backdrop click, or Esc key.
12. Provide a private **Favorites** page for authenticated users, styled consistently with the Teachers page.

### Bonus tasks

- Routing implemented with Next.js file-based routing (as a replacement for React Router).
- Filtering by language, student level, and price per hour.

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- A Firebase project with Realtime Database and Authentication enabled

### Installation

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
npm install
```

### Environment variables

Create a `.env.local` file in the project root with your Firebase configuration:

```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_DATABASE_URL=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

### Run locally

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

### Build

```bash
npm run build
npm start
```

## Deployment

The project is deployed on **[Vercel / Netlify / GitHub Pages — specify which one you used]**.

🔗 Live demo: https://learn-lingo-olive-three.vercel.app/
🔗 Figma: https://www.figma.com/file/dewf5jVviSTuWMMyU3d8Mc/%D0%9F%D0%B5%D1%82-%D0%BF%D1%80%D0%BE%D1%94%D0%BA%D1%82-%D0%B4%D0%BB%D1%8F-%D0%9A%D0%A6?type=design&node-id=0-1&mode=design&t=jCmjSs9PeOjObYSc-0

## Acceptance Criteria

- ✅ Markup implemented for desktop according to the design, semantic and valid.
- ✅ No errors in the browser console.
- ✅ Built with Next.js (React-based).
- ✅ Authentication and data operations implemented via Firebase.
- ✅ Interactivity matches the technical assignment.
- ✅ Code is formatted and free of comments.
- ✅ Project is deployed to a public hosting provider.
