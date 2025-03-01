import Image from "next/image";
import Link from "next/link";
import { AuthModal } from "./AuthModal";



export function Navbar() {
  return (
    <div className="flex py-2 items-center justify-between border-b">
      <Link href="/" className="flex items-center">
        <Image src="/logo2.png" width={75} height={50} priority={true} className="w-auto h-auto" alt="" />
      </Link>
      <AuthModal />
    </div>
  )
}