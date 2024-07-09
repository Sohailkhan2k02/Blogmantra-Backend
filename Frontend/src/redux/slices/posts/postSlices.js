import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../util/baseUrl";


//action to redirect
const resetCreateAction = createAction('post/create-reset');
const resetUpdateAction = createAction('post/update-reset');
const resetDeleteAction = createAction('post/delete-reset');
// --------------------------------------//
//          ---       actions        --- //
// --------------------------------------// 

//create post action
export const createPostAction = createAsyncThunk('post/created', async (post,
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
        formData.append('title', post?.title);
        formData.append('description', post?.description);
        formData.append('category', post?.category);
        formData.append('image', post?.image);
        //http call
        const { data } = await axios.post(`${baseUrl}/api/post`, formData, config);
        //dispatch reset action to redirect 
        dispatch(resetCreateAction());
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

//update post action
export const updatePostAction = createAsyncThunk('post/updated', async (post,
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
        const { data } = await axios.put(`${baseUrl}/api/post/${post?.id}`, post, config);
        // dispatch reset action to redirect 
        dispatch(resetUpdateAction());
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
//delete post action
export const deletePostAction = createAsyncThunk('post/deleted', async (postId,
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
        const { data } = await axios.delete(`${baseUrl}/api/post/${postId}`, config);
        // dispatch reset action to redirect 
        dispatch(resetDeleteAction());
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

//fetch all posts
export const fetchPostsAction = createAsyncThunk('post/list', async (category,
    { rejectWithValue, getState, dispatch }) => {

    try {
        //http call
        const { data } = await axios.get(`${baseUrl}/api/post?category=${category}`);
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

//fetch post details
export const fetchPostDetailsAction = createAsyncThunk('post/details', async (id,
    { rejectWithValue, getState, dispatch }) => {

    try {
        //http call
        const { data } = await axios.get(`${baseUrl}/api/post/${id}`);
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

//like to post action
export const likePostsAction = createAsyncThunk('post/like', async (postId,
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
        const { data } = await axios.put(`${baseUrl}/api/post/like`, {postId}, config);
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

//dislike to post action
export const dislikePostsAction = createAsyncThunk('post/dislike', async (postId,
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
        const { data } = await axios.put(`${baseUrl}/api/post/dislike`, {postId}, config);
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
//          ---       Slices         --- //
// --------------------------------------// 
const postSlices = createSlice({
    name: 'posts',
    initialState: {},
    extraReducers: (builder) => {
        //post create
        builder.addCase(createPostAction.pending, (state, action) => {
            state.loading = true;
        });
        //reset action 
        builder.addCase(resetCreateAction, (state, action) => {
            state.isCreated = true;
        })
        builder.addCase(createPostAction.fulfilled, (state, action) => {
            state.loading = false;
            state.postCreated = action?.payload;
            state.isCreated = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(createPostAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });

        //post update
        builder.addCase(updatePostAction.pending, (state, action) => {
            state.loading = true;
        });
        // reset action 
        builder.addCase(resetUpdateAction, (state, action) => {
            state.isUpdated = true;
        })
        builder.addCase(updatePostAction.fulfilled, (state, action) => {
            state.loading = false;
            state.postUpdated = action?.payload;
            state.isUpdated = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(updatePostAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });

        //post delete
        builder.addCase(deletePostAction.pending, (state, action) => {
            state.loading = true;
        });
        // reset action 
        builder.addCase(resetDeleteAction, (state, action) => {
            state.isDeleted = true;
        })
        builder.addCase(deletePostAction.fulfilled, (state, action) => {
            state.loading = false;
            state.postDeleted = action?.payload;
            state.isDeleted = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(deletePostAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });

        //fetch posts
        builder.addCase(fetchPostsAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchPostsAction.fulfilled, (state, action) => {
            state.loading = false;
            state.postList = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(fetchPostsAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
        
        //fetch post details
        builder.addCase(fetchPostDetailsAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchPostDetailsAction.fulfilled, (state, action) => {
            state.loading = false;
            state.postDetails = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(fetchPostDetailsAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });

        //like to posts
        builder.addCase(likePostsAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(likePostsAction.fulfilled, (state, action) => {
            state.loading = false;
            state.likes = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(likePostsAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
        //dislike to posts
        builder.addCase(dislikePostsAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(dislikePostsAction.fulfilled, (state, action) => {
            state.loading = false;
            state.dislikes = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(dislikePostsAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
        
    }
})


export default postSlices.reducer;