import type { Character } from "../types/rickAndMorty";
import { useEpisodeList } from "../hooks/useEpisodeList";
import { useState } from "react";
import { Link } from "react-router-dom";

interface Props {
  character: Character;
}

export default function CharacterCard({ character }: Props) {
  const [expanded, setExpanded] = useState(false);
  

  const { episodes, loading, error } = useEpisodeList(
     character.episode
  );

  const handleExpand = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <div
      onClick={handleExpand}
      className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition p-5 flex flex-col items-center text-center"
    >
      <img
        src={character.image}
        alt={character.name}
        className="w-48 h-48 rounded-full mb-4"
      />
      <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
        {character.name}
      </h2>
      <p className="text-gray-500 dark:text-gray-400 mt-2">
        {character.status} - {character.species}
      </p>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          expanded ? "max-h-96 mt-4" : "max-h-0"
        }`}
      >
        <p className="text-sm text-gray-600 dark:text-gray-300">
          <strong>Gender:</strong> {character.gender}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          <strong>Origin:</strong> {character.origin.name}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          <strong>Location:</strong> {character.location.name}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          Seen in {character.episode.length} episode
          {character.episode.length > 1 ? "s" : ""}
        </p>

        <div className="mt-3 text-left max-h-40 overflow-y-auto pr-2">
          {loading && (
            <p className="text-xs text-gray-400">Loading episodes...</p>
          )}
          {error && <p className="text-xs text-red-500">{error}</p>}
          {!loading && !error && episodes.length > 0 && (
            <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
              {episodes.map((ep) => (
                <li key={ep.id}>
                  <Link
                    to={`/episode/${ep.id}`}
                    onClick={(e) => e.stopPropagation()} // important: prevent the parent card click
                    className="text-blue-600 hover:underline"
                  >
                    {ep.episode} — {ep.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
