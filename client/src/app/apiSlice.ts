import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ITask } from './types'

export let apiSlice = createApi({
    reducerPath: 'api',
    tagTypes: ['Data'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000',
    }),
    endpoints: builder => ({
        register: builder.mutation({
            query: (credentials) => ({
                url: '/user/register',
                method: 'POST',
                body: credentials,
            }),
        }),
        login: builder.mutation({
            query: (credentials) => ({
                url: '/user/login',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ['Data']
        }),
        getTasks: builder.query<ITask[], void>({
            query: () => ({
                url: '/tasks',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }),
            providesTags: ['Data']
        }),
        createTask: builder.mutation({
            query: (task) => ({
                url: '/tasks',
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: task,
            }),
            invalidatesTags: ['Data'],
        }),
        updateTask: builder.mutation({
            query: ({ id, ...task }) => ({
                url: `/tasks/${id}`,
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: task,
            }),
            invalidatesTags: ['Data'],
        }),
        deleteTask: builder.mutation({
            query: (id) => ({
                url: `/tasks/${id}`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }),
            invalidatesTags: ['Data'],
        }),

    })
})

export let { useCreateTaskMutation, useGetTasksQuery, useLoginMutation, useRegisterMutation, useDeleteTaskMutation, useUpdateTaskMutation } = apiSlice