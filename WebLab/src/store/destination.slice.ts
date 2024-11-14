import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import DestinationServices from "../services/DestinationServices";
import { SearchOptions} from "../components/assets/utils/SearchOptions";
import {Destination} from "../components/assets/utils/Destination";

export const getDestinations = createAsyncThunk(
    'destination/getDestination',
    async (searchOptions: SearchOptions, thunkAPI) => {
        return DestinationServices.getDestinations(searchOptions);
    }
);

interface DestinationState {
    destination: Destination[] | null;
    searchOptions: SearchOptions;
    status: string;
    error: string | null;
}

const initialStateDestination: DestinationState = {
    destination: [],
    searchOptions: { search: '', sort: '', price: undefined, rate: undefined, continent: undefined, id: '' },
    status: 'pending',
    error: null
}

export const destinationSlice = createSlice({
    name: 'destination',
    initialState: initialStateDestination,
    reducers: {
        setSearchOption: (state, action: PayloadAction<SearchOptions>) => {
            state.searchOptions = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDestinations.pending, (state, action) => {
                state.status = 'pending';
                state.error = null;
            })
            .addCase(getDestinations.fulfilled, (state, action) => {
                state.destination = action.payload.data
                state.status = 'fulfilled';
                state.error = null;
            })
            .addCase(getDestinations.rejected, (state, action) => {
                state.status = 'rejected';
                state.destination = [];
                state.error = action.payload as string;
            })

    }
})

const destinationReducer = destinationSlice.reducer

export const {
    setSearchOption
} = destinationSlice.actions

export {initialStateDestination};

export default destinationReducer