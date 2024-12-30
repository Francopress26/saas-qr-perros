import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Image from 'next/image'
import dog from '@/assets/undraw_dog.svg'
import { BsFillPatchQuestionFill } from "react-icons/bs";

const Faq = () => {
  return (
    <div className='flex flex-col lg:flex-row p-4 px-6 max-w-7xl mx-auto'>
      <div className='w-full lg:w-3/4 lg:pr-8'>
        <h2 className='flex items-center font-semibold text-2xl mb-6 lg:text-4xl'>
          Preguntas frecuentes
          <BsFillPatchQuestionFill className='ml-2 mt-2' color='#1e3a8a' aria-hidden="true" />
        </h2>
        <Accordion type="single" collapsible className="w-full bg-transparent text-lg lg:text-xl">
          <AccordionItem value="item-1">
            <AccordionTrigger>¿Qué es Huellitas QR?</AccordionTrigger>
            <AccordionContent>
              Huellitas QR es un servicio que permite a los dueños de mascotas crear un código QR personalizado que contiene información importante sobre su mascota. Si tu mascota se pierde, quien la encuentre puede escanear el QR y acceder a los datos de contacto para ayudarte a recuperarla rápidamente.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>¿Cómo funciona el código QR para mi mascota?</AccordionTrigger>
            <AccordionContent>
              Una vez que registres a tu mascota, recibirás un QR que puedes imprimir o grabar en el collar de tu mascota. Si alguien escanea el QR, verá los datos que has decidido compartir, como tu nombre, teléfono y dirección. También recibirás una notificación cuando el código sea escaneado.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>¿Puedo modificar la información del QR una vez que ha sido creado?</AccordionTrigger>
            <AccordionContent>
              Sí, puedes actualizar los datos de tu mascota en cualquier momento desde tu cuenta en Huellitas QR. Los cambios se reflejarán automáticamente cada vez que se escanee el código.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>¿Cuántas mascotas puedo registrar en Huellitas QR?</AccordionTrigger>
            <AccordionContent>
              Depende del plan que elijas. Con el plan básico puedes registrar una mascota, mientras que los planes más avanzados permiten registrar varias mascotas.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>¿Cómo recibo las notificaciones cuando alguien escanea el QR?</AccordionTrigger>
            <AccordionContent>
              Las notificaciones se envían automáticamente a tu correo electrónico cada vez que alguien escanea el código QR de tu mascota.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger>¿Qué pasa si mi mascota pierde el QR?</AccordionTrigger>
            <AccordionContent>
              Si tu mascota pierde el QR, puedes utilizar el mismo código QR que aparece en el perfil de tu mascota y grabarlo en un nuevo collar o prenda que tu mascota utilice.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-8">
            <AccordionTrigger>¿Cómo puedo cancelar mi suscripción?</AccordionTrigger>
            <AccordionContent>
              Puedes cancelar tu suscripción en cualquier momento desde la configuración de tu cuenta. Tendrás acceso a los servicios hasta que finalice el periodo de facturación actual.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className='hidden lg:block lg:w-1/4 self-end'>
        <Image src={dog} alt="Ilustración de un perro" width={300} height={300} />
      </div>
    </div>
  )
}

export default Faq