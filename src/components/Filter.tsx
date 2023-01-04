import { useMemo } from "react";
import type { Header, Row } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import { useDeepCompareMemo } from "use-deep-compare";

import { Combobox, DebouncedInput } from ".";

interface FilterProps<TData, TValue> {
  header: Header<TData, TValue>;
  flatRows: Row<TData>[];
  withCombobox: boolean;
}

export function Filter<TData, TValue>({
  header,
  flatRows,
  withCombobox,
}: FilterProps<TData, TValue>) {
  const { column } = header;
  const firstValue = flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();
  const facetedUniqueValues = column.getFacetedUniqueValues();

  const sortedUniqueValues = useMemo(
    () =>
      typeof firstValue === "number"
        ? []
        : Array.from(facetedUniqueValues.keys()).sort(),
    [firstValue, facetedUniqueValues]
  );

  const options = useDeepCompareMemo(
    () =>
      sortedUniqueValues.map(value => ({
        value,
        label: value,
      })),
    [sortedUniqueValues]
  );

  const headerLabel = flexRender(column.columnDef.header, header.getContext());

  const label = (
    <div className="mr-1">
      {headerLabel}
      {":"}
    </div>
  );

  return typeof firstValue === "number" ? (
    <div className="flex items-center">
      {label}
      <div className="flex space-x-2">
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
          value={(columnFilterValue as [number, number])?.[0] ?? ""}
          onChange={value =>
            column.setFilterValue((old: [number, number]) => [value, old?.[1]])
          }
          placeholder={`Min ${
            column.getFacetedMinMaxValues()?.[0]
              ? `(${column.getFacetedMinMaxValues()?.[0]})`
              : ""
          }`}
          width={100}
        />
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
          value={(columnFilterValue as [number, number])?.[1] ?? ""}
          onChange={value =>
            column.setFilterValue((old: [number, number]) => [old?.[0], value])
          }
          placeholder={`Max ${
            column.getFacetedMinMaxValues()?.[1]
              ? `(${column.getFacetedMinMaxValues()?.[1]})`
              : ""
          }`}
          width={100}
        />
      </div>
      <div className="h-1" />
    </div>
  ) : (
    <div className="flex items-center">
      {!withCombobox && (
        <>
          {label}
          <datalist id={column.id + "list"}>
            {sortedUniqueValues.slice(0, 5000).map((value: any) => (
              <option value={value} key={value} />
            ))}
          </datalist>
          <DebouncedInput
            type="text"
            value={(columnFilterValue ?? "") as string}
            onChange={value => column.setFilterValue(value)}
            placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
            list={column.id + "list"}
            width={160}
          />
        </>
      )}
      {/*
        Issue: when using Combobox, React throws this error message:
          Warning: Cannot update a component (`Unknown`) while rendering a different component (`Combobox`). To locate the bad setState() call inside `Combobox`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render

        When I expand the stacktrace and check the
      */}
      {withCombobox && (
        <Combobox
          form={false}
          label={headerLabel}
          listMaxHeight={400}
          name="filter"
          onChange={option => column.setFilterValue(option?.value ?? null)}
          options={options}
          placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
          width={150}
        />
      )}
      <div className="h-1" />
    </div>
  );
}
