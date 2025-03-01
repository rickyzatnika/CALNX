"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useFormStatus } from "react-dom";



export function GoogleButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button className="w-full" disabled>Connecting to google..</Button>
      ) : (
        <Button className="w-full" type="submit"> <Image src="/google.svg" alt="google" width={6} height={6} priority={true} className="w-6 h-6" /> Sign in with Google</Button>
      )}
    </>
  )

}


export function GithubButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button className="w-full" disabled>Connecting to github..</Button>
      ) : (
        <Button className="w-full" type="submit"> <Image src="/github.svg" alt="github" width={6} height={6} priority={true} className="w-6 h-6" /> Sign in with Github</Button>
      )}
    </>
  )

}