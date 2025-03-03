import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { GithubButton, GoogleButton } from "./SubmitButton";
import LogoDisplay from "./LogoDisplay";

export function AuthModal() {
  return (
    <Dialog >
      <DialogTrigger asChild >
        <Button>Let&apos;s Start</Button>
      </DialogTrigger>
      <DialogContent aria-describedby="modal-content" className="sm:max-w-[360px]">
        <DialogTitle >Sign In</DialogTitle>
        <DialogHeader className="w-fit mx-auto">
          <LogoDisplay />
        </DialogHeader>
        <div className="flex gap-3 flex-col mt-5">

          {/*--------- GOOGLE --------*/}
          <form className="w-full" action={async () => {
            "use server"
            await signIn('google');
          }}>
            <GoogleButton />
          </form>

          {/*--------- GITHUB --------*/}
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