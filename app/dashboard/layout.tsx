
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { DashboardLinks } from "../components/DashboardLinks";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { LogOut, MenuIcon } from "lucide-react";
import { DarkmodeToggle } from "../components/DarkmodeToggle";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { signOut } from "@/auth";
import { redirect } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";
import prisma from "@/lib/db";
import { requireUser } from "@/lib/hooks";
import LogoDisplay from "../components/LogoDisplay";
import { PathnameDisplay } from "../components/PathnameDisplay";


async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      userName: true,
      grantId: true,
    }
  })
  if (!data?.userName) {
    return redirect('/onboarding')
  }

  if (!data?.grantId) {
    return redirect('/onboarding/grant-id')
  }

  return data;
}


export default async function DashboardLayout({ children }: { children: React.ReactNode }) {

  const session = await requireUser();
  await getData(session.user?.id as string);

  return (
    <>
      <div className="min-h-screen w-full grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]" >
        <div className="hidden md:block border-r border-accent bg-muted/40">
          <div className="flex h-full max-h-screen flex-col gap-2 ">
            <div className="flex h-14 items-center justify-between border-b border-accent px-4  lg:h-[60px] lg:px-6">
              <Link href="/">
                <LogoDisplay />
              </Link>
            </div>
            <div className="flex-1 relative">
              <nav className="grid items-start px-2 lg:px-4">
                <DashboardLinks />
                <form className="w-full absolute bottom-4 left-0 right-0 px-2 lg:px-4" action={async () => {
                  "use server"
                  await signOut();
                }}>
                  <Button className="w-full text-left cursor-pointer"> <LogOut className="size-4 mr-2" /> Logout</Button>
                </form>
              </nav>

            </div>
          </div>
        </div>

        <div className="flex flex-col ">
          <header className="relative flex h-14 items-center gap-4 border-b border-accent bg-muted/40  px-4 lg:h-[60px] lg:px-6">

            <Sheet>
              <SheetTrigger asChild >
                <MenuIcon className="size-8 cursor-pointer block md:hidden" />
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col px-4 ">
                <SheetTitle className=" border-b border-accent pb-2 py-3 flex items-center gap-2">
                  {session?.user?.image && (<Image src={session?.user?.image} alt="profile-image" width={10} height={10} priority={true} className="rounded-full w-8 h-8" />)}
                  {session?.user?.name}
                </SheetTitle>
                <nav className="grid gap-2">
                  <DashboardLinks />
                </nav>
                <form className="w-full absolute bottom-4 left-0 right-0 px-4" action={async () => {
                  "use server"
                  await signOut();
                }}>
                  <Button className="w-full text-left cursor-pointer"> <LogOut className="size-4 mr-2" /> Logout</Button>
                </form>
              </SheetContent>
            </Sheet>
            <PathnameDisplay />
            <div className="ml-auto flex items-center gap-x-4 ">

              <DarkmodeToggle />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="secondary" className="rounded-full outline-0 border-accent ring-accent">
                    <Image src={session?.user?.image as string} alt="Profile Image" width={75} height={50} className="object-cover w-full h-full rounded-full" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="border-accent space-y-1" >
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild >
                    <Link href="/dashboard/settings" >Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <form className="w-full" action={async () => {
                      "use server"
                      await signOut();
                    }}>
                      <button className="w-full text-left cursor-pointer" >Logout</button>
                    </form>
                  </DropdownMenuItem>

                </DropdownMenuContent>
              </DropdownMenu>

            </div>
          </header>

          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 ">
            {children}
          </main>
        </div >
      </div >
      <Toaster closeButton />
    </>
  )
}