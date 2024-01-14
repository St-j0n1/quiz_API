import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./login/UserSlice";
import signupReducer from "./signup/signup.slice"


export const store = configureStore({
  reducer: {
    user: userReducer,
    signup: signupReducer,
  },
});
