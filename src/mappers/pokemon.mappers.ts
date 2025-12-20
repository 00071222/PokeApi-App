import type {
  PokemonDetailResponse,
  PokemonSpeciesResponse,
} from "../api/pokemon.types";
import type {
  PokemonCardModel,
  PokemonDetailModel,
} from "../domain/pokemon.models";
import { getBgClassByColor } from "../constants/pokemonColors";

export function toPokemonCardModel(
  detail: PokemonDetailResponse,
  species: PokemonSpeciesResponse
): PokemonCardModel {
  return {
    id: detail.id,
    name: detail.name,
    sprite: detail.sprites.front_default,
    types: detail.types.map((t) => t.type.name),
    bgClass: getBgClassByColor(species.color.name),
  };
}

export function toPokemonDetailModel(
  detail: PokemonDetailResponse,
  species: PokemonSpeciesResponse
): PokemonDetailModel {
  return {
    id: detail.id,
    name: detail.name,
    weight: detail.weight,
    sprite: detail.sprites.front_default,
    types: detail.types.map((t) => t.type.name),
    stats: detail.stats.map((s) => ({ name: s.stat.name, value: s.base_stat })),
    bgClass: getBgClassByColor(species.color.name),
  };
}
