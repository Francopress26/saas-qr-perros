import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { IoAdd } from "react-icons/io5"
import PetListItem from '@/components/PetListItem'
import { auth } from '@/auth/auth'
import { getPets } from '@/actions/pet-actions'
import ProfileData from '@/components/ProfileData'



const Profile = async ({ params }) => {

  const session = await auth()
  if (!session) return redirect('/')

  const { ok, pets } = await getPets(session.user.userId)
  if (!ok) {
    console.log("Hubo un error al buscar tus mascotas")
    // Agregar toast
  }


  return (
    <div className='flex flex-col min-h-screen max-w-7xl mx-auto p-4 lg:p-8 relative overflow-hidden'>
      
      <h3 className='text-3xl font-bold text-center mb-8 lg:text-5xl lg:mb-12 relative z-10'>
        Hola {session.user.name}, bienvenido a tu perfil
      </h3>
      {pets?.length > 0 && <ProfileData pets={pets} />}

    </div>
  )
}

export default Profile