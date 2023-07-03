import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {questService} from "../../services";
import {AxiosError} from "axios";
import {IQuestData} from "../../intarfaces";

interface IState {
    results: IQuestData,
    trigger: boolean
}

const initialState: IState = {
    results: {
        results: [],
    },
    trigger: false
}

const getAll = createAsyncThunk (
    'questSlice/getAll',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await questService.getAll();
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
);

export const filter = createAsyncThunk(
    'quest/filter',
    async (category: number) => {
    try {
        const response = await questService.filter(category);
        return response.data;
    } catch (error) {
        console.error('Error', error);
        throw error;
    }
});
const slice = createSlice({
    name:'questSlice',
    initialState,
    reducers: {
        changeTrigger: state => {
            state.trigger = !state.trigger
        }
    },
    extraReducers:(builder) => {
        builder
            .addCase(getAll.fulfilled, (state, action) => {
            state.results = action.payload
        })
            .addCase(filter.fulfilled, (state, action) => {
                state.results = action.payload;
            });
    }
});

const {actions, reducer: questReducer} = slice;

const questAction = {
    ...actions, getAll, filter
};

export {questAction, questReducer}