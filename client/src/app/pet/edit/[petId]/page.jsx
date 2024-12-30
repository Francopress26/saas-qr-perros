import { getPetById } from '@/actions/pet-actions'
import { auth } from '@/auth/auth'
import EditPetForm from '@/components/forms/EditPetForm'
import { redirect } from 'next/navigation'
import React from 'react'

const EditPetPage = async ({params}) => {

const session = await auth()
if(!session)  redirect("/")
//Agregar validacion si es dueño del pet

const {ok,pet} = await getPetById(params.petId)
//Remplazar x toasst
if(!ok) return console.log("Hubo un error intente mas tarde")
     
  return (
    <EditPetForm 
    petId={params.petId}
    userId={session.user.userId} 
    nombre={pet.nombre} 
    datos_extra={pet.datos_extra}
     zona={pet.zona}
      contacto={pet.contacto} 
      email_contacto={pet.email_contacto}>

      </EditPetForm>
  )
}

export default EditPetPage