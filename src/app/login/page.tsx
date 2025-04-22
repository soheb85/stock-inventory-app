'use client'
import { useState } from "react";
import { signIn } from "next-auth/react";
import { ErrorAlert } from "@/components/ErrorAlert";
import Footer from "@/components/Footer";

export default function LoginPage() {
   
    const [showError, setShowError] = useState(false)
  
    const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault()
  
      const form = new FormData(e.currentTarget as HTMLFormElement)
      const result = await signIn("credentials",{
        email:form.get("email"),
        password:form.get("password"),
        redirect:false,
      });
      
  
  
      if (result?.error) {
        setShowError(true)
      } else {
        window.location.href= "/dashboard"
      }
    }

  return (
    <>
    <div className="min-h-screen flex flex-col gap-40 items-center justify-center font-[family-name:var(--font-outfit)]">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow dark:bg-primary-foreground dark:text-foreground border-1 w-[350px]">
      {showError && <ErrorAlert/>}
        <h2 className="text-xl font-bold mb-4 text-center mt-4">Abs Stock Management</h2>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-4 rounded-sm"
          name="email"
          autoComplete="email"
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-4 rounded-sm"
          name="password"
          required
          autoComplete="current-password"
        />
        <button className="bg-green-500 py-2 px-4 rounded w-full text-slate-800 font-semibold">Login</button>
      </form>
      <Footer/>
    </div>
    
    </>
  );
}

