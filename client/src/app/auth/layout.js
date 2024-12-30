import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import Link from "next/link";

export default function AuthLayout({ children}) {// will be a page or nested layout
   
    return (
      <>
      <Navbar >

<NavbarContent>
    <NavbarBrand>
        <Link href="/" className="font-bold text-2xl text-inherit">HUELLITAS</Link>
    </NavbarBrand>
</NavbarContent>


</Navbar>
      <section>
        {/* Include shared UI here e.g. a header or sidebar */}
   
        {children}
      </section>
      </>
    )
  }