
import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        count: 0,
    },
    reducers: {
        increment: (state) => {
            console.log("plus");
            state.count += 1;
        },
        decrement: (state) => {
            state.count -= 1;
            console.log("minus");
        },
        incrementByAmount: (state, action) => {
            state.count += action.payload;
        },
    },
});

export const { increment, decrement, incrementByAmount } = authSlice.actions;

export default authSlice.reducer;