import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import MpButton from '../mercadopago/MpButton';

const planes = [
  {
    nombre: 'Plan Básico',
    plan: "Plan1",
    init_point:"https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c938084924d2a460192546de2ca032f",
    precio: '$1500/mes',
    descripcion: 'Ideal para propietarios de una sola mascota.',
    caracteristicas: [
      '1 QR para una mascota',
      'Acceso a actualizaciones de datos',
      'Notificaciones de escaneo'
    ]
  },
  {
    nombre: 'Plan Estándar',
    plan: "Plan2",
    init_point:"https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c938084924d2a460192546e23690330",
    precio: '$3000/mes',
    descripcion: 'Para familias con varias mascotas.',
    caracteristicas: [
      '3 QR para mascotas',
      'Acceso a actualizaciones de datos',
      'Notificaciones de escaneo',
      'Soporte prioritario'
    ]
  },
  {
    nombre: 'Plan Premium',
    plan: "Plan3",
    init_point:"https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c938084924d2a130192546e6b46032c",
    precio: '$5000/mes',
    descripcion: 'Para amantes de mascotas con más necesidades.',
    caracteristicas: [
      '5 QR para mascotas',
      'Acceso a actualizaciones de datos',
      'Notificaciones de escaneo',
      'Soporte prioritario',
    ]
  }
];

const Planes = () => {
  return (
    <section className="bg-gray-100 rounded-lg py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-8 lg:text-4xl">Nuestros Planes de Suscripción</h2>
        <div className="  overflow-x-auto lg:flex lg:items-center lg:justify-center">
          <div className="inline-flex space-x-4 pb-4">
            {planes.map((plan, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg p-6 flex-none w-80">
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold mb-4">{plan.nombre}</h3>
                    <p className="text-xl font-bold mb-4">{plan.precio}</p>
                    <p className="text-gray-600 mb-4">{plan.descripcion}</p>
                    <ul className="mb-6">
                      {plan.caracteristicas.map((caracteristica, idx) => (
                        <li key={idx} className="flex items-center mb-3">
                          <FaCheckCircle className="text-green-500 mr-2 flex-shrink-0" aria-hidden="true" />
                          <span>{caracteristica}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <MpButton init_point={plan.init_point} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Planes;