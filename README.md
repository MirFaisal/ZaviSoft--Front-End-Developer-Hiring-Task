# ZaviSoft E-Commerce

A modern e-commerce landing page built with **Next.js 16**, **Redux Toolkit**, **RTK Query**, and **Tailwind
CSS**.

## 🚀 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **State Management:** Redux Toolkit + RTK Query
- **Styling:** Tailwind CSS
- **Language:** JavaScript (ES6+)
- **API:** [Platzi Fake Store API](https://fakeapi.platzi.com/)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.js          # Root layout with providers
│   ├── page.js            # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── layout/            # Header, Footer
│   ├── products/          # ProductCard, ProductGrid
│   ├── cart/              # Cart sidebar
│   ├── categories/        # CategoryCard
│   └── ui/                # Button, Spinner, etc.
├── store/                 # Redux store
│   ├── store.js           # Store configuration
│   ├── api/               # RTK Query API slices
│   │   └── apiSlice.js    # Products & Categories API
│   └── slices/            # Redux slices
│       └── cartSlice.js   # Cart state management
├── providers/             # Context providers
│   └── ReduxProvider.jsx  # Redux Provider wrapper
├── hooks/                 # Custom React hooks
└── lib/                   # Utilities
    └── utils.js           # Image validation helpers
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Navigate to project directory:**

   ```bash
   cd zavisoft-ecommerce
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run development server:**

   ```bash
   npm run dev
   ```

4. **Open browser:** Navigate to [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build for production     |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |

## 🔌 API Endpoints Used

The app uses the [Platzi Fake Store API](https://api.escuelajs.co/api/v1):

| Endpoint                       | Description                      |
| ------------------------------ | -------------------------------- |
| `GET /products`                | Get all products with pagination |
| `GET /products/:id`            | Get single product               |
| `GET /categories`              | Get all categories               |
| `GET /categories/:id/products` | Get products by category         |

## 🎨 Features

- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Product Listing** - Grid view with pagination
- ✅ **Category Browsing** - Filter by categories
- ✅ **Shopping Cart** - Add/remove items, quantity management
- ✅ **RTK Query Caching** - Efficient data fetching
- ✅ **Loading States** - Skeleton loaders
- ✅ **Error Handling** - Graceful error displays
- ✅ **LocalStorage Persistence** - Cart persists across sessions

## 🏗️ Redux Store Structure

```javascript
{
  api: {
    // RTK Query cache for products & categories
  },
  cart: {
    items: [],      // Cart items array
    isCartOpen: false  // Cart sidebar state
  }
}
```

## 📝 RTK Query Hooks

```javascript
// Products
useGetProductsQuery({ offset, limit });
useGetProductByIdQuery(id);

// Categories
useGetCategoriesQuery();
useGetProductsByCategoryQuery({ categoryId, offset, limit });
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is created for the ZaviSoft hiring task.

---

Built with ❤️ for ZaviSoft
