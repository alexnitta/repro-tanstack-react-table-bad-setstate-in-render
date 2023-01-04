import { flexRender } from "@tanstack/react-table";
import type { Header } from "@tanstack/react-table";
import cx from "classnames";

import type { SortIconAlt } from "../types";

interface SorterProps<TData> {
  /**
   * The table header object
   */
  header: Header<TData, unknown>;
  /**
   * Text used in the <title> tags associated with the <svg> icon that shows the sorting state.
   */
  sortIconAlt: SortIconAlt;
}

/**
 * Wraps a column header with a div that contains a sorting icon. If the user clicks anywhere in the
 * wrapper, the column will cycle to the next sorting state and the icon will update accordingly.
 * @param props {@link SorterProps}
 * @returns JSX
 */
export function Sorter<TData>({
  header,
  sortIconAlt
}: SorterProps<TData>): JSX.Element {
  const canSort = header.column.getCanSort();
  const handleSort = header.column.getToggleSortingHandler();
  const isSorted = header.column.getIsSorted();

  let icon: JSX.Element | null = null;

  switch (isSorted) {
    case false:
      icon = (
        <>
          <svg
            width="20"
            height="20"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-labelledby="caret-unsorted-title"
          >
            <path
              d="M4.182 6.182a.45.45 0 0 1 0-.637l3-3a.45.45 0 0 1 .636 0l3 3a.45.45 0 0 1-.636.637L7.5 3.5 4.818 6.182a.45.45 0 0 1-.636 0zM4.182 8.818a.45.45 0 0 1 .636 0L7.5 11.5l2.682-2.682a.45.45 0 0 1 .636.637l-3 3a.45.45 0 0 1-.636 0l-3-3a.45.45 0 0 1 0-.637z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </svg>
          <title className="sr-only" id="caret-unsorted-title">
            {sortIconAlt.unsorted}
          </title>
        </>
      );
      break;
    case "asc":
      icon = (
        <>
          <svg
            width="20"
            height="20"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-labelledby="caret-asc-title"
          >
            <path
              d="M4.182 6.182a.45.45 0 0 1 0-.637l3-3a.45.45 0 0 1 .636 0l3 3a.45.45 0 0 1-.636.637L7.5 3.5 4.818 6.182a.45.45 0 0 1-.636 0z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </svg>
          <title className="sr-only" id="caret-asc-title">
            {sortIconAlt.asc}
          </title>
        </>
      );
      break;
    case "desc":
      icon = (
        <>
          <svg
            width="20"
            height="20"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-labelledby="caret-desc-title"
          >
            <path
              d="M4.182 8.818a.45.45 0 0 1 .636 0L7.5 11.5l2.682-2.682a.45.45 0 0 1 .636.637l-3 3a.45.45 0 0 1-.636 0l-3-3a.45.45 0 0 1 0-.637z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </svg>
          <title className="sr-only" id="caret-desc-title">
            {sortIconAlt.desc}
          </title>
        </>
      );
      break;
    default:
      break;
  }

  return (
    <div
      className={cx("text-start flex", {
        "cursor-pointer select-none": canSort
      })}
      onClick={(e) => {
        if (canSort && handleSort) {
          handleSort(e);
        }
      }}
    >
      {flexRender(header.column.columnDef.header, header.getContext())}
      {canSort && (
        <div
          className="flex items-center justify-center w-5"
          style={{ height: 20 }}
        >
          {icon}
        </div>
      )}
    </div>
  );
};
