import { useMemo, useState } from "react";
import {
  ColumnDef,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getFilteredRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";

import type { ExampleTableItem } from "../types";
import { makeTableItems } from "../utils";
import { VirtualTable } from ".";

const data = makeTableItems(1000);

const columnDefs: ColumnDef<ExampleTableItem>[] = [
  {
    accessorKey: "first",
    id: "first",
    cell: info => info.getValue(),
    header: "First",
    footer: props => props.column.id,
    size: 100,
  },
  {
    accessorKey: "last",
    id: "last",
    cell: info => info.getValue(),
    header: "Last",
    footer: props => props.column.id,
    size: 150,
  },
  {
    accessorKey: "email",
    id: "email",
    cell: info => info.getValue(),
    header: "Email",
    footer: props => props.column.id,
    size: 250,
  },
  {
    accessorKey: "age",
    id: "age",
    cell: info => info.getValue(),
    header: "Age",
    footer: props => props.column.id,
    size: 100,
  },
];

export function WorkingVersion() {
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const columns = useMemo<ColumnDef<ExampleTableItem>[]>(() => columnDefs, []);
  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
      sorting,
    },
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    // These must be added if you use `props.renderFilters: true`
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
  });

  return (
    <div style={{ width: table.getTotalSize() }}>
      <h2 className="font-bold">Working Version</h2>
      <p>
        This version is built with filters that each use a{" "}
        <code>{`<datalist>`}</code> component along with an{" "}
        <code>{`<input>`}</code> component to provide autocompletion.
      </p>
      <VirtualTable
        height={300}
        table={table}
        labels={{
          of: "of",
          rowsSelected: "rows selected",
        }}
        renderFilters={true}
        rowsSelected={Object.keys(rowSelection).length}
        sortIconAlt={{
          asc: "Column is sorted in ascending order",
          desc: "Column is sorted in descending order",
          unsorted: "Column is not sorted",
        }}
        withCombobox={false}
      />
    </div>
  );
}
