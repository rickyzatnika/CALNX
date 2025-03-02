"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

const LogoDisplay = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Set state setelah komponen di-mount (client-side)
  }, []);

  // Jika belum mounted, jangan render gambar (hindari hydration error)
  if (!mounted) {
    return <div className="w-[40px] h-[40px]" />; // Placeholder agar tidak mengubah layout
  }

  const logoSrc = theme === "dark" ? "/logo-white.png" : "/logo2.png";

  return (
    <Image
      src={logoSrc}
      alt="logo"
      width={75}
      height={50}
      priority={true}
      className="w-auto h-auto"
    />
  );
};

export default LogoDisplay;
