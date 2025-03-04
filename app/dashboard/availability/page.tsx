import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { requireUser } from "@/lib/hooks";
import { notFound } from "next/navigation";
import prisma from "@/lib/db";
import { AvailabilityForm } from "./AvailabilityForm";


async function getData(userId: string) {
  const data = await prisma.availability.findMany({
    where: {
      userId: userId
    },
  });
  if (!data) {
    return notFound();
  }
  return data;
}


export default async function AvailabilityPage() {

  const session = await requireUser();
  const data = await getData(session.user?.id as string);


  return (
    <Card>
      <CardHeader>
        <CardTitle>Availability</CardTitle>
        <CardDescription>Manage your availability</CardDescription>
      </CardHeader>
      <AvailabilityForm data={data} />
    </Card>
  )
}