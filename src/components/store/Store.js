import { configureStore } from "@reduxjs/toolkit";
import detailsReducer from "../storeslice/Detalesslice";
import addbatchReducre from "../storeslice/Addbatch"
import addUserReducer from "../storeslice/CreateUser"
import FoldersReducer from "../storeslice/Addfolders"
// LocalStorage से state load
const loadState = () => {
  try {
    const state = localStorage.getItem("reduxState");
    return state ? JSON.parse(state) : undefined;
  } catch {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    localStorage.setItem("reduxState", JSON.stringify(state));
  } catch { }
};

const store = configureStore({
  reducer: {
    details: detailsReducer,
    addbatch:addbatchReducre,
    User:addUserReducer,
    Folders:FoldersReducer,
  },
  preloadedState: loadState(), 
});

store.subscribe(() => {
  saveState(store.getState()); 
});

export default store;
