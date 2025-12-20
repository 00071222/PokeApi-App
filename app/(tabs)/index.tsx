import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FlatList, Text, View } from "react-native";

import "../global.css";

import PokemonCard, { PokemonCardModel } from "../../components/PokemonCard";
import SearchBar from "../../components/SearchBar";

/* ---------- TIPOS API ---------- */
type PokemonListItem = { name: string; url: string };

type PokemonDetailResponse = {
  id: number;
  name: string;
  sprites: { front_default: string | null };
  types: { type: { name: string } }[];
  species: { url: string };
};

type PokemonSpeciesResponse = {
  color: { name: string };
};

/* ---------- CONSTANTES ---------- */
const PAGE_SIZE = 12;

const colorToBgClass: Record<string, string> = {
  red: "bg-red-200",
  blue: "bg-blue-200",
  green: "bg-green-200",
  yellow: "bg-yellow-200",
  purple: "bg-purple-200",
  pink: "bg-pink-200",
  brown: "bg-amber-200",
  gray: "bg-gray-200",
  black: "bg-zinc-300",
  white: "bg-slate-100",
};

/* ---------- HELPERS ---------- */
function isNumeric(value: string) {
  return /^\d+$/.test(value);
}

async function buildPokemonCard(name: string): Promise<PokemonCardModel> {
  const detailRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const detail: PokemonDetailResponse = await detailRes.json();

  const speciesRes = await fetch(detail.species.url);
  const species: PokemonSpeciesResponse = await speciesRes.json();

  return {
    id: detail.id,
    name: detail.name,
    sprite: detail.sprites.front_default,
    types: detail.types.map((t) => t.type.name),
    bgClass: colorToBgClass[species.color.name] ?? "bg-slate-100",
  };
}

/* ---------- COMPONENT ---------- */
export default function PokemonsTab() {
  const [allLoaded, setAllLoaded] = useState<PokemonCardModel[]>([]);
  const [offset, setOffset] = useState(0);

  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ evita que onEndReached dispare múltiples fetches
  const fetchingRef = useRef(false);

  /* ---------- FETCH PÁGINA ---------- */
  const loadNextPage = useCallback(async () => {
    if (loading || fetchingRef.current) return;

    fetchingRef.current = true;
    setLoading(true);

    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${PAGE_SIZE}&offset=${offset}`
      );
      const data: { results: PokemonListItem[] } = await res.json();

      const cards = await Promise.all(
        data.results.map((p) => buildPokemonCard(p.name))
      );

      // ✅ deduplicar por id para evitar keys repetidas
      setAllLoaded((prev) => {
        const map = new Map<number, PokemonCardModel>();

        for (const p of prev) map.set(p.id, p);
        for (const p of cards) map.set(p.id, p);

        return Array.from(map.values());
      });

      setOffset((prev) => prev + PAGE_SIZE);
    } catch (e) {
      console.error("Error loading pokemons", e);
    } finally {
      setLoading(false);
      fetchingRef.current = false;
    }
  }, [loading, offset]);

  /* ---------- CARGA INICIAL ---------- */
  useEffect(() => {
    loadNextPage();
  }, [loadNextPage]);

  /* ---------- FILTRADO LOCAL ---------- */
  const filteredPokemons = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) return allLoaded;

    if (isNumeric(q)) {
      return allLoaded.filter((p) => p.id === Number(q));
    }

    return allLoaded.filter((p) => p.name.toLowerCase().includes(q));
  }, [query, allLoaded]);

  /* ---------- UI ---------- */
  return (
    <View className="flex-1 bg-white p-4">
      <SearchBar value={query} onChangeText={setQuery} />

      <FlatList
        data={filteredPokemons}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        columnWrapperStyle={{ gap: 4 }}
        contentContainerStyle={{ gap: 1, paddingBottom: 24 }}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
        showsVerticalScrollIndicator={false}
        onEndReached={() => {
          if (!query) loadNextPage();
        }}
        onEndReachedThreshold={0.4}
        ListFooterComponent={
          loading ? (
            <Text className="text-center py-4">Cargando más...</Text>
          ) : null
        }
        ListEmptyComponent={
          <Text className="text-black/60 mt-4">
            No hay resultados para “{query}”
          </Text>
        }
      />
    </View>
  );
}
