"use client"
import Image from "next/image";
import DyzLogo from "@/public/dyz.png";
import Aplus from "@/public/logo_merah.png";
import SRE from "@/public/sre_logo.png";
import QuickArt from "@/public/sponsor.png";
import Dp from "@/public/dp-white.png";
import { useTheme } from "next-themes";


export function Logos() {

  const { theme } = useTheme();

  return (
    <div className="py-10 mb-20">
      <h2 className="text-center text-lg font-semibold leading-7">
        Trusted by the best companies in the world
      </h2>
      <div className="  mt-10 grid justify-center grid-cols-[repeat(auto-fit,minmax(150px,1fr))]  max-w-lg mx-auto  items-center gap-x-8 gap-y-10 sm:max-w-xl  sm:gap-x-10 lg:mx-0 lg:max-w-none ">
        <Image
          src={Aplus}
          alt="Logo"
          className="max-h-14 sm:max-h-20 w-full object-contain "
        />
        <Image
          src={Dp}
          alt="Logo"
          className="max-h-14 sm:max-h-20 w-full object-contain"
          style={{ filter: theme === "light" ? "invert(1)" : "invert(0)" }}
        />
        <Image
          src={SRE}
          alt="Logo"
          className="max-h-14 sm:max-h-20 w-full object-contain "
        />
        <Image
          src={DyzLogo}
          alt="Logo"
          className="max-h-14 sm:max-h-20 w-full object-contain "
        />
        <Image
          src={QuickArt}
          alt="Logo"
          className="max-h-14 sm:max-h-20 w-full object-contain "
        />
      </div>
    </div>
  );
}
