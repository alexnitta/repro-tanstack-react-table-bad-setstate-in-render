import { useEffect, useState } from "react";
import cx from "classnames";

export type DebouncedInputProps = {
  /**
   * Current value of the input
   */
  value: string | number;
  /**
   * A callback memoized by using react.useCallback
   * @param value
   * @returns undefined
   */
  onChange: (value: string | number) => void;
  /**
   * How often to detect changes in the input field in milliseconds
   * @defaultValue 300
   */
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">;

/**
 * A debounced <input> element.
 */
export function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 300,
  height,
  width,
  ...props
}: DebouncedInputProps) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value, debounce, onChange]);

  return (
    <input
      {...props}
      value={value}
      className="border border-gray-300 w-full overflow-hidden text-ellipsis p-2"
      style={{
        height,
        width,
      }}
      onChange={e => setValue(e.target.value)}
    />
  );
}
