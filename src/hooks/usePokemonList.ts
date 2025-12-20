import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getPokemonDetail, getPokemonList, getPokemonSpecies } from "../api/pokemon.api";
import { toPokemonCardModel } from "../mappers/pokemon.mappers";
import type { PokemonCardModel } from "../domain/pokemon.models";

const PAGE_SIZE = 12;

function isNumeric(value: string) {
  return /^\d+$/.test(value);
}

export function usePokemonList() {
  const [allLoaded, setAllLoaded] = useState<PokemonCardModel[]>([]);
  const [offset, setOffset] = useState(0);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchingRef = useRef(false);

  const loadNextPage = useCallback(async () => {
    if (loading || fetchingRef.current) return;

    fetchingRef.current = true;
    setLoading(true);

    try {
      const list = await getPokemonList(PAGE_SIZE, offset);

      const cards = await Promise.all(
        list.results.map(async (p) => {
          const detail = await getPokemonDetail(p.name);
          const species = await getPokemonSpecies(detail.species.url);
          return toPokemonCardModel(detail, species);
        })
      );

      setAllLoaded((prev) => {
        const map = new Map<number, PokemonCardModel>();
        for (const p of prev) map.set(p.id, p);
        for (const p of cards) map.set(p.id, p);
        return Array.from(map.values());
      });

      setOffset((prev) => prev + PAGE_SIZE);
    } finally {
      setLoading(false);
      fetchingRef.current = false;
    }
  }, [loading, offset]);

  useEffect(() => {
    loadNextPage();
  }, [loadNextPage]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allLoaded;

    if (isNumeric(q)) return allLoaded.filter((p) => p.id === Number(q));
    return allLoaded.filter((p) => p.name.toLowerCase().includes(q));
  }, [query, allLoaded]);

  return {
    query,
    setQuery,
    loading,
    pokemons: filtered,
    loadNextPage,
    canPaginate: query.trim().length === 0,
  };
}
