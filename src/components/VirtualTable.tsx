import { useCallback, useRef } from "react";
import { flexRender } from "@tanstack/react-table";
import type { Table as ReactTable, Row } from "@tanstack/react-table";
import { useVirtual } from "react-virtual";
import cx from "classnames";

import type { SortIconAlt } from "../types";

import { parseSizeConfig } from "../utils";

import { Filters, Sorter } from ".";

export type VirtualTableProps<TData> = {
  height: number;
  labels: {
    of: string;
    rowsSelected: string;
  };
  pageSizes?: number[];
  /**
   * When true, a set of column filters will be shown above the table.
   */
  renderFilters?: boolean;
  rowsSelected: number;
  sortIconAlt: SortIconAlt;
  table: ReactTable<TData>;
  /**
   * When true, the <Combobox /> component will be used to render the filter inputs. This causes a
   * React error message - see comments in: src/components/Filter.tsx
   */
  withCombobox: boolean;
};

/**
 * A table component designed to work with @tanstack/react-table. Uses row virtualization to improve
 * performance when working with large data sets. Includes row selection. Does not include
 * pagination. When working with this table, make sure to set the `size` property on each column
 * definition; this allows the table to calculate its layout. Note that a `table` instance has
 * specific capabilities which depend on how it is created; see the Storybook file at
 * VirtualTable.stories.tsx for an example of how to instantiate a `table` that works as expected.
 * @param props {@link TableProps}
 * @returns JSX
 */
export function VirtualTable<TData>(
  props: VirtualTableProps<TData>
): JSX.Element {
  const {
    labels,
    renderFilters,
    rowsSelected,
    sortIconAlt,
    table,
    withCombobox,
  } = props;
  const { style, heightClass } = parseSizeConfig(props);
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const { rows } = table.getRowModel();
  const { flatRows } = table.getPreFilteredRowModel();
  const headerGroups = table.getHeaderGroups();
  const rowVirtualizer = useVirtual({
    parentRef: tableContainerRef,
    size: rows.length,
    overscan: 10,
    estimateSize: useCallback(() => 48, []),
  });
  const { virtualItems: virtualRows, totalSize } = rowVirtualizer;
  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
      : 0;

  return (
    <div className="text-sm">
      {renderFilters && (
        <Filters<TData>
          flatRows={flatRows}
          headerGroups={headerGroups}
          width={table.getTotalSize()}
          withCombobox={withCombobox}
        />
      )}
      <div
        ref={tableContainerRef}
        className={cx(heightClass, "overflow-y-auto")}
        style={style}
      >
        <table
          className="border-collapse table-fixed border-spacing-0"
          style={{ width: table.getTotalSize() }}
        >
          <thead className="sticky top-0 font-semibold">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    scope="col"
                    style={{ width: header.getSize() }}
                    className="p-2 align-top bg-white border-b border-gray-300"
                  >
                    {header.isPlaceholder ? null : (
                      <Sorter<TData>
                        header={header}
                        sortIconAlt={sortIconAlt}
                      />
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {paddingTop > 0 && (
              <tr>
                <td style={{ height: `${paddingTop}px` }} />
              </tr>
            )}
            {virtualRows.map(virtualRow => {
              const row = rows[virtualRow.index] as Row<TData>;
              return (
                <tr
                  key={row.id}
                  className={cx("border-b", {
                    "bg-primary-50": virtualRow.index % 2 === 0,
                  })}
                >
                  {row.getVisibleCells().map(cell => {
                    return (
                      <td
                        key={cell.id}
                        className="p-2 overflow-hidden text-ellipsis"
                        style={{
                          width: cell.column.getSize(),
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
            {paddingBottom > 0 && (
              <tr>
                <td style={{ height: `${paddingBottom}px` }} />
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-2">
        <span className="font-bold">{rowsSelected}</span> {labels.of}{" "}
        <span className="font-bold">
          {table.getPreFilteredRowModel().rows.length}
        </span>{" "}
        {labels.rowsSelected}
      </div>
    </div>
  );
}
