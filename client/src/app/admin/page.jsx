import { auth } from '@/auth/auth'
import SearchSub from '@/components/SearchSub'
import SearchUser from '@/components/SearchUser'
import { redirect } from 'next/navigation'
import React from 'react'

const AdminPage = async () => {
    const session = await auth()
    if(!session)return redirect('/')
    if(!session.user.roles.includes('admin')) return redirect('/')

    //Agregar busqueda x id
    //Buscar en subscripciones por:
    //Activas / inactivas
  return (
    <div className='flex flex-col'>
      
<SearchUser/>
<SearchSub/>
    </div>
  )
}

export default AdminPage