"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { IoQrCodeOutline } from "react-icons/io5";
import { Button } from '@/components/ui/button';
import { CiEdit } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa";
import { generateQRCode } from '@/actions/pet-actions';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";

const PetListItem = ({ id, nombre }) => {
  const [qrCodeSrc, setQrCodeSrc] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleButton = async () => {
    const qrCode = await generateQRCode(id);
    if (!qrCode?.ok) return console.log("error");
    setQrCodeSrc(qrCode.qrCodeSrc);
    onOpen();
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = qrCodeSrc;
    link.download = `QRCode_${id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className='flex items-center justify-between p-4 bg-white rounded-lg shadow-md'>
        <Link href={`/pet/${id}`} className='text-xl font-bold hover:underline lg:text-2xl'>
          {nombre}
        </Link>
        <div className='flex space-x-2'>
          <Button size="sm" variant="outline">
            <Link href={`/pet/${id}`}>
              <FaRegEye size={20} />
            </Link>
          </Button>
          <Button size="sm" variant="outline">
            <Link href={`/pet/edit/${id}`}>
              <CiEdit size={20} />
            </Link>
          </Button>
          <Button size="sm" variant="outline" onClick={handleButton}>
            <IoQrCodeOutline size={20} />
          </Button>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Codigo QR</ModalHeader>
          <ModalBody>
            {qrCodeSrc ? (
              <>
                <img src={qrCodeSrc} alt="QR Code" className="w-full"/>
                <Button onClick={handleDownload} className="mt-4 bg-[#004e89] text-white text-xl">Descargar</Button>
              </>
            ) : (
              "Loading..."
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onClick={onClose}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PetListItem;