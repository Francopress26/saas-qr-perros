'use client'

import React, { useState } from 'react';
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createUser } from '@/actions/user-actions'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { useToast } from '../ui/use-toast';

const formSchema = z.object({
  name: z.string().min(3, { message: "Ingresá tu nombre" }),
  email: z.string().email({ message: "Mail inválido" }),
  password: z.string().min(3, { message: "Ingresá la clave" }),
  passwordValidate: z.string().min(3, { message: "Ingresá la clave" }),
}).refine((data) => data.password === data.passwordValidate, {
  message: "Las contraseñas no coinciden",
  path: ["passwordValidate"],
});

const CreateUser = () => {
  const router = useRouter()
  const { toast } = useToast()
  const [error, setError] = useState("")

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordValidate: ""
    },
  });

  const handleSubmit = async (values) => {
    const response = await createUser(values)
    if (!response.ok) {
      setError(response.message)
      toast({
        title: "Error",
        description: response.message,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Cuenta creada",
        description: "Tu cuenta ha sido creada exitosamente.",
        variant: "default",
      })
      router.push("/");
    }
  }

  return (
    <div className='w-full max-w-md mx-auto p-6 space-y-8 bg-white rounded-xl shadow-md'>
      <h2 className="text-3xl font-bold text-center text-gray-800">Crear cuenta</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Nombre</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Tu nombre"
                    className="w-full px-3 py-2 text-sm text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="tu@email.com"
                    className="w-full px-3 py-2 text-sm text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Contraseña</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Tu contraseña"
                    className="w-full px-3 py-2 text-sm text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordValidate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Confirmar contraseña</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Confirma tu contraseña"
                    className="w-full px-3 py-2 text-sm text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit" className="w-full py-2 px-4 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Crear cuenta
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default CreateUser