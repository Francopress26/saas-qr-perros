//GET USER
//GET USERS
//POST USER
//PUT USER
//DELETE USER
//BLOCK USER
//ACTIVATE USER
//RESET PASSWORD
//VALIDATE EMAIL
import { Router } from "express";
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { nanoid } from "nanoid";
import { Resend } from "resend";

const prisma = new PrismaClient();

const router = Router();
const resend = new Resend(process.env.AUTH_RESEND_KEY);


router.post('/user/auth', async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await prisma.user.findUnique({ where: { email } })
        if (!user) return res.status(401).json({ ok: false, message: "Usuario o contraseña incorrectos" });
        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword) return res.status(409).json({ ok: false, message: "Usuario o contraseña incorrectos" })

        const { password: _, ...userWithoutPassword } = user;
        if(!user.emailVerified){
            const deleteToken = await prisma.VerificationToken.deleteMany({
                where:{
                    identifier: user.email
                }
            })
            await createAndSendToken(user.email)

            return res.status(404).json({ok:false,message:"Aún no validaste tu email, hazlo mediante el mail que enviamos a tu casilla"})
        }
        return res.status(200).json({ ok: true, user: userWithoutPassword });


    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false, message: "Error en el servidor intente luego" })
    }

})

router.get('/user/:email', async (req, res) => {
    const { email } = req.params;
    
    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(404).json({ ok: false, message: "Usuario no encontrado" });
        }

        // Excluir la contraseña antes de devolver el usuario
        const { password, ...userWithoutPassword } = user;

        return res.status(200).json({ ok: true, user: userWithoutPassword });
        
    } catch (error) {
        return res.status(500).json({ ok: false, message: "Error en el servidor, intente luego" });
    }
});

router.post('/user', async (req, res) => {

    const { name, email, password } = req.body;
    try {

        const findUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        if (findUser) {
            return res.status(409).json({ ok: false, message: "El correo electrónico ya está registrado." });
        }
        const hashedPass = await bcrypt.hash(password, 10)
        const newUser = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPass
            }
        })
        const userSubset = {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
            roles: newUser.roles
        };
       const sendEmail =  await createAndSendToken(email)
       console.log(sendEmail)
        return res.status(201).json({
            ok: true,
            message: "Usuario creado exitosamente.",
            sentEmail:sendEmail.ok,
            user: userSubset // o un subset de los datos del usuario
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            message: "Error al crear el usuario",
        })
    }
})


router.post('/user/verificate-email', async (req, res) => {
    const token = req.query.token;

    try {
        const findToken = await prisma.VerificationToken.findFirst({
            where: {
                token: token
            }
        });

        if (!findToken) {
            return res.status(404).json({ok:false, message: 'Token no encontrado' });
        }

        // Si el token fue encontrado, actualiza el usuario
        const updatedUser = await prisma.user.update({
            where: {
                email: findToken.identifier 
            },
            data: {
                emailVerified: new Date()
            }
        });

       const deleteToken =  await prisma.VerificationToken.deleteMany({
            where:{
                token:token
            }
        })
        console.log(deleteToken)

        res.status(200).json({ok:true, message: 'Email verificado exitosamente', user: updatedUser });
    } catch (error) {
        console.error('Error verificando el email:', error);
        res.status(500).json({ ok:false,message: 'Error al verificar el email' });
    }
});

router.post('/sendContactEmail', async (req,res)=>{
    const {nombre,contacto, asunto, mensaje} = req.body;

    try {
        const respEmail = await resend.emails.send({
            from: "Huellitas QR <onboarding@resend.dev>",
            to: "francopress266@gmail.com",//Reemplazar por casilla de huellitas
            subject: asunto,
            html: `
              <p>${nombre} envió el siguente mensaje: ${mensaje}</p>
              <p>Contacto: ${contacto}</p>
            `,
          });
      console.log(respEmail)
      res.status(200).json({ok:true});
    } catch (error) {
        res.status(500).json({ok:false,message:"Error al enviar el mail"})
    }
})






const createAndSendToken = async (email)=>{

//Crear un token
const resp = await  createVerificationToken(email)
//Mandaar un mail con un token
if(resp.ok){
    const sendEmail = await sendVerificationEmail(email,resp.verificationToken.token);
    if(sendEmail.ok){
        return { ok: true, message: "Email enviado correctamente" };

    }else{
        return { ok: false, message: "Error al enviar el mail" };

    }
}else{
    return { ok: false, message: "Error al crear el token" };

}

}



const createVerificationToken = async (email)=>{
    const token = nanoid();
try {
    const verificationToken = await prisma.VerificationToken.create({
        data:{
            identifier: email, 
            token,
            expires:new Date(Date.now() + 1000 * 60 * 60 * 24),
        }
    })
    return {ok:true,verificationToken:verificationToken}
} catch (error) {
    console.log(error)
    return {ok:false}

}
   
}

const sendVerificationEmail = async (email,token)=>{
    try {
        const respEmail = await resend.emails.send({
          from: "Huellitas QR <onboarding@resend.dev>",
          to: email,
          subject: "Verificá tu cuenta",
          html: `
            <p>Hacé click en el link para verificar tu cuenta</p>
            <a href="${process.env.NEXTAUTH_URL}/auth/verify-email?token=${token}">Verificar</a>
          `,
        });
    console.log(respEmail)
        return {
          ok: true,
        };
      } catch (error) {
        console.log(error);
        return {
            ok: false,
        };
      }
}




export default router