import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";


{/*font-[family-name:var(--font-outfit)]*/}

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  redirect("/login");
  return (
   
      
      <></>
    
  );
}
