import React from 'react'
import { auth } from "@/auth/auth";
import SignOutButton from "@/components/SignOutButton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import Link from "next/link";
import { IoMenu } from "react-icons/io5";
import { FaUser } from 'react-icons/fa';
const ProfileNavBar = async () => {
const session = await auth()
  return (
    <Navbar shouldHideOnScroll>

    <NavbarContent>
        <NavbarBrand>
            <Link href="/" className="font-bold text-inherit text-2xl">HUELLITAS</Link>
        </NavbarBrand>
        </NavbarContent>
    
    <NavbarContent>
    </NavbarContent>
    
    <NavbarContent justify="end">
    {
        session && (

    <DropdownMenu>
      <DropdownMenuTrigger>
      <Avatar>
    <AvatarFallback><FaUser />
    </AvatarFallback>
    
    </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
      <DropdownMenuItem className="flex items-center justify-center"><Link href={"/profile/" + session.user.userId}>Mi perfil</Link></DropdownMenuItem>

        <DropdownMenuItem className="flex items-center justify-center"><SignOutButton></SignOutButton></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
        )
    }

    
    </NavbarContent>
    </Navbar>
  )
}

export default ProfileNavBar