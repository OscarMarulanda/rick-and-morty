import CharacterCard from "../components/CharacterCard";
import { useCharacters } from "../hooks/useCharacters";

export default function Home() {
  const { characters, loading, error } = useCharacters();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Rick and Morty Characters</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "1rem" }}>
        {characters.map((char) => (
          <CharacterCard key={char.id} character={char} />
        ))}
      </div>
    </div>
  );
}