'use client'

import React, { useState } from 'react';
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { sendContactMail } from '@/actions/user-actions'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from '../ui/use-toast';
import { RiContactsBook2Line } from "react-icons/ri";
import { Textarea } from '../ui/textarea';

const formSchema = z.object({
  nombre: z.string().min(3, { message: "Ingresá tu nombre" }),
  contacto: z.string().email({ message: "Mail invalido" }),
  asunto: z.string().min(3, { message: "Ingresa un asunto" }),
  mensaje: z.string().min(10, { message: "Ingresa un mensaje" }),
})

const ContactForm= () => {
  const [error, setError] = useState("")
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      contacto: "",
      asunto: "",
      mensaje: ""
    },
  });

  const handleSubmit = async (values) => {
    const response = await sendContactMail(values)
    if (response.ok) {
      toast({
        title: "Mensaje enviado correctamente",
        description: "Recibimos tu mensaje, nos contactaremos tan pronto podamos!",
        className: "bg-green-400",
      })
    } else {
      toast({
        title: "Hubo un error al enviar tu mensaje",
        description: "Intenta nuevamente más tarde, lamentamos las molestias",
        variant: "destructive"
      })
    }
  }

  return (
    <div className='flex flex-col items-center justify-center w-full md:w-1/2 mb-12 px-4 md:px-6'>
      <div className='flex flex-col justify-center items-center mb-6'>
        <h2 className='flex items-center justify-center font-semibold text-2xl lg:text-4xl pt-6 text-center text-blue-800 tracking-wide'>
          <RiContactsBook2Line aria-hidden="true" className="mr-2" />
          Ponte en contacto!
        </h2>
        <p className='text-center pb-4 text-gray-600 text-lg leading-relaxed max-w-md'>
          Si tenés alguna duda u inconveniente, no dudes en escribirnos. ¡Estamos aquí para ayudarte!
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='w-full max-w-md'>
          <FormField
            control={form.control}
            name="nombre"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="text-lg lg:text-xl">Nombre</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Tu nombre"
                    className="text-lg text-black"
                    type="text"
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
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="text-lg lg:text-xl">Contacto</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Tu email"
                    className="text-lg text-black"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-sm">
                  Ingresá un mail para que podamos responderte
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="asunto"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="text-lg lg:text-xl">Asunto</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Asunto del mensaje"
                    className="text-lg text-black"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-sm">
                  Sobre qué trata tu mensaje
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mensaje"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="text-lg lg:text-xl">Mensaje</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Contanos lo que quieras"
                    className="resize-none text-lg text-black"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && <span className='text-red-600 text-sm mb-2'>{error}</span>}
          <Button type="submit" className="bg-blue-900 w-full mt-4 text-lg lg:text-xl">
            Enviar
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default ContactForm