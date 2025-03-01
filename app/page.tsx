import { Navbar } from "./components/Navbar";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/hooks";

export default async function Home() {

  const session = await requireUser()

  if (session) {
    redirect('/dashboard')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Navbar />
    </div>
  );
}
