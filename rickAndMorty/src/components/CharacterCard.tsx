import type { Character } from "../types/rickAndMorty";

interface Props {
  character: Character;
}

export default function CharacterCard({ character }: Props) {
  return (
    <div className="card">
      <img src={character.image} alt={character.name} width={200} />
      <h2>{character.name}</h2>
      <p>{character.status} - {character.species}</p>
    </div>
  );
}