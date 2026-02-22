# ZaviSoft Kicks — Front-End Developer Hiring Task

A fully functional, pixel-perfect e-commerce storefront built as a **hiring task for ZaviSoft**. The project
replicates a provided Figma design and demonstrates proficiency in modern React/Next.js development, global
state management, API integration, and responsive UI implementation.

🔗 **Figma Design:**
[Frontend Task (Copy)](https://www.figma.com/design/dZOtspuOvPzaaU5rczAOq0/Frontend-task--Copy-?node-id=1-3197&m=dev)

🌐 **Live Demo:** [https://zavi-soft-front-end-developer-hirin.vercel.app/](https://zavi-soft-front-end-developer-hirin.vercel.app/)

---

## Table of Contents

1. [Tech Stack](#-tech-stack)
2. [Features](#-features)
3. [Pages & Routes](#-pages--routes)
4. [Project Structure](#-project-structure)
5. [State Management](#-state-management)
6. [API Integration](#-api-integration)
7. [Component Overview](#-component-overview)
8. [Getting Started](#-getting-started)
9. [Available Scripts](#-available-scripts)
10. [Design Decisions](#-design-decisions)

---

## 🚀 Tech Stack

| Layer            | Technology                                           |
| ---------------- | ---------------------------------------------------- |
| Framework        | Next.js 16 (App Router)                              |
| UI Library       | React 19                                             |
| State Management | Redux Toolkit + RTK Query                            |
| Styling          | Tailwind CSS v4                                      |
| Language         | JavaScript (ES6+)                                    |
| Fonts            | Rubik, Open Sans, Inter (via next/font)              |
| Data Source      | [Platzi Fake Store API](https://fakeapi.platzi.com/) |
| Deployment       | Vercel                                               |

---

## 🎨 Features

### Core Features

- ✅ **Responsive Design** — Mobile-first layout that adapts from small phones to wide desktops
- ✅ **Home Page** — Hero banner with image slider, New Drops products section, categories showcase, and
  customer reviews
- ✅ **Product Listing** — Paginated product grid (12 per page) with category sidebar filter
- ✅ **Product Detail** — Full product page with image gallery, size selector, color picker, and add-to-cart
- ✅ **Category Browsing** — Dedicated page listing all categories with clickable cards
- ✅ **Category Products** — Filtered product listing per category with pagination
- ✅ **Shopping Cart Page** — Full bag page with item management, order summary, and "You May Also Like"
  suggestions
- ✅ **Cart Sidebar** — Slide-in cart overlay accessible from the header on every page
- ✅ **Cart Toast Notification** — Real-time feedback when an item is added to the cart

### Technical Highlights

- ✅ **RTK Query Caching** — Automatic deduplication and caching of all API calls
- ✅ **Skeleton Loaders** — `ProductCardSkeleton` displayed during data fetching to prevent layout shift
- ✅ **Error Handling** — Graceful error states with retry buttons across all data-dependent views
- ✅ **404 Page** — Custom not-found page (`not-found.js`)
- ✅ **LocalStorage Persistence** — Cart state is saved to `localStorage` and rehydrated on app load, so the
  cart survives page refreshes
- ✅ **Image Validation** — Utility functions strip bad/placeholder URLs from the API and fall back to a
  consistent placeholder image
- ✅ **CSS Animations** — `fadeInUp` stagger animations on home page sections

---

## 📄 Pages & Routes

| Route              | Page Component            | Description                                   |
| ------------------ | ------------------------- | --------------------------------------------- |
| `/`                | `page.js`                 | Home — Banner, New Drops, Categories, Reviews |
| `/products`        | `ProductsClient.jsx`      | All products with category sidebar filter     |
| `/products/[id]`   | `ProductDetailClient.jsx` | Individual product detail page                |
| `/categories`      | `CategoriesClient.jsx`    | All categories grid                           |
| `/categories/[id]` | `CategoryClient.jsx`      | Products filtered by a single category        |
| `/cart`            | `CartClient.jsx`          | Shopping bag + order summary                  |
| `*`                | `not-found.js`            | Custom 404 page                               |

> **Architecture note:** Each route uses a split pattern — a `page.js` (Server Component) for metadata/layout
> and a `*Client.jsx` (Client Component) for interactive, data-driven rendering. This follows Next.js App
> Router best practices.

---

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── layout.js                 # Root layout — fonts, Redux provider, LayoutShell
│   ├── page.js                   # Home page (server component)
│   ├── globals.css               # Global styles & Tailwind base
│   ├── not-found.js              # Custom 404 page
│   ├── cart/
│   │   ├── page.js               # Cart page (server component)
│   │   └── CartClient.jsx        # Cart UI (client component)
│   ├── categories/
│   │   ├── page.js
│   │   ├── CategoriesClient.jsx  # Categories grid
│   │   └── [id]/
│   │       ├── page.js
│   │       └── CategoryClient.jsx # Products by category
│   └── products/
│       ├── page.js
│       ├── ProductsClient.jsx    # All products + filter sidebar
│       └── [id]/
│           ├── page.js
│           └── ProductDetailClient.jsx
│
├── components/                   # Reusable UI components
│   ├── index.js                  # Barrel export
│   ├── banner/                   # Hero banner with image slider
│   ├── cart/                     # Cart, CartItem, CartEmptyState, CartToast
│   ├── categories/               # CategoryCard
│   ├── categories-section/       # Home page categories showcase
│   ├── layout/                   # Header (sticky, mobile menu), Footer, LayoutShell
│   ├── newdrops/                 # New arrivals product section
│   ├── products/                 # ProductCardBranded, ProductCardSkeleton,
│   │                             #   ProductGrid, ProductImageGrid, ProductInfo,
│   │                             #   YouMayAlsoLike
│   ├── reviews/                  # ReviewCard, Reviews section
│   └── ui/                       # Atomic components: Button, Spinner, Breadcrumb,
│                                 #   ImageSlider, NavArrows, PageHeader,
│                                 #   Pagination, SectionHeader
│
├── store/                        # Redux store
│   ├── store.js                  # configureStore
│   ├── index.js                  # Barrel export (actions, selectors, hooks)
│   ├── api/
│   │   └── apiSlice.js           # RTK Query — all API endpoints
│   └── slices/
│       └── cartSlice.js          # Cart state + localStorage persistence
│
├── providers/
│   └── ReduxProvider.jsx         # Wraps the app in <Provider store={store}>
│
└── lib/
    ├── constants.js              # API base URL, placeholder image URLs
    ├── utils.js                  # Image validation, formatPrice helpers
    └── index.js                  # Barrel export
```

---

## 🏗️ State Management

Redux Toolkit is used for global state. The store has two slices:

### `api` — RTK Query cache

Automatically managed by RTK Query. Stores all fetched products and categories with tag-based cache
invalidation.

### `cart` — Shopping cart

```javascript
{
  items: [
    {
      id: number,
      title: string,
      price: number,
      image: string,
      description: string,
      quantity: number
    }
  ],
  isCartOpen: boolean,   // Controls the cart sidebar visibility
  lastAddedItem: object  // Used by CartToast to display "added" notification
}
```

**Cart actions available:**

| Action               | Description                                        |
| -------------------- | -------------------------------------------------- |
| `initializeCart`     | Loads persisted cart from `localStorage` on mount  |
| `addToCart`          | Adds item or increments quantity if already in cart |
| `removeFromCart`     | Removes item by ID                                 |
| `incrementQuantity`  | Increases item qty by 1                            |
| `decrementQuantity`  | Decreases item qty by 1, removes item at 0         |
| `clearCart`          | Empties the entire cart                            |
| `toggleCart`         | Opens/closes the cart sidebar                      |

**Selectors exported from the store:**

- `selectCartItems` — all items array
- `selectCartItemCount` — total item count (sum of all quantities)
- `selectCartTotal` — total price in USD

---

## 🔌 API Integration

All data comes from the **[Platzi Fake Store API](https://api.escuelajs.co/api/v1)** via RTK Query.

| RTK Query Hook                  | Endpoint                       | Used In                                    |
| ------------------------------- | ------------------------------ | ------------------------------------------ |
| `useGetProductsQuery`           | `GET /products?offset=&limit=` | Products page, New Drops, Cart suggestions |
| `useGetProductByIdQuery`        | `GET /products/:id`            | Product detail page                        |
| `useGetCategoriesQuery`         | `GET /categories`              | Categories page, Products sidebar          |
| `useGetProductsByCategoryQuery` | `GET /categories/:id/products` | Category detail page, Products filter      |

All hooks support `isLoading`, `isFetching`, and `error` states which are handled in every consuming
component.

---

## 🧩 Component Overview

### Layout

- **`Header`** — Sticky top nav with logo, Men/Women/New Drops links, search icon, wishlist icon, and cart
  icon with live item count badge. Includes a responsive hamburger menu for mobile.
- **`Footer`** — Site footer with links and branding.
- **`LayoutShell`** — Wraps `Header`, page content, `Footer`, and the floating `Cart` sidebar. Also renders
  `CartToast`.

### Products

- **`ProductCardBranded`** — Card with image, title, price, category tag, and "Add to Cart" button.
- **`ProductCardSkeleton`** — Animated skeleton placeholder matching `ProductCardBranded` dimensions.
- **`ProductGrid`** — Renders a responsive grid of cards or skeletons.
- **`ProductImageGrid`** — Detail page image gallery (1 large + 3 smaller thumbnails).
- **`ProductInfo`** — Detail page right panel: title, price, color picker, size grid, add-to-cart.
- **`YouMayAlsoLike`** — Horizontally scrollable suggested products strip.

### Cart

- **`Cart`** — Slide-in sidebar overlay with cart items, subtotal, and checkout CTA.
- **`CartItem`** — Individual cart row with image, title, price, and quantity controls (+ / −).
- **`CartEmptyState`** — Friendly empty-bag message with a CTA back to products.
- **`CartToast`** — Bottom-right toast notification shown for 3 seconds after adding an item.

### UI Primitives

- **`Button`** — Supports `variant` (`dark` | `light` | `outline`) and `size` (`sm` | `md` | `lg`) props.
- **`Spinner`** — Loading indicator with configurable `size`.
- **`Pagination`** — Previous / Next page controls with current page display.
- **`Breadcrumb`** — Dynamic breadcrumb trail from an array of `{ label, href }` items.
- **`PageHeader`** — Reusable page hero with title, description, and breadcrumbs.
- **`ImageSlider`** — Banner image carousel with auto-play and dot indicators.
- **`NavArrows`** — Left/right arrow button pair used by sliders and carousels.
- **`SectionHeader`** — Section title + "View All" link pattern used across home sections.

---

## 🛠️ Getting Started

### Prerequisites

- **Node.js** 18 or higher
- **npm** (comes with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/MirFaisal/ZaviSoft--Front-End-Developer-Hiring-Task.git
cd ZaviSoft--Front-End-Developer-Hiring-Task

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> No `.env` file is required — the app uses a public API with no authentication.

---

## 📜 Available Scripts

| Command             | Description                                    |
| ------------------- | ---------------------------------------------- |
| `npm run dev`       | Start dev server with Webpack                  |
| `npm run dev:turbo` | Start dev server with Turbopack (experimental) |
| `npm run build`     | Create optimised production build              |
| `npm run start`     | Serve the production build locally             |
| `npm run lint`      | Run ESLint against the source files            |

---

## 💡 Design Decisions

### Server / Client Component Split

Every page uses a **Server Component** (`page.js`) as a thin wrapper responsible for `<title>` and metadata,
while the actual interactive UI lives in a co-located **Client Component** (`*Client.jsx`). This avoids making
entire routes client-side while keeping interactive elements fully functional.

### RTK Query for Data Fetching

RTK Query was chosen over plain `fetch`/`useEffect` for several reasons:

- Automatic request deduplication — multiple components can invoke the same query without duplicate network
  calls.
- Built-in loading / error states surfaced directly from the hook.
- Tag-based cache management makes it easy to add mutations/invalidation later.

### LocalStorage Cart Persistence

The cart slice includes `loadCartFromStorage` and `saveCartToStorage` helpers. `initializeCart` is dispatched
once inside `LayoutShell` on mount to rehydrate the cart. A `subscribe` listener on the Redux store persists
every cart change back to `localStorage`.

### Image Validation Utility

The Platzi Fake Store API returns some malformed image URLs (e.g., `["any"]` or JSON arrays serialised as
strings). The `getValidImageUrl` / `getFirstValidImage` / `getValidImages` utilities in `lib/utils.js`
sanitise these before passing them to `next/image`, preventing broken image renders.

### Tailwind CSS v4

The project uses Tailwind CSS v4 (via `@tailwindcss/postcss`) which has a zero-config setup — no
`tailwind.config.js` is needed. Custom design tokens (colours like `kicks-blue`, `kicks-dark`, `kicks-card`,
`kicks-bg`) and fonts are declared as CSS custom properties inside `globals.css`.

---

## 📄 License

This project was created solely for the **ZaviSoft Front-End Developer Hiring Task**.

---

Built with ❤️ by [Mir Faisal](https://github.com/MirFaisal) for ZaviSoft
