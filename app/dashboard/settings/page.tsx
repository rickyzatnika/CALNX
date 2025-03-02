
import { SettingForm } from "./SettingForm";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/hooks";
import prisma from "@/lib/db";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";


async function getData(id: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: id
    },
    select: {
      name: true,
      email: true,
      image: true,
    }
  })
  if (!data) {
    return notFound();
  }
  return data;
}


export default async function SettingsPage() {

  const session = await requireUser()

  const data = await getData(session.user?.id as string)

  return (

    <Suspense fallback={<div className="flex gap-2 items-center"> <Loader2 className="size-8 animate-spin" /> Loading...</div>}>
      <SettingForm email={data.email} fullName={data.name as string} profileImage={data.image as string} />
    </Suspense>

  )
}