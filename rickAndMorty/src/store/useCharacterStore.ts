import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Filters {
  search: string;
  status: string;
  gender: string;
  species: string;
}

interface CharacterState {
  page: number;
  filters: Filters;
  favorites: number[];
  setPage: (page: number) => void;
  setSearch: (search: string) => void;
  setStatus: (status: string) => void;
  setGender: (gender: string) => void;
  setSpecies: (species: string) => void;
  resetFilters: () => void;

  addFavorite: (id: number) => void;
  removeFavorite: (id: number) => void;
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

export const useCharacterStore = create<CharacterState>()(
  persist(
    (set, get) => ({
      page: 1,
      filters: {
        search: "",
        status: "",
        gender: "",
        species: "",
      },
      favorites: [],
  setPage: (page) => set({ page }),
  setSearch: (search) =>
    set((state) => ({
      page: 1,
      filters: { ...state.filters, search },
    })),
  setStatus: (status) =>
    set((state) => ({
      page: 1,
      filters: { ...state.filters, status },
    })),
  setGender: (gender) =>
    set((state) => ({
      page: 1,
      filters: { ...state.filters, gender },
    })),
  setSpecies: (species) =>
    set((state) => ({
      page: 1,
      filters: { ...state.filters, species },
    })),
  resetFilters: () =>
    set({
      page: 1,
      filters: { search: "", status: "", gender: "", species: "" },
    }),
addFavorite: (id) =>
        set((state) => ({
          favorites: [...new Set([...state.favorites, id])],
        })),
      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((favId) => favId !== id),
        })),
      toggleFavorite: (id) => {
        const { favorites } = get();
        if (favorites.includes(id)) {
          set({ favorites: favorites.filter((favId) => favId !== id) });
        } else {
          set({ favorites: [...favorites, id] });
        }
      },
      isFavorite: (id) => get().favorites.includes(id),
    }),
    {
      name: "character-store", // key in localStorage
    }
  )
);