import { createSlice } from "@reduxjs/toolkit";


export const Addbatch = createSlice({ 
    name: "addbatch",
    initialState: [],
    reducers: {
        Addnewbatch:(state,action)=>{
            state.push(action.payload)
        }
    }
})

export const { Addnewbatch }  = Addbatch.actions ;
export default Addbatch.reducer;
