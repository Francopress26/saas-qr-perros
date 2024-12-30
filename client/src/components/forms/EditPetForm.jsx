'use client'
import React, { useState } from 'react'
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, useRouter } from 'next/navigation';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from '../ui/textarea';
import { Skeleton } from "@/components/ui/skeleton"
import { DatabaseZapIcon } from 'lucide-react';
import { createPet, editPet } from '@/actions/pet-actions';
const formSchema = z
  .object({
    nombre: z.string().min(1,{message:"El nombre es obligatorio"}),
    raza: z.string().optional(),
    datos_extra: z.string().min(1,{message:"Ingresá algun dato de utilidad"}),
    zona:z.string().optional(),
    contacto:z.string().min(6,{message:"Ingresa al menos 6 caracteres"}).refine(contacto => !isNaN(parseFloat(contacto)),{message:"Numero invalido"}),
    email_contacto: z.string().email({message:"Mail invalido"}),
  })

const EditPetForm = ({petId,userId,nombre,datos_extra,zona,contacto,email_contacto}) => {
    const router = useRouter()
  const [error,setError]=useState("")
    
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nombre: nombre,
            datos_extra: datos_extra,
            zona:zona,
            contacto:contacto,
            email_contacto:email_contacto,
        },
      });

      const handleSubmit = async (values,event) => {
        event.preventDefault();

        const data ={
          nombre: values.nombre,
          datos_extra: values.datos_extra,
          zona: values.zona,
          contacto: values.contacto,
          email_contacto: values.email_contacto,
          imageURL: "url",
          codigoQR:"",
          userId:userId,
          petId:petId
        }
        const response = await editPet(data)
            if(!response.ok){
                setError(response.message)
                return
            }
            return router.push("/pet/"+response.updatedPet.id)
      };

  return (
    <div className="flex min-h-screen w-11/12 flex-col items-center justify-between m-6  ">
        <h2 className='text-2xl font-light text-center mt-2 mb-2 '>Editá los datos de tu mascota</h2>
        <div className=' m-2 flex flex-col items-center'>
      <div className="flex flex-col  mb-2">
      <Skeleton className="w-[250px] h-[250px] bg-gray-600" />
     </div>

      </div>
      <Form {...form}>
      <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="max-w-md w-full flex flex-col gap-4"
        >
            <FormField
            control={form.control}
            name="nombre"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingresa el nombre de tu mascota"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
   
         <FormField
          control={form.control}
          name="datos_extra"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripcion</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Agregá información que pueda ayudar a la persona que encontró a tu mascota.
                  "
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Es importante que seas específico            
          </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          name="zona"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Zona de residencia</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Puedes indicar tu direccion o la zona en donde vives.
                  "
                  className="resize-none"
                  {...field}
                />
              </FormControl>
            
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
            control={form.control}
            name="contacto"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Numero de Contacto</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ej: 3436-615767"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
            
          />
         <FormField
            control={form.control}
            name="email_contacto"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Email de contacto</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ej: nombre@gmail.com"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
            
          />
      
      <span className='text-red-500'>{error}</span>
         <Button type="submit" className="w-full">
            Guardar
          </Button>
            </form>
</Form>
        </div>
  )
}

export default EditPetForm