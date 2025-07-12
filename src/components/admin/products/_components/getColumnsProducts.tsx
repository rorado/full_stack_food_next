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
import { Translations } from "@/types/translations";
import { productDelet } from "@/server/_actions/admin/handleProducts";
import { DrawerDialogDemo } from "@/components/shared/Drawer";
import ProductForm from "./formProduct";
import { ProductType } from "@/types/TypesModuls";
import { AlertDialogDemo } from "@/components/shared/Alert";
import { Pages, Routes } from "@/constants/enum";

interface Iprop {
  locale: Locale;
  translate?: Translations["Admin"]["Products"];
}

export const getColumnsProduct = ({
  locale,
  translate,
}: Iprop): ColumnDef<ProductType>[] => [
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
    header: translate?.table.name,
    cell: ({ row }) => (
      <div className={`${locale === "ar" ? "text-left" : ""} capitalize`}>
        {row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: translate?.table.description,
    cell: ({ row }) => (
      <div
        className={`${
          locale === "ar" ? "text-left" : ""
        } capitalize truncate-paragraph-2 max-w-20 lg:max-w-30`}
      >
        {row.getValue("description")}
      </div>
    ),
  },

  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full"
        >
          {translate?.table.price}
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-center capitalize">{row.getValue("price")}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: () => (
      <div className={`${locale === "ar" ? "text-left" : "text-right"}`}>
        {translate?.table.create}
      </div>
    ),
    cell: ({ row }) => {
      const raw: Date = row.getValue("createdAt");
      const date = new Date(raw);
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
      const productData = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0"
              onClick={() => console.log("product Data:", row.original)}
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align={`${locale === "ar" ? "start" : "end"}`}>
            <DropdownMenuLabel>
              {translate?.table.actions.name}
            </DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(productData.id)}
            >
              {translate?.table.actions.copy_ID}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <AlertDialogDemo
              pathRev={`${Routes.ADMIN}/${Pages.PRODUCTS}`}
              handeSave={async () => {
                await productDelet(productData.id);
              }}
              buttonAction={
                <DropdownMenuItem
                  onSelect={(e) => {
                    e.preventDefault();
                  }}
                >
                  {translate?.table.actions.delet_product}
                </DropdownMenuItem>
              }
              title="Are you shure you want to delete this product"
            />

            <DrawerDialogDemo
              title="Edit product"
              buttonAction={
                <DropdownMenuItem
                  onSelect={(e) => {
                    e.preventDefault();
                  }}
                >
                  {translate?.table.actions.edit_product}
                </DropdownMenuItem>
              }
            >
              <ProductForm product={productData} />
            </DrawerDialogDemo>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
