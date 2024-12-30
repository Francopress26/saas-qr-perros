"use server";
import { signIn , signOut } from "./auth.js";

export async function loginAction(values) {
    try {
      await signIn("credentials", {
        email:values.email,
        password:values.password,
        redirect:false
    });
    return { success: true };

    } catch (error) {
      if (error ) {
        return { error: error.cause?.err?.message };
      }
      return { error: "error 500" };
    }

}

export async function signOutAction() {
  await signOut();
}