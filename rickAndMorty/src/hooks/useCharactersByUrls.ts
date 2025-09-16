import { useEffect, useState } from "react";
import type { Character } from "../types/rickAndMorty";

export function useCharactersByUrls(urls: string[]) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!urls || urls.length === 0) {
      setCharacters([]);
      setLoading(false);
      setError(null);
      return;
    }

    let cancelled = false;
    async function fetchCharacters() {
      try {
        setLoading(true);
        // Extract IDs and join with commas
        const ids = urls.map(u => u.split("/").pop()).join(",");
        const res = await fetch(`https://rickandmortyapi.com/api/character/${ids}`);
        if (!res.ok) throw new Error("Failed to fetch characters");
        const data = await res.json();
        // API returns a single object if one id, else array
        const arr = Array.isArray(data) ? data : [data];
        if (!cancelled) setCharacters(arr);
      } catch (err) {
        if (!cancelled) setError((err as Error).message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchCharacters();
    return () => { cancelled = true; };
  }, [
    // ensure effect reruns only when actual urls content changes
    urls.join(","),
  ]);

  return { characters, loading, error };
}