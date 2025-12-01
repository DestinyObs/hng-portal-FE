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
  slug: string;
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
      slug: string,
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
      switch (type) {
        case 'workMode':
          setSelectedWorkModes((prev) =>
            isChecked ? [...prev, slug] : prev.filter((item) => item !== slug),
          );
          break;
        case 'jobType':
          setSelectedJobTypes((prev) =>
            isChecked ? [...prev, slug] : prev.filter((item) => item !== slug),
          );
          break;
        case 'jobLevel':
          setSelectedJobLevels((prev) =>
            isChecked ? [...prev, slug] : prev.filter((item) => item !== slug),
          );
          break;
        case 'skill':
          setSelectedSkills((prev) =>
            isChecked ? [...prev, slug] : prev.filter((item) => item !== slug),
          );
          break;
        case 'country':
          setSelectedCountries((prev) =>
            isChecked ? [...prev, slug] : prev.filter((item) => item !== slug),
          );
          break;
        case 'state':
          setSelectedStates((prev) =>
            isChecked ? [...prev, slug] : prev.filter((item) => item !== slug),
          );
          break;
        case 'category':
          setSelectedCategories((prev) =>
            isChecked ? [...prev, slug] : prev.filter((item) => item !== slug),
          );
          break;
        case 'track':
          setSelectedTracks((prev) =>
            isChecked ? [...prev, slug] : prev.filter((item) => item !== slug),
          );
          break;
        default:
          break;
      }
    },
    [], // Removed individual selected states from dependencies to prevent stale closures.
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
    onFilterChange({}); // Notify parent about clearing all filters
  }, [onFilterChange]);

  const clearFilterGroup = useCallback((type: string) => {
    switch (type) {
      case 'Work Mode':
        setSelectedWorkModes([]);
        break;
      case 'Job Type':
        setSelectedJobTypes([]);
        break;
      case 'Job Level':
        setSelectedJobLevels([]);
        break;
      case 'Skills':
        setSelectedSkills([]);
        break;
      case 'Country':
        setSelectedCountries([]);
        break;
      case 'State':
        setSelectedStates([]);
        break;
      case 'Category':
        setSelectedCategories([]);
        break;
      case 'Track':
        setSelectedTracks([]);
        break;
    }
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
    handleToggle: (slug: string, isChecked: boolean) => void,
    isLoading: boolean,
    isError: boolean,
    onClearGroup: (type: string) => void, // New prop
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
            onClick={() => onClearGroup(title)} // Use onClearGroup
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
                checked={selectedItems.includes(item.slug)}
                onChange={(e) => handleToggle(item.slug, e.target.checked)}
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
          (slug, isChecked) =>
            handleCheckboxChange(slug, 'workMode', isChecked),
          isLoadingWorkModes,
          isErrorWorkModes,
          clearFilterGroup, // Pass new prop
        )}
        {renderFilterGroup(
          'Job Type',
          jobTypesData?.data,
          selectedJobTypes,
          (slug, isChecked) => handleCheckboxChange(slug, 'jobType', isChecked),
          isLoadingJobTypes,
          isErrorJobTypes,
          clearFilterGroup, // Pass new prop
        )}
        {renderFilterGroup(
          'Job Level',
          jobLevelsData?.data,
          selectedJobLevels,
          (slug, isChecked) =>
            handleCheckboxChange(slug, 'jobLevel', isChecked),
          isLoadingJobLevels,
          isErrorJobLevels,
          clearFilterGroup, // Pass new prop
        )}
        {renderFilterGroup(
          'Skills',
          skillsData?.data,
          selectedSkills,
          (slug, isChecked) => handleCheckboxChange(slug, 'skill', isChecked),
          isLoadingSkills,
          isErrorSkills,
          clearFilterGroup, // Pass new prop
        )}
        {renderFilterGroup(
          'Country',
          countriesData?.data,
          selectedCountries,
          (slug, isChecked) => handleCheckboxChange(slug, 'country', isChecked),
          isLoadingCountries,
          isErrorCountries,
          clearFilterGroup, // Pass new prop
        )}
        {renderFilterGroup(
          'State',
          statesData?.data,
          selectedStates,
          (slug, isChecked) => handleCheckboxChange(slug, 'state', isChecked),
          isLoadingStates,
          isErrorStates,
          clearFilterGroup, // Pass new prop
        )}
        {renderFilterGroup(
          'Category',
          categoriesData?.data,
          selectedCategories,
          (slug, isChecked) =>
            handleCheckboxChange(slug, 'category', isChecked),
          isLoadingCategories,
          isErrorCategories,
          clearFilterGroup, // Pass new prop
        )}
        {renderFilterGroup(
          'Track',
          tracksData?.data,
          selectedTracks,
          (slug, isChecked) => handleCheckboxChange(slug, 'track', isChecked),
          isLoadingTracks,
          isErrorTracks,
          clearFilterGroup, // Pass new prop
        )}
      </div>
    </aside>
  );
}
