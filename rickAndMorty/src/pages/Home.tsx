import CharacterCard from "../components/CharacterCard";
import { useCharacters } from "../hooks/useCharacters";

export default function Home() {
  const { characters, loading, error } = useCharacters();

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

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

        {/* Characters Grid */}
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {characters.map((char) => (
            <CharacterCard key={char.id} character={char} />
          ))}
        </div>
      </div>
    </section>
  );
}