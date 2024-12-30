import { Router } from "express";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

const router = Router();

router.get('/find-user',async(req,res)=>{
    const email = req.query.email
    try {
        const user = await prisma.user.findUnique({
            where: { email: email },
            include: {
                subscription: true,
                mascotas: true
            }
        });

        if (!user) return res.status(404).json({ ok: false, message: "Usuario no encontrado" });

        const userData = {
            id: user.id,
            email: user.email,
            user_status: user.isActive,
            email_verified: user.emailVerified,
            subscription_id: user.subscription?.subscription_id ?? "",
            subscription_status: user.subscription?.status ?? "",
            subscription_plan: user.subscription?.reason ?? "",
            preaproval_plan_id: user.subscription?.preaproval_plan_id ?? "",
            transaction_amount: user.subscription?.transaction_amount ?? "",
            start_date: user.subscription?.start_date ?? "",
            billing_day: user.subscription?.billing_day ?? "",
            next_payment_date: user.subscription?.next_payment_date ?? "",
            pets: user.mascotas ?? []
        };
        res.status(200).json({ ok: true, userData: userData });

    } catch (error) {
        console.log(error)
        res.status(500).json({ok:false,message:"Error del servidor"})
    }
})

export default router