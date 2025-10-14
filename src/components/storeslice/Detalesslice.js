import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

export const DetailSlice = createSlice({
  name: "details",
  initialState: [],
  reducers: {
    addCourse: (state, action) => {
      state.push({ id: nanoid(), ...action.payload });
    },
    addBatch: (state, action) => {
      state.push({ id: nanoid(), ...action.payload });
    },
    
  },
});

export const { addCourse , addBatch} = DetailSlice.actions;
export default DetailSlice.reducer;
