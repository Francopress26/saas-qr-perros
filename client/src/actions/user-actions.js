"use server"

export const createUser = async ({ name, email, password }) => {
    console.log(name,email,password)
    try {
        const response = await fetch('http://localhost:3001/api/user', {
            method: 'POST', // Especifica el método HTTP
            headers: {
                'Content-Type': 'application/json', // Especifica que el cuerpo de la solicitud está en formato JSON
            },
            body: JSON.stringify({ name, email, password }), // Convierte los datos a una cadena JSON
        });
       const data = await response.json()
       return data;
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        return  {ok:false,message:"Error al hacer la petición"}
    }
};


export const validateUser = async ({email,password})=>{
    console.log(email,password)

    try {
        const response = await fetch('http://localhost:3001/api/user/auth', {
            method: 'POST', // Especifica el método HTTP
            headers: {
                'Content-Type': 'application/json',   // Especifica que el cuerpo de la solicitud está en formato JSON
            },
            body: JSON.stringify({ email, password }), // Convierte los datos a una cadena JSON
        });
       const data = await response.json()
       return data;
    } catch (error) {
        console.error('Error al autenticar el usuario:', error);
        return  {ok:false,message:"Error al hacer la petición"}
    }

}

export const getUser = async (email) => {
    try {
        const response = await fetch('http://localhost:3001/api/user/' + email, {
            method: 'GET', // Especifica el método HTTP
            headers: {
                'Content-Type': 'application/json', // Especifica que el cuerpo de la solicitud está en formato JSON
            },
        });

        if (!response.ok) { // Verifica si la respuesta no es exitosa
            throw new Error('Error al buscar el usuario: ' + response.statusText);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error al buscar el usuario:', error);
        return { ok: false, message: error.message }; // Retorna un objeto con un mensaje de error
    }
}

export const verificateEmail =  async (token)=>{

    try {
        const response = await fetch(`http://localhost:3001/api/user/verificate-email?token=${token}`, {
            method: 'POST', // Especifica el método HTTP
            headers: {
                'Content-Type': 'application/json', // Especifica que el cuerpo de la solicitud está en formato JSON
            }
        });
       const data = await response.json()
       return data;
    } catch (error) {
        console.error('Error al autenticar el usuario:', error);
        return {ok:false,message:"Error al hacer la petición"}; // Lanza el error para manejarlo en otra parte del código si es necesario
    }
}

export const sendContactMail = async (formValues)=>{
    try {
        const response = await fetch('http://localhost:3001/api/sendContactEmail', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',   
            },
            body: JSON.stringify(formValues), 
        });
       const data = await response.json()
       return data;
    } catch (error) {
        console.error('Error al hacer la petición:', error);
        return  {ok:false,message:"Error al hacer la petición"}
    }
}