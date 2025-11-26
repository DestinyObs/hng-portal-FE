'use client';

import { useMemo, useState } from 'react';
import { Country, State } from 'country-state-city';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
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
  const [selectedCountry, setSelectedCountry] = useState('');
  const { setValue, clearErrors } = useFormContext<T>();

  // ⬇️ FIX: useMemo instead of useEffect + setState()
  const countries: ICountry[] = useMemo(() => {
    return Country.getAllCountries();
  }, []);

  const states: IState[] = useMemo(() => {
    if (!selectedCountry) return [];
    return State.getStatesOfCountry(selectedCountry);
  }, [selectedCountry]);

  return (
    <>
      {/* COUNTRY FIELD */}
      <FormField
        control={control}
        name={countryName}
        render={({ field }) => (
          <FormItem className="space-y-2">
            {showLabels && (
              <FormLabel className={labelClassName}>{countryLabel}</FormLabel>
            )}

            <Select
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value);
                setSelectedCountry(value);

                // Reset state when country changes
                setValue(stateName, '' as T[typeof stateName], {
                  shouldValidate: false,
                });
                clearErrors(stateName);
              }}
              disabled={disabled}
            >
              <FormControl>
                <SelectTrigger className={selectClassName}>
                  <SelectValue placeholder={countryPlaceholder} />
                </SelectTrigger>
              </FormControl>

              <SelectContent className="max-h-[200px]">
                {countries.map((c) => (
                  <SelectItem key={c.isoCode} value={c.isoCode}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <FormMessage className="animate-in slide-in-from-top-1 duration-200" />
          </FormItem>
        )}
      />

      {/* STATE FIELD */}
      <FormField
        control={control}
        name={stateName}
        render={({ field }) => (
          <FormItem className="space-y-2">
            {showLabels && (
              <FormLabel className={labelClassName}>{stateLabel}</FormLabel>
            )}

            <Select
              value={field.value}
              onValueChange={field.onChange}
              disabled={!selectedCountry || disabled}
            >
              <FormControl>
                <SelectTrigger className={selectClassName}>
                  <SelectValue
                    placeholder={
                      selectedCountry
                        ? statePlaceholder
                        : 'Select a country first'
                    }
                  />
                </SelectTrigger>
              </FormControl>

              <SelectContent className="max-h-[200px]">
                {states.length > 0 ? (
                  states.map((s) => (
                    <SelectItem key={s.isoCode} value={s.isoCode}>
                      {s.name}
                    </SelectItem>
                  ))
                ) : (
                  <div className="px-3 py-2 text-sm opacity-60">
                    No states available
                  </div>
                )}
              </SelectContent>
            </Select>

            <FormMessage className="animate-in slide-in-from-top-1 duration-200 text-xs" />
          </FormItem>
        )}
      />
    </>
  );
}
