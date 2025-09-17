import { useEffect, useState } from "react";
import type { Character, CharacterResponse } from "../types/rickAndMorty";

export function useCharacters(page: number = 1, name: string = "") {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<CharacterResponse["info"] | null>(null);

  useEffect(() => {
    async function fetchCharacters() {
      try {
        setLoading(true);
        const url = new URL("https://rickandmortyapi.com/api/character");
        url.searchParams.set("page", page.toString());
        if (name) url.searchParams.set("name", name);

        const res = await fetch(url.toString());
        if (!res.ok) throw new Error("Failed to fetch characters");
        const data: CharacterResponse = await res.json();
        setCharacters(data.results);
        setInfo(data.info);
        setError(null);
      } catch (err) {
        setCharacters([]);
        setInfo(null);
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    fetchCharacters();
  }, [page, name]);

  return { characters, loading, error, info };
}