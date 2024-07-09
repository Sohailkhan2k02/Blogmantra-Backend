import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../util/baseUrl";


// --------------------------------------//
//          ---       actions        --- //
// --------------------------------------// 
//reset action to redirect
const resetAccountVerificationAction = createAction('account/verification-reset')
//Generate Account Verification Token
export const sendAccountVerificationTokenAction = createAsyncThunk('account/send-token', 
async(email, {rejectWithValue, getState, dispatch})=>{
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
        const {data} = await axios.post(`${baseUrl}/api/users/generate-verify-email-token`, 
        {},
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
})


export const accountVerificationAction = createAsyncThunk('account/verify', 
async(token, {rejectWithValue, getState, dispatch})=>{
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
        const {data} = await axios.put(`${baseUrl}/api/users/verify-token`, 
        {token},
        config,
        );
        //dispatch 
        const dispatch = resetAccountVerificationAction();
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

const accVerificationSlices = createSlice({
    name: 'accountVerification',
    initialState: {},
    extraReducers: builder=>{
        //generate token 
        builder.addCase(sendAccountVerificationTokenAction.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(sendAccountVerificationTokenAction.fulfilled, (state, action)=>{
            state.loading = false;
            state.token = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(sendAccountVerificationTokenAction.rejected, (state, action)=>{
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });

        //verify token 
        builder.addCase(accountVerificationAction.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(resetAccountVerificationAction, (state, action)=>{
            state.isVerified = true;
        })
        builder.addCase(accountVerificationAction.fulfilled, (state, action)=>{
            state.loading = false;
            state.verified = action?.payload;
            state.isVerified = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(accountVerificationAction.rejected, (state, action)=>{
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });

    }
})


export default accVerificationSlices.reducer;