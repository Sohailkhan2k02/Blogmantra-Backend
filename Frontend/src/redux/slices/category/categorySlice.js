import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../util/baseUrl";


//action to redirect
const resetEditAction = createAction('category/edit-reset');
const resetDeleteAction = createAction('category/delete-reset');
const resetCreateAction = createAction('category/create-reset');

// --------------------------------------//
//          ---       actions        --- //
// --------------------------------------// 
export const createCategoryAction = createAsyncThunk('category/create', 
async(category, {rejectWithValue, getState, dispatch})=>{
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
        const {data} = await axios.post(`${baseUrl}/api/category`, 
        {
            title: category?.title,
        }, config,
        );
        //dispatch action to reset created data
        dispatch(resetCreateAction());
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
export const fetchCategoriesAction = createAsyncThunk('category/fetch', 
async(category, {rejectWithValue, getState, dispatch})=>{
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
        const {data} = await axios.get(`${baseUrl}/api/category`, config,
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
})
export const fetchCategoryAction = createAsyncThunk('category/details', 
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
        const {data} = await axios.get(`${baseUrl}/api/category/${id}`, config,
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
})
export const updateCategoriesAction = createAsyncThunk('category/update', 
async(category, {rejectWithValue, getState, dispatch})=>{
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
        const {data} = await axios.put(`${baseUrl}/api/category/${category?.id}`,
        {title: category?.title}, config,
        );
        //dispatch action to reset updated data
        dispatch(resetEditAction());
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
export const deleteCategoriesAction = createAsyncThunk('category/delete', 
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
        const {data} = await axios.delete(`${baseUrl}/api/category/${id}`, config,
        );
        //dispatch action to reset deleted data
        dispatch(resetDeleteAction());
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
const categorySlices = createSlice({
    name: 'category',
    initialState : {},
    extraReducers: builder=>{
        //create category
        builder.addCase(createCategoryAction.pending, (state, action)=>{
            state.loading = true;
        });
        //dispatch reset create action
        builder.addCase(resetCreateAction, (state, action)=>{
            state.isCreate = true;
        });
        builder.addCase(createCategoryAction.fulfilled, (state, action)=>{
            state.category = action?.payload;
            state.isCreate = false;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(createCategoryAction.rejected, (state, action)=>{
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
        //fetch categories
        builder.addCase(fetchCategoriesAction.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(fetchCategoriesAction.fulfilled, (state, action)=>{
            state.categoryList = action?.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        }); 
        builder.addCase(fetchCategoriesAction.rejected, (state, action)=>{
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });

        //fetch category details
        builder.addCase(fetchCategoryAction.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(fetchCategoryAction.fulfilled, (state, action)=>{
            state.category = action?.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(fetchCategoryAction.rejected, (state, action)=>{
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
        
        //update
        builder.addCase(updateCategoriesAction.pending, (state, action)=>{
            state.loading = true;
        });
        //dispatch reset update action
        builder.addCase(resetEditAction, (state, action)=>{
            state.isEdit = true;
        })
        builder.addCase(updateCategoriesAction.fulfilled, (state, action)=>{
            state.updatedCategory = action?.payload;
            state.isEdit = false;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(updateCategoriesAction.rejected, (state, action)=>{
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });

        //delete
        builder.addCase(deleteCategoriesAction.pending, (state, action)=>{
            state.loading = true;
        });
        //dispatch reset delete action
        builder.addCase(resetDeleteAction, (state, action)=>{
            state.isDelete = true;
        })
        builder.addCase(deleteCategoriesAction.fulfilled, (state, action)=>{
            state.deletedCategory = action?.payload;
            state.isDelete = false;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(deleteCategoriesAction.rejected, (state, action)=>{
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
    }
})

export default categorySlices.reducer;