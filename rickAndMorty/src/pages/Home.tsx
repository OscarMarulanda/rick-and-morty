import { useMemo, useState } from "react";
import CharacterCard from "../components/CharacterCard";
import Pagination from "../components/Pagination";
import { useCharacters } from "../hooks/useCharacters";
import { useDebounce } from "../hooks/useDebounce";

export default function Home() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [species, setSpecies] = useState("");
  const [gender, setGender] = useState("");

  const debouncedSearch = useDebounce(search, 500);
  const debouncedSpecies = useDebounce(species, 500);

   const filters = useMemo(
  () => ({
    name: debouncedSearch,
    status,
    species: debouncedSpecies,  
    gender,
  }),
  [debouncedSearch, status, debouncedSpecies, gender]
);

  const { characters, loading, error, info } = useCharacters(page, filters);

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => (info?.next ? prev + 1 : prev));

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

          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1); // always reset to page 1 on new search
            }}
            placeholder="Search by name..."
            className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring focus:ring-blue-400 w-64"
          />
        </div>

        <div className="mt-4 flex gap-4 justify-center flex-wrap">
            <select
              value={status}
              onChange={(e) => { setStatus(e.target.value); setPage(1); }}
              className="px-3 py-2 rounded-lg border dark:bg-gray-800 dark:text-white"
            >
              <option value="">All Status</option>
              <option value="alive">Alive</option>
              <option value="dead">Dead</option>
              <option value="unknown">Unknown</option>
            </select>

            <select
              value={gender}
              onChange={(e) => { setGender(e.target.value); setPage(1); }}
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
              onChange={(e) => { setSpecies(e.target.value); setPage(1); }}
              placeholder="Filter by species"
              className="px-3 py-2 rounded-lg border dark:bg-gray-800 dark:text-white"
            />
          </div>

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
