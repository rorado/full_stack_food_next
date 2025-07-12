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
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LanguageType } from "@/i18n.config";
import { Translations } from "@/types/translations";

interface Iprop {
  locale: LanguageType;
  translate: Translations;
}

export function AppSidebar({ locale, translate }: Iprop) {
  const pathname = usePathname();

  const items = [
    {
      title: translate.Admin.User.title,
      url: "/admin/users",
      icon: Users,
    },
    {
      title: translate.Admin.Products.title,
      url: "/admin/products",
      icon: PackageSearch,
    },
    {
      title: translate.Admin.Categories.title,
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

  return (
    <Sidebar className="section-gap" side={locale == "ar" ? "right" : "left"}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={
                        pathname.startsWith(`/${locale}/${item.url}`)
                          ? "bg-primary text-white hover:bg-primary-hover hover:text-white"
                          : ""
                      }
                    >
                      <Link href={`/${locale}/${item.url}`}>
                        <item.icon />
                        <span
                          className={
                            pathname.startsWith(`/${locale}/${item.url}`)
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
