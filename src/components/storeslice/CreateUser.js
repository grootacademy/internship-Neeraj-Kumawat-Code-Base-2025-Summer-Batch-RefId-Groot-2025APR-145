import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

export const CreateUser = createSlice({
  name: "User",
  initialState: [],
  reducers: {
    addUser: (state, action) => {
      state.push({ id: nanoid(), ...action.payload });
    }
    
  },
});

export const { addUser} = CreateUser.actions;
export default CreateUser.reducer;
