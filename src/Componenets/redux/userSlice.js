import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    allpost: [],
    refresh: 0
}

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setallPost: (state, action) => {
            state.allpost = action.payload
        },
        setRefresh: (state, action) => {
            state.refresh++
        }
    }
})

export default userSlice;
export const userActions = userSlice.actions;