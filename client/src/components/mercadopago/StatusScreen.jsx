'use client'

import React from 'react'
import { StatusScreen } from '@mercadopago/sdk-react';

const ScreenMp = ({paymentId}) => {
    console.log(paymentId)
    const initialization = {
        paymentId: paymentId, // id de pago para mostrar
       };
       const onError = async (error) => {
        // callback llamado solicitada para todos los casos de error de Brick
        console.log(error);
       };
       const onReady = async () => {
        console.log("STATUS MONTAO")
        /*
          Callback llamado cuando Brick está listo.
          Aquí puede ocultar cargamentos de su sitio, por ejemplo.
        */
       };  return (
<StatusScreen
   initialization={initialization}
   onReady={onReady}
   onError={onError}
/>
  )
}

export default ScreenMp