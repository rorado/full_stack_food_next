"use client";
import {
  ChartBarStacked,
  Users,
  PackageSearch,
  // SquareMenu,
  // ListOrdered,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LanguageType } from "@/i18n.config";

// Menu items.
const items = [
  {
    title: "Users",
    url: "/admin/users",
    icon: Users,
  },
  {
    title: "Products",
    url: "/admin/products",
    icon: PackageSearch,
  },
  {
    title: "Categories",
    url: "/admin/categories",
    icon: ChartBarStacked,
  },
  // {
  //   title: "Menu items",
  //   url: "/admin/menuitems",
  //   icon: SquareMenu,
  // },
  // {
  //   title: "Orders",
  //   url: "/admin/orders",
  //   icon: ListOrdered,
  // },
];

interface Iprop {
  locale: LanguageType;
}

export function AppSidebar({ locale }: Iprop) {
  const pathname = usePathname();

  return (
    <Sidebar className="section-gap" side={locale == "ar" ? "right" : "left"}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={
                        pathname.startsWith(`/${locale}${item.url}`)
                          ? "bg-primary text-white hover:bg-primary-hover hover:text-white"
                          : ""
                      }
                    >
                      <Link href={item.url}>
                        <item.icon />
                        <span
                          className={
                            pathname.startsWith(`/${locale}${item.url}`)
                              ? ""
                              : ""
                          }
                        >
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
