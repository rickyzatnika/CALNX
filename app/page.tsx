import { Navbar } from "./components/Navbar";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Hero } from "./components/Hero";
import { Logos } from "./components/Logos";
import { Features } from "./components/Features";
import { Testimonial } from "./components/Testimonial";
import { CTA } from "./components/Cta";

export default async function Home() {

  const session = await auth();

  if (session) {
    redirect('/dashboard')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Navbar />
      <Hero />
      <Features />
      <Logos />
      <Testimonial />
      <CTA />
    </div>
  );
}
