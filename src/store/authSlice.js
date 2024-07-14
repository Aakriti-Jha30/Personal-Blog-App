import { createSlice } from "@reduxjs/toolkit";
//Authentication ko track karne ka kaam horha hai slice se to user logged in hai ya nhi ye hum har baari store se puchenge
const initialState={
    status:false,
    userData:null,
}
const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
       login:(state,action)=>{
         state.status=true; //state mei se status nikal ke true kardiya
         state.userData=action.payload; //userData action.payload se aayega
       },
       logout:(state)=>{
         state.status=false;
         state.userData=null;
       }

    }

})

export const {login,logout}=authSlice.actions; 

export default authSlice.reducer;

