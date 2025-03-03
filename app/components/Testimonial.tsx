"use client"
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay"

const testimonials = [
  {
    id: 1,
    name: "Jan Marshal",
    role: "Programmer",
    message:
      "Wow CaLnx is the best platform I have ever used. Definitely recommend it to you guys, try it out!",
  },
  {
    id: 2,
    name: "Sarah Thompson",
    role: "Product Manager",
    message:
      "CaLnx has transformed the way our team collaborates. It’s user-friendly and packed with powerful features.",
  },
  {
    id: 3,
    name: "Michael Lee",
    role: "UI/UX Designer",
    message:
      "I love the seamless experience CaLnx provides. The UI is intuitive, and the performance is top-notch!",
  },
  {
    id: 4,
    name: "Emily Davis",
    role: "Marketing Specialist",
    message:
      "CaLnx helps us stay organized and on top of our campaigns. It’s a must-have tool for any marketer!",
  },
  {
    id: 5,
    name: "Daniel Wilson",
    role: "Entrepreneur",
    message:
      "As a startup founder, I rely on CaLnx to keep everything in check. It’s a game-changer for my business!",
  },
];

export function Testimonial() {

  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  )

  return (
    <>
      <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-center py-8 text-transparent bg-clip-text bg-gradient-to-r from-[#03FFE0] via-[#7C87F8] to-[#043AFF]">What Our Clients Say</h1>
      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-4xl mx-auto "
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {testimonials.map((item) => (
            <CarouselItem key={item.id}>
              <div className="p-4">
                <Card className="relative " >
                  <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                    <p className="text-xl sm:text-2xl md:text-3xl md:leading-normal font-medium">
                      <svg
                        className="absolute top-0 start-0 transform -translate-x-2 -translate-y-8 size-16 text-muted sm:h-24 sm:w-24"
                        width={16}
                        height={13}
                        viewBox="0 0 16 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          d="M7.18079 9.25611C7.18079 10.0101 6.93759 10.6211 6.45119 11.0891C5.96479 11.5311 5.35039 11.7521 4.60799 11.7521C3.71199 11.7521 2.96958 11.4531 2.38078 10.8551C1.81758 10.2571 1.53598 9.39911 1.53598 8.28111C1.53598 7.08511 1.86878 5.91511 2.53438 4.77111C3.22559 3.60111 4.18559 2.67811 5.41439 2.00211L6.29759 3.36711C5.63199 3.83511 5.09439 4.35511 4.68479 4.92711C4.30079 5.49911 4.04479 6.16211 3.91679 6.91611C4.14719 6.81211 4.41599 6.76011 4.72319 6.76011C5.43999 6.76011 6.02879 6.99411 6.48959 7.46211C6.95039 7.93011 7.18079 8.52811 7.18079 9.25611ZM14.2464 9.25611C14.2464 10.0101 14.0032 10.6211 13.5168 11.0891C13.0304 11.5311 12.416 11.7521 11.6736 11.7521C10.7776 11.7521 10.0352 11.4531 9.44639 10.8551C8.88319 10.2571 8.60159 9.39911 8.60159 8.28111C8.60159 7.08511 8.93439 5.91511 9.59999 4.77111C10.2912 3.60111 11.2512 2.67811 12.48 2.00211L13.3632 3.36711C12.6976 3.83511 12.16 4.35511 11.7504 4.92711C11.3664 5.49911 11.1104 6.16211 10.9824 6.91611C11.2128 6.81211 11.4816 6.76011 11.7888 6.76011C12.5056 6.76011 13.0944 6.99411 13.5552 7.46211C14.016 7.93011 14.2464 8.52811 14.2464 9.25611Z"
                          fill="currentColor"
                        />
                      </svg>
                      <span className="relative z-10 text-muted-foreground">{item.message}</span>
                    </p>
                    <div className="mt-6">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{item.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious />
        <CarouselNext /> */}
      </Carousel>
    </>
  );
}



