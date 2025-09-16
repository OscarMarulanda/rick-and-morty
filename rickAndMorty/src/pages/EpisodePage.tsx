import { Link, useParams } from "react-router-dom";
import { useEpisodeById } from "../hooks/useEpisodeById";
import { useCharactersByUrls } from "../hooks/useCharactersByUrls";
import CharacterCard from "../components/CharacterCard";

export default function EpisodePage() {
  const { id } = useParams<{ id: string }>();

  const {
    episode,
    loading: epLoading,
    error: epError,
  } = useEpisodeById(id ?? null);
  const {
    characters,
    loading: charsLoading,
    error: charsError,
  } = useCharactersByUrls(episode ? episode.characters : []);

  if (epLoading) return <p className="text-center mt-8">Loading episode...</p>;
  if (epError)
    return <p className="text-center mt-8 text-red-500">{epError}</p>;
  if (!episode) return <p className="text-center mt-8">Episode not found</p>;

  return (
    <section className="container mx-auto py-12 px-4">
      <div className="mb-6">
        <Link to="/" className="text-sm text-blue-600 hover:underline">
          ← Back to characters
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-2">
        {episode.episode} — {episode.name}
      </h1>
      <p className="text-sm text-gray-500 mb-6">Air date: {episode.air_date}</p>

      <h2 className="text-xl font-semibold mb-4">Characters in this episode</h2>

      {charsLoading && (
        <p className="text-sm text-gray-500">Loading characters...</p>
      )}
      {charsError && <p className="text-sm text-red-500">{charsError}</p>}

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {(characters ?? []).map((c) => (
          <CharacterCard key={c.id} character={c} />
        ))}
      </div>
    </section>
  );
}
