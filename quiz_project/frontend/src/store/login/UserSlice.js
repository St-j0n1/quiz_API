import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = "https://crudapi.co.uk/api/v1/singupData";
const apikey = "xqV72-moMK_a_u_QJTHyybjqNfiMlQpZaoyCWPP_St1hs-a3Lw";

const headers = { Authorization: `Bearer ${apikey}` };

export const loginUser = createAsyncThunk("user/loginUser", async (email) => {
  try {
    console.log(email);

    const request = await axios.get(`${apiUrl}`, { headers });
    //თუ დაბრუნებულ დატაში იძებნება მერე დაანავიგეითე

    const response = await request.data.items;
    console.log(response);

    const userExists = response.some((user) => user.email === email);
    console.log(userExists);

    if (userExists) {
      const user = response.filter((user) => user.email === email);
      console.log(user[0])
      localStorage.setItem("user", JSON.stringify(user[0]));
      return user;
    }
  } catch (error) {
    throw new Error("Login failed");
  }
});

const initialState = {
  loading: false,
  user: null,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.error = "Username or password is incorrect";
      });
  },
});

export default userSlice.reducer;
