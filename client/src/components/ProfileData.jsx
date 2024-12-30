'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { IoAdd } from "react-icons/io5"
import PetListItem from '@/components/PetListItem'

// Simulated data based on Prisma models
const simulatedUser = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    subscription: {
      id: 'sub_1',
      status: 'active',
      preaproval_plan_id: 'plan_premium',
      transaction_amount: 1500,
      next_payment_date: '2024-09-01',
      billing_day: 1,
      start_date: '2023-09-01',
      reason: 'Premium features access'
    },
    mascotas: [
      { id: 1, nombre: 'Max', active: true },
      { id: 2, nombre: 'Luna', active: false },
    ]
  }


const ProfileData = ({pets}) => {
    const { name, subscription, mascotas } = simulatedUser
     const [isSubscriptionActive, setIsSubscriptionActive] = useState(subscription.status === 'active')
  
     const toggleSubscription = () => {
       setIsSubscriptionActive(!isSubscriptionActive)
     }
  return (
    <div className='flex flex-col lg:flex-row lg:justify-between lg:space-x-8 relative z-10'>
    <div className='bg-white shadow-lg rounded-lg p-6 mb-8 lg:w-1/2'>
      <p className='text-2xl font-semibold mb-4 lg:text-3xl'>Detalles de tu suscripción:</p>
      <div className='mb-6 space-y-2'>
        <p className='text-lg lg:text-xl'>Tipo: <span className='font-bold'>{subscription.preaproval_plan_id === 'plan_premium' ? 'Premium' : 'Basic'}</span></p>
        <p className='text-lg lg:text-xl'>Precio: <span className='font-bold'>${subscription.transaction_amount}</span></p>
        <p className='text-lg lg:text-xl'>Estado: <span className='font-bold'>{isSubscriptionActive ? 'Activa' : 'Pausada'}</span></p>
        <p className='text-lg lg:text-xl'>Fecha de inicio: <span className='font-bold'>{subscription.start_date}</span></p>
        <p className='text-lg lg:text-xl'>Día de facturación: <span className='font-bold'>{subscription.billing_day}</span></p>
        <p className='text-lg lg:text-xl'>Próximo pago: <span className='font-bold'>{subscription.next_payment_date}</span></p>
        <p className='text-lg lg:text-xl'>Razón: <span className='font-bold'>{subscription.reason}</span></p>
      </div>
      <div className='space-y-4'>
        <Button 
          className={`w-full py-2 rounded-md text-lg lg:text-xl ${
            isSubscriptionActive 
              ? "bg-yellow-500 hover:bg-yellow-600 text-white" 
              : "bg-green-500 hover:bg-green-600 text-white"
          }`}
          onClick={toggleSubscription}
        >
          {isSubscriptionActive ? 'Pausar suscripción' : 'Activar suscripción'}
        </Button>
        <Button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md text-lg lg:text-xl">
          Dar baja
        </Button>
      </div>
    </div>

    <div className='lg:w-1/2 lg:bg-white lg:shadow-2xl lg:rounded-lg lg:p-6'>
      <div className='flex justify-between items-center mb-4'>
        <p className='text-2xl font-semibold lg:text-3xl'>Tus mascotas:</p>
        <Button variant="outline">
          <Link href="/pet/create">
            <IoAdd size={24} />
          </Link>
        </Button>
      </div>
      
      {pets.length > 0 ? (
        <div className='space-y-4'>
          {pets.map((pet) => (
            <PetListItem key={pet.id} nombre={pet.nombre} id={pet.id} active={pet.active} />
          ))}
        </div>
      ) : (
        <div className='bg-gray-100 text-center p-4 rounded-md'>
          <p className='text-lg'>Aún no tenés una mascota cargada</p>
        </div>
      )}
    </div>
  </div>  )
}

export default ProfileData