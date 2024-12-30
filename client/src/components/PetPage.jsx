'use client'
import React from 'react'
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { FaWhatsapp } from "react-icons/fa";
import { MdOutlinePets } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import Image from 'next/image';
import Peyron from "@/assets/peyron.jpg"

const PetDetail = ({pet}) => {
  const [error, setError] = useState(null);

  const obtenerUbicacion = async () => {
    // ... (keep the existing obtenerUbicacion function)
  };

  useEffect(() => {
    obtenerUbicacion();
  }, []);

  return (
    <div className="bg-gray-100 rounded-lg container mx-auto px-4 lg:shadow-xl lg:flex lg:items-center lg:justify-between lg:mb-12 lg:mt-12 lg:p-6 lg:min-h-[80vh] xl:max-w-6xl">
      <div className='mb-4 lg:mb-0 lg:w-1/2 lg:pr-8'>
        <Image src={Peyron.src} alt="Pet Image" width={600} height={600} className='rounded-xl w-full h-auto object-cover' />
      </div>

      <div className='bg-no-repeat bg-bottom-right bg-cover flex flex-col items-center justify-center text-center w-full shadow-xl border mb-12 lg:shadow-none lg:border-0 lg:mb-0 lg:w-1/2 lg:items-start lg:text-left'>
        <h1 className='text-3xl font-extrabold mt-2 text-[#004e89] border-2 border-[#ff6b35] rounded-lg p-4 lg:text-4xl xl:text-5xl'>
          Hola soy {pet.nombre}!
        </h1>

        <div className='flex flex-col space-y-4 mt-6 w-full max-w-md lg:max-w-none'>
          <InfoItem icon={<MdOutlinePets size={30} color="#004e89" />} text={pet.datos_extra} />
          <InfoItem icon={<CiLocationOn size={30} color='#004e89' />} text={pet.zona} />
          <InfoItem icon={<MdOutlineEmail size={30} color='#004e89' />} text={pet.email_contacto} />
          <InfoItem icon={<FaPhoneAlt size={30} color='#004e89' />} text={pet.contacto} />
        </div>

        <a
          className='animate-wiggle animate-infinite mt-8'
          href={`https://wa.me/${pet.contacto}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* <Button variant="outline" className="text-[#004e89] text-xl font-semibold lg:text-2xl xl:text-3xl">
            <FaWhatsapp color='#004e89' className='mr-2 animate-wiggle animate-infinite' /> Enviar WhatsApp
          </Button> */}



          <Button 
              variant="outline" 
              className="w-full bg-green-500 hover:bg-green-600 text-xl text-white font-semibold py-2 px-4 rounded lg:text-2xl "
            >
              <FaWhatsapp className="mr-2" /> Enviar WhatsApp
            </Button>
        </a>
      </div>
    </div>
  )
}

const InfoItem = ({ icon, text }) => (
  <div className='flex items-center'>
    <div className="w-[30px] h-[30px] flex items-center justify-center mr-4">
      {icon}
    </div>
    <p className='text-xl lg:text-2xl'>{text}</p>
  </div>
)

export default PetDetail