'use client'
import { initMercadoPago,CardPayment } from '@mercadopago/sdk-react';
import React, { useEffect, useState } from 'react';
import ScreenMp from './StatusScreen';
const FormMp = () => {
    const [paymentToken, setPaymentToken] = useState(null);


    useEffect(() => {
        const initializeMercadoPago = async () => {

           await  initMercadoPago(process.env.NEXT_PUBLIC_KEY_MP);   
        }
        initializeMercadoPago()
    }, []);
const initialization = {
    amount: 100,
   };
   const customization = {
    paymentMethods: {
   types: {
     excluded: ['debit_card'],
   },
   minInstallments: 1,
   maxInstallments: 1,
 },
    visual: {
        texts: {
            formTitle: "Ingresa tus datos",
            emailSectionTitle: "Ingresa los detalles",

            cardholderName: {
                label: "Nombre del titular como aparece en la tarjeta",
                placeholder: "Maria Lopez",
            },
            email: {
                label: "Email",
                placeholder: "ejemplo@gmail.com",
            },
            cardholderIdentification: {
                label: "DNI",
            },
            cardNumber: {
                label: "Numero de tarjeta",
            },
            expirationDate: {
                label: "Fecha de expiracion",
            },
            securityCode: {
                label: "Codigo de seguridad",
            },
            formSubmit: "Pagar",

           
        }
    }
};
   
   const onSubmit = async (formData) => {
    try {
        const response = await fetch('http://localhost:3001/api/process_payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const result = await response.json();
        console.log(result)
        if (result.paymentId) {
          setPaymentToken(result.paymentId);
        } else {
          throw new Error('No payment token received');
        }
      } catch (error) {
        setError(error.message);
      }
   };
   
   
   const onError = async (error) => {
    // callback llamado para todos los casos de error de Brick
    console.log(error);
   };
   
   
   const onReady = async () => {
    console.log("readyu")
    
    /*
      Callback llamado cuando Brick está listo.
      Aquí puedes ocultar cargamentos de su sitio, por ejemplo.
    */
   };
   if (paymentToken) {
    return (
    <ScreenMp paymentId={paymentToken}></ScreenMp>
    )
    }

  return (
    <CardPayment
   initialization={initialization}
   customization={customization}
   onSubmit={onSubmit}
   onReady={onReady}
   onError={onError}
/>  )
}

export default FormMp