"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import ProjectIcon from "~/public/projects.svg";
import DashboardIcon from "~/public/home.svg";
import { cn } from "@/lib/utils";
import { NavListType } from "@/lib/types";

const NavLinks = ({ userId }: { userId: string }) => {
  const pathname = usePathname();

  const NavList: NavListType[] = [
    {
      title: "Dashboard",
      href: `/${userId}/dashboard`,
      icon: DashboardIcon,
    },
    {
      title: "Projects",
      href: `/${userId}/projects`,
      icon: ProjectIcon,
    },
  ];

  return (
    <>
      {NavList.map((nav) => (
        <Link key={nav.title} href={nav.href}>
          <div
            className={cn(
              "flex h-[5.2rem] w-[33.2rem] items-center justify-start gap-[1.2rem] rounded-[1.2rem] px-[1.2rem]",
              pathname === nav.href ? "bg-light-gray-100" : "",
            )}
          >
            <nav.icon />
            <span className="text-[1.6rem] font-normal">{nav.title}</span>
          </div>
        </Link>
      ))}
    </>
  );
};

export default NavLinks;
