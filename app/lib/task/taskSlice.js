import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        setUserTasks: (state, action) => {
            return action.payload
        }
    }
})

export const { setUserTasks } = taskSlice.actions;
export default taskSlice.reducer;