import ProfileNavBar from "@/components/ProfileNavBar"

export const metadata = {
  title: "Datos de tu mascota",
  description: "Datos sobre la mascota del cliente",
};
export default function PetLayout({ children}) {





    return (
      <>
       <ProfileNavBar></ProfileNavBar>
      <section>

        {children}
      </section>
      </>
    )
  }