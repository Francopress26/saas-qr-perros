"use server"

export const getPets = async (userId) => {

  try {
    const response = await fetch(`http://localhost:3001/api/pet/${userId}`, {
        method: 'GET', // Método GET para obtener datos
        headers: {
            'Content-Type': 'application/json', // Aunque no es necesario para GET, es seguro mantenerlo
        },
    });

      const result = await response.json();
      if(!result.ok)return {ok:false,message:result.message}
      return {ok:true,pets:result.pets}
  } catch (error) {
    console.log(error)
    return {ok:false,message:"Error en el fetch"}
  }
}

export const createPet = async ( data ) => {
    try {
      const response = await fetch('http://localhost:3001/api/pet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      if(!result.ok)return {ok:false,message:result.message}
      return {ok:true,newPet:result.newPet}
    } catch (error) {
      console.error('Error:', error);
      throw error; // Lanza el error para manejarlo en otra parte del código
    }
  };


  export const getPetById= async(petId)=>{

    try {
      const response = await fetch(`http://localhost:3001/api/pet/id/${petId}`, {
        method: 'GET', // Método GET para obtener datos
        headers: {
            'Content-Type': 'application/json', // Aunque no es necesario para GET, es seguro mantenerlo
        },
    });

    const result = await response.json();
    if(!result.ok)return {ok:false,message:result.message}
    return {ok:true,pet:result.pet}

    } catch (error) {
      console.log(error)
      return {ok:false,message:"Error en el fetch"}
    }
  }

  export const editPet = async ( data ) => {
    try {
      const response = await fetch(`http://localhost:3001/api/pet/${data.petId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      if(!result.ok)return {ok:false,message:result.message}
      return {ok:true,updatedPet:result.updatedPet}
    } catch (error) {
      console.error('Error:', error);
      throw error; // Lanza el error para manejarlo en otra parte del código
    }
  };


  export const generateQRCode = async (petId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/generateQR/${petId}?e=T`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        return { ok: false };
      }
  
      const qrCodeImage = await response.text();
      return { ok: true, qrCodeSrc: qrCodeImage };
    } catch (error) {
      console.error('Error generating QR code:', error);
      return { ok: false };
    }
  };

  export const sendNotificationEmail = async(longitude,latitude,email)=>{
    console.log("entre a la accion")
    try {
      const response = await fetch(`http://localhost:3001/api/sendNotification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({longitude,latitude,email})
      });
  
      if (!response.ok) {
        return { ok: false };
      }
  
     
      return { ok: true};
    } catch (error) {
      console.error('Error al enviar email:', error);
      return { ok: false };
    }
  }