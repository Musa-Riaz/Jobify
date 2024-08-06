import { configureStore} from '@reduxjs/toolkit';
import { authSlice } from '../slices/authSlice';
import { userSlice } from '../slices/userSlice';
import { alertSlice } from '../slices/alertSlice';

export const store = configureStore({
    reducer:{
        auth: authSlice.reducer,
        user: userSlice.reducer,
        alerts: alertSlice.reducer    
    }
});