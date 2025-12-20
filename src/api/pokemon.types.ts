export type PokemonListItem = { name: string; url: string };

export type PokemonListResponse = {
  results: PokemonListItem[];
};

export type PokemonDetailResponse = {
  id: number;
  name: string;
  weight: number;
  sprites: { front_default: string | null };
  types: { type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  species: { url: string };
};

export type PokemonSpeciesResponse = {
  color: { name: string };
};
