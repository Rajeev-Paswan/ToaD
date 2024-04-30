import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const taskApi = createApi({
 reducerPath: 'taskApi',
 baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
 endpoints: (builder) => ({
    getTasks: builder.query({
      query: (userId) => ({
        url: `/api/task/`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-User-ID': userId,
        },
      }),
      providesTags: ['Tasks'],
    }),
    createTask: builder.mutation({
      query: (newTask) => ({
        url: '/api/task/create',
        method: 'POST',
        body: newTask,
      }),
      invalidatesTags: ['Tasks'],
    }),
    deleteTask: builder.mutation({
      query: (taskId) => ({
        url: `/api/task/delete/${taskId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tasks'],
    }),
    updateTask: builder.mutation({
      query: ({ taskId, taskData }) => ({
        url: `/api/task/update/${taskId}`,
        method: 'PUT',
        body: taskData,
      }),
      invalidatesTags: ['Tasks'],
    }),
 }),
 tagTypes: ['Tasks'],
});

export const { useGetTasksQuery, useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } = taskApi;
