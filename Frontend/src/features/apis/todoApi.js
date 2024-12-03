import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todoApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/v1/todo/",
  }),
  endpoints: (builder) => ({
    getAllTodos: builder.query({
      query: () => ({
        url: "get",
        method: "GET",
      }),
      providesTags: ["Todo"],
    }),
    addTodo: builder.mutation({
      query: (formData) => ({
        url: "create",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Todo"],
    }),
    getSingletask: builder.query({
      query: (id) => ({
        url: `get/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Todo", id }],
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todo"],
    }),
    updateTodo: builder.mutation({
      query: ({id,data}) => ({
        url: `update/${id}`,
        method: "PUT",
        body:data,
      }),
      invalidatesTags: (result, error, id) => [{ type: "Todo", id }],
    }),
  }),
});

export const {
  useGetAllTodosQuery,
  useAddTodoMutation,
  useGetSingletaskQuery,
  useDeleteTodoMutation,
  useUpdateTodoMutation
} = todoApi;
