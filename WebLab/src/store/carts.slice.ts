import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import CartServices from "../services/CartService";
import {Cart} from "../components/assets/utils/Cart";

export const getCart = createAsyncThunk(
    'cart/getCart',
    async (thunkAPI) => {
        return CartServices.getCarts();
    }
);

interface CartState {
    cart: Cart[] | null;
    status: string;
    error: string | null;
}

const initialStateCart: CartState = {
    cart: [],
    status: 'pending',
    error: null
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState: initialStateCart,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCart.pending, (state, action) => {
                state.status = 'pending';
                state.error = null;
            })
            .addCase(getCart.fulfilled, (state, action) => {
                state.cart = action.payload.data
                state.status = 'fulfilled';
                state.error = null;
            })
            .addCase(getCart.rejected, (state, action) => {
                state.status = 'rejected';
                state.cart = [];
                state.error = action.payload as string;
            })

    }
})

const cartReducer = cartSlice.reducer
export {initialStateCart};

export default cartReducer