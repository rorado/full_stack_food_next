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
import { MoreHorizontal } from "lucide-react";
import { Translations } from "@/types/translations";
import { CategoriesType } from "@/types/TypesModuls";
import { AlertDialogDemo } from "@/components/shared/Alert";
import { toast } from "@/hooks/use-toast";
import { Pages, Routes } from "@/constants/enum";

interface Iprop {
  locale: Locale;
  translate?: Translations;
}

const deleteCategory = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/categories`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoryId: id }),
      }
    );
    const data = await res.json();
    if (res.ok) {
      toast({
        title: "Category was deleted",
        className: "text-green-400",
      });
    } else {
      toast({
        title: data.message,
        className: "text-red-400",
      });
    }
  } catch {
    toast({
      title: "Something wrong",
      className: "text-red-400",
    });
  }
};

export const getColumnsProduct = ({
  locale,
  translate,
}: Iprop): ColumnDef<CategoriesType>[] => [
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
    header: translate?.Admin.Categories.table.name,
    cell: ({ row }) => (
      <div className={`${locale === "ar" ? "text-left" : ""} capitalize`}>
        {row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "number of product",
    header: () => (
      <div className="w-[200px] text-center">
        {" "}
        {translate?.Admin.Categories.table.number_of_product}
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-center w-[200px]">
        {row.original.products.length}
      </div>
    ),
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const category = row.original;

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
              {translate?.Admin.Categories.table.actions.name}
            </DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(category.name)}
            >
              {translate?.Admin.Categories.table.actions.copy_ID}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <AlertDialogDemo
              handeSave={() => deleteCategory(category.id)}
              pathRev={`${Routes.ADMIN}/${Pages.CATEGORIES}`}
              buttonAction={
                <DropdownMenuItem
                  onSelect={(e) => {
                    e.preventDefault();
                  }}
                >
                  {translate?.Admin.Categories.table.actions.delet_category}
                </DropdownMenuItem>
              }
              title="Are you shure you want to delete this category"
            />

            {/* <DrawerDialogDemo
              title="Edit product"
              buttonAction={
                <DropdownMenuItem
                  onSelect={(e) => {
                    e.preventDefault();
                  }}
                >
                  Edit product
                </DropdownMenuItem>
              }
            >
              <ProductForm product={category} />
            </DrawerDialogDemo> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
