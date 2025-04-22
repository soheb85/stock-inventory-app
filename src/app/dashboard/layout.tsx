
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Footer from "@/components/Footer";




export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }
  return (
    <div>
        <SidebarProvider>
          <AppSidebar />
          <main className="w-full min-h-screen p-4">


            <SidebarTrigger />
            {children}
          </main>
        </SidebarProvider>
        <div className="mt-10 w-full flex justify-center items-center font-[family-name:var(--font-outfit)]">
        <h1 className="w-[250px] border-1 text-center h-[30px] rounded-md font-medium bg-red-600 dark:text-slate-900">
        User - {session.user.email}
        </h1>
        </div>
        <div className="mt-8">
            <Footer/>
            </div>
        </div>
      
  );
}
