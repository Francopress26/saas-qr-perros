//create membership
//check membership
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { PrismaClient } from "@prisma/client";

// Agrega credenciales
const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN_MP })
const payment = new Payment(client);
const prisma = new PrismaClient();

import { Router } from "express";


const router = Router();





router.post('/process_payments/', async (req, res) => {
  const reqPlan = req.params.plan;
  const plan = await run(reqPlan)

  if (plan) {

    return res.status(201).json({ ok: true, plan: plan });
  } else {
    return res.status(500).json({ ok: false });
  }

})

router.post('/process_payment/:plan', async (req, res) => {
  const reqPlan = req.params.plan;
  const plan = await run(reqPlan)

  if (plan) {

    return res.status(201).json({ ok: true, plan: plan });
  } else {
    return res.status(500).json({ ok: false });
  }

})











//Creo el planm de forma dinamica
const createSubscriptionPlan = async (reason, frequency, billingDay, transactionAmount) => {
  try {
    const response = await fetch('https://api.mercadopago.com/preapproval_plan', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.ACCESS_TOKEN_MP}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        reason: reason,
        auto_recurring: {
          frequency: frequency,
          frequency_type: "months",
          billing_day: billingDay,
          billing_day_proportional: true,
          free_trial: {
            frequency: 1,
            frequency_type: "months"
          },
          transaction_amount: transactionAmount,
          currency_id: "ARS"
        },
        payment_methods_allowed: {
          payment_types: [{}],
          payment_methods: [{}]
        },
        back_url: "https://www.tu-sitio.com"
      })
    });

    if (!response.ok) {
      throw new Error('Error creating plan: ' + response.statusText);
    }

    const data = await response.json();
    return data; // Guarda el preapproval_plan_id para usarlo al crear la suscripción

  } catch (error) {
    console.error('Error creating plan:', error.message);
  }
};







const run = async (planType) => {
  let reason, frequency, billingDay, transactionAmount;
  const today = new Date();
  const dayOfMonth = today.getDate();
  // Define los parámetros del plan según el tipo de plan
  switch (planType) {
    case 'Plan1':
      reason = "Plan 1";
      frequency = 1;
      billingDay = dayOfMonth;
      transactionAmount = 1500;
      break;
    case 'Plan2':
      reason = "Plan 2";
      frequency = 1;
      billingDay = dayOfMonth;
      transactionAmount = 3000;
      break;
    case 'Plan3':
      reason = "Plan 3";
      frequency = 1;
      billingDay = dayOfMonth;
      transactionAmount = 5000;
      break;
    default:
      throw new Error('Invalid plan type');
  }

  // Crear el plan
  const plan = await createSubscriptionPlan(reason, frequency, billingDay, transactionAmount);
  //Guardar el plan en la base de datos

  const newPlan = await prisma.plan.create({
    data:{
    id: plan.id.toString(),
    collector_id: plan.collector_id.toString(),
    application_id: plan.application_id.toString(),
    reason: plan.reason,
    status: plan.status,
    date_created: plan.date_created.toString(),
    frequency: plan.auto_recurring.frequency.toString(),
    frequency_type: plan.auto_recurring.frequency_type,
    transaction_amount:Number(plan.auto_recurring.transaction_amount),
    currency_id: plan.auto_recurring.currency_id,
    billing_day:plan.auto_recurring.billing_day
  }})
  console.log(newPlan)
  return newPlan

};


//Linkear la sub despues de que el usuario haya pagado
router.post('/link-subscription/:planId', async (req, res) => {
  const userId = req.body.userId
  const preapproval_plan_id = req.params.planId


  try {

    //Valido el user
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      }
    })
    if (!user) {
      return res.status(404).json({ ok: false, message: "Usuario no encontrado" })
    }

    const findSub = await prisma.subscription.findUnique({
      where: {
        userId: user.id
      }
    })

    //Si el usuario tenia una subscripción antes
    if (findSub) {
      //Borro la sub de mp
      const responseDelete = await fetch('https://api.mercadopago.com/preapproval/' + findSub.subscription_id, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${process.env.ACCESS_TOKEN_MP}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: "cancelled" })

      })
      const deletedData = await responseDelete.json()
      console.log(deletedData)
      //Borro la sub de la bd
      const deleteSub = await prisma.subscription.delete({
        where: {
          userId: user.id
        }
      })
    }

    // //Busco la sub en la consulta del preaproval plan
    // const response2 = await fetch('https://api.mercadopago.com/preapproval/search?preapproval_plan_id=' + preapproval_plan_id, {
    //   method: 'GET',
    //   headers: {
    //     'Authorization': `Bearer ${process.env.ACCESS_TOKEN_MP}`,
    //     'Content-Type': 'application/json'
    //   }
    // })
    // const data = await response2.json()
    // //Esto deberia cambiarlo y filtrar el objeto donde esté la sub correcta
    // const { id, status, reason, payer_id } = data.results[0]

    //Consulto a mp la sub (ESTA DEBERIA SER LA PRIMER CONSULTA ---- USAR LA DE ARRIBA APARTE SI ALGO SALE MAL DESDE EL DASHBOARD)
    const response = await fetch('https://api.mercadopago.com/preapproval/' + preapproval_plan_id, {

      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.ACCESS_TOKEN_MP}`,
        'Content-Type': 'application/json'
      }
    })
    const data2 = await response.json()
    console.log(data2)
    const { payer_email,payer_id,status,reason ,next_payment_date, auto_recurring } = data2
    const { start_date } = auto_recurring

    // if(data2.status !== 200){

    // }

    //Esta es la subscripcion del usuario, asociado al plan que ya existia
    const subscription = await prisma.subscription.create({
      data: {
        subscription_id: preapproval_plan_id,
        payer_id: payer_id.toString(),
        payer_email: payer_email,
        status: status,
        reason: reason,
        preaproval_plan_id: preapproval_plan_id,
        start_date: start_date,
        next_payment_date: next_payment_date,
        userId: user.id
      },
    })
    await validarMascotas(reason, user.id)
    res.status(200).json({ ok: true, message: "Subscripcion asociada correctamente" })

  } catch (error) {

    console.log(error)
    return res.status(500).json({ ok: false, message: "Error en el servidor, intente luego" })
  }

})

//Linkear la sub a través del dashboard si algo salió mal

//Guardar PLAN en la BD (función)


async function validarMascotas(plan, userId) {
  const mascotas = await prisma.mascota.findMany({
    where: {
      userId: userId
    }
  });

  let mascotasActivasPermitidas = 0;

  // Definir cuántas mascotas pueden estar activas según el plan
  if (plan === "Plan 1") {
    mascotasActivasPermitidas = 1;
  } else if (plan === "Plan 2") {
    mascotasActivasPermitidas = 3;
  } else if (plan === "Plan 3") {
    mascotasActivasPermitidas = mascotas.length; // Activar todas
  }

  // Iterar sobre las mascotas y actualizar su estado
  for (let i = 0; i < mascotas.length; i++) {
    if (i < mascotasActivasPermitidas) {
      // Activar las primeras `mascotasActivasPermitidas` mascotas
      await prisma.mascota.update({
        where: { id: mascotas[i].id },
        data: { active: true } // Asegurar que esté activa
      });
    } else {
      // Desactivar las mascotas que sobrepasan el límite
      await prisma.mascota.update({
        where: { id: mascotas[i].id },
        data: { active: false } // Cambiar a 'paused'
      });
    }
  }
}



//Filtrar
router.get('/subscriptions', async (req,res)=>{
const {reason,status,userId} = req.query;

try {
  
  const findSubscriptions = await prisma.subscription.findMany({
    where: {
      ...(reason && reason !== 'All' && { reason }),   // Si 'reason' no es 'All', se aplica el filtro
      ...(status && status !== 'All' && { status }),   // Si 'status' no es 'All', se aplica el filtro
      ...(userId && { userId })                        // 'userId' siempre se filtra si está presente
    }
  });
  if(!findSubscriptions.length) return res.status(404).json({ok:false,message: 'No subscriptions'});
  return res.status(200).json({ok:true,subscriptions:findSubscriptions})
} catch (error) {
  return res.status(500).json({ok:false,message:"Error: " + error.message})
}
})


//Cambiar estádo de la subscripcion
router.put('/change-sub-status', async (req,res)=>{


})
//Cambiar monto del plan
router.put('/change-price', async (req,res)=>{


})

export default router