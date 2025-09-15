import { useEffect, useState } from "react";
import type { Episode } from "../types/rickAndMorty";

export function useEpisodeList(urls: string[]) {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!urls || urls.length === 0) {
      setEpisodes([]);
      setLoading(false);
      return;
    }

    async function fetchEpisodes() {
      try {
        setLoading(true);

        // Extract episode IDs from URLs
        const ids = urls.map((url) => url.split("/").pop()).join(",");

        // Fetch them all at once
        const res = await fetch(`https://rickandmortyapi.com/api/episode/${ids}`);
        if (!res.ok) throw new Error("Failed to fetch episodes");

        const data = await res.json();

        // If only one episode, API returns an object, not an array
        const episodesArray = Array.isArray(data) ? data : [data];

        setEpisodes(episodesArray);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchEpisodes();
  }, [urls]);

  return { episodes, loading, error };
}