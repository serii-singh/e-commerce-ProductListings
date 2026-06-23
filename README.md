
## Product Listing & Detail Application

A React + TypeScript e-commerce application built using the DummyJSON Products API.

## Features

### Product Listing Page

* Display products in a responsive grid layout
* Product cards showing:

  * Product Image
  * Product Title
  * Price
  * Rating
* Pagination support
* Loading state handling
* Error state handling

### Filters

* Category Filter

  * Categories fetched dynamically from API
* Brand Filter

  * Brands extracted dynamically from products
* Price Range Filter

  * Minimum Price
  * Maximum Price
* Combined filtering support
* Pagination resets when filters change
* Filter state persists while navigating between pages

### Product Detail Page

* Product Image
* Product Name
* Price
* Rating
* Description
* Brand
* Category
* Back navigation to Product Listing Page

---

## Tech Stack

* React
* TypeScript
* React Router DOM
* Axios
* React Hooks
* CSS (Inline Styling)

---

## Project Structure

```txt
src
├── components
│   ├── ProductCard
│   └── Filter
│
├── pages
│   ├── ProductListing
│   └── ProductDetail
│
├── services
│   ├── api
│   └── products
│
├── types
│   └── productsType
│
├── routes
│   └── AppRoutes
│
└── App.tsx
```

---

## API Endpoints Used

### Fetch Products

```http
GET https://dummyjson.com/products
```

### Fetch Categories

```http
GET https://dummyjson.com/products/categories
```

### Fetch Product Details

```http
GET https://dummyjson.com/products/{id}
```

---

## Setup Instructions

### Clone Repository

```bash
git clone <repository-url>
```

### Navigate to Project

```bash
cd <project-folder>
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

### Build Project

```bash
npm run build
```

---

## Architectural Decisions

### Service Layer

API calls are abstracted into a dedicated service layer to keep components focused on UI rendering and state management.

### Reusable Components

* ProductCard component
* Filters component

This improves maintainability and reusability.

### Derived State Using useMemo

Filtered products are calculated using useMemo to avoid unnecessary recalculations and improve rendering performance.

### Client-Side Filtering

Brand and Price filtering are implemented client-side after products are fetched.

### Pagination

Pagination is handled on the client side using filtered product results.

---

## Assumptions

* Brand values are derived from fetched products.
* Price filtering is applied client-side.
* Pagination is applied after filters are evaluated.
* Products API provides sufficient data to derive filter options.

---

## Error Handling

* API failures are handled gracefully.
* Loading states are displayed while data is being fetched.
* User-friendly error messages are shown when requests fail.

---

## Future Improvements

If given more time, the following enhancements could be implemented:

* URL-based filter persistence using search parameters
* Skeleton loaders
* Debounced price filtering
* Sorting (Price, Rating, Name)
* Unit and integration tests
* Responsive mobile-first design improvements with more appropriate ui designs 
* React Query / TanStack Query for caching and server-state management
* Accessibility improvements
* Infinite scrolling support

---

## Author

Serene Singh
