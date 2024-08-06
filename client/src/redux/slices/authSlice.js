import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name:'auth',
    initialState: {
        isAuthorized: false
    },
    reducers: {
        setAuth: (state, action) => {
            state.isAuthorized = action.payload;
        }
    }
});

export const { setAuth } = authSlice.actions;