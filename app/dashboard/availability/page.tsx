import { SubmitButton } from "@/app/components/SubmitButton";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { updateAvailability } from "@/lib/action";
import { requireUser } from "@/lib/hooks";
import { times } from "@/lib/time";
import { notFound } from "next/navigation";
import prisma from "@/lib/db";


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
      <form action={updateAvailability}>
        <CardContent className="flex flex-col gap-y-4">
          {data.map((item) => (
            <div key={item.id} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center gap-4 ">
              <div className="flex items-center gap-x-3">
                <input type="hidden" hidden name={`id-${item.id}`} value={item.id} />
                <Switch name={`isActive-${item.id}`} defaultChecked={item.isActive} className="cursor-pointer" />
                <p>{item.day}</p>
              </div>
              <Select name={`fromTime-${item.id}`} defaultValue={item.fromTime}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="From Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {times.map((time) => (
                      <SelectItem key={time.id} value={time.time}>
                        {time.time}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              {/* ------------- */}

              <Select name={`tillTime-${item.id}`} defaultValue={item.tillTime}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Till Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {times.map((time) => (
                      <SelectItem key={time.id} value={time.time}>
                        {time.time}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          ))}
        </CardContent>
        <CardFooter className="w-full">
          <SubmitButton text="Save Changes" className=" mt-5 text-white bg-indigo-400/80 hover:bg-indigo-400 shadow-black/30 hover:shadow-black/50 shadow-md transition-all duration-150 " />
        </CardFooter>
      </form>
    </Card>
  )
}