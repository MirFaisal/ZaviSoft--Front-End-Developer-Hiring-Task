import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Base API configuration
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.escuelajs.co/api/v1",
  }),
  tagTypes: ["Products", "Categories", "Product"],
  endpoints: (builder) => ({
    // Get all products with pagination
    getProducts: builder.query({
      query: ({ offset = 0, limit = 10 } = {}) =>
        `/products?offset=${offset}&limit=${limit}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Products", id })),
              { type: "Products", id: "LIST" },
            ]
          : [{ type: "Products", id: "LIST" }],
    }),

    // Get single product by ID
    getProductById: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),

    // Get single product by slug
    getProductBySlug: builder.query({
      query: (slug) => `/products/slug/${slug}`,
      providesTags: (result) =>
        result ? [{ type: "Product", id: result.id }] : [],
    }),

    // Get related products
    getRelatedProducts: builder.query({
      query: (id) => `/products/${id}/related`,
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: "Products", id }))
          : [],
    }),

    // Get all categories
    getCategories: builder.query({
      query: () => "/categories",
      providesTags: ["Categories"],
    }),

    // Get products by category
    getProductsByCategory: builder.query({
      query: ({ categoryId, offset = 0, limit = 10 }) =>
        `/categories/${categoryId}/products?offset=${offset}&limit=${limit}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Products", id })),
              { type: "Products", id: "CATEGORY_LIST" },
            ]
          : [{ type: "Products", id: "CATEGORY_LIST" }],
    }),

    // Search/filter products by title
    searchProducts: builder.query({
      query: ({ title, offset = 0, limit = 10 }) =>
        `/products?title=${encodeURIComponent(title)}&offset=${offset}&limit=${limit}`,
      providesTags: [{ type: "Products", id: "SEARCH" }],
    }),

    // Filter products by price range
    filterProductsByPrice: builder.query({
      query: ({ price_min, price_max, offset = 0, limit = 10 }) =>
        `/products?price_min=${price_min}&price_max=${price_max}&offset=${offset}&limit=${limit}`,
      providesTags: [{ type: "Products", id: "FILTER" }],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetProductBySlugQuery,
  useGetRelatedProductsQuery,
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
  useSearchProductsQuery,
  useFilterProductsByPriceQuery,
} = apiSlice;
