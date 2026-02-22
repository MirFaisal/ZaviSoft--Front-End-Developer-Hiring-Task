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
      query: ({ offset = 0, limit = 10 } = {}) => `/products?offset=${offset}&limit=${limit}`,
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: "Products", id })), { type: "Products", id: "LIST" }]
          : [{ type: "Products", id: "LIST" }],
    }),

    // Get single product by ID
    getProductById: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: "Product", id }],
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
          ? [...result.map(({ id }) => ({ type: "Products", id })), { type: "Products", id: "CATEGORY_LIST" }]
          : [{ type: "Products", id: "CATEGORY_LIST" }],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
} = apiSlice;
