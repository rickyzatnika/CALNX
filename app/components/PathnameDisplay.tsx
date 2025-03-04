"use client"

import { usePathname } from "next/navigation";

export function PathnameDisplay() {
    const pathname = usePathname(); // Mendapatkan pathname
    const segments = pathname.split("/").filter(Boolean); // Pisahkan segment path

    // Default: Ambil segment terakhir
    let lastSegment = segments[segments.length - 1] || "";

    // Cek apakah lastSegment berupa ID (angka atau kombinasi panjang)
    if (lastSegment && /^[a-zA-Z0-9]{8,}$/.test(lastSegment)) {
        lastSegment = segments[segments.length - 2] || ""; // Ambil segment sebelumnya jika ada
    }

    return <p className="capitalize font-semibold text-lg">{lastSegment}</p>;
}