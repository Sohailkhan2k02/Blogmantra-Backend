import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../util/baseUrl";

// ****** Actions ******* // 

//user reset action for redirect
const resetUserAcion = createAction('user/reset/profile');
const resetUpdatePasswordAction = createAction('user/reset/update-password');
// --------------------------------------//
//        ---     Register Action    --- //
// --------------------------------------//
export const registerUserAction = createAsyncThunk('users/register',
    async (user, { rejectWithValue, getState, dispatch }) => {
        //config
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        //http call
        try {
            const { data } = await axios.post(`${baseUrl}/api/users/register`,
                user, config)
            return data;

        } catch (error) {
            //!error && !error.response
            if (!error.response) {
                //error from frontend if any
                throw error;
            }
            else {
                //error from backend
                return rejectWithValue(error?.response?.data);
            }
        }
    });

// --------------------------------------//
//        ---     Login Action    ---    //
// --------------------------------------//

export const userLoginAction = createAsyncThunk('users/login',
    async (userData, { rejectWithValue, getState, dispatch }) => {
        //config
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        //http call
        try {
            const { data } = await axios.post(`${baseUrl}/api/users/login`,
                userData, config);
            //save user into local storage
            localStorage.setItem('userInfo', JSON.stringify(data));
            return data;
        } catch (error) {
            //!error && !error.response
            if (!error?.response) {
                //error from frontend if any
                throw error;
            }
            else {
                //error from backend
                return rejectWithValue(error?.response?.data);
            }
        }
    });

//Profile
export const userProfileAction = createAsyncThunk('user/profile',
    async (id, { rejectWithValue, getState, dispatch }) => {
        //get the token of user
        const user = getState()?.users;
        const { userAuth } = user;
        //config
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`,
            }
        }
        //http call
        try {
            const { data } = await axios.get(`${baseUrl}/api/users/profile/${id}`,
                config,
            );
            return data;
        } catch (error) {
            if (!error?.response) {
                //frontend error
                throw error;
            }
            //backend error
            return rejectWithValue(error?.response?.data);
        }
    });

//profile photo upload action
export const profilePhotoUploadAction = createAsyncThunk('user/profile-upload', async (userImg,
    { rejectWithValue, getState, dispatch }) => {

    //get the token of user
    const user = getState()?.users;
    const { userAuth } = user;
    //config
    const config = {
        headers: {
            Authorization: `Bearer ${userAuth?.token}`,
        }
    }

    try {
        //form data
        const formData = new FormData();
        formData.append('image', userImg?.image);
        //http call
        const { data } = await axios.put(`${baseUrl}/api/users/profile-photo-upload`, formData, config);
        return data;
    } catch (error) {
        if (!error?.response) {
            //frontend error
            throw error;
        }
        //backend error
        return rejectWithValue(error?.response?.data);

    }
})

//profile update action
export const profileUpdateAction = createAsyncThunk('user/profile-update', async (userInfo,
    { rejectWithValue, getState, dispatch }) => {

    //get the token of user
    const user = getState()?.users;
    const { userAuth } = user;
    //config
    const config = {
        headers: {
            Authorization: `Bearer ${userAuth?.token}`,
        }
    }

    try {
        //http call
        const { data } = await axios.put(`${baseUrl}/api/users`, {
            firstName: userInfo?.firstName,
            lastName: userInfo?.lastName,
            bio: userInfo?.bio,
            email: userInfo?.email,
        }, config);
        //dispatch reset action
        dispatch(resetUserAcion());
        return data;
    } catch (error) {
        if (!error?.response) {
            //frontend error
            throw error;
        }
        //backend error
        return rejectWithValue(error?.response?.data);

    }
})
//get user profile details action
export const fetchUserDetails = createAsyncThunk('user/details', async (id,
    { rejectWithValue, getState, dispatch }) => {

    try {
        //http call
        const { data } = await axios.get(`${baseUrl}/api/users/${id}`);
        return data;
    } catch (error) {
        if (!error?.response) {
            //frontend error
            throw error;
        }
        //backend error
        return rejectWithValue(error?.response?.data);

    }
})

//Follow user action
export const followUserAction = createAsyncThunk('user/follow',
    async (followId, { rejectWithValue, getState, dispatch }) => {
        //get the token of user
        const user = getState()?.users;
        const { userAuth } = user;
        //config
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`,
            }
        }
        //http call
        try {
            const { data } = await axios.put(`${baseUrl}/api/users/follow`,
                { followId },
                config,
            );
            return data;
        } catch (error) {
            if (!error?.response) {
                //frontend error
                throw error;
            }
            //backend error
            return rejectWithValue(error?.response?.data);
        }
    });
//UnFollow user action
export const unFollowUserAction = createAsyncThunk('user/unfollow',
    async (unFollowId, { rejectWithValue, getState, dispatch }) => {
        //get the token of user
        const user = getState()?.users;
        const { userAuth } = user;
        //config
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`,
            }
        }
        //http call
        try {
            const { data } = await axios.put(`${baseUrl}/api/users/unfollow`,
                { unFollowId },
                config,
            );
            return data;
        } catch (error) {
            if (!error?.response) {
                //frontend error
                throw error;
            }
            //backend error
            return rejectWithValue(error?.response?.data);
        }
    });

//fetch all user action
export const fetchUsersAction = createAsyncThunk('user/fetch-users',
    async (users, { rejectWithValue, getState, dispatch }) => {
        //get the token of user
        const user = getState()?.users;
        const { userAuth } = user;
        //config
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`,
            }
        }
        //http call
        try {
            const { data } = await axios.get(`${baseUrl}/api/users`, config,);
            return data;
        } catch (error) {
            if (!error?.response) {
                //frontend error
                throw error;
            }
            //backend error
            return rejectWithValue(error?.response?.data);
        }
    });

//block user action
export const blockUserAction = createAsyncThunk('user/block',
    async (id, { rejectWithValue, getState, dispatch }) => {
        //get the token of user
        const user = getState()?.users;
        const { userAuth } = user;
        //config
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`,
            }
        }
        //http call
        try {
            const { data } = await axios.put(`${baseUrl}/api/users/block-user/${id}`,
                {}, config,);
            return data;
        } catch (error) {
            if (!error?.response) {
                //frontend error
                throw error;
            }
            //backend error
            return rejectWithValue(error?.response?.data);
        }
    });

//unblock user action
export const unblockUserAction = createAsyncThunk('user/unblock',
    async (id, { rejectWithValue, getState, dispatch }) => {
        //get the token of user
        const user = getState()?.users;
        const { userAuth } = user;
        //config
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`,
            }
        }
        //http call
        try {
            const { data } = await axios.put(`${baseUrl}/api/users/unblock-user/${id}`,
                {}, config,);
            return data;
        } catch (error) {
            if (!error?.response) {
                //frontend error
                throw error;
            }
            //backend error
            return rejectWithValue(error?.response?.data);
        }
    });

//Update user password action
export const updateUserPasswordAction = createAsyncThunk('user/update-password',
    async (password, { rejectWithValue, getState, dispatch }) => {
        //get the token of user
        const user = getState()?.users;
        const { userAuth } = user;
        //config
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`,
            }
        }
        //http call
        try {
            const { data } = await axios.put(`${baseUrl}/api/users/password`, {password}, config,);
            //dispatch reset action to redirect
            dispatch(resetUpdatePasswordAction());
            return data;
        } catch (error) {
            if (!error?.response) {
                //frontend error
                throw error;
            }
            //backend error
            return rejectWithValue(error?.response?.data);
        }
    });

//generate token for reset user password action
export const generateResetPasswordTokenAction = createAsyncThunk('user/password-token',
    async (UserEmail, { rejectWithValue, getState, dispatch }) => {
        //get the token of user
        const user = getState()?.users;
        const { userAuth } = user;
        //config
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
        //http call
        try {
            const { data } = await axios.post(`${baseUrl}/api/users/forgot-password-token`, {UserEmail}, config,);
            return data;
        } catch (error) {
            if (!error?.response) {
                //frontend error
                throw error;
            }
            //backend error
            return rejectWithValue(error?.response?.data);
        }
    });

//reset user password action
export const passwordResetAction = createAsyncThunk('user/password-reset',
    async (tokenPassword, { rejectWithValue, getState, dispatch }) => {
        //get the token of user
        const user = getState()?.users;
        const { userAuth } = user;
        //config
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
        //http call
        try {
            const { data } = await axios.put(`${baseUrl}/api/users/reset-password`, {
                token: tokenPassword?.token,
                password : tokenPassword?.password,
            }, config,);
            return data;
        } catch (error) {
            if (!error?.response) {
                //frontend error
                throw error;
            }
            //backend error
            return rejectWithValue(error?.response?.data);
        }
    });

// --------------------------------------//
//        ---     Logout Action    ---   //
// --------------------------------------//
export const userLogoutAction = createAsyncThunk('user/logout',
    async (payload, { rejectWithValue, getState, dispatch }) => {
        try {
            localStorage.removeItem('userInfo');
        } catch (error) {
            //!error && !error.response
            if (!error?.response) {
                //error from frontend if any
                throw error;
            }
            else {
                //error from backend
                return rejectWithValue(error?.response?.data);
            }
        }
    });

//get user from local storage and place it into store 
const userLoginFormStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;


// --------------------------------------//
//        ---     Users Slices       --- //
// --------------------------------------//
const usersSlices = createSlice({
    name: 'users',
    initialState: {
        userAuth: userLoginFormStorage,
    },
    //redux's object method
    extraReducers: (builder) => {
        //register
        builder.addCase(registerUserAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(registerUserAction.fulfilled, (state, action) => {
            state.loading = false;
            state.registered = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(registerUserAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });

        //login
        builder.addCase(userLoginAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        })
        builder.addCase(userLoginAction.fulfilled, (state, action) => {
            state.loading = false;
            state.userAuth = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        })
        builder.addCase(userLoginAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        })

        //Profile
        builder.addCase(userProfileAction.pending, (state, action) => {
            state.profileLoading = true;
            state.profileAppErr = undefined;
            state.profileServerErr = undefined;
        });
        builder.addCase(userProfileAction.fulfilled, (state, action) => {
            state.profileLoading = false;
            state.profile = action?.payload;
            state.profileAppErr = undefined;
            state.profileServerErr = undefined;
        });
        builder.addCase(userProfileAction.rejected, (state, action) => {
            state.profileLoading = false;
            state.profileAppErr = action?.payload?.message;
            state.profileServerErr = action?.error?.message;
        });

        //fetch all users
        builder.addCase(fetchUsersAction.pending, (state, action) => {
            state.Loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(fetchUsersAction.fulfilled, (state, action) => {
            state.Loading = false;
            state.usersList = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(fetchUsersAction.rejected, (state, action) => {
            state.Loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
        //block  user
        builder.addCase(blockUserAction.pending, (state, action) => {
            state.Loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(blockUserAction.fulfilled, (state, action) => {
            state.Loading = false;
            state.block = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(blockUserAction.rejected, (state, action) => {
            state.Loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });

        //unblock  user
        builder.addCase(unblockUserAction.pending, (state, action) => {
            state.Loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(unblockUserAction.fulfilled, (state, action) => {
            state.Loading = false;
            state.unblock = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(unblockUserAction.rejected, (state, action) => {
            state.Loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });

        //Profile photo upload
        builder.addCase(profilePhotoUploadAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(profilePhotoUploadAction.fulfilled, (state, action) => {
            state.loading = false;
            state.profileUpload = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(profilePhotoUploadAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
        //Profile update
        builder.addCase(profileUpdateAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(resetUserAcion, (state, action) => {
            state.isUpdated = true;
        })
        builder.addCase(profileUpdateAction.fulfilled, (state, action) => {
            state.loading = false;
            state.profileUpdated = action?.payload;
            state.isUpdated = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(profileUpdateAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
        //get user details upload
        builder.addCase(fetchUserDetails.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(fetchUserDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.userDetails = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(fetchUserDetails.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });

        //follow to user
        builder.addCase(followUserAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(followUserAction.fulfilled, (state, action) => {
            state.loading = false;
            state.followed = action?.payload;
            state.unFollowed = undefined;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(followUserAction.rejected, (state, action) => {
            state.loading = false;
            state.unFollowed = undefined;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
        //unfollow to user
        builder.addCase(unFollowUserAction.pending, (state, action) => {
            state.unfollowLoading = true;
            state.unfollowAppErr = undefined;
            state.unfollowServerErr = undefined;
        });
        builder.addCase(unFollowUserAction.fulfilled, (state, action) => {
            state.unfollowLoading = false;
            state.unFollowed = action?.payload;
            state.followed = undefined;
            state.unfollowAppErr = undefined;
            state.unfollowServerErr = undefined;
        });
        builder.addCase(unFollowUserAction.rejected, (state, action) => {
            state.unfollowLoading = false;
            state.followed = undefined;
            state.unfollowAppErr = action?.payload?.message;
            state.unfollowServerErr = action?.error?.message;
        });

        //update user password
        builder.addCase(updateUserPasswordAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(resetUpdatePasswordAction, (state, action) => {
            state.isPasswordUpdated = true;
        })
        builder.addCase(updateUserPasswordAction.fulfilled, (state, action) => {
            state.loading = false;
            state.passwordUpdated = action?.payload;
            state.isPasswordUpdated = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(updateUserPasswordAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });

        //generate token for reset user password
        builder.addCase(generateResetPasswordTokenAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(generateResetPasswordTokenAction.fulfilled, (state, action) => {
            state.loading = false;
            state.passwordToken = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(generateResetPasswordTokenAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });

        //reset user password
        builder.addCase(passwordResetAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(passwordResetAction.fulfilled, (state, action) => {
            state.loading = false;
            state.resetPassword = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(passwordResetAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });

        //logout
        builder.addCase(userLogoutAction.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(userLogoutAction.fulfilled, (state, action) => {
            state.userAuth = undefined;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        })
        builder.addCase(userLogoutAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        })
    }
})






export default usersSlices.reducer;
