import { FOOTER_CONTACT_INFO, FOOTER_LINKS, SOCIALS } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-800  text-white py-8">
      <div className=" py-4">
        <p className="text-center text-sm lg:text-md">
        &copy; 2024 Huellitas | All rights reserved
        </p>
      </div>
    </footer>
  )
}

export default Footer
