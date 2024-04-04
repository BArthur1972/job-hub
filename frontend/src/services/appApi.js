import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the base URL for the API
const appApi = createApi({
    reducerPath: 'appApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5001',
        prepareHeaders: (headers, { getState }) => {
            const user = getState().user;
            if (user && user.token) {
                headers.set('authorization', `Bearer ${user.token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        // Login user as a job seeker
        loginJobSeeker: builder.mutation({
            query: (payload) => ({
                url: '/jobseeker/login',
                method: 'POST',
                body: payload,
            }),
        }),

        // Login user as a recruiter
        loginRecruiter: builder.mutation({
            query: (payload) => ({
                url: '/recruiter/login',
                method: 'POST',
                body: payload,
            }),
        }),

        // Signup a new job seeker
        signupJobSeeker: builder.mutation({
            query: (user) => ({
                url: '/jobseeker/signup',
                method: 'POST',
                body: user,
            }),
        }),

        // Signup a new recruiter
        signupRecruiter: builder.mutation({
            query: (user) => ({
                url: '/recruiter/signup',
                method: 'POST',
                body: user,
            }),
        }),

        // Logout a job seeker
        logoutJobSeeker: builder.mutation({
            query: (payload) => ({
                url: '/jobseeker/logout',
                method: 'POST',
                body: payload,
            }),
        }),

        // Logout a recruiter
        logoutRecruiter: builder.mutation({
            query: (payload) => ({
                url: '/recruiter/logout',
                method: 'POST',
                body: payload,
            }),
        }),

        // Get all job seeker by id
        getJobSeekerById: builder.mutation({
            query: (id) => ({
                url: `/jobseeker/${id}`,
                method: 'GET',
            }),
        }),

        // Get all recruiter by id
        getRecruiterById: builder.mutation({
            query: (id) => ({
                url: `/recruiter/${id}`,
                method: 'GET',
            }),
        }),

        // Update job seeker
        updateJobSeeker: builder.mutation({
            query: (payload) => ({
                url: '/jobseeker/update',
                method: 'PUT',
                body: payload,
            }),
        }),

        // Add a job seeker education
        addJobSeekerEducation: builder.mutation({
            query: (payload) => ({
                url: '/education/insert',
                method: 'POST',
                body: payload,
            }),
        }),

        // Add a job seeker experience
        addJobSeekerExperience: builder.mutation({
            query: (payload) => ({
                url: '/experience/insert',
                method: 'POST',
                body: payload,
            }),
        }),

        // Add a job seeker skills
        addJobSeekerSkills: builder.mutation({
            query: (payload) => ({
                url: '/skills/insert',
                method: 'POST',
                body: payload,
            }),
        }),
    }),
});

export const { 
    useLoginJobSeekerMutation,
    useLoginRecruiterMutation,
    useSignupJobSeekerMutation,
    useSignupRecruiterMutation,
    useLogoutJobSeekerMutation,
    useLogoutRecruiterMutation,
    useGetJobSeekerByIdMutation,
    useGetRecruiterByIdMutation,
    useUpdateJobSeekerMutation,
    useAddJobSeekerEducationMutation,
    useAddJobSeekerExperienceMutation,
    useAddJobSeekerSkillsMutation } = appApi;

export default appApi;