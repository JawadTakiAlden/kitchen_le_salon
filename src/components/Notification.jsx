import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react'
import Pusher from 'pusher-js';

const Notification = () => {
    const { enqueueSnackbar } = useSnackbar();
    useEffect(() => {
        const pusher = new Pusher('2f639068bbf020a6b33d', {
            cluster: 'mt1'
          });
      
          const channel = pusher.subscribe('notifications');
      
          channel.bind('new-notification', (data) => {
            if(data.notification.type === 'move-order-to-casher'){
                enqueueSnackbar(data.notification.notification , {variant : 'success'});
            }else if (data.notification.type === 'order-paid'){
              enqueueSnackbar(data.notification.notification , {variant : 'success'});
            }
          });

          return () => {
            channel.unbind();
            pusher.disconnect();
          }
    } , [])
  return (
    <>
    </>
  )
}

export default Notification