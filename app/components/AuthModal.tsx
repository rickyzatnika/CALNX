import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import Image from "next/image";
import { GithubButton, GoogleButton } from "./SubmitButton";

export function AuthModal() {
  return (
    <Dialog >
      <DialogTrigger asChild >
        <Button>Let&apos;s Start</Button>
      </DialogTrigger>
      <DialogContent aria-describedby="modal-content" className="sm:max-w-[360px]">
        <DialogTitle className="hidden" />
        <DialogHeader className="w-fit mx-auto">
          <Image src="/logo2.png" alt="logo" width={75} height={50} priority={true} className="w-auto h-auto" />
        </DialogHeader>
        <div className="flex gap-3 flex-col mt-5">
          <form className="w-full" action={async () => {
            "use server"

            await signIn('google');
          }}>
            <GoogleButton />
          </form>
          <form action={async () => {
            "use server"

            await signIn('github');
          }} className="w-full">
            <GithubButton />
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}