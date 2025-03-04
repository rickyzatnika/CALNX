/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useTransition } from "react";
import { toast } from "sonner"; // Gunakan Sonner untuk toast
import { times } from "@/lib/time";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SubmitButton } from "@/app/components/SubmitButton";
import { updateAvailability } from "@/lib/action";



export function AvailabilityForm({ data }: { data: any[] }) {
  const [isPending, startTransition] = useTransition();

  async function handleFormSubmit(formData: FormData) {
    startTransition(async () => {
      try {
        await updateAvailability(formData);

        await new Promise<void>((resolve) => {
          window.setTimeout(() => {
            resolve();
          }, 3000);
        })

        toast.success("saved successfully");

      } catch (error) {
        console.log("ups,something went wrong!", error)
        toast.error("ups,something went wrong!");
      }
    });
  }

  return (
    <form action={handleFormSubmit} >
      <CardContent className="flex flex-col gap-y-4">
        {data.map((item) => (
          <div key={item.id} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center gap-4 ">
            <div className="flex items-center gap-x-3">
              <input type="hidden" hidden name={`id-${item.id}`} value={item.id} />
              <Switch name={`isActive-${item.id}`} defaultChecked={item.isActive} className="cursor-pointer" />
              <p>{item.day}</p>
            </div>
            {/* ------FROM TIME SELECT------- */}
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
            {/* ------TILL TIME SELECT------- */}
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
        <SubmitButton text="Save Changes" className=" mt-5 shadow-md transition-all duration-150 " />
      </CardFooter>
    </form>
  );
}
