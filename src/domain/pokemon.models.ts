export type PokemonCardModel = {
  id: number;
  name: string;
  sprite: string | null;
  types: string[];
  bgClass: string;
};

export type PokemonDetailModel = {
  id: number;
  name: string;
  weight: number;
  sprite: string | null;
  types: string[];
  stats: { name: string; value: number }[];
  bgClass: string;
};
