"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Locale } from "@/i18n.config";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { User } from "@prisma/client";
import { Translations } from "@/types/translations";
import { DrawerDialogDemo } from "@/components/shared/Drawer";
import ProfileForm from "@/components/profile/ProfileForm";
import { userDelet } from "@/server/_actions/admin/handle_users";
import { AlertDialogDemo } from "@/components/shared/Alert";
import { userData } from "@/types/TypesModuls";

interface Iprop {
  locale: Locale;
  translate: Translations;
}

export const getColumnsUsers = ({
  locale,
  translate,
}: Iprop): ColumnDef<userData>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <div className={`${locale === "ar" ? "flex justify-center" : ""}`}>
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="text-right"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className={`${locale === "ar" ? "flex justify-center" : ""}`}>
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className={`${locale === "ar" ? "text-left" : ""} capitalize`}>
        {row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className={`${locale === "ar" ? "text-left" : ""} lowercase`}>
        {row.getValue("email")}
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <div className={`${locale === "ar" ? "text-left" : ""} capitalize`}>
        {row.getValue("role")}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: () => (
      <div className={`${locale === "ar" ? "text-left" : "text-right"}`}>
        Created
      </div>
    ),
    cell: ({ row }) => {
      const date: Date = row.getValue("createdAt");

      const formatted = date.toLocaleDateString("en-US");

      return (
        <div
          className={`${
            locale === "ar" ? "text-left" : "text-right"
          } font-medium`}
        >
          {formatted}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const userData = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0"
              onClick={() => console.log("User Data:", row.original)}
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align={`${locale === "ar" ? "start" : "end"}`}>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {/* <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(userData.id)}
            >
              Copy userData ID
            </DropdownMenuItem> */}
            <DropdownMenuSeparator />

            <AlertDialogDemo
              handeSave={async () => {
                await userDelet(userData.email);
              }}
              buttonAction={
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  Delet user
                </DropdownMenuItem>
              }
              title="Are you shure you want to delete this user"
            />

            <DrawerDialogDemo
              buttonAction={
                <DropdownMenuItem
                  onSelect={(e) => {
                    e.preventDefault();
                  }}
                >
                  Edit user
                </DropdownMenuItem>
              }
            >
              <ProfileForm
                userUpdate={userData as User}
                translate={translate["Profile"]}
              />
            </DrawerDialogDemo>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
