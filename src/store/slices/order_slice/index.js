import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../../../api/request";


const initialState = {
    isLoading : false,
    orders : [],
    error : ''
}


const fetchOrders = createAsyncThunk('order/fetchOrders' , () => {
    return request({
        url : '/casher-orders'
    }).then(response => response.data)
})


const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers : {
        deleteOrder : (state , action) => {
            state.orders = state.orders.filter((obj) => obj.id !== action.payload)
        },
        addOrder : (state , action) => {
            state.orders = [...action.payload , ...state.orders ]
        }
    },
    extraReducers : (builder) => {
        builder.addCase(fetchOrders.pending , (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchOrders.fulfilled , (state , action) => {
            state.isLoading = false
            state.orders = action.payload.data
        })

        builder.addCase(fetchOrders.rejected , (state , action) => {
            state.isLoading = false
            state.orders = []
            state.error = action.error.message
        })
    }
})


export {
    orderSlice,
    fetchOrders
}

export const {
    deleteOrder , addOrder
} = orderSlice.actions