import { Button } from "@/components/ui/button";
import { Ban, PlusCircle } from "lucide-react";
import Link from "next/link";


interface iAppProps {
  title: string,
  description: string,
  buttonText: string,
  href: string,
}

export function EmptyState({ buttonText, title, description, href }: iAppProps) {
  return (
    <div className="flex flex-col flex-1 h-full items-center justify-center rounded-md border border-gray-500 border-dashed p-8 text-center animate-in fade-in-50 ">
      <div className="flex items-center justify-center size-14 rounded-full bg-foreground">
        <Ban className="size-10 text-primary-foreground" />
      </div>
      <h2 className="mt-6 font-semibold text-lg sm:text-xl">{title}</h2>
      <p className="text-sm sm:text-md mb-6 mt-2 text-muted-foreground max-w-xs mx-auto">{description}</p>
      <Link passHref={true} href={href} >
        <Button >
          <PlusCircle className="size-4" />
          {buttonText}
        </Button>
      </Link>
    </div>
  )
}