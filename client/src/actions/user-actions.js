"use server"

export const createUser = async ({ name, email, password }) => {
    console.log(name,email,password)
    try {
        const response = await fetch('http://localhost:3001/api/user', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({ name, email, password }), 
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
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',   
            },
            body: JSON.stringify({ email, password }), 
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
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json', 
            },
        });

        if (!response.ok) { 
            throw new Error('Error al buscar el usuario: ' + response.statusText);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error al buscar el usuario:', error);
        return { ok: false, message: error.message }; 
    }
}

export const verificateEmail =  async (token)=>{

    try {
        const response = await fetch(`http://localhost:3001/api/user/verificate-email?token=${token}`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
            }
        });
       const data = await response.json()
       return data;
    } catch (error) {
        console.error('Error al autenticar el usuario:', error);
        return {ok:false,message:"Error al hacer la petición"}; 
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