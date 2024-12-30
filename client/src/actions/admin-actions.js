"use server"

//Busqueda a usuario x mail y que me traiga todos los datos

export const findUserByEmail = async(email)=>{
    
    if(!email) return {ok:false,message:"Email invalido"}

    try {
        const response = await fetch('http://localhost:3001/api/find-user?email='+email, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });  
          const data = await response.json()
          if(!data.ok) return {ok:false,message:data.message}

          return {ok:true,userData:data.userData}
    } catch (error) {
        console.log(error)
        return {ok:false,messsage:"Error al hacer petición"}
    }
}

export const getSubscriptions = async({reason,status,userId})=>{

console.log(reason,status,userId)
  try {
    const response = await fetch(`http://localhost:3001/api/subscriptions?reason=${reason}&status=${status}&userId=${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });  
      const data = await response.json()
      if(!data.ok) return {ok:false,message:data.message}

      return {ok:true,subscriptions:data.subscriptions}
} catch (error) {
    console.log(error)
    return {ok:false,messsage:"Error al hacer petición"}
}
}


//Get all pets

//Crear usuario 

//Update subs

//Consultar sub

//Create pet