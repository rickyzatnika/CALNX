import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import VideoGif from '@/public/download.gif'
import { CalendarCheck2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function OnboardingRouteTwo() {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>You&apos;re almost done!</CardTitle>
          <CardDescription>We have to now connect your calendar to your account.</CardDescription>
          <Image src={VideoGif} alt="almost finish Gif" className="rounded-lg w-full" priority={true} />
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full">
            <Link href="/api/auth"> <CalendarCheck2 className="size-5" /> Connect Calendar to your account</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}