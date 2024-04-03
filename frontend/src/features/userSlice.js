import { createSlice } from "@reduxjs/toolkit";
import appApi from "../services/appApi";

// Define the initial state for the user slice
export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        userRole: "",
        token: null,
    },

    // Define the reducers for the user slice
    reducers: {
        // TODO: Add reducers for updating user information
    },

    extraReducers: (builder) => {
        // save user after jobseeker signup
        builder.addMatcher(
            appApi.endpoints.signupJobSeeker.matchFulfilled,
            (state, action) => {
                state.user = action.payload.user;
                state.userRole = "jobseeker";
                state.token = action.payload.token;
            }
        );

        // save user after recruiter signup
        builder.addMatcher(
            appApi.endpoints.signupRecruiter.matchFulfilled,
            (state, action) => {
                state.user = action.payload.user;
                state.userRole = "recruiter";
                state.token = action.payload.token;
            }
        );

        // save user after jobseeker login
        builder.addMatcher(
            appApi.endpoints.loginJobSeeker.matchFulfilled,
            (state, action) => {
                state.user = action.payload.user;
                state.userRole = "jobseeker";
                state.token = action.payload.token;
            }
        );

        // save user after recruiter login
        builder.addMatcher(
            appApi.endpoints.loginRecruiter.matchFulfilled,
            (state, action) => {
                state.user = action.payload.user;
                state.userRole = "recruiter";
                state.token = action.payload.token;
            }
        );

        // remove user after jobseeker logout
        builder.addMatcher(
            appApi.endpoints.logoutJobSeeker.matchFulfilled,
            (state) => {
                state.user = null;
                state.userRole = null;
                state.token = null;
            }
        );

        // remove user after recruiter logout
        builder.addMatcher(
            appApi.endpoints.logoutRecruiter.matchFulfilled,
            (state) => {
                state.user = null;
                state.userRole = null;
                state.token = null;
            }
        );

        // save user after updating job seeker
        builder.addMatcher(
            appApi.endpoints.updateJobSeeker.matchFulfilled,
            (state, action) => {
                state.user = action.payload.user;
            }
        );
    }
});

// TODO: Export the actions for the user if any

// Export the reducer for the user slice
export default userSlice.reducer;
