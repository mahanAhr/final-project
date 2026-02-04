This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

Project Overview

This project is an Online Shop built using Next.js (App Router) and Material UI. The goal of this project is to simulate the functionality of a real online store, including product listing, cart management, and responsive design for both mobile and desktop devices.

Product data is fetched from a public API, and cart state is managed globally across the application.

Features
Product Display

Fetches and displays a list of products from an API.

Shows product image, title, price, and category.

Responsive card layout for desktop, tablet, and mobile.

Search and Filter

Search products by name.

Filter products by category.

Supports combined search and filter without page reload.

Shopping Cart

Add products to the cart.

Increase or decrease product quantity with + and − buttons.

Remove products from the cart entirely.

Automatically calculates total price.

Responsive cart view:

Table view for desktop.

Card layout for mobile devices.

State Management

Uses Zustand for global cart state.

Shares cart data between pages.

Handles SSR hydration issues in Next.js.

User Interface (UI)

Built with Material UI components.

Responsive header with:

Drawer menu on mobile.

Navigation buttons on desktop.

Icon buttons for improved user experience.

Clean and modern design.

Pages Structure

/products : Main products page.

/cart : Shopping cart page.

/profile : Profile page (extensible).

/ : Redirects automatically to /products.

Technologies Used

Next.js 16 (App Router)

React

Material UI (MUI)

React Query for data fetching

Zustand for state management

Vercel for deployment

Deployment

Connected to GitHub repository.

Automatically deploys the main branch to Vercel.

Supports SSR and CSR.

Project Purpose

The project is designed to practice and demonstrate:

App Router architecture in Next.js.

State management in real-world React applications.

Resolving hydration issues in SSR.

Responsive UI design.

Simulation of a real online shopping experience.