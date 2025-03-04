/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { requireUser } from "./hooks"
import { parseWithZod } from '@conform-to/zod'
import { eventTypeSchema, onboardingSchemaValidation, settingsSchema } from "./zodSchemas"
import { redirect } from "next/navigation"

import { revalidatePath } from "next/cache"

import prisma from "./db"
import { nylas } from "./nylas"


export async function OnboardingAction(prevState: any, formData: FormData) {

  const session = await requireUser()

  const submission = await parseWithZod(formData, {
    schema: onboardingSchemaValidation({
      async isUserNameUnique() {
        const existingUsername = await prisma.user.findUnique({
          where: {
            userName: formData.get("userName") as string,
          },
        });
        return !existingUsername
      },
    }),
    async: true
  })

  if (submission.status !== "success") {
    return submission.reply();
  }

  await prisma.user.update({
    where: {
      id: session.user?.id
    },
    data: {
      userName: submission.value.userName,
      name: submission.value.fullName,
      availability: {
        createMany: {
          data: [
            {
              day: 'Monday',
              fromTime: '08:00',
              tillTime: '18:00',
            },
            {
              day: 'Tuesday',
              fromTime: '08:00',
              tillTime: '18:00',
            },
            {
              day: 'Wednesday',
              fromTime: '08:00',
              tillTime: '18:00',
            },
            {
              day: 'Thursday',
              fromTime: '08:00',
              tillTime: '18:00',
            },
            {
              day: 'Friday',
              fromTime: '08:00',
              tillTime: '18:00',
            },
            {
              day: 'Saturday',
              fromTime: '08:00',
              tillTime: '18:00',
            },
            {
              day: 'Sunday',
              fromTime: '08:00',
              tillTime: '18:00',
            },
          ]
        }
      }
    },
  });
  return redirect('/onboarding/grant-id');
}


export async function SettingsAction(prevState: any, formData: FormData) {

  const session = await requireUser()

  const submission = parseWithZod(formData, {
    schema: settingsSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }
  await prisma.user.update({
    where: {
      id: session.user?.id
    },
    data: {
      name: submission.value.fullName,
      image: submission.value.profileImage,
    },
  });
  return redirect('/dashboard');
}

export async function updateAvailability(formData: FormData) {

  const rawData = Object.fromEntries(formData.entries());

  const availabilityData = Object.keys(rawData)
    .filter((key) => key.startsWith("id-"))
    .map((key) => {
      const id = key.replace("id-", "");
      return {
        id,
        isActive: rawData[`isActive-${id}`] === "on",
        fromTime: rawData[`fromTime-${id}`]?.toString() || null,
        tillTime: rawData[`tillTime-${id}`]?.toString() || null,
      };
    })
    .filter((item) => item.fromTime && item.tillTime); // Pastikan tidak ada null values

  await prisma.$transaction(
    availabilityData.map((item) => prisma.availability.update({
      where: {
        id: item.id
      },
      data: {
        isActive: item.isActive,
        fromTime: item.fromTime!,
        tillTime: item.tillTime!,
      }
    }))
  );
  return revalidatePath('/dashboard/availability');
}


// export async function updateAvailability(formData: FormData): Promise<void> {

//   // Konversi FormData ke object
//   const rawData = Object.fromEntries(formData.entries());

//   // Parsing data dari form
//   const availabilityData = Object.keys(rawData)
//     .filter((key) => key.startsWith("id-"))
//     .map((key) => {
//       const id = key.replace("id-", "");
//       return {
//         id,
//         isActive: rawData[`isActive-${id}`] === "on",
//         fromTime: rawData[`fromTime-${id}`] as string,
//         tillTime: rawData[`tillTime-${id}`] as string,
//       };
//     });

//   try {
//     // Ambil semua data lama terlebih dahulu dalam satu query
//     const existingData = await prisma.availability.findMany({
//       where: {
//         id: { in: availabilityData.map((item) => item.id) }
//       },
//       select: { id: true, isActive: true, fromTime: true, tillTime: true },

//     });

//     // Filter hanya data yang berubah
//     const updates = availabilityData
//       .filter((item) => {
//         const existing = existingData.find((e) => e.id === item.id);
//         return (
//           !existing ||
//           existing.isActive !== item.isActive ||
//           existing.fromTime !== item.fromTime ||
//           existing.tillTime !== item.tillTime
//         );
//       })
//       .map((item) => prisma.availability.update({
//         where: { id: item.id },
//         data: {
//           isActive: item.isActive,
//           fromTime: item.fromTime,
//           tillTime: item.tillTime
//         }
//       }));

//     // Jalankan transaksi jika ada perubahan
//     if (updates.length > 0) {
//       await prisma.$transaction(updates);
//     }
//     return revalidatePath('/dashboard/availability');

//   } catch (error) {
//     if (error instanceof Error) {
//       console.log(error.message);
//     } else {
//       console.log(String(error));
//     }
//   }
// }




export async function CreateEventType(prevState: any, formData: FormData) {
  const session = await requireUser();

  const submission = parseWithZod(formData, {
    schema: eventTypeSchema,
  })

  if (submission.status !== "success") {
    return submission.reply();
  }
  await prisma.eventType.create({
    data: {
      title: submission.value.title,
      description: submission.value.description,
      duration: submission.value.duration,
      url: submission.value.url,
      videoCallSoftware: submission.value.videoCallSoftware,
      userId: session.user?.id
    },
  });
  return redirect('/dashboard');
};



export async function UpdateEventTypeStatusAction(
  prevState: any,
  {
    eventTypeId,
    isChecked,
  }: {
    eventTypeId: string;
    isChecked: boolean;
  }
) {
  const session = await requireUser();

  await prisma.eventType.update({
    where: {
      id: eventTypeId,
      userId: session.user?.id as string,
    },
    data: {
      active: isChecked,
    },
  });

  revalidatePath(`/dashboard`);
  return {
    status: "success",
    message: "EventType Status updated successfully",
  };
};


export async function CreateMeetingAction(formData: FormData) {
  const getUserData = await prisma.user.findUnique({
    where: {
      userName: formData.get("username") as string,
    },
    select: {
      grantEmail: true,
      grantId: true,
    },
  });

  if (!getUserData) {
    throw new Error("User not Found");
  };

  const eventTypeData = await prisma.eventType.findUnique({
    where: {
      id: formData.get("eventTypeId") as string,
    },
    select: {
      title: true,
      description: true,
    },
  });

  const fromTime = formData.get("fromTime") as string;
  const eventDate = formData.get("eventDate") as string;
  const meetingLength = Number(formData.get("meetingLength"));
  const provider = formData.get("provider") as string;
  const startDateTime = new Date(`${eventDate}T${fromTime}:00`);
  const endDateTime = new Date(startDateTime.getTime() + meetingLength * 60000);

  await nylas.events.create({
    identifier: getUserData.grantId as string,
    requestBody: {
      title: eventTypeData?.title,
      description: eventTypeData?.description,
      when: {
        startTime: Math.floor(startDateTime.getTime() / 1000),
        endTime: Math.floor(endDateTime.getTime() / 1000),
      },
      conferencing: {
        autocreate: {},
        provider: provider as any,
      },
      participants: [
        {
          name: formData.get("name") as string,
          email: formData.get("email") as string,
          status: "yes",
        },
      ],
    },
    queryParams: {
      calendarId: getUserData.grantEmail as string,
      notifyParticipants: true,
    },
  });
  return redirect("/success");
};



export async function cancelMeetingAction(formData: FormData) {
  const session = await requireUser();

  const userData = await prisma.user.findUnique({
    where: {
      id: session.user?.id,
    },
    select: {
      grantEmail: true,
      grantId: true,
    },
  });

  if (!userData) {
    throw new Error("User not found");
  };

  const data = await nylas.events.destroy({
    eventId: formData.get("eventId") as string,
    identifier: userData.grantId as string,
    queryParams: {
      calendarId: userData.grantEmail as string,
    },
  });

  return revalidatePath("/dashboard/meetings");

};

export async function EditEventTypeAction(prevState: any, formData: FormData) {
  const session = await requireUser();

  const submission = parseWithZod(formData, {
    schema: eventTypeSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  };

  const data = await prisma.eventType.update({
    where: {
      id: formData.get("id") as string,
      userId: session.user?.id,
    },
    data: {
      title: submission.value.title,
      duration: submission.value.duration,
      url: submission.value.url,
      description: submission.value.description,
      videoCallSoftware: submission.value.videoCallSoftware,
    },
  });

  return redirect("/dashboard");
};


export async function DeleteEventTypeAction(formData: FormData) {
  const session = await requireUser();

  await prisma.eventType.delete({
    where: {
      id: formData.get("id") as string,
      userId: session.user?.id,
    },
  });

  return redirect("/dashboard");
};
