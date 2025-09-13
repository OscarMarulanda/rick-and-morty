import { useEffect, useState } from "react";
import type { Character, CharacterResponse } from "../types/rickAndMorty";

export function useCharacters(page: number = 1) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<CharacterResponse["info"] | null>(null);

  useEffect(() => {
    async function fetchCharacters() {
      try {
        setLoading(true);
        const res = await fetch(
          `https://rickandmortyapi.com/api/character?page=${page}`
        );
        if (!res.ok) throw new Error("Failed to fetch characters");
        const data: CharacterResponse = await res.json();
        setCharacters(data.results);
        setInfo(data.info);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    fetchCharacters();
  }, [page]);

  return { characters, loading, error, info };
}