import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {categoryService} from "../../services";
import {ICategoryData} from "../../intarfaces";


interface IState {
    category: ICategoryData;
    trigger: boolean;
}

const initialState: IState = {
    category: {
        trivia_categories: [],
    },
    trigger: false,
};
const getAll = createAsyncThunk<ICategoryData, void>(
    'categorySlice/getAll',
    async () => {
        try {
            const response = await categoryService.getAll();
            return response.data;
        } catch (e) {
            throw e;
        }
    }
);

const slice = createSlice({
    name: "categorySlice",
    initialState,
    reducers: {
        changeTrigger: (state) => {
            state.trigger = !state.trigger;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAll.fulfilled, (state, action) => {
            state.category = action.payload;
        });
    },
});

const { actions, reducer: categoryReducer } = slice;

const categoryAction = {
    ...actions,
    getAll,
};

export { categoryAction, categoryReducer };
