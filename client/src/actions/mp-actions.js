"use server"

export const createPlan = async ( plan ) => {
const planid = plan
    try {
        const response = await fetch('http://localhost:3001/api/process_payment/' + planid, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const {ok,plan} = await response.json();
    
        if(ok){
            console.log(plan)
            return {ok:true,plan:plan}
        }
        return {ok:false,plan:"Error al crear el plan"}
       
      } catch (error) {

        console.log(error)
    }
   };


