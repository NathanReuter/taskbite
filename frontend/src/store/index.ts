import { configureStore } from "@reduxjs/toolkit";
import userReducer, {UserState} from './userSlice.ts';

const store = configureStore({
    reducer: {
        user: userReducer,
    },
});

export type RootState = {
    user: UserState;
};

export type AppDispatch = typeof store.dispatch;

export default store
