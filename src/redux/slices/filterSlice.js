import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categoryId: 0,
    sort: {
        name: "популярности",
        sortProperty: "rating",
    },
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategorieId: (state, action) => {
            console.log('setCategorieId action', action)
            state.categoryId = action.payload
            console.log("state.categoryId", state.categoryId)
        }
    }
}) 

export const { setCategorieId } = filterSlice.actions;
export default filterSlice.reducer;