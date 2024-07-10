import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUser, login as loginApi, signUp as signupApi } from '../services/api';
import {LoginCredential, SignUpCredential, User} from "../types";

export interface UserState {
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    isAuthenticated: boolean;
    token: string | null;
    error: string | null;
}

const initialState: UserState = {
    isAuthenticated: false,
    email: null,
    firstName: null,
    lastName: null,
    token: null,
    error: null,
};

function storeUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
}

function retrieveUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

export const loginReducer = createAsyncThunk<User, LoginCredential, { rejectValue: string }>(
    'user/login',
    async (credentials, thunkAPI) => {
        const response = await loginApi(credentials);
        if (response.status === 200) {
            localStorage.setItem('token', response.data.token);
            const userResponse = await fetchUser();
            storeUser(userResponse.data);
            return userResponse.data;
        } else {
            return thunkAPI.rejectWithValue('Invalid email or password');
        }
    }
);

export const signupReducer = createAsyncThunk<User, SignUpCredential, { rejectValue: string }>(
    'user/signup',
    async (credentials, thunkAPI) => {
        const response = await signupApi(credentials);
        if (response.status === 200) {
            localStorage.setItem('token', response.data.token);
            const userResponse = await fetchUser();
            storeUser(userResponse.data)
            return userResponse.data;
        } else {
            return thunkAPI.rejectWithValue('Invalid email or password');
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        ...initialState,
        ...retrieveUser(),
        token: localStorage.getItem('token'),
        isAuthenticated: !!localStorage.getItem('token'),
    },
    reducers: {
        logout: (state) => {
            state.email = null;
            state.token = null;
            state.firstName = null;
            state.lastName = null;
            state.isAuthenticated = false;
            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginReducer.fulfilled, (state, action: PayloadAction<User>) => {
            state.isAuthenticated = true;
            state.email = action.payload.email;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.token = action.payload.token;
            state.error = null;
        });
        builder.addCase(loginReducer.rejected, (state, action) => {
            state.error = action.payload as string;
        });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
