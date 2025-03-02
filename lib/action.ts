/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { requireUser } from "./hooks"
import { parseWithZod } from '@conform-to/zod'
import { onboardingSchemaValidation, settingsSchema } from "./zodSchemas"
import { redirect } from "next/navigation"
import prisma from "./db"
import { revalidatePath } from "next/cache"


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
              day: 'Sunday',
              fromTime: '08:00',
              tillTime: '18:00',
            },
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




//BEFORE ------
// export async function updateAvailability(formData: FormData) {

//   const rawData = Object.fromEntries(formData.entries());

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
//     await prisma.$transaction(
//       availabilityData.map((item) => prisma.availability.update({
//         where: {
//           id: item.id
//         },
//         data: {
//           isActive: item.isActive,
//           fromTime: item.fromTime,
//           tillTime: item.tillTime
//         }
//       }))
//     );
//     return revalidatePath('/dashboard/availability')
//   } catch (error) {
//     console.log(error);
//   }
// }


// export async function updateAvailability(formData: FormData) {

//   const rawData = Object.fromEntries(formData.entries());

//   const availabilityData = Object.keys(rawData)
//     .filter((key) => key.startsWith("id-"))
//     .map((key) => {
//       const id = key.replace("id-", "");
//       return {
//         id,
//         isActive: rawData[`isActive-${id}`] === "on",
//         fromTime: rawData[`fromTime-${id}`]?.toString() || null,
//         tillTime: rawData[`tillTime-${id}`]?.toString() || null,
//       };
//     })
//     .filter((item) => item.fromTime && item.tillTime); // Pastikan tidak ada null values
//   try {
//     await prisma.$transaction(
//       availabilityData.map((item) => prisma.availability.update({
//         where: {
//           id: item.id
//         },
//         data: {
//           isActive: item.isActive,
//           fromTime: item.fromTime!,
//           tillTime: item.tillTime!,
//         }
//       }))
//     );
//     return revalidatePath('/dashboard/availability')
//   } catch (error) {
//     console.log(error);
//   }
// }


export async function updateAvailability(formData: FormData): Promise<void> {

  // Konversi FormData ke object
  const rawData = Object.fromEntries(formData.entries());

  // Parsing data dari form
  const availabilityData = Object.keys(rawData)
    .filter((key) => key.startsWith("id-"))
    .map((key) => {
      const id = key.replace("id-", "");
      return {
        id,
        isActive: rawData[`isActive-${id}`] === "on",
        fromTime: rawData[`fromTime-${id}`] as string,
        tillTime: rawData[`tillTime-${id}`] as string,
      };
    });

  try {
    // Ambil semua data lama terlebih dahulu dalam satu query
    const existingData = await prisma.availability.findMany({
      where: {
        id: { in: availabilityData.map((item) => item.id) }
      },
      select: { id: true, isActive: true, fromTime: true, tillTime: true },

    });

    // Filter hanya data yang berubah
    const updates = availabilityData
      .filter((item) => {
        const existing = existingData.find((e) => e.id === item.id);
        return (
          !existing ||
          existing.isActive !== item.isActive ||
          existing.fromTime !== item.fromTime ||
          existing.tillTime !== item.tillTime
        );
      })
      .map((item) => prisma.availability.update({
        where: { id: item.id },
        data: {
          isActive: item.isActive,
          fromTime: item.fromTime,
          tillTime: item.tillTime
        }
      }));

    // Jalankan transaksi jika ada perubahan
    if (updates.length > 0) {
      await prisma.$transaction(updates);
    }
    return revalidatePath('/dashboard/availability');

  } catch (error) {
    console.error("Error updating availability:", error);
  }
}