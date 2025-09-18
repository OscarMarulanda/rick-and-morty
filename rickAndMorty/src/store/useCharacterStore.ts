import { create } from "zustand";

interface Filters {
  search: string;
  status: string;
  gender: string;
  species: string;
}

interface CharacterState {
  page: number;
  filters: Filters;
  setPage: (page: number) => void;
  setSearch: (search: string) => void;
  setStatus: (status: string) => void;
  setGender: (gender: string) => void;
  setSpecies: (species: string) => void;
  resetFilters: () => void;
}

export const useCharacterStore = create<CharacterState>((set) => ({
  page: 1,
  filters: {
    search: "",
    status: "",
    gender: "",
    species: "",
  },
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
}));