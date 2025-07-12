"use client";

import * as React from "react";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, CirclePlus, RotateCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Locale } from "@/i18n.config";
import { Translations } from "@/types/translations";
import { DrawerDialogDemo } from "@/components/shared/Drawer";
import { CategoriesType } from "@/types/TypesModuls";
import { getColumnsProduct } from "./_components/ColumnsCategories";
import AddCategoryForm from "./_components/addCategoryForm";
import { RevalidatePath } from "@/lib/revalidePath";
import { Pages, Routes } from "@/constants/enum";
import Loader from "@/components/ui/loader";

interface Iprop {
  data: CategoriesType[];
  locale: Locale;
  translate: Translations;
}

export function DataTableCategories({ data, locale, translate }: Iprop) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [revalidateLoading, setRevalidateLoading] = React.useState(false);

  const revalidePath = async () => {
    try {
      setRevalidateLoading(true);
      await RevalidatePath(`${Routes.ADMIN}/${Pages.CATEGORIES}`);
    } catch {
      alert("Enexpected Error");
    } finally {
      setRevalidateLoading(false);
    }
  };

  const columns = getColumnsProduct({ locale, translate });

  const category_types = translate.Admin.Categories;

  const columnNames = {
    name: category_types.table.name,
    "number of product": category_types.table.number_of_product,
  };

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="elemnts-flex gap-5 justify-between">
        <div>
          <Button onClick={revalidePath} disabled={revalidateLoading}>
            {revalidateLoading ? <Loader /> : <RotateCw />}
          </Button>
        </div>
        <div className="w-fit cursor-pointer">
          <DrawerDialogDemo buttonAction={<CirclePlus />} title="Add category">
            <AddCategoryForm />
          </DrawerDialogDemo>
        </div>
      </div>
      <div className="flex items-center py-4">
        <Input
          placeholder={`${category_types.filter_name} ...`}
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className={`${
                locale == "ar" ? "mr-auto" : "ml-auto"
              } ml-auto outline-0`}
            >
              {category_types.title} <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {columnNames[column.id as keyof typeof columnNames] ||
                      column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length}{" "}
          {translate.Admin.User.table.of}{" "}
          {table.getFilteredRowModel().rows.length}{" "}
          {translate.Admin.User.table.row} {translate.Admin.User.table.selected}
          .
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {translate.Admin.User.table.ctr_prev}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {translate.Admin.User.table.ctr_next}
          </Button>
        </div>
      </div>
    </div>
  );
}
