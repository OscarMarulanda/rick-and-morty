interface FiltersBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  gender: string;
  onGenderChange: (value: string) => void;
  species: string;
  onSpeciesChange: (value: string) => void;
}

export default function FiltersBar({
  search,
  onSearchChange,
  status,
  onStatusChange,
  gender,
  onGenderChange,
  species,
  onSpeciesChange,
}: FiltersBarProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search by name..."
        className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring focus:ring-blue-400 w-64"
      />

      {/* Filters */}
      <div className="mt-4 flex gap-4 justify-center flex-wrap">
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="px-3 py-2 rounded-lg border dark:bg-gray-800 dark:text-white"
        >
          <option value="">All Status</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>

        <select
          value={gender}
          onChange={(e) => onGenderChange(e.target.value)}
          className="px-3 py-2 rounded-lg border dark:bg-gray-800 dark:text-white"
        >
          <option value="">All Genders</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </select>

        <input
          type="text"
          value={species}
          onChange={(e) => onSpeciesChange(e.target.value)}
          placeholder="Filter by species"
          className="px-3 py-2 rounded-lg border dark:bg-gray-800 dark:text-white"
        />
      </div>
    </div>
  );
}