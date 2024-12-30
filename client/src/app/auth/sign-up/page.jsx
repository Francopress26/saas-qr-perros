import CreateUser from '@/components/forms/CreateUser'
import Link from 'next/link'
import React from 'react'
import { Separator } from "@/components/ui/separator"
import dog from '@/assets/gooddoggy.svg'
import SignInForm from '@/components/forms/SignInForm'
import { auth } from '@/auth/auth'
import { redirect } from 'next/navigation'
import Image from 'next/image'

const SignIn = async () => {
    const session = await auth()
    if(session) redirect("/")
    
    return (
        <div className='min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-100'>
            <div className="w-full md:w-1/2 p-8 flex flex-col items-center justify-center relative">
                <div className="absolute inset-0 bg-blue-600 rounded-br-[20rem] md:rounded-r-[4rem] z-0"></div>
                <div className="relative z-10 text-center text-white">
                    <h3 className="text-2xl md:text-4xl font-semibold mb-4">Bienvenido a Huellitas QR!</h3>
                    <p className="text-lg md:text-xl font-semibold md:hidden mb-4"></p>
                    <Image src={dog.src} width={300} height={300} alt="Dog illustration" className="mx-auto" />
                </div>
            </div>
            
            <div className='w-full md:w-1/2 p-8 flex flex-col items-center justify-center'>
                <div className='w-full max-w-md'>
                    <p className="text-2xl text-center hidden md:block mb-6"></p>
                    <CreateUser/>
                    <div className="mt-6">
                        <Separator className="my-4" />
                        <p className='text-center text-sm'>
                            ¿Ya tienes cuenta? {' '}
                            <Link href="/auth/sign-in" className="text-blue-600 hover:underline">
                                Inicia sesión
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn