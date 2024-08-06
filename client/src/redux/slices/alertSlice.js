import { createSlice } from '@reduxjs/toolkit';
export const alertSlice = createSlice({
    name: 'alerts',
    initialState: {
        loading: false
    },

    reducers :{
        setLoading: (state) =>{
            state.loading = true;
        },
        hideLoading: (state) => {
            state.loading = false
        }
    }
});

export const { setLoading, hideLoading } = alertSlice.actions;