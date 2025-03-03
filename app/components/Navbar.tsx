import Link from "next/link";
import { AuthModal } from "./AuthModal";
import LogoDisplay from "./LogoDisplay";
import { DarkmodeToggle } from "./DarkmodeToggle";

export function Navbar() {
  return (
    <div className="flex py-5 items-center justify-between ">
      <Link href="/" className="flex items-center gap-2">
        <LogoDisplay />
      </Link>

      <div className="hidden md:flex md:justify-end md:space-x-4">
        <DarkmodeToggle />

        <AuthModal />
      </div>
    </div>
  );
}
