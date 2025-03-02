"use client";
import { usePathname } from "next/navigation";

export function PathnameDisplay() {
    const pathname = usePathname(); // Akan selalu berubah saat navigasi
    const lastSegment = pathname.split("/").filter(Boolean).pop(); // Ambil bagian terakhir

    return <p className="capitalize font-semibold text-lg ">{lastSegment}</p>; // Kapitalisasi jika perlu
}
