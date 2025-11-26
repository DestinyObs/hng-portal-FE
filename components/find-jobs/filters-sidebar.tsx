const filterGroups = [
  {
    title: 'Job Level',
    items: ['Entry Level', 'Intermediate', 'Expert'],
    counts: ['250 jobs', '50 jobs', '15 jobs'],
  },
  {
    title: 'Job Location',
    items: ['On site', 'Remote', 'Hybrid'],
    counts: ['250 jobs', '50 jobs', '15 jobs'],
  },
  {
    title: 'Job Type',
    items: ['Full Time', 'Freelance', 'Part Time'],
    counts: ['250 jobs', '50 jobs', '15 jobs'],
  },
];

export default function FiltersSidebar() {
  return (
    <aside className="rounded-xl border border-[#E7E7E7] bg-[#FFF] p-6">
      <div className="mb-8 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-(--color-gray-500)">Filters</h3>
        <button className="text-sm font-medium text-(--color-primary-blue) hover:text-(--color-primary-100) transition">
          Clear all
        </button>
      </div>

      <div className="space-y-8">
        {filterGroups.map((group) => (
          <div key={group.title}>
            <div className="mb-4 flex items-center justify-between">
              <h4 className="font-medium text-(--color-gray-500)">{group.title}</h4>
              <button className="text-xs text-(--color-gray-100) hover:text-(--color-gray-200) transition">
                Clear
              </button>
            </div>

            <div className="space-y-3">
              {group.items.map((item, i) => (
                <label
                  key={item}
                  className="flex items-center gap-3 cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-(--color-gray-75) text-(--color-primary-blue) focus:ring-(--color-primary-blue) focus:ring-offset-0"
                  />
                  <span className="text-sm text-(--color-gray-300)">{item}</span>
                  <span className="ml-auto text-xs text-(--color-gray-100)">
                    {group.counts[i]}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}