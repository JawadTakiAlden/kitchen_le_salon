import React, { useEffect } from 'react'
import productImage from '../../assets/triangle-background-with-vivid-colors_52683-31218.jpg'
import { Box, Button, Grid, Typography } from '@mui/material'
import OrderCard from './OrderCard'
import { request } from '../../api/request'
import { useQuery } from '@tanstack/react-query'
import { Circles } from 'react-loader-spinner'
import { useNavigate } from 'react-router'
import noDataImage from '../../assets/no-data-concept-illustration_114360-536.png'
import { useDispatch, useSelector } from 'react-redux'
import { addOrder, deleteOrder, fetchOrders } from '../../store/slices/order_slice'
import Pusher from 'pusher-js';

const Orders = () => {
    const {isLoading , orders , error} = useSelector((state) => state.orders)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchOrders())
        const pusher = new Pusher('2f639068bbf020a6b33d', {
            cluster: 'mt1'
          });
      
          const channel = pusher.subscribe('notifications');
      
          channel.bind('new-notification', (data) => {
            if(data.notification.type === 'move-order-to-casher'){
                dispatch(addOrder([data.order]))
            }else if(data.notification.type === 'order-paid'){
                dispatch(deleteOrder(data.order.id))
            }
          });

          return () => {
            channel.unbind();
            pusher.disconnect();
          }
    } , [])

    if(isLoading){
        return <Box
            sx={{
                display : 'flex',
                alignItems : 'center',
                justifyContent : 'center',
                width : '100%',
                height : 'calc(100vh - 80px)'
            }}
        ><Circles
        height="80"
        width="80"
        color="#59c2ff"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
      </Box>
    }

    if(error){
        return <Box
        sx={{
            display : 'flex',
            alignItems : 'center',
            justifyContent : 'center',
            width : '100%',
            height : 'calc(100vh - 80px)',
            flexDirection : 'column'
        }}
    >
        <Typography
        variant='h5'
        sx={{
            textAlign : 'center',
            marginBottom :'10px'
        }}
    >
        Unknown Error With Message : {error}
    </Typography>
    <Button
        variant='contained'
        onClick={() => {
            dispatch(fetchOrders())
        }}
    >
        Retry
    </Button>
    </Box>
    }
  return (
    <Box >
        {
            orders.length === 0 && (
                <Box
                    sx={{
                            position : 'absolute',
                            flexDirection : 'column',
                            left : '50%',
                            top : '50%',
                            transform : 'translate(-50% , -50%) '
                    }}
                >
                        <img 
                            style={{
                                maxWidth : '300px',
                                borderRadius : '12px'
                            }}
                            src={noDataImage}
                            alt='no-data-from-server'
                        />
                </Box>
            )
        }
        <Grid container spacing={4}>
            {
                orders.map(order => (
                    <Grid item xs={12} sm={6}>
                        <OrderCard order={order} />
                    </Grid>
                ))
            }
        </Grid>
    </Box>
  )
}

export default Orders