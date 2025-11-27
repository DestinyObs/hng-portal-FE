'use client';

import { useState, useEffect, useCallback } from 'react';
import { useQueries } from '@tanstack/react-query';
import {
  getWorkModes,
  getJobTypes,
  getJobLevels,
  getSkills,
  getCountries,
  getStates,
  getCategories,
  getTracks,
} from '@/api/actions/lookup';
import { toast } from 'sonner';

interface FiltersSidebarProps {
  onFilterChange: (filters: Record<string, string | string[]>) => void;
}

interface LookupItem {
  id: string;
  name: string;
}

export default function FiltersSidebar({
  onFilterChange,
}: FiltersSidebarProps) {
  const [selectedWorkModes, setSelectedWorkModes] = useState<string[]>([]);
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [selectedJobLevels, setSelectedJobLevels] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTracks, setSelectedTracks] = useState<string[]>([]);

  const lookupQueries = useQueries({
    queries: [
      { queryKey: ['workModes'], queryFn: getWorkModes },
      { queryKey: ['jobTypes'], queryFn: getJobTypes },
      { queryKey: ['jobLevels'], queryFn: getJobLevels },
      { queryKey: ['skills'], queryFn: getSkills },
      { queryKey: ['countries'], queryFn: getCountries },
      { queryKey: ['states'], queryFn: getStates },
      { queryKey: ['categories'], queryFn: getCategories },
      { queryKey: ['tracks'], queryFn: getTracks },
    ],
  });

  const [
    {
      data: workModesData,
      isLoading: isLoadingWorkModes,
      isError: isErrorWorkModes,
      error: errorWorkModes,
    },
    {
      data: jobTypesData,
      isLoading: isLoadingJobTypes,
      isError: isErrorJobTypes,
      error: errorJobTypes,
    },
    {
      data: jobLevelsData,
      isLoading: isLoadingJobLevels,
      isError: isErrorJobLevels,
      error: errorJobLevels,
    },
    {
      data: skillsData,
      isLoading: isLoadingSkills,
      isError: isErrorSkills,
      error: errorSkills,
    },
    {
      data: countriesData,
      isLoading: isLoadingCountries,
      isError: isErrorCountries,
      error: errorCountries,
    },
    {
      data: statesData,
      isLoading: isLoadingStates,
      isError: isErrorStates,
      error: errorStates,
    },
    {
      data: categoriesData,
      isLoading: isLoadingCategories,
      isError: isErrorCategories,
      error: errorCategories,
    },
    {
      data: tracksData,
      isLoading: isLoadingTracks,
      isError: isErrorTracks,
      error: errorTracks,
    },
  ] = lookupQueries;

  useEffect(() => {
    if (isErrorWorkModes)
      toast.error(errorWorkModes?.message || 'Failed to fetch work modes.');
    if (isErrorJobTypes)
      toast.error(errorJobTypes?.message || 'Failed to fetch job types.');
    if (isErrorJobLevels)
      toast.error(errorJobLevels?.message || 'Failed to fetch job levels.');
    if (isErrorSkills)
      toast.error(errorSkills?.message || 'Failed to fetch skills.');
    if (isErrorCountries)
      toast.error(errorCountries?.message || 'Failed to fetch countries.');
    if (isErrorStates)
      toast.error(errorStates?.message || 'Failed to fetch states.');
    if (isErrorCategories)
      toast.error(errorCategories?.message || 'Failed to fetch categories.');
    if (isErrorTracks)
      toast.error(errorTracks?.message || 'Failed to fetch tracks.');
  }, [
    isErrorWorkModes,
    errorWorkModes,
    isErrorJobTypes,
    errorJobTypes,
    isErrorJobLevels,
    errorJobLevels,
    isErrorSkills,
    errorSkills,
    isErrorCountries,
    errorCountries,
    isErrorStates,
    errorStates,
    isErrorCategories,
    errorCategories,
    isErrorTracks,
    errorTracks,
  ]);

  const handleCheckboxChange = useCallback(
    (
      id: string,
      type:
        | 'workMode'
        | 'jobType'
        | 'jobLevel'
        | 'skill'
        | 'country'
        | 'state'
        | 'category'
        | 'track',
      isChecked: boolean,
    ) => {
      const updateState = (
        prev: string[],
        setter: React.Dispatch<React.SetStateAction<string[]>>,
      ) => {
        const newState = isChecked
          ? [...prev, id]
          : prev.filter((item) => item !== id);
        setter(newState);
      };

      switch (type) {
        case 'workMode':
          updateState(selectedWorkModes, setSelectedWorkModes);
          break;
        case 'jobType':
          updateState(selectedJobTypes, setSelectedJobTypes);
          break;
        case 'jobLevel':
          updateState(selectedJobLevels, setSelectedJobLevels);
          break;
        case 'skill':
          updateState(selectedSkills, setSelectedSkills);
          break;
        case 'country':
          updateState(selectedCountries, setSelectedCountries);
          break;
        case 'state':
          updateState(selectedStates, setSelectedStates);
          break;
        case 'category':
          updateState(selectedCategories, setSelectedCategories);
          break;
        case 'track':
          updateState(selectedTracks, setSelectedTracks);
          break;
        default:
          break;
      }
    },
    [
      selectedWorkModes,
      selectedJobTypes,
      selectedJobLevels,
      selectedSkills,
      selectedCountries,
      selectedStates,
      selectedCategories,
      selectedTracks,
    ],
  );

  const clearAllFilters = useCallback(() => {
    setSelectedWorkModes([]);
    setSelectedJobTypes([]);
    setSelectedJobLevels([]);
    setSelectedSkills([]);
    setSelectedCountries([]);
    setSelectedStates([]);
    setSelectedCategories([]);
    setSelectedTracks([]);
  }, []);

  useEffect(() => {
    const filters: Record<string, string | string[]> = {};
    if (selectedWorkModes.length > 0) filters.work_mode = selectedWorkModes;
    if (selectedJobTypes.length > 0) filters.job_type = selectedJobTypes;
    if (selectedJobLevels.length > 0) filters.job_level = selectedJobLevels;
    if (selectedSkills.length > 0) filters.skills = selectedSkills;
    if (selectedCountries.length > 0) filters.country = selectedCountries;
    if (selectedStates.length > 0) filters.state = selectedStates;
    if (selectedCategories.length > 0) filters.category = selectedCategories;
    if (selectedTracks.length > 0) filters.track = selectedTracks;

    onFilterChange(filters);
  }, [
    selectedWorkModes,
    selectedJobTypes,
    selectedJobLevels,
    selectedSkills,
    selectedCountries,
    selectedStates,
    selectedCategories,
    selectedTracks,
    onFilterChange,
  ]);

  const renderFilterGroup = (
    title: string,
    items: LookupItem[] | undefined,
    selectedItems: string[],
    handleToggle: (id: string, isChecked: boolean) => void,
    isLoading: boolean,
    isError: boolean,
  ) => {
    if (isLoading) {
      return (
        <div>
          <h4 className="font-medium text-(--color-gray-500)">{title}</h4>
          <p>Loading...</p>
        </div>
      );
    }
    if (isError || !items) {
      return (
        <div>
          <h4 className="font-medium text-(--color-gray-500)">{title}</h4>
          <p>Error loading {title.toLowerCase()}.</p>
        </div>
      );
    }
    return (
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h4 className="font-medium text-(--color-gray-500)">{title}</h4>
          <button
            onClick={() => {
              // Assuming handleToggle with false for all selected items
              selectedItems.forEach((item) => handleToggle(item, false));
            }}
            className="text-xs text-(--color-gray-100) hover:text-(--color-gray-200) transition"
          >
            Clear
          </button>
        </div>
        <div className="space-y-3">
          {items.map((item) => (
            <label
              key={item.id}
              className="flex items-center gap-3 cursor-pointer select-none"
            >
              <input
                type="checkbox"
                checked={selectedItems.includes(item.id)}
                onChange={(e) => handleToggle(item.id, e.target.checked)}
                className="h-4 w-4 rounded border-(--color-gray-75) text-(--color-primary-blue) focus:ring-(--color-primary-blue) focus:ring-offset-0"
              />
              <span className="text-sm text-(--color-gray-300)">
                {item.name}
              </span>
              {/* <span className="ml-auto text-xs text-(--color-gray-100)">
                (X jobs) // Job count not available from lookups
              </span> */}
            </label>
          ))}
        </div>
      </div>
    );
  };

  return (
    <aside className="rounded-xl border border-[#E7E7E7] bg-[#FFF] p-6">
      <div className="mb-8 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-(--color-gray-500)">
          Filters
        </h3>
        <button
          onClick={clearAllFilters}
          className="text-sm font-medium text-(--color-primary-blue) hover:text-(--color-primary-100) transition"
        >
          Clear all
        </button>
      </div>

      <div className="space-y-8">
        {renderFilterGroup(
          'Work Mode',
          workModesData?.data,
          selectedWorkModes,
          (id, isChecked) => handleCheckboxChange(id, 'workMode', isChecked),
          isLoadingWorkModes,
          isErrorWorkModes,
        )}
        {renderFilterGroup(
          'Job Type',
          jobTypesData?.data,
          selectedJobTypes,
          (id, isChecked) => handleCheckboxChange(id, 'jobType', isChecked),
          isLoadingJobTypes,
          isErrorJobTypes,
        )}
        {renderFilterGroup(
          'Job Level',
          jobLevelsData?.data,
          selectedJobLevels,
          (id, isChecked) => handleCheckboxChange(id, 'jobLevel', isChecked),
          isLoadingJobLevels,
          isErrorJobLevels,
        )}
        {renderFilterGroup(
          'Skills',
          skillsData?.data,
          selectedSkills,
          (id, isChecked) => handleCheckboxChange(id, 'skill', isChecked),
          isLoadingSkills,
          isErrorSkills,
        )}
        {renderFilterGroup(
          'Country',
          countriesData?.data,
          selectedCountries,
          (id, isChecked) => handleCheckboxChange(id, 'country', isChecked),
          isLoadingCountries,
          isErrorCountries,
        )}
        {renderFilterGroup(
          'State',
          statesData?.data,
          selectedStates,
          (id, isChecked) => handleCheckboxChange(id, 'state', isChecked),
          isLoadingStates,
          isErrorStates,
        )}
        {renderFilterGroup(
          'Category',
          categoriesData?.data,
          selectedCategories,
          (id, isChecked) => handleCheckboxChange(id, 'category', isChecked),
          isLoadingCategories,
          isErrorCategories,
        )}
        {renderFilterGroup(
          'Track',
          tracksData?.data,
          selectedTracks,
          (id, isChecked) => handleCheckboxChange(id, 'track', isChecked),
          isLoadingTracks,
          isErrorTracks,
        )}
      </div>
    </aside>
  );
}
