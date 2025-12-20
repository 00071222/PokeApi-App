import { httpGet } from "./client";
import type {
    PokemonDetailResponse,
    PokemonListResponse,
    PokemonSpeciesResponse,
} from "./pokemon.types";

const BASE_URL = "https://pokeapi.co/api/v2";

export function getPokemonList(limit: number, offset: number, signal?: AbortSignal) {
  return httpGet<PokemonListResponse>(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`, signal);
}

export function getPokemonDetail(nameOrId: string, signal?: AbortSignal) {
  return httpGet<PokemonDetailResponse>(`${BASE_URL}/pokemon/${nameOrId}`, signal);
}

export function getPokemonSpecies(url: string, signal?: AbortSignal) {
  return httpGet<PokemonSpeciesResponse>(url, signal);
}
