
import { configureStore } from '@reduxjs/toolkit';
import signinSlice from './reducers/signinSlice';
import userSlice from './reducers/userSlice';
import signupSlice from './reducers/signupSlice';

const store = configureStore({
    reducer: {
        loggedIn: signinSlice,
        signUp: signupSlice,
        user: userSlice,
        
    },
});

export default store;
