'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { findUserByEmail } from '@/actions/admin-actions'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { formatToArgentinaTime } from '@/lib/utils'

const SearchUser = () => {
  const [email, setEmail] = useState('')
  const [userData, setUserData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async () => {
    setIsLoading(true)
    setError('')
    try {
      const response = await findUserByEmail(email)
      if (!response.ok) {
        setError(response.message || 'An error occurred while fetching user data.')
        setUserData(null)
      } else {
        setUserData(response.userData)
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
      setUserData(null)
    } finally {
      setIsLoading(false)
    }
  }
  const handlePausar = () => {
    console.log("Pausando perro")
  }
  const handleDespausar = () => {
    console.log("Despausando perro")
  }

  const handleDesbloquear = () => {
    console.log("Desbloqueando usuario")
  }
  const handleBloquear = () => {
    console.log("Bloqueando usuario")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Buscar usuario por email</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Introduce el email"
              className="flex-grow"
              type="email"
              aria-label="Email del usuario"
            />
            <Button
              onClick={handleSearch}
              className="w-full sm:w-auto"
              disabled={isLoading}
            >
              {isLoading ? 'Buscando...' : 'Buscar'}
            </Button>
          </div>

          {error && (
            <div className="text-red-500 mb-4" role="alert">
              {error}
            </div>
          )}

          {userData && (
            <div className="user-data space-y-6">
              <h3 className="text-xl font-semibold mb-4">Datos del Usuario</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoItem label="Email" value={userData.email} />
                <InfoItem label="Email Verificado" value={userData.email_verified ? "Sí" : "No"} />
                <InfoItem label="ID" value={userData.id} />
                <InfoItem label="Estado de Usuario" value={userData.user_status ? "Activo" : "Inactivo"} />
                <InfoItem label="Día de Facturación" value={userData.billing_day} />
                <InfoItem
                  label="Siguiente Fecha de Pago"
                  value={formatToArgentinaTime(userData.next_payment_date)}
                />
                <InfoItem label="ID del Plan" value={userData.preaproval_plan_id} />
                <InfoItem
                  label="Fecha de Inicio"
                  value={formatToArgentinaTime(userData.start_date)}
                />
                <InfoItem label="ID de Suscripción" value={userData.subscription_id} />
                <InfoItem label="Plan de Suscripción" value={userData.subscription_plan} />
                <InfoItem label="Estado de Suscripción" value={userData.subscription_status} />
                <InfoItem
                  label="Monto de Transacción"
                  value={`$${userData.transaction_amount}`}
                />
                {userData.isActive ? <Button onClick={() => handleDesbloquear()}>Desbloquear</Button> : <Button onClick={() => handleBloquear()}>Bloquear</Button>}
                {userData.subscription_status === "paused" ? <Button>Reactivar sub</Button> : null}
                {userData.subscription_status === "active" ? <Button>Desactivar sub</Button> : null}
                {userData.subscription_status === "cancelled" ? <Button disabled>Reactivar sub</Button> : null}
                



              </div>

              <h4 className="text-lg font-semibold mt-6 mb-4">Mascotas:</h4>
              {userData.pets?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {userData.pets.map(pet => (
                    <Card key={pet.id} className="bg-gray-50">
                      <CardContent className="p-4">
                        <InfoItem label="Nombre" value={pet.nombre} />
                        <InfoItem label="Datos Extra" value={pet.datos_extra} />
                        <InfoItem label="Zona" value={pet.zona} />
                        <InfoItem label="Contacto" value={pet.contacto} />
                        {pet.active ? <Button onClick={() => handlePausar()}>Pausar</Button> : <Button onClick={() => handleDespausar()}>Despausar</Button>}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No hay mascotas asociadas a este usuario.</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

const InfoItem = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-sm font-medium text-gray-500">{label}</span>
    <span className="text-base">{value}</span>
  </div>
)

export default SearchUser