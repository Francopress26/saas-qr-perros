//GET PET
//GET PETS
//POST PET
//PUT PET
//DELETE PET
//BLOCK PET


import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { configDotenv } from "dotenv";
import QRCode from 'qrcode'
import nodemailer from 'nodemailer'
const prisma = new PrismaClient();
import { Resend } from "resend";

const router = Router();
const resend = new Resend(process.env.AUTH_RESEND_KEY);

router.get('/pet/:userid', async (req, res) => {
  const userid = req.params.userid;

  try {
    const pets = await prisma.Mascota.findMany({
      where: {
        userId: userid
      }
    });

    console.log(pets);

    if (!pets || pets.length === 0) {
      return res.json({ ok: true, pets: [] });
    }

    return res.json({ ok: true, pets: pets });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ ok: false, message: "Error en el servidor" });
  }
});

//Get pet by id
router.get('/pet/id/:petid', async (req, res) => {
  const petId = req.params.petid;

  try {
    const pet = await prisma.Mascota.findUnique({
      where: {
        id: Number(petId)
      }
    });

    console.log(pet);

    if (!pet) { return { ok: false, message: "Mascota no encontrada" } }

    return res.json({ ok: true, pet: pet });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ ok: false, message: "Error en el servidor" });
  }
});



router.post('/pet', async (req, res) => {
  try {
    const { userId, nombre, datos_extra, zona, contacto, email_contacto, imageURL } = req.body;


    // Validaciones
    if (!userId || !nombre || !contacto || !email_contacto) {
      return res.status(400).json({ ok: false, message: 'Todos los campos obligatorios deben estar presentes.' });
    }

    // Verificar si el usuario existe
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ ok: false, message: 'Usuario no encontrado.' });
    }

    // Crear la mascota
    const newPet = await prisma.Mascota.create({
      data: {
        nombre,
        datos_extra,
        zona,
        contacto,
        email_contacto,
        imageURL,
        user: {
          connect: { id: userId }, // Relaciona la mascota con el usuario
        },
      },
    });

    return res.status(201).json({ ok: true, newPet: newPet });
  } catch (error) {
    console.error('Error al crear la mascota:', error);
    return res.status(500).json({ ok: false, message: error.message });
  }
});



router.put('/pet/:petId', async (req, res) => {
  const petId = req.params.petId;

  try {
    const { userId, nombre, datos_extra, zona, contacto, email_contacto, imageURL } = req.body;


    // Validaciones
    if (!userId || !nombre || !contacto || !email_contacto) {
      return res.status(400).json({ ok: false, message: 'Todos los campos obligatorios deben estar presentes.' });
    }

    // Verificar si el usuario existe
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ ok: false, message: 'Usuario no encontrado.' });
    }

    // Crear la mascota
    const updatedPet = await prisma.Mascota.update({
      data: {
        nombre,
        datos_extra,
        zona,
        contacto,
        email_contacto,
        imageURL,
      },
      where: {
        id: Number(petId)
      }
    });

    return res.status(201).json({ ok: true, updatedPet: updatedPet });
  } catch (error) {
    console.error('Error al editar la mascota:', error);
    return res.status(500).json({ ok: false, message: error.message });
  }
});


router.post('/generateQR/:petId', async (req, res) => {
  try {
    const petId = req.params.petId;
    const url = process.env.NEXTAUTH_URL + "/pet/" + petId;

    const qrCodeImage = await QRCode.toDataURL(url);
    res.send(qrCodeImage); // Solo envía el `src` de la imagen
  } catch (err) {
    console.error('Error generating QR code:', err);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/sendNotification/', async (req, res) => {
  const { latitude, longitude, email_contacto } = req.body
  try {
    const mapsLink = `https://www.google.com/maps?q=${longitude},${latitude}`;
    console.log(mapsLink);
    const respEmail = await resend.emails.send({
      from: "Huellitas QR <onboarding@resend.dev>",
      to: "francopress266@gmail.com",
      subject: "Tu mascota fue scaneada",
      html: `
    <p>Esta es su ubicación:</p>
    <a href="${mapsLink}" target="_blank">Ver ubicación en Google Maps</a>
  `,
    });
    console.log(respEmail)
    return { ok: true }
  } catch (err) {
    console.error('Error enviando mail:', err);
    return { ok: false }
  }
});



//Pausar o despausar pet


export default router