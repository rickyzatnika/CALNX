"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import { OnboardingAction } from "@/lib/action";
import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod";
import { onboardingSchema } from "@/lib/zodSchemas";
import { SubmitButton } from "../components/SubmitButton";
import { useActionState } from "react";



export default function OnboardingRoute() {

  const [lastResult, action] = useActionState(OnboardingAction, undefined)
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: onboardingSchema
      })
    },

    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',

  })



  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Card className="border border-accent">
        <CardHeader>
          <CardTitle>Welcome to CAL<span className="text-indigo-500">NX</span></CardTitle>
          <CardDescription>We need the following information to set up your profile</CardDescription>
        </CardHeader>
        <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate className="flex flex-col gap-y-5" >
          <CardContent className="flex flex-col gap-y-2">
            <div className="grid gap-y-2  w-full">
              <label>Full Name</label>
              <Input
                name={fields.fullName.name}
                defaultValue={fields.fullName.initialValue}
                key={fields.fullName.key}
                placeholder="Jhonny Iskandar" />
              <p className="text-sm text-red-500 px-3">{fields.fullName.errors}</p>
            </div>
            <div className="grid gap-y-2  w-full">
              <label>Username</label>
              <div className="flex rounded-md">
                <span className="inline-flex items-center px-3 rounded-l-md border-r-0 bg-accent text-sm text-muted-foreground">calnx.com/</span>
                <Input
                  name={fields.userName.name}
                  defaultValue={fields.userName.initialValue}
                  key={fields.userName.key}
                  placeholder="example-user-1" className="rounded-l-none " />
              </div>
              <p className="text-sm text-red-500 px-3">{fields.userName.errors}</p>
            </div>
          </CardContent>
          <CardFooter >
            <SubmitButton text="Submit" className="w-full" variant="default" />
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}