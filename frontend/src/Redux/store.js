import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userReducer";


const store = configureStore({
  reducer: {
    user: userReducer,

  },
});

export default store;

// export const server =  "https://media-recorder-pwb214mki-sachincri.vercel.app/api/v1"
export const server =  "http://localhost:5000/api/v1"