"use client";
import { usePathname } from "next/navigation";




export function PathnameDisplay() {
    const pathname = usePathname(); // Mendapatkan pathname
    const segments = pathname.split("/").filter(Boolean); // Pisahkan segment path

    // Default: Ambil segment terakhir
    let lastSegment = segments[segments.length - 1] || "";

    // Cek apakah lastSegment berupa UUID atau alfanumerik panjang
    if (lastSegment && /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(lastSegment)) {
        lastSegment = segments[segments.length - 2] || ""; // Ambil segment sebelumnya jika ada
    }


    return <p className="capitalize font-semibold text-lg">{lastSegment}</p>;
}