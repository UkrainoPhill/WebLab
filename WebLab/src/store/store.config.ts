import {configureStore} from '@reduxjs/toolkit';
import destinationReducer from "./destination.slice";
import cartReducer from "./carts.slice";

const store = configureStore({
    reducer: {
        destinationReducer,
        cartReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;