
import React from 'react'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button } from "@nextui-org/react";
import { IoMenu } from "react-icons/io5";

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { auth } from '@/auth/auth';
import SignOutButton from './SignOutButton';
import { cn } from '@/lib/utils';
import { FaUser } from "react-icons/fa";

const NavBar = async () => {

    const menuLinks = [
        { title: "Beneficios", href: "/", description: "Te contamos por que somos la mejor opcion para tu mascota" },
        { title: "Contactanos", href: "/", description: "Ponete en contacto para que podamos darte una oferta" },
        { title: "FAQ", href: "/", description: "Respondemos las preguntas mas frecuentes" },
        { title: "Precios", href: "/", description: "Consulta los distintos planes que tenemos" },


    ]
    const session = await auth()
    return (
        <Navbar shouldHideOnScroll>

            <NavbarContent>
                <Sheet key="left">
                    <SheetTrigger className='sm:hidden'><IoMenu size={25} /></SheetTrigger>
                    <SheetContent side="left">
                        {menuLinks.map((item, index) => (
                            <SheetHeader className="text-start" key={`${item}-${index}`}>
                                <SheetTitle>

                                    <Link
                                        href={item.href}
                                        size="lg"
                                    >
                                        {item.title}
                                    </Link>
                                </SheetTitle>
                                <SheetDescription>
                                </SheetDescription>
                            </SheetHeader>
                        ))}
                    </SheetContent>
                </Sheet>
                <NavbarBrand>
                    <Link href="/" className="font-bold text-inherit text-2xl">HUELLITAS</Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem >
                    <Link href="/"
                        className="text-xl font-medium leading-none pt-1"
                    >
                        Inicio
                    </Link>
                </NavbarItem>
                <NavigationMenu>

                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="text-xl">Sobre nosotros</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                {menuLinks.map((component) => (
                                    <ListItem
                                        key={component.title}
                                        title={component.title}
                                        href={component.href}
                                    >
                                        {component.description}
                                    </ListItem>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenu>
         
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem className=' '>
                { session && (

<DropdownMenu >
  <DropdownMenuTrigger>
  <Avatar>
<AvatarFallback><FaUser />
</AvatarFallback>

</Avatar>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel className="text-center"><Link className='text-center' href={"/profile/" + session.user.userId}>Mi perfil</Link></DropdownMenuLabel>
    <DropdownMenuSeparator />

    <DropdownMenuItem className="flex items-center justify-center"><SignOutButton></SignOutButton></DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
    )}

                {
        !session && (
            <DropdownMenu>
            <DropdownMenuTrigger>
            <Avatar>
          <AvatarFallback><FaUser />
          </AvatarFallback>
          
          </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuSeparator />
              <DropdownMenuItem><Link href="/auth/sign-in">Iniciar sesión </Link></DropdownMenuItem>
              <DropdownMenuItem><Link href="/auth/sign-up">Registrarse </Link></DropdownMenuItem>

            </DropdownMenuContent>
          </DropdownMenu>
        )
    }

                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}
const ListItem = (({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-2xl font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-lg leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"
export default NavBar