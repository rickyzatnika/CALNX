/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { prisma } from "./db"
import { requireUser } from "./hooks"
import { parseWithZod } from '@conform-to/zod'
import { onboardingSchemaValidation, settingsSchema } from "./zodSchemas"
import { redirect } from "next/navigation"


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
    }
  })

  return redirect('/onboarding/grant-id')

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
    }
  })
  return redirect('/dashboard')
}