import { useMemo } from "react";
import CharacterCard from "../components/CharacterCard";
import Pagination from "../components/Pagination";
import { useCharacters } from "../hooks/useCharacters";
import { useDebounce } from "../hooks/useDebounce";
import FiltersBar from "../components/FiltersBar";
import { useCharacterStore } from "../store/useCharacterStore";

export default function Home() {
  const {
    page,
    filters,
    setPage,
    setSearch,
    setStatus,
    setGender,
    setSpecies,
  } = useCharacterStore();

  const debouncedSearch = useDebounce(filters.search, 500);
  const debouncedSpecies = useDebounce(filters.species, 500);

  const activeFilters = useMemo(
    () => ({
      name: debouncedSearch,
      status: filters.status,
      species: debouncedSpecies,
      gender: filters.gender,
    }),
    [debouncedSearch, filters.status, debouncedSpecies, filters.gender]
  );

  const { characters, loading, error, info } = useCharacters(page, activeFilters);

  const handlePrev = () => setPage(Math.max(page - 1, 1));
  const handleNext = () => setPage(info?.next ? page + 1 : page);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <section className="bg-white dark:bg-gray-900 py-12 flex justify-center">
      <div className="container px-4 flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Rick and Morty Characters
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Explore your favorite characters from the Rick and Morty universe.
          </p>
        </div>

        <FiltersBar
          search={filters.search}
          onSearchChange={setSearch}
          status={filters.status}
          onStatusChange={setStatus}
          gender={filters.gender}
          onGenderChange={setGender}
          species={filters.species}
          onSpeciesChange={setSpecies}
        />

        {error && (
          <p className="text-center mt-6 text-red-500 font-medium">
            {error}. Try adjusting your search or filters.
          </p>
        )}

        {/* Top Pagination */}
        <Pagination
          page={page}
          totalPages={info?.pages}
          onPrev={handlePrev}
          onNext={handleNext}
        />

        {/* Characters Grid */}
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
          {characters.map((char) => (
            <CharacterCard key={char.id} character={char} />
          ))}
        </div>

        {/* Bottom Pagination */}
        <Pagination
          page={page}
          totalPages={info?.pages}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      </div>
    </section>
  );
}