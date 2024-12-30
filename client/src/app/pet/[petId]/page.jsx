import React from 'react'
import { getPetById } from '@/actions/pet-actions'

import PetDetail from '@/components/PetPage';

const PetPage = async ({ params }) => {

  const { ok, pet, message } = await getPetById(params.petId)

  if (!ok) return console.log(message)
  //Conseguir ubicación y mandar email
  return (

    <PetDetail pet={pet}></PetDetail>

  );
}

export default PetPage







