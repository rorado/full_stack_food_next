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
import { ChevronDown, CirclePlus, RotateCw, Trash2 } from "lucide-react";

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
import { getColumnsProduct } from "./_components/getColumnsProducts";
import { ProductType } from "@/types/TypesModuls";
import ProductForm from "./_components/formProduct";
import { AlertDialogDemo } from "@/components/shared/Alert";
import { productsDelet } from "@/server/_actions/admin/handleProducts";
import { RevalidatePath } from "@/lib/revalidePath";
import { Pages, Routes } from "@/constants/enum";
import Loader from "@/components/ui/loader";

interface Iprop {
  data: ProductType[];
  locale: Locale;
  translate: Translations;
}

export function DataTableProducts({ data, locale, translate }: Iprop) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [revalidateLoading, setRevalidateLoading] = React.useState(false);

  const columns = getColumnsProduct({ locale, translate });

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

  const selectedProductsId = React.useMemo(() => {
    return table
      .getFilteredSelectedRowModel()
      .rows.map((row) => row.original.id);
  }, [table.getFilteredSelectedRowModel().rows]);

  const handleDeletProducts = async () => {
    await productsDelet(selectedProductsId);
  };

  const revalidePath = async () => {
    try {
      setRevalidateLoading(true);
      await RevalidatePath(`${Routes.ADMIN}/${Pages.PRODUCTS}`);
    } catch {
      alert("Enexpected Error");
    } finally {
      setRevalidateLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="elemnts-flex gap-5 justify-between items-center">
        <div>
          <Button onClick={revalidePath} disabled={revalidateLoading}>
            {revalidateLoading ? <Loader /> : <RotateCw className="w-[10px]" />}
          </Button>
        </div>
        <div className="flex gap-3">
          <div className="w-fit cursor-pointer">
            <DrawerDialogDemo buttonAction={<CirclePlus />}>
              <ProductForm />
            </DrawerDialogDemo>
          </div>
          <AlertDialogDemo
            pathRev={`${Routes.ADMIN}/${Pages.PRODUCTS}`}
            handeSave={handleDeletProducts}
            buttonAction={
              <div className="w-fit cursor-pointer">
                <Trash2 />
              </div>
            }
            title="Are you shure you want to delete that"
          />
        </div>
      </div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter name..."
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
              Columns <ChevronDown />
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
                    {column.id}
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
          {table.getFilteredSelectedRowModel().rows.length} of
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
