import {createEntityAdapter, createSlice} from '@reduxjs/toolkit';
import {Artwork} from "../../types/Artwork";
import {RootState} from "../../types/RootState";

const entityAdapter = createEntityAdapter<Artwork>();

export const artworkSlice = {
    ...createSlice({
        name: 'artwork',
        initialState: {
            ...entityAdapter.getInitialState(),
        },
        reducers: {},
        extraReducers: {}
    }),
    selectors: entityAdapter.getSelectors<RootState>(state => state.artwork)
};
