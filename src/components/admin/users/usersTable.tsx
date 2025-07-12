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
import { getColumnsUsers } from "./_components/columns";
import { User } from "@prisma/client";
import { Translations } from "@/types/translations";
import { usersDelet } from "@/server/_actions/admin/handle_users";
import { DrawerDialogDemo } from "@/components/shared/Drawer";
import SignupForm from "@/app/[locale]/auth/signup/_components/SignupForm";
import { AlertDialogDemo } from "@/components/shared/Alert";
import Loader from "@/components/ui/loader";
import { RevalidatePath } from "@/lib/revalidePath";
import { Pages, Routes } from "@/constants/enum";

interface Iprop {
  data: User[];
  locale: Locale;
  translate: Translations;
}

export function DataTableUser({ data, locale, translate }: Iprop) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [revalidateLoading, setRevalidateLoading] = React.useState(false);

  const user_types = translate.Admin.User;
  const columns = getColumnsUsers({ locale, translate: user_types });

  const columnNames = {
    name: user_types.table.name,
    email: user_types.table.email,
    role: user_types.table.role,
    createdAt: user_types.table.create,
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

  const selectedRows = table.getFilteredSelectedRowModel().rows;

  const selectedEmails = React.useMemo(() => {
    return selectedRows.map((row) => row.original.email);
  }, [selectedRows]);

  const handleDeleteUsers = async () => {
    await usersDelet(selectedEmails);
  };

  const revalidePath = async () => {
    try {
      setRevalidateLoading(true);
      await RevalidatePath(`${Routes.ADMIN}/${Pages.USERS}`);
    } catch {
      alert("Enexpected Error");
    } finally {
      setRevalidateLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <div>
          <Button onClick={revalidePath} disabled={revalidateLoading}>
            {revalidateLoading ? <Loader /> : <RotateCw className="w-[10px]" />}
          </Button>
        </div>
        <div className="elemnts-flex gap-5">
          <div onClick={handleDeleteUsers} className="w-fit cursor-pointer">
            <DrawerDialogDemo buttonAction={<CirclePlus />}>
              <SignupForm translate={translate} />
            </DrawerDialogDemo>
          </div>
          <AlertDialogDemo
            handeSave={handleDeleteUsers}
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
          placeholder={`${user_types.filter_emails} ...`}
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
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
              {user_types.columns} <ChevronDown />
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
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {user_types.table.ctr_prev}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {user_types.table.ctr_next}
          </Button>
        </div>
      </div>
    </div>
  );
}
