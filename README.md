# LearnLingo

LearnLingo is a web application for finding and booking online language lessons with professional teachers. Users can browse teachers, filter them by language, student level, and lesson price, add teachers to favorites, and book trial lessons.

The project was developed using **Next.js** with **TypeScript**, **Firebase**, **React Hook Form**, and **Yup**.

## Features

- User registration and login
- Firebase Authentication
- Persistent authentication state
- Teachers catalog
- Filtering by:
  - Teaching language
  - Student level
  - Price per hour
- Pagination with a **Load more** button
- Detailed teacher information
- Student reviews
- Add/remove teachers from favorites
- Persistent favorites after page reload
- Private Favorites page for authenticated users
- Trial lesson booking form
- Form validation with React Hook Form and Yup
- Modal windows with:
  - Close button
  - Backdrop click
  - `Escape` key support
- Protected routes
- Responsive desktop-oriented layout

## Technologies

- **Next.js**
- **React**
- **TypeScript**
- **Firebase Authentication**
- **Firebase Realtime Database**
- **React Hook Form**
- **Yup**
- **React Router** / Next.js routing
- **CSS Modules**
- **ESLint**

## Pages

### Home

The Home page contains information about the advantages of the service and a call-to-action that redirects users to the Teachers page.

### Teachers

The Teachers page displays available language teachers.

Initially, four teacher cards are displayed. Additional teachers can be loaded using the **Load more** button.

Users can filter teachers by:

- Language
- Student knowledge level
- Price per hour

Each teacher card provides basic information about the teacher and allows the user to:

- Add/remove the teacher from favorites
- Expand the card with **Read more**
- View reviews and additional information
- Book a trial lesson

### Favorites

The Favorites page is available only to authenticated users.

It displays all teachers added to the user's favorites.

The Favorites page uses the same teacher card design as the Teachers page.

## Authentication

Firebase Authentication is used to provide:

- Registration
- Login
- Current user detection
- Logout
- Persistent authentication state

Unauthorized users cannot access the Favorites page.

If an unauthorized user tries to add a teacher to favorites, they are informed that this functionality is available only to authenticated users.

## Firebase Realtime Database

Teacher information is stored in Firebase Realtime Database.

Each teacher contains the following fields:

```text
name
surname
languages
levels
rating
reviews
price_per_hour
lessons_done
avatar_url
lesson_info
conditions
experience
