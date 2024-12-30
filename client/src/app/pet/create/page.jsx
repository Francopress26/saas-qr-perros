import { auth } from '@/auth/auth'
import CreatePetForm from '@/components/forms/CreatePetForm'
import { redirect } from 'next/navigation'
import React from 'react'

const CreatePet = async () => {
    const session = await auth()
    if(!session) return redirect('/')

  return (
<CreatePetForm userId={session.user.userId}></CreatePetForm> 

)
}

export default CreatePet