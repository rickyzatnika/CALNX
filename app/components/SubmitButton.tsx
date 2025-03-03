"use client"

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useFormStatus } from "react-dom";

interface iAppProps {
  text: string,
  variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined
  className?: string
}

export function SubmitButton({ text, variant, className }: iAppProps) {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button variant="outline" className={cn("w-fit", className)} disabled><Loader2 className="size-4 animate-spin origin-center" />please wait..</Button>
      ) : (
        <Button variant={variant} className={cn("w-fit", className)} type="submit">{text}</Button>
      )}
    </>

  )
}


export function GoogleButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button variant="outline" className="w-full" disabled><Loader2 className="size-4 animate-spin origin-center" />Connecting..</Button>
      ) : (
        <Button variant="outline" className="w-full" type="submit"> <Image src="/google.svg" alt="google" width={6} height={6} priority={true} className="w-6 h-6 mr-2" /> Sign in with Google</Button>
      )}
    </>
  )

}


export function GithubButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button variant="outline" className="w-full" disabled><Loader2 className="size-4 animate-spin origin-center" />Connecting..</Button>
      ) : (
        <Button variant="outline" className="w-full" type="submit"> <Image src="/github.svg" alt="github" width={6} height={6} priority={true} className="w-6 h-6 mr-2" /> Sign in with Github</Button>
      )}
    </>
  )

}


