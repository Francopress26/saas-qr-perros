import NavBar from "@/components/Navbar";
import Image from "next/image";
import Carrousel from "@/components/carrousel/carrousel";
import { Button } from "@/components/ui/button";
import { FaMessage } from "react-icons/fa6";
import Puntos from "@/components/puntos/puntos";
import { Avatar, AvatarGroup } from "@nextui-org/react";
import cat from '@/assets/undraw_cat.svg'
import { IoQrCodeOutline } from "react-icons/io5";
import Planes from "@/components/planes/planes";
import Faq from "@/components/faq/Faq";
import ContactForm from "@/components/forms/ContactForm";

export default function Home() {
  return (
    <>
      <NavBar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-around items-center pt-8 lg:flex-row lg:items-start">
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-between mb-8 lg:mb-0">
            <h1 className="text-3xl font-semibold text-center mb-6 lg:text-5xl">
              ¡Bienvenido a Huellitas QR!
            </h1>
            <p className="text-center font-light text-lg lg:text-2xl text-gray-500 mb-4">
              Ayudamos a que tu mascota perdida regrese a casa otorgándote un QR identificatorio en el que puedes cargar y modificar los datos de tu peludo en cualquier momento. Además, recibirás una notificación cuando alguien escanee el código.
            </p>
            <p className="text-center font-light text-lg lg:text-2xl text-gray-500 mb-6">
              Únete a la comunidad de mascotas protegidas con su propio QR y mantén a tu mejor amigo siempre seguro.
            </p>
            <AvatarGroup isBordered className="mb-6">
              <Avatar src="https://placedog.net/150/150?id=7" />
              <Avatar src="https://placedog.net/150/150?id=2" />
              <Avatar src="https://placedog.net/150/150?id=3" />
              <Avatar src="https://placedog.net/150/150?id=4" />
              <Avatar src="https://placedog.net/150/150?id=5" />
              <Avatar src="https://placedog.net/150/150?id=6" />
            </AvatarGroup>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full">
              <Button className="w-full sm:w-auto text-sm lg:text-base">
                <FaMessage className="mr-2" /> Charlemos
              </Button>
              <Button className="w-full sm:w-auto text-sm lg:text-base">
                <IoQrCodeOutline className="mr-2" /> Obtené tu QR
              </Button>
            </div>
          </div>
          <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
            <Carrousel />
          </div>
        </div>
        
        <Puntos />
        <Planes />
        <Faq />
        
        <div className="bg-gray-50 rounded-lg flex flex-col md:flex-row justify-between items-center">
          <Image src={cat} alt="Ilustración de un gato" className="hidden md:block md:w-1/4 self-end" />
          <ContactForm />
          <div className="hidden md:block w-1/4" />
        </div>
      </main>
    </>
  );
}