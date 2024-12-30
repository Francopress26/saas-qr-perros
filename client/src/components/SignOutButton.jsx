'use client'
import React from 'react'
import { Button } from './ui/button'
import { signOutAction } from '@/auth/helpers'

const SignOutButton = () => {
    const signOut = async ()=>{
        await signOutAction()
    }
  return (
    <Button onClick={()=>signOut()}>Sign Out</Button>
  )
}

export default SignOutButton