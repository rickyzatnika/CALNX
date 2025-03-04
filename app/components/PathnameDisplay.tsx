import { usePathname } from "next/navigation";

export function PathnameDisplay() {
    const pathname = usePathname(); // Mendapatkan pathname
    const segments = pathname.split("/").filter(Boolean); // Pisahkan segment path
    let lastSegment = segments.pop(); // Ambil segment terakhir

    // Cek apakah segment terakhir adalah ID (angka atau kombinasi angka & huruf)
    if (lastSegment && /^[a-zA-Z0-9]{8,}$/.test(lastSegment)) {
        lastSegment = segments.pop() || ""; // Ambil segment sebelumnya jika ada
    }

    return <p className="capitalize font-semibold text-lg">{lastSegment}</p>;
}