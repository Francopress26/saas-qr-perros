import React from 'react';
import { IoIosPaw, IoIosNotifications, IoIosHeart, IoIosRocket, IoIosQrScanner, IoIosGift } from "react-icons/io";
import Feature from "./feature";

const Puntos = () => {
    const beneficiosApp = [
        { title: "Reencuentro rápido", text: "Facilita el reencuentro con tu mascota a través de un simple escaneo de QR, permitiendo que cualquier persona contacte contigo de inmediato.", icon: IoIosPaw },
        { title: "Notificaciones instantáneas", text: "Recibe notificaciones en tiempo real cuando alguien escanee el QR de tu mascota, con la ubicación precisa.", icon: IoIosNotifications },
        { title: "QRs ilimitados según tu plan", text: "Dependiendo de tu plan, podrás generar múltiples QR para cada una de tus mascotas, asegurando que todas estén protegidas.", icon: IoIosQrScanner },
        { title: "Apoyo a refugios", text: "El 10% de todas las suscripciones se dona a refugios locales, ayudando a más animales a encontrar un hogar.", icon: IoIosHeart },
        { title: "Sencillo y accesible", text: "Un diseño intuitivo que facilita la creación de perfiles y la gestión de la información de tu mascota.", icon: IoIosRocket },
        { title: "Primer mes gratis", text: "El primer mes de suscripción es completamente gratis para que puedas probar todas nuestras funcionalidades sin costo.", icon: IoIosGift }
    ];

    return (
        <div className='flex flex-col lg:flex-row mt-16 mb-16 bg-blue-900 text-slate-50 rounded-xl mx-auto lg:p-10 md:pt-16 md:pb-16 lg:mb-8 max-w-7xl'>
            <div className='flex flex-col items-center lg:w-1/4 md:pt-6 p-6 lg:p-0'>
                <IoIosPaw className='text-5xl mb-2' />
                <h2 className='text-center font-semibold text-nowrap mb-2 text-2xl md:text-3xl'>Beneficios</h2>
                <p className='text-center font-light text-lg md:text-xl lg:text-2xl'>Nuestra aplicación está diseñada para proteger a tus mascotas y hacer que encuentren el camino a casa más fácilmente, mientras apoyas una causa noble.</p>
            </div>

            <div className='flex flex-wrap justify-around items-start mt-4 lg:w-3/4 gap-4 p-6 lg:p-0'>
                {beneficiosApp.map((beneficio, index) => (
                    <Feature key={index} text={beneficio.text} title={beneficio.title} Icon={beneficio.icon} />
                ))}
            </div>
        </div>
    );
}

export default Puntos;