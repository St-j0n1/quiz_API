import { createAsyncThunk } from "@reduxjs/toolkit";

export const createData = createAsyncThunk(
  "createData",
  async (singUpData, thunkAPI) => {
    try {
      const response = await fetch("https://crudapi.co.uk/api/v1/singupData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        },
        body: JSON.stringify([singUpData]),
      });
      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data.items[0]));
      console.log(data, "THUNK DATA");
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message, "THUNK BLOCK");
    }
  }
);

export const fetchUserData = createAsyncThunk(
  "fetchUserData/data",
  async (_, thunkAPI) => {
    try {
      const response = await fetch("https://crudapi.co.uk/api/v1/singupData", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        },
      });

      if (!response.ok) throw new Error(`BAD RESPONSE`);
      const data = await response.json();
      return thunkAPI.fulfillWithValue(data.items);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (id, thunkAPI) => {
    try {
      const response = await fetch(
        `https://crudapi.co.uk/api/v1/singupData/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
          },
        }
      );

      if (!response.ok) console.log(`BAD RESPONSE`);
      const data = response.json();
      const deleted = data.items.filter((rest) => rest._uuid !== id);

      console.log(deleted, "TELEDET");
      return thunkAPI.dispatch(deleted);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);