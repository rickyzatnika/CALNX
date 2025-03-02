"use client"

import { cn } from "@/lib/utils";
import { CalendarCheck, HomeIcon, LucideProps, Settings, User2Icon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface iAppProps {
  id: number,
  name: string,
  href: string,
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
}

export const dashboardLinks: iAppProps[] = [
  { id: 0, name: 'Event Types', icon: HomeIcon, href: '/dashboard' },
  { id: 1, name: 'Meetings', icon: User2Icon, href: '/dashboard/meetings' },
  { id: 2, name: 'Availability', icon: CalendarCheck, href: '/dashboard/availability' },
  { id: 3, name: 'Settings', icon: Settings, href: '/dashboard/settings' }
]


export function DashboardLinks() {


  const pathname = usePathname()

  return (
    <div className="space-y-3 mt-3">
      {dashboardLinks.map((link) => (
        <Link passHref={true} key={link.id} href={link.href} className={cn(
          pathname === link.href ? 'bg-primary text-muted' : ' hover:bg-primary/10',
          'flex items-center gap-2 p-2 rounded-md px-3 py-2 transition-all '
        )}>
          <link.icon className="size-4" />
          {link.name}
        </Link>
      ))}

    </div>
  )
}