/**
 * @typeParam Value - the type of the `.value` property
 */
export interface ComboboxOption {
  /**
   * When true, the option is disabled
   * @defaultValue false
   */
  disabled?: boolean;
  /**
   * Label to display for the menu option
   */
  label: string;
  /**
   * Value passed to the handleChange function when a new option is selected
   */
  value: string;
}

export type OnSelectComboboxOption = (option: ComboboxOption | null) => void;

export interface ComboboxProps {
  /**
   * Configuration for the box shadow
   */
  boxShadow?: BoxShadowConfig;
  /**
   * Default value for the text input
   */
  defaultValue?: string;
  /**
   * An error message
   */
  error?: string;
  /**
   * `name` attribute for the checkbox input containing the selected value
   */
  name: string;
  /**
   * Content to show in the <label> associated with the combobox
   */
  label: import("react").ReactNode;
  /**
   * Max height of the list of options in pixels
   */
  listMaxHeight: number;
  /**
   * Array of options which the user can select
   */
  options: ComboboxOption[];
  /**
   * Event handler called when selected item state is changing
   * @param option the ComboboxOption that is being selected, or null if selection is being set
   * to null
   * @param nextSelected the new selection state - if true the option is being selected; if false,
   * it is being de-selected
   */
  onChange?(option: ComboboxOption | null): void;
  /**
   * `placeholder` passed to the <input>, shown when no options are selected
   */
  placeholder: string;
  /**
   * Width of the input and list of options in pixels
   */
  width: number;
}

export interface BoxShadowConfig {
  /**
   * Whether to apply a box shadow when the component is closed
   * */
  closed: boolean;
  /**
   * Whether to apply a box shadow when the component is open
   * */
  open: boolean;
}

export interface SortIconAlt {
  /**
   * Text to show in a <title> element for the caret icon when sorted ascending
   */
  asc: string;
  /**
   * Text to show in a <title> element for the caret icon when sorted descending
   */
  desc: string;
  /**
   * Text to show in a <title> element for the caret icon when unsorted
   */
  unsorted: string;
}

export type SizeConfigPixels = {
  /**
   * Height in pixels
   */
  height: number;
  /**
   * Width in pixels
   */
  width: number;
};

export type SizeConfigClasses = {
  /**
   * A TailwindCSS class that will constrain the height, such as 'h-1/2'
   */
  heightClass: string;
  /**
   * A TailwindCSS class that will constrain the width, such as 'w-1/2'
   */
  widthClass: string;
};

export type SizeConfig = SizeConfigPixels | SizeConfigClasses;

/**
 * An object that can be passed as the `style` attribute on a React component to specify its
 * height and/or width.
 */
export interface StyleSize {
  height?: number;
  width?: number;
}

export type Maybe<Type> = null | Type;

export interface ExampleTableItem {
  age: number;
  first: string;
  last: string;
  email: string;
}
