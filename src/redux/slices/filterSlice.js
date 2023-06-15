import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categoryId: 0,
    currentPage: 1,
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
            state.categoryId = action.payload
        },
        setSort: (state, action) => {
            state.sort = action.payload
        }, 
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        }
    }
}) 

export const { setCategorieId, setSort, setCurrentPage } = filterSlice.actions;
export default filterSlice.reducer;