import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../util/baseUrl";

//action to redirect
const resetEmailAction = createAction('email/reset');
// --------------------------------------//
//          ---       actions        --- //
// --------------------------------------// 
export const sendEmailAction = createAsyncThunk('eamil/send-email', 
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
        const {data} = await axios.post(`${baseUrl}/api/email`, 
        {
            to: email?.recepientEmail,
            subject: email?.subject,
            message: email?.message,
        }, config,
        );
        //dispatch reset action to redirect
        dispatch(resetEmailAction());
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

const emailSlices = createSlice({
    name: 'email',
    initialState: {},
    extraReducers: builder=>{
        builder.addCase(sendEmailAction.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(resetEmailAction, (state, action)=>{
            state.isEmailSent = true;
        })
        builder.addCase(sendEmailAction.fulfilled, (state, action)=>{
            state.loading = false;
            state.emailSent = action?.payload;
            state.isEmailSent = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(sendEmailAction.rejected, (state, action)=>{
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
    }
})


export default emailSlices.reducer;