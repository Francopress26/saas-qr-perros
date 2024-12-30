'use client'
import { loadMercadoPago } from "@mercadopago/sdk-js";
import React, { useEffect } from 'react';
import { Button } from "../ui/button";
import { createPlan } from "@/actions/mp-actions";
import { useRouter } from "next/navigation";

const MpButton = ({init_point}) => {
  const router = useRouter()
  const handleSub = async () => {
    
      router.push(init_point)
  }
  return (

    <Button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 lg:text-2xl" onClick={() => handleSub()}>Elegir  plan </Button>
  );
};

export default MpButton;
