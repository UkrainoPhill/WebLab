import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import AuthServices from "../services/UserService";
import {LoginInputDto} from "../components/assets/utils/LoginInputDto";

// export const register = createAsyncThunk(
//     'auth/register',
//     async (data: { username: string, email: string, password: string }) => {
//         return await AuthServices.register(data.username, data.email, data.password);
//     }
// )

export const login = createAsyncThunk(
    'auth/login',
    async (data: LoginInputDto) => {
        return await AuthServices.login(data);
    }
);

export const check = createAsyncThunk(
    'auth/check',
    async (token: string) => {
        return await AuthServices.checkUser(token);
})

interface AuthState {
    token: string;
    status: string;
    error: string | null;
    isAuth: boolean;
}

const initialStateAuth: AuthState = {
    token: '',
    status: 'pending',
    error: null,
    isAuth: false
}


export const authSlice = createSlice({
    name: 'auth',
    initialState: initialStateAuth,
    reducers: {
        logout: (state) => {
            state.token = '';
            state.isAuth = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state, action) => {
                state.status = 'pending';
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.token = action.payload.data
                state.status = 'fulfilled';
                state.error = null;
                state.isAuth = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.token = '';
                state.status = 'rejected';
                state.error = action.payload as string;
            }).addCase(check.pending, (state, action) => {
            state.status = 'pending';
            state.error = null;
            })
            .addCase(check.fulfilled, (state, action) => {
                state.isAuth = action.payload.data;
                state.status = 'fulfilled';
                state.error = null;
            })
            .addCase(check.rejected, (state, action) => {
                state.isAuth = false;
                state.status = 'rejected';
                state.error = action.payload as string;
            });
    }
})

const authReducer = authSlice.reducer;
export const {logout} = authSlice.actions;
export {initialStateAuth};
export default authReducer;