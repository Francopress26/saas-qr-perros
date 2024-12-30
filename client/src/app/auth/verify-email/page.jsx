import React from 'react'
import { verificateEmail } from '@/actions/user-actions'
const VerifyEmail = async ({ searchParams }) => {
    console.log(searchParams)
const verificated = await verificateEmail(searchParams.token)
console.log(verificated)
  return (
    <div>Email verificado con exito</div>
  )
}

export default VerifyEmail