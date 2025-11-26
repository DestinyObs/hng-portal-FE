import { FieldValues,Control, Path } from "react-hook-form";

export interface CountryStateSelectProps<T extends FieldValues> {
  // Form control
  control: Control<T>;
  countryName: Path<T>;
  stateName: Path<T>;

  // Styling
  selectClassName?: string;
  labelClassName?: string;

  // Display options
  showLabels?: boolean;
  countryLabel?: string;
  stateLabel?: string;
  countryPlaceholder?: string;
  statePlaceholder?: string;

  // Disabled states
  disabled?: boolean;
}
