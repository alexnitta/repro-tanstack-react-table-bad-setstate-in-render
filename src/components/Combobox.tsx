import { useState, useCallback } from "react";
import { useCombobox } from "downshift";
import type {
  UseComboboxState,
  UseComboboxStateChangeOptions,
} from "downshift";
import { matchSorter } from "match-sorter";
import cx from "classnames";
import { useDeepCompareEffect } from "use-deep-compare";
import type { ComboboxOption, ComboboxProps } from "../types";

const listItemStyle = {
  gridTemplateColumns: "auto auto",
};

const getOptionsMap = (
  options: ComboboxOption[]
): Record<string, ComboboxOption> =>
  options.reduce(
    (acc: Record<string, ComboboxOption>, option: ComboboxOption) => {
      acc[option.value] = option;

      return acc;
    },
    {}
  );

/**
 * A WAI-ARIA {@link https://www.w3.org/WAI/ARIA/apg/patterns/combobox/ Combobox} implemented with
 * hooks from {@link https://www.downshift-js.com/ Downshift}.
 * @param props - see {@link ComboboxProps}
 */
export function Combobox({
  boxShadow,
  error,
  name,
  label,
  listMaxHeight,
  onChange,
  options,
  placeholder,
  width,
}: ComboboxProps): JSX.Element {
  const [initialOptions] = useState(options);
  const [initialOptionsMap] = useState(getOptionsMap(options));
  const [items, setItems] = useState(options);

  useDeepCompareEffect(() => {
    const optionsMap = getOptionsMap(options);

    setItems(prevItems => {
      return prevItems.reduce((acc: ComboboxOption[], item: ComboboxOption) => {
        const updatedOption = optionsMap[item.value];

        if (updatedOption) {
          acc.push(updatedOption);
        }

        return acc;
      }, []);
    });
  }, [initialOptionsMap, options]);

  const stateReducer = useCallback(
    (
      state: UseComboboxState<ComboboxOption>,
      actionAndChanges: UseComboboxStateChangeOptions<ComboboxOption>
    ) => {
      const { type, changes } = actionAndChanges;

      switch (type) {
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
          if (onChange) {
            onChange(changes?.selectedItem ?? null);
          }

          return changes;
        case useCombobox.stateChangeTypes.InputBlur:
          // If the input is losing focus and the input value doesn't match the selected
          // item,
          if (changes.inputValue !== changes.selectedItem?.value ?? null) {
            // find an item that matches, or set selectedItem to null if none match
            const selectedItem =
              options.find(
                option =>
                  !option.disabled && option.value === changes.inputValue
              ) ?? null;

            if (onChange) {
              onChange(selectedItem);
            }

            return {
              ...changes,
              selectedItem,
            };
          }

          if (onChange) {
            onChange(changes?.selectedItem ?? null);
          }

          return changes;
        default:
          return changes;
      }
    },
    [options, onChange]
  );

  const {
    isOpen,
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    selectedItem,
  } = useCombobox<ComboboxOption>({
    onInputValueChange({ inputValue }) {
      setItems(
        matchSorter(options, inputValue ?? "", {
          threshold: matchSorter.rankings.CONTAINS,
          keys: ["label"],
          baseSort: (a, b) => (a.index < b.index ? -1 : 1),
        })
      );
    },
    stateReducer,
    items,
    itemToString: item => item?.label ?? "",
  });

  const boxShadowClosed = boxShadow?.closed ?? false;
  const boxShadowOpen = boxShadow?.open ?? true;

  return (
    <div>
      <label
        className="block text-sm text-gray-600"
        style={{ height: 24 }}
        {...getLabelProps()}
      >
        {label}
      </label>
      <div
        className={cx("relative inline-block", {
          "shadow-lg": boxShadowClosed,
        })}
      >
        <input
          className="border border-gray-300 p-2"
          style={{
            width,
          }}
          placeholder={placeholder}
          {...getInputProps()}
        />
        <ul
          {...getMenuProps()}
          className={cx(
            "border border-gray-300 absolute z-10 overflow-y-auto list-none bg-white p-2",
            {
              "shadow-lg": boxShadowOpen,
              hidden: !isOpen || items.length === 0,
            }
          )}
          style={{
            top: 50,
            left: 0,
            width,
            maxHeight: listMaxHeight,
          }}
        >
          {items.map((item, index) => {
            const isSelected = !!(
              selectedItem && item.value === selectedItem.value
            );

            const { onClick, ...itemProps } = getItemProps({
              item,
              index,
              "aria-selected": isSelected,
            });

            return (
              <li
                className={cx("grid justify-start py-1 pl-2", {
                  "text-gray-400": item.disabled,
                })}
                style={
                  highlightedIndex === index
                    ? {
                        ...listItemStyle,
                        textDecorationLine: "underline",
                      }
                    : listItemStyle
                }
                key={`${item}${index}`}
                onClick={e => {
                  if (!item.disabled) {
                    onClick(e);
                  }
                }}
                {...itemProps}
              >
                {item.label}
              </li>
            );
          })}
        </ul>
        {error && <p className="text-sm text-danger-500">{error}</p>}
      </div>
    </div>
  );
}
