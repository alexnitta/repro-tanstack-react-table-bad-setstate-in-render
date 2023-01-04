import type { SizeConfig, StyleSize, Maybe } from "../types";

type SizeConfigInput = Partial<SizeConfig> & unknown;

/**
 * Note that the {@link SizeConfig} type definition specifies that either `heightClass` and
 * `widthClass` will be present, or a `style` prop with `height` and `width` will be present, but
 * not both.
 */
interface SizeConfigResult {
  /**
   * A CSS class for setting the height property
   */
  heightClass: string | undefined;
  /**
   * A CSS class for setting the width property
   */
  widthClass: string | undefined;
  style: StyleSize;
}

/**
 * Parse an input that has the properties of a partial {@link SizeConfig} object and return data
 * useful for styling the component. This is a convenience function so we don't have to check for
 * empty values repeatedly in our component code.
 *
 * @param input - {@link SizeConfigInput}
 * @returns a {@link SizeConfigResult}
 */
export function parseSizeConfig(
  input: Maybe<SizeConfigInput>
): SizeConfigResult {
  const style: StyleSize = {
    height: undefined,
    width: undefined
  };
  let heightClass, widthClass;

  if (input !== null) {
    if ("height" in input) {
      style.height = input.height;
    }
    if ("width" in input) {
      style.width = input.width;
    }
    if ("heightClass" in input) {
      heightClass = input.heightClass;
    }
    if ("widthClass" in input) {
      widthClass = input.widthClass;
    }
  }

  return {
    heightClass,
    style,
    widthClass
  };
};
