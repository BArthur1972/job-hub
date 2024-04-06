import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the base URL for the API
const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5001",
    prepareHeaders: (headers, { getState }) => {
      const user = getState().user;
      if (user && user.token) {
        headers.set("authorization", `Bearer ${user.token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Login user as a job seeker
    loginJobSeeker: builder.mutation({
      query: (payload) => ({
        url: "/jobseeker/login",
        method: "POST",
        body: payload,
      }),
    }),

    // Login user as a recruiter
    loginRecruiter: builder.mutation({
      query: (payload) => ({
        url: "/recruiter/login",
        method: "POST",
        body: payload,
      }),
    }),

    // Signup a new job seeker
    signupJobSeeker: builder.mutation({
      query: (user) => ({
        url: "/jobseeker/signup",
        method: "POST",
        body: user,
      }),
    }),

    // Signup a new recruiter
    signupRecruiter: builder.mutation({
      query: (user) => ({
        url: "/recruiter/signup",
        method: "POST",
        body: user,
      }),
    }),

    // Logout a job seeker
    logoutJobSeeker: builder.mutation({
      query: (payload) => ({
        url: "/jobseeker/logout",
        method: "POST",
        body: payload,
      }),
    }),

    // Logout a recruiter
    logoutRecruiter: builder.mutation({
      query: (payload) => ({
        url: "/recruiter/logout",
        method: "POST",
        body: payload,
      }),
    }),

    // Get all job seeker by id
    getJobSeekerById: builder.mutation({
      query: (id) => ({
        url: `/jobseeker/${id}`,
        method: "GET",
      }),
    }),

    // Get all recruiter by id
    getRecruiterById: builder.mutation({
      query: (id) => ({
        url: `/recruiter/${id}`,
        method: "GET",
      }),
    }),

    // Update job seeker
    updateJobSeeker: builder.mutation({
      query: (payload) => ({
        url: "/jobseeker/update",
        method: "PUT",
        body: payload,
      }),
    }),

    // Add a job seeker education
    addJobSeekerEducation: builder.mutation({
      query: (payload) => ({
        url: "/education/insert",
        method: "POST",
        body: payload,
      }),
    }),

    // Add a job seeker experience
    addJobSeekerExperience: builder.mutation({
      query: (payload) => ({
        url: "/experience/insert",
        method: "POST",
        body: payload,
      }),
    }),

    // Add a job seeker skills
    addJobSeekerSkills: builder.mutation({
      query: (payload) => ({
        url: "/skills/insert",
        method: "POST",
        body: payload,
      }),
    }),

    // get all Job listings
    getAllJobListings: builder.mutation({
      query: () => ({
        url: "/joblisting/",
        method: "GET",
      }),
    }),

    // getJobListingById
    getJobListingById: builder.mutation({
      query: (id) => ({
        url: `/joblisting/${id}`,
        method: "GET",
      }),
    }),

    // get Company by id
    getCompanyById: builder.mutation({
      query: (id) => ({
        url: `/company/company-id/${id}`,
        method: "GET",
      }),
    }),

    // create a new job listing
    createJobListing: builder.mutation({
      query: (payload) => ({
        url: "/joblisting/create",
        method: "POST",
        body: payload,
      }),
    }),

    // get all applications
    getAllApplications: builder.mutation({
      query: () => ({
        url: "/application/",
        method: "GET",
      }),
    }),

    // get applications by job seeker id
    getApplicationsByJobSeekerId: builder.mutation({
      query: (id) => ({
        url: `/application/seeker/${id}`,
        method: "GET",
      }),
    }),

    // get applications by job listing id
    getApplicationsByJobListingId: builder.mutation({
      query: (id) => ({
        url: `/application/listing/${id}`,
        method: "GET",
      }),
    }),

    // get applications by status
    getApplicationsByStatus: builder.mutation({
      query: (status) => ({
        url: `/application/${status}`,
        method: "GET",
      }),
    }),

    // create a new application
    createApplication: builder.mutation({
      query: (payload) => ({
        url: "/application/create",
        method: "POST",
        body: payload,
      }),
    }),

    // update an application
    updateApplication: builder.mutation({
      query: (payload) => ({
        url: "/application/update",
        method: "PUT",
        body: payload,
      }),
    }),

    // delete an application
    deleteApplication: builder.mutation({
      query: (payload) => ({
        url: "/application/delete",
        method: "DELETE",
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
  useAddJobSeekerSkillsMutation,
  useGetAllJobListingsMutation,
  useGetJobListingByIdMutation,
  useCreateJobListingMutation,
  useGetCompanyByIdMutation,
  useGetAllApplicationsMutation,
  useGetApplicationsByJobSeekerIdMutation,
  useGetApplicationsByJobListingIdMutation,
  useGetApplicationsByStatusMutation,
  useCreateApplicationMutation,
  useUpdateApplicationMutation,
  useDeleteApplicationMutation,
} = appApi;

export default appApi;
