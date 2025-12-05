'use client';

import { useMemo, useState } from 'react';
import { Country, State } from 'country-state-city';
import { ChevronDownIcon, CheckIcon } from 'lucide-react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { FieldValues, useFormContext } from 'react-hook-form';
import { CountryStateSelectProps } from '@/types/country-state-select';
import type { ICountry, IState } from 'country-state-city';
import { cn } from '@/lib/utils';

export default function CountryStateSelect<T extends FieldValues>({
  control,
  countryName,
  stateName,
  selectClassName = 'w-full h-10 rounded-lg',
  labelClassName = '',
  showLabels = true,
  countryLabel = 'Country',
  stateLabel = 'State',
  countryPlaceholder = 'Select country',
  statePlaceholder = 'Select state',
  disabled = false,
}: CountryStateSelectProps<T>) {
  const [countryOpen, setCountryOpen] = useState(false);
  const [stateOpen, setStateOpen] = useState(false);
  const { setValue, clearErrors, watch } = useFormContext<T>();

  const countryValue = watch(countryName);
  const stateValue = watch(stateName);

  // Sync selectedCountry with form value
  const selectedCountry = countryValue || '';

  const countries: ICountry[] = useMemo(() => {
    return Country.getAllCountries();
  }, []);

  const states: IState[] = useMemo(() => {
    if (!selectedCountry) return [];
    return State.getStatesOfCountry(selectedCountry);
  }, [selectedCountry]);

  // Get selected country/state names for display
  const selectedCountryName = useMemo(() => {
    if (!countryValue) return null;
    return countries.find((c) => c.isoCode === countryValue)?.name;
  }, [countryValue, countries]);

  const selectedStateName = useMemo(() => {
    if (!stateValue) return null;
    return states.find((s) => s.isoCode === stateValue)?.name;
  }, [stateValue, states]);

  return (
    <>
      {/* COUNTRY FIELD */}
      <FormField
        control={control}
        name={countryName}
        render={({ field }) => (
          <FormItem className="space-y-2 flex-1">
            {showLabels && (
              <FormLabel className={labelClassName}>{countryLabel}</FormLabel>
            )}

            <Popover open={countryOpen} onOpenChange={setCountryOpen}>
              <FormControl>
                <PopoverTrigger
                  asChild
                  disabled={disabled}
                  className={cn(
                    // Base styles matching SelectTrigger
                    'border-[#E7E8E9] relative flex w-full items-center rounded-lg border transition-[color,box-shadow] outline-none cursor-pointer',
                    'h-14 min-w-0 px-3',
                    // Text styles
                    'text-foreground text-sm font-medium',
                    'data-[placeholder]:text-text-secondary',
                    // Focus and open styles
                    'focus:border-primary-blue focus-within:border-primary-blue',
                    'data-[state=open]:border-primary-blue',
                    // Invalid/valid states
                    'aria-invalid:border-primary-error',
                    // Disabled state
                    'disabled:cursor-not-allowed disabled:opacity-50',
                    // Icon styles
                    "[&_svg:not([class*='text-'])]:text-text-secondary",
                    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-6",
                    selectClassName,
                  )}
                >
                  <button
                    type="button"
                    role="combobox"
                    aria-expanded={countryOpen}
                    className="flex w-full items-center justify-between"
                  >
                    <span
                      className={cn(
                        'truncate',
                        !selectedCountryName && 'text-text-secondary',
                      )}
                    >
                      {selectedCountryName || countryPlaceholder}
                    </span>
                    <ChevronDownIcon className="ml-auto size-6 opacity-70" />
                  </button>
                </PopoverTrigger>
              </FormControl>

              <PopoverContent
                className="w-[var(--radix-popover-trigger-width)] p-0"
                align="start"
              >
                <Command>
                  <CommandInput placeholder="Search country..." />
                  <CommandList className="max-h-[200px]">
                    <CommandEmpty>No country found.</CommandEmpty>
                    <CommandGroup>
                      {countries.map((c) => (
                        <CommandItem
                          key={c.isoCode}
                          value={c.name}
                          onSelect={() => {
                            field.onChange(c.isoCode);
                            setCountryOpen(false);

                            // Reset state when country changes
                            setValue(stateName, '' as T[typeof stateName], {
                              shouldValidate: false,
                            });
                            clearErrors(stateName);
                          }}
                        >
                          <CheckIcon
                            className={cn(
                              'mr-2 h-4 w-4',
                              countryValue === c.isoCode
                                ? 'opacity-100'
                                : 'opacity-0',
                            )}
                          />
                          {c.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            <FormMessage className="animate-in slide-in-from-top-1 duration-200" />
          </FormItem>
        )}
      />

      {/* STATE FIELD */}
      <FormField
        control={control}
        name={stateName}
        render={({ field }) => (
          <FormItem className="space-y-2 flex-1">
            {showLabels && (
              <FormLabel className={labelClassName}>{stateLabel}</FormLabel>
            )}

            <Popover open={stateOpen} onOpenChange={setStateOpen}>
              <FormControl>
                <PopoverTrigger
                  asChild
                  disabled={!selectedCountry || disabled}
                  className={cn(
                    // Base styles matching SelectTrigger
                    'border-[#E7E8E9] relative flex w-full items-center rounded-lg border transition-[color,box-shadow] outline-none cursor-pointer',
                    'h-14 min-w-0 px-3',
                    // Text styles
                    'text-foreground text-sm font-medium',
                    'data-[placeholder]:text-text-secondary',
                    // Focus and open styles
                    'focus:border-primary-blue focus-within:border-primary-blue',
                    'data-[state=open]:border-primary-blue',
                    // Invalid/valid states
                    'aria-invalid:border-primary-error',
                    // Disabled state
                    'disabled:cursor-not-allowed disabled:opacity-50',
                    // Icon styles
                    "[&_svg:not([class*='text-'])]:text-text-secondary",
                    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-6",
                    selectClassName,
                  )}
                >
                  <button
                    type="button"
                    role="combobox"
                    aria-expanded={stateOpen}
                    className="flex w-full items-center justify-between"
                  >
                    <span
                      className={cn(
                        'truncate',
                        !selectedStateName && 'text-text-secondary',
                      )}
                    >
                      {selectedStateName ||
                        (selectedCountry
                          ? statePlaceholder
                          : 'Select a country first')}
                    </span>
                    <ChevronDownIcon className="ml-auto size-6 opacity-70" />
                  </button>
                </PopoverTrigger>
              </FormControl>

              <PopoverContent
                className="w-[var(--radix-popover-trigger-width)] p-0"
                align="start"
              >
                <Command>
                  <CommandInput placeholder="Search state..." />
                  <CommandList className="max-h-[200px]">
                    <CommandEmpty>No state found.</CommandEmpty>
                    <CommandGroup>
                      {states.length > 0 ? (
                        states.map((s) => (
                          <CommandItem
                            key={s.isoCode}
                            value={s.name}
                            onSelect={() => {
                              field.onChange(s.isoCode);
                              setStateOpen(false);
                            }}
                          >
                            <CheckIcon
                              className={cn(
                                'mr-2 h-4 w-4',
                                stateValue === s.isoCode
                                  ? 'opacity-100'
                                  : 'opacity-0',
                              )}
                            />
                            {s.name}
                          </CommandItem>
                        ))
                      ) : (
                        <div className="px-3 py-2 text-sm opacity-60">
                          No states available
                        </div>
                      )}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            <FormMessage className="animate-in slide-in-from-top-1 duration-200 text-xs" />
          </FormItem>
        )}
      />
    </>
  );
}
