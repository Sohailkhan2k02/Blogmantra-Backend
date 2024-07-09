import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../util/baseUrl";



// --------------------------------------//
//          ---       actions        --- //
// --------------------------------------// 
//action to redirect
const resetUpdateAction = createAction('comment/update-reset');


//create comment action
export const createCommentAction = createAsyncThunk('comment/create', 
async(comment, {rejectWithValue, getState, dispatch})=>{
    //get the token of user
    const user = getState()?.users;
    const {userAuth} = user;
   //config
   const config = {
    headers: {
        Authorization : `Bearer ${userAuth?.token}`,
    }
   }
    //http call
    try {
        const {data} = await axios.post(`${baseUrl}/api/comment`, 
        {
            description: comment?.description,
            postId: comment?.postId,
        }, config,
        );
        return data;
    } catch (error) {
        if(!error?.response){
            //frontend error
            throw error;
        }
        //backend error
        return rejectWithValue(error?.response?.data);
    }
});
//fetch comment details action
export const fetchCommentAction = createAsyncThunk('comment/fetch-details', 
async(id, {rejectWithValue, getState, dispatch})=>{
    //get the token of user
    const user = getState()?.users;
    const {userAuth} = user;
   //config
   const config = {
    headers: {
        Authorization : `Bearer ${userAuth?.token}`,
    }
   }
    //http call
    try {
        const {data} = await axios.get(`${baseUrl}/api/comment/${id}`, 
        config,
        );
        return data;
    } catch (error) {
        if(!error?.response){
            //frontend error
            throw error;
        }
        //backend error
        return rejectWithValue(error?.response?.data);
    }
});

//delete comment action
export const deleteCommentAction = createAsyncThunk('comment/delete', 
async(commentId, {rejectWithValue, getState, dispatch})=>{
    //get the token of user
    const user = getState()?.users;
    const {userAuth} = user;
   //config
   const config = {
    headers: {
        Authorization : `Bearer ${userAuth?.token}`,
    }
   }
    //http call
    try {
        const {data} = await axios.delete(`${baseUrl}/api/comment/${commentId}`, 
        config,
        );
        return data;
    } catch (error) {
        if(!error?.response){
            //frontend error
            throw error;
        }
        //backend error
        return rejectWithValue(error?.response?.data);
    }
});

//update comment action
export const updateCommentAction = createAsyncThunk('comment/update', 
async(comment, {rejectWithValue, getState, dispatch})=>{
    //get the token of user
    const user = getState()?.users;
    const {userAuth} = user;
   //config
   const config = {
    headers: {
        Authorization : `Bearer ${userAuth?.token}`,
    }
   }
    //http call
    try {
        const {data} = await axios.put(`${baseUrl}/api/comment/${comment?.id}`,
        {description: comment?.description}, 
        config,
        );
        //dispatch reset update comment action
        dispatch(resetUpdateAction())
        return data;
    } catch (error) {
        if(!error?.response){
            //frontend error
            throw error;
        }
        //backend error
        return rejectWithValue(error?.response?.data);
    }
})

// --------------------------------------//
//          ---       Slices         --- //
// --------------------------------------// 
const commentSlices = createSlice({
    name: 'comments',
    initialState: {},
    extraReducers: builder=>{
        //create
        builder.addCase(createCommentAction.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(createCommentAction.fulfilled, (state, action)=>{
            state.loading = false;
            state.comment = action?.payload; 
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(createCommentAction.rejected, (state, action)=>{
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
        //comment details
        builder.addCase(fetchCommentAction.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(fetchCommentAction.fulfilled, (state, action)=>{
            state.loading = false;
            state.commentDetails = action?.payload; 
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(fetchCommentAction.rejected, (state, action)=>{
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
        //delete
        builder.addCase(deleteCommentAction.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(deleteCommentAction.fulfilled, (state, action)=>{
            state.loading = false;
            state.commentDeleted = action?.payload; 
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(deleteCommentAction.rejected, (state, action)=>{
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
        //update
        builder.addCase(updateCommentAction.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(resetUpdateAction, (state, action)=>{
            state.isUpdate = true;
        })
        builder.addCase(updateCommentAction.fulfilled, (state, action)=>{
            state.loading = false;
            state.commentUpdated = action?.payload; 
            state.isUpdate = false;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(updateCommentAction.rejected, (state, action)=>{
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
    }
})

export default commentSlices.reducer;