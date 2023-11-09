import {configureStore} from '@reduxjs/toolkit'
import * as slices from './slices';


export const store = configureStore({
        reducer: {
            ...Object.values(slices).reduce((acc, slice) => ({
                ...acc,
                [slice.name]: slice.reducer
            }), {}),
        }
    }
)
