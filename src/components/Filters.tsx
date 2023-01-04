import type { Row, HeaderGroup } from "@tanstack/react-table";

import { Filter } from ".";

interface FiltersProps<TData> {
  flatRows: Row<TData>[];
  headerGroups: HeaderGroup<TData>[];
  width: number;
  withCombobox: boolean;
}

export function Filters<TData>({
  flatRows,
  headerGroups,
  width,
  withCombobox,
}: FiltersProps<TData>): JSX.Element {
  return (
    <div className="flex flex-wrap gap-3 py-4" style={{ width }}>
      {headerGroups.reduce((acc: JSX.Element[], headerGroup) => {
        const headerGroupFilters = headerGroup.headers.reduce(
          (acc: JSX.Element[], header) => {
            if (!header.isPlaceholder && header.column.getCanFilter()) {
              acc.push(
                <Filter
                  key={`filter-${header.id}`}
                  header={header}
                  flatRows={flatRows}
                  withCombobox={withCombobox}
                />
              );
            }

            return acc;
          },
          []
        );

        return acc.concat(headerGroupFilters);
      }, [])}
    </div>
  );
}
