import { useEffect, useState } from "react";
import type { Episode } from "../types/rickAndMorty";

export function useEpisodeById(id: string | number | null) {
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    async function fetchEpisode() {
      try {
        setLoading(true);
        const res = await fetch(`https://rickandmortyapi.com/api/episode/${id}`);
        if (!res.ok) throw new Error("Failed to fetch episode");
        const data: Episode = await res.json();
        if (!cancelled) setEpisode(data);
      } catch (err) {
        if (!cancelled) setError((err as Error).message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchEpisode();
    return () => { cancelled = true; };
  }, [id]);

  return { episode, loading, error };
}