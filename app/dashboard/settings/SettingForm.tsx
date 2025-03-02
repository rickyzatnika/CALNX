/* eslint-disable @next/next/no-img-element */
"use client"

import { SubmitButton } from "@/app/components/SubmitButton"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SettingsAction } from "@/lib/action"
import { UploadDropzone } from "@/lib/uploadthing"
import { settingsSchema } from "@/lib/zodSchemas"
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod"
import { Label } from "@radix-ui/react-dropdown-menu"
import { X } from "lucide-react"
import Image from "next/image"
import { useActionState, useState } from "react"
import { toast } from "sonner"



interface iAppProps {
  fullName: string,
  email: string,
  profileImage: string
}

export function SettingForm({ email, fullName, profileImage }: iAppProps) {


  const [lastResult, action] = useActionState(SettingsAction, undefined);
  const [currentProfileImage, setCurrentProfileImage] = useState(profileImage)
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: settingsSchema,
      })
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const handleDeleteImage = () => {
    setCurrentProfileImage("")
  }

  return (
    <Card className="border-accent">
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage your account settings</CardDescription>
      </CardHeader>
      <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
        <CardContent className="flex flex-col gap-y-4 " >
          <div className="flex flex-col gap-y-2">
            <Label>Username</Label>
            <Input name={fields.fullName.name} key={fields.fullName.key} defaultValue={fullName} placeholder={fullName} />
            <p className="text-sm text-red-500">{fields.fullName.errors}</p>
          </div>
          <div className="flex flex-col gap-y-2 cursor-not-allowed">
            <Label>Email</Label>
            <Input disabled defaultValue={email} />
          </div>
          <div className="grid gap-y-5">
            <Label>Profile Image</Label>
            <Input type="hidden" name={fields.profileImage.name} key={fields.profileImage.key} value={currentProfileImage} />
            {currentProfileImage ? (
              <div className="relative size-24 border border-accent rounded-lg shadow p-1">
                <Image src={currentProfileImage} alt="Profile Image" width={75} height={50} priority={true} className="w-full rounded-full mx-auto " />
                <button type="button" onClick={() => handleDeleteImage()} className="absolute cursor-pointer p-1 text-gray-300 hover:bg-red-500 hover:text-white bg-red-400 -top-0 -right-6 rounded-[5px]"><X className="size-4" /></button>
              </div>
            ) : (
              <UploadDropzone
                onClientUploadComplete={(res) => {
                  setCurrentProfileImage(res[0].ufsUrl)
                  toast.success("Image uploaded successfully")
                }}
                onUploadError={() => {
                  toast.error("something went wrong")
                }}

                endpoint="imageUploader"
              />
            )}
            <p className="text-sm text-red-500">{fields.profileImage.errors}</p>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton text="Save Changes" className="mt-6 w-fit" />
        </CardFooter>
      </form>
    </Card>
  )
}