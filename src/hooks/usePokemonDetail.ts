import { useEffect, useMemo, useState } from "react";
import { getPokemonDetail, getPokemonSpecies } from "../api/pokemon.api";
import { toPokemonDetailModel } from "../mappers/pokemon.mappers";
import type { PokemonDetailModel } from "../domain/pokemon.models";

export function usePokemonDetail(pokemonName: string) {
  const [data, setData] = useState<PokemonDetailModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const normalizedName = useMemo(
    () => String(pokemonName ?? "").toLowerCase().trim(),
    [pokemonName]
  );

  useEffect(() => {
    if (!normalizedName) return;

    const controller = new AbortController();

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const detail = await getPokemonDetail(normalizedName, controller.signal);
        const species = await getPokemonSpecies(detail.species.url, controller.signal);

        setData(toPokemonDetailModel(detail, species));
      } catch (e: any) {
        if (e?.name !== "AbortError") setError("No se pudo cargar el detalle del Pokémon.");
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [normalizedName]);

  return { data, loading, error };
}
