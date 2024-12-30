import ProfileNavBar from "@/components/ProfileNavBar"

export const metadata = {
  title: "Datos de tu mascota",
  description: "Datos sobre la mascota del cliente",
};
export default function PetLayout({ children}) {// will be a page or nested layout





    return (
      <>
       <ProfileNavBar></ProfileNavBar>
      <section>

        {children}
      </section>
      </>
    )
  }