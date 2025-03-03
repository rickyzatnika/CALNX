

import { RenderCalendar } from "@/app/components/bookingForm/RenderCalender";
import { Card, CardContent } from "@/components/ui/card";
import { TimeTable } from "@/app/components/bookingForm/TimeTable";
import { SubmitButton } from "@/app/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreateMeetingAction } from "@/lib/action";
import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/db";
import { CalendarX2, Clock, VideoIcon } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

async function getData(userName: string, eventUrl: string,) {
  const data = await prisma.eventType.findFirst({
    where: {
      url: eventUrl,
      User: {
        userName: userName,
      },
      active: true,
    },
    select: {
      id: true,
      title: true,
      description: true,
      duration: true,
      videoCallSoftware: true,
      User: {
        select: {
          image: true,
          name: true,
          availability: {
            select: {
              day: true,
              isActive: true,
            },
          },
        },
      },
    },
  });
  if (!data) {
    return notFound();
  }
  return data;
}

export default async function BookingFormRoute({
  params,
  searchParams,
}: {
  params: { username: string; eventUrl: string };
  searchParams: { date?: string; time?: string };
}) {

  const { username, eventUrl } = params;

  const data = await getData(username!, eventUrl!);

  const selectedDate = searchParams.date
    ? new Date(searchParams.date as string)
    : new Date();

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(selectedDate);

  const showForm = !!searchParams.date && !!searchParams.time;


  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      {showForm ? (
        <Card className="max-w-[600px] w-full">
          <CardContent className="p-5 md:grid md:grid-cols-[1fr,auto,1fr] gap-4">
            <div>
              <Image
                src={data.User?.image ?? "/person.jpg"}
                alt="Profile Image of user"
                className="w-14 h-14 rounded-full"
                width={14}
                height={14}
                priority={true}
              />
              <p className="text-sm font-medium text-muted-foreground mt-1">
                {data.User?.name}
              </p>
              <h1 className="text-xl font-semibold mt-2">{data.title}</h1>
              <p className="text-sm font-medium text-muted-foreground">
                {data.description}
              </p>

              <div className="mt-5 flex flex-col gap-y-3">
                <p className="flex items-center">
                  <CalendarX2 className="size-4 mr-2 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {formattedDate}
                  </span>
                </p>

                <p className="flex items-center">
                  <Clock className="size-4 mr-2 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {data.duration} Minutes
                  </span>
                </p>

                <p className="flex items-center">
                  <VideoIcon className="size-4 mr-2 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {data.videoCallSoftware}
                  </span>
                </p>
              </div>
            </div>

            <Separator orientation="vertical" className="h-full w-[1px]" />

            <form
              className="flex flex-col gap-y-4"
              action={CreateMeetingAction}
            >
              <input type="hidden" name="fromTime" value={searchParams.time} />
              <input type="hidden" name="eventDate" value={searchParams.date} />

              <input type="hidden" name="meetingLength" value={data.duration} />
              <input
                type="hidden"
                name="provider"
                value={data.videoCallSoftware}
              />

              <input type="hidden" name="username" value={params.username} />

              <input type="hidden" name="eventTypeId" value={data.id} />
              <div className="flex flex-col gap-y-2">
                <Label>Your Name</Label>
                <Input name="name" placeholder="Your Name" />
              </div>
              <div className="flex flex-col gap-y-2">
                <Label>Your Email</Label>
                <Input name="email" placeholder="johndoe@example.com" />
              </div>
              <SubmitButton className="w-full mt-5" text="Book Meeting" />
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card className="max-w-[1000px] w-full mx-auto">
          <CardContent className="p-5 md:grid md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4">
            <div>
              <Image src={data.User?.image ?? "/person.jpg"} alt="profile-image" width={75} height={50} priority={true} className="object-cover rounded-full w-14 h-14" />
              <p className="text-sm font-medium text-muted-foreground mt-1">
                {data.User?.name}
              </p>
              <h1 className="text-xl font-semibold mt-2">{data.title}</h1>
              <p className="text-sm font-medium text-muted-foreground">
                {data.description}
              </p>

              <div className="mt-5 flex flex-col gap-y-3">
                <p className="flex items-center">
                  <CalendarX2 className="size-4 mr-2 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {formattedDate}
                  </span>
                </p>

                <p className="flex items-center">
                  <Clock className="size-4 mr-2 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {data.duration} Minutes
                  </span>
                </p>

                <p className="flex items-center">
                  <VideoIcon className="size-4 mr-2 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {data.videoCallSoftware}
                  </span>
                </p>
              </div>
            </div>

            {/* -----------------------SEPARATOR--------------------------------- */}
            <Separator orientation="vertical" className="w-[2px] hidden md:block h-full" />
            <Separator className="w-full block md:hidden h-1 my-3" />
            {/* -----------------------SEPARATOR--------------------------------- */}
            <RenderCalendar availability={data.User?.availability as { day: string; isActive: boolean }[]} />

            {/* -----------------------SEPARATOR--------------------------------- */}
            <Separator orientation="vertical" className="w-[2px] hidden md:block h-full" />
            <Separator className="w-full block md:hidden h-1 my-3" />
            {/* -----------------------SEPARATOR--------------------------------- */}

            <TimeTable
              duration={data.duration}
              selectedDate={selectedDate}
              userName={username}
            />
          </CardContent>
        </Card>
      )}

    </div>

  )
}




