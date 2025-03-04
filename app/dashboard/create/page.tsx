"use client"

import { SubmitButton } from "@/app/components/SubmitButton";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/ButtonGroup";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CreateEventType } from "@/lib/action";
import { eventTypeSchema } from "@/lib/zodSchemas";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import Link from "next/link";
import { useState } from "react";
import { useFormState } from "react-dom";


type VideoCallProvider = "Zoom Meeting" | "Google Meet" | "Microsoft Teams";

export default function NewEventType() {

  const [activePlatform, setActivePlatform] =
    useState<VideoCallProvider>("Google Meet");

  const [lastResult, action] = useFormState(CreateEventType, undefined)

  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: eventTypeSchema
      });
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput'
  })


  return (
    <div className="w-full h-full flex flex-1 items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Add new appointment type</CardTitle>
          <CardDescription>create new appointment type that allows people to book you</CardDescription>
        </CardHeader>
        <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate >
          <CardContent className="flex flex-col gap-y-5">
            <div className="flex flex-col gap-y-2">
              <Label>Title</Label>
              <Input name={fields.title.name} key={fields.title.key} defaultValue={fields.title.initialValue} placeholder="30 Minute Meeting" />
              {fields.title.errors && (<p className="text-red-500 text-sm capitalize">{`*${fields.title.name} ${fields.title.errors}`}</p>)}
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>URL Slug</Label>
              <div className="flex items-center">
                <span className="bg-muted p-1.5 rounded-l-md text-muted-foreground border border-accent">calnx.vercel.app/</span>
                <Input name={fields.url.name} key={fields.url.key} defaultValue={fields.url.initialValue} placeholder="example-url-1 " className="rounded-l-none rounded-r-md" />
              </div>
              {fields.url.errors && (<p className="text-red-500 text-sm capitalize">{`*${fields.url.name} ${fields.url.errors}`}</p>)}
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Description</Label>
              <Textarea name={fields.description.name} key={fields.description.key} defaultValue={fields.description.initialValue} placeholder="Join this meeting to meet me!" />
              {fields.description.errors && (<p className="text-red-500 text-sm capitalize">{`*${fields.description.name} ${fields.description.errors}`}</p>)}
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Duration</Label>
              <Select name={fields.duration.name} key={fields.duration.key} defaultValue={fields.duration.initialValue}>
                <SelectTrigger>
                  <SelectValue placeholder="select the duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Duration</SelectLabel>
                    <SelectItem value="15">15 min</SelectItem>
                    <SelectItem value="30">30 min</SelectItem>
                    <SelectItem value="45">45 min</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-y-2">
              <Label>Video Call Provider</Label>
              <input
                type="hidden"
                name={fields.videoCallSoftware.name}
                value={activePlatform}
              />
              <ButtonGroup>
                <Button
                  type="button"
                  onClick={() => setActivePlatform("Zoom Meeting")}
                  className="w-full"
                  variant={
                    activePlatform === "Zoom Meeting" ? "default" : "secondary"
                  }
                >
                  Zoom
                </Button>
                <Button
                  type="button"
                  onClick={() => setActivePlatform("Google Meet")}
                  className="w-full"
                  variant={
                    activePlatform === "Google Meet" ? "default" : "secondary"
                  }
                >
                  Google Meet
                </Button>
                <Button
                  type="button"
                  onClick={() => setActivePlatform("Microsoft Teams")}
                  className="w-full"
                  variant={
                    activePlatform === "Microsoft Teams"
                      ? "default"
                      : "secondary"
                  }
                >
                  Microsoft Teams
                </Button>
              </ButtonGroup>
            </div>
            <CardFooter className="w-full flex justify-between gap-3">
              <Button className="w-full " variant="secondary" asChild>
                <Link href="/dashboard">Cancel</Link>
              </Button>
              <SubmitButton className="w-full" text="Create Event Type" />
            </CardFooter>
          </CardContent>
        </form>
      </Card>
    </div>
  )
}