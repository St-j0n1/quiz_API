import { createSlice } from "@reduxjs/toolkit";
import { createData } from "./createData.thunk";

const initialState = {
  loading: false,
  error: null,
  singupData: [],
};

const singupSlice = createSlice({
  name: "singup",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createData.pending, (state) => {
      state.error = null;
      state.loading = "LOADING . . . ";
    });
    builder.addCase(createData.fulfilled, (state, action) => {
      console.log("Fulfilled state:", state);
      state.error = null;
      state.loading = false;
      state.singupData = action.payload;
     console.log(state.singupData)

    });
    builder.addCase(createData.rejected);
  },
});

export default singupSlice.reducer;


