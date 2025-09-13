import type { Character } from "../types/rickAndMorty";

interface Props {
  character: Character;
}

export default function CharacterCard({ character }: Props) {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition p-5 flex flex-col items-center text-center">
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
    </div>
  );
}