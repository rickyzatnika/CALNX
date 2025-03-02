import Link from "next/link";
import { AuthModal } from "./AuthModal";
import LogoDisplay from "./LogoDisplay";



export function Navbar() {
  return (
    <div className="flex py-2 items-center justify-between border-b">
      <Link href="/" className="flex items-center">
        <LogoDisplay />
      </Link>
      <AuthModal />
    </div>
  )
}