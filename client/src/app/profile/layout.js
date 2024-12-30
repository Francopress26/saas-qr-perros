import ProfileNavBar from "@/components/ProfileNavBar"
export const metadata = {
  title: "Tu perfil",
  description: "Perfil del cliente",
};

export default function ProfileLayout({ children}) {// will be a page or nested layout





    return (
      <>
       <ProfileNavBar></ProfileNavBar>
      <section>
        {/* Include shared UI here e.g. a header or sidebar */}

        {children}
      </section>
      </>
    )
  }