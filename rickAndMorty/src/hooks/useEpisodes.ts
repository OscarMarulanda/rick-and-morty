import { useEffect, useState } from "react";
import type { Episode, EpisodeResponse } from "../types/rickAndMorty";

export function useEpisode(page: number = 1) {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<EpisodeResponse["info"] | null>(null);

  useEffect(() => {
      async function fetchEpisodes() {
        try {
          setLoading(true);
          const res = await fetch(
            `https://rickandmortyapi.com/api/episode?page=${page}`
          );
          if (!res.ok) throw new Error("Failed to fetch episodes");
          const data: EpisodeResponse = await res.json();
          setEpisodes(data.results);
          setInfo(data.info);
        } catch (err) {
          setError((err as Error).message);
        } finally {
          setLoading(false);
        }
      }
      fetchEpisodes();
    }, [page]);
  
    return { episodes, loading, error, info };
  }