import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import { orderSlice } from "./slices/order_slice";
const logger = createLogger()

const store = configureStore({
    reducer : {
        orders : orderSlice.reducer
    },
    middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})

export default store