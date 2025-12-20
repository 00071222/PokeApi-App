import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Image, Pressable, ScrollView, Text, View } from "react-native";

type PokemonDetailResponse = {
  id: number;
  name: string;
  weight: number;
  sprites: { front_default: string | null };
  types: { type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  species: { url: string };
};

type PokemonSpeciesResponse = {
  color: { name: string };
};

type PokemonDetailModel = {
  id: number;
  name: string;
  weight: number;
  sprite: string | null;
  types: string[];
  stats: { name: string; value: number }[];
  bgClass: string;
};

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

function formatStatName(stat: string) {
  // PokeAPI devuelve: "special-attack", "special-defense"
  return stat.replace("-", " ");
}

export default function PokemonDetailScreen() {
  const { name } = useLocalSearchParams<{ name: string }>();
  const router = useRouter();

  const [data, setData] = useState<PokemonDetailModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const pokemonName = String(name ?? "").toLowerCase().trim();

  useEffect(() => {
    if (!pokemonName) return;

    const controller = new AbortController();

    (async () => {
      try {
        setLoading(true);
        setError(null);

        // 1) detalle pokemon
        const detailRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`, {
          signal: controller.signal,
        });
        const detail: PokemonDetailResponse = await detailRes.json();

        // 2) species para color
        const speciesRes = await fetch(detail.species.url, { signal: controller.signal });
        const species: PokemonSpeciesResponse = await speciesRes.json();

        const mapped: PokemonDetailModel = {
          id: detail.id,
          name: detail.name,
          weight: detail.weight,
          sprite: detail.sprites.front_default,
          types: detail.types.map((t) => t.type.name),
          stats: detail.stats.map((s) => ({ name: s.stat.name, value: s.base_stat })),
          bgClass: colorToBgClass[species.color.name] ?? "bg-slate-100",
        };

        setData(mapped);
      } catch (e: any) {
        if (e?.name !== "AbortError") setError("No se pudo cargar el detalle del Pokémon.");
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [pokemonName]);

  const formattedId = useMemo(() => {
    if (!data) return "";
    return `#${String(data.id).padStart(3, "0")}`;
  }, [data]);

  return (
    <>
      {/* Esto asegura que NO haya header en detalle aunque cambies layouts */}
      <Stack.Screen options={{ headerShown: true , headerTitle: "", }} />

      <View className={`flex-1 ${data?.bgClass ?? "bg-white"}`}>
        {/* Top bar custom (porque no hay header) */}
        {/*
        <View className="px-4 pt-16 pb-4 flex-row items-center justify-between">
          <Pressable
            onPress={() => router.back()}
            className="rounded-full bg-black/10 px-4 py-2 active:opacity-70"
          >
            <Text className="text-black/80 font-semibold">Volver</Text>
          </Pressable>
        </View>
         */}

        {loading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator />
            <Text className="mt-3 text-black/70">Cargando...</Text>
          </View>
        ) : error || !data ? (
          <View className="flex-1 items-center justify-center px-6">
            <Text className="text-red-600 font-semibold text-center">{error ?? "Error"}</Text>
            <Pressable
              onPress={() => router.back()}
              className="mt-4 rounded-full bg-black/10 px-4 py-2 active:opacity-70"
            >
              <Text className="text-black/80 font-semibold">Volver</Text>
            </Pressable>
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-4">
            {/* Header del pokemon */}
            <Text className="text-4xl pt-4 font-extrabold capitalize text-center text-black">
              {data.name + " " +  formattedId}
            </Text>

            {/* Sprite */}
            <View className="items-center">
              {data.sprite ? (
                <Image
                  source={{ uri: data.sprite }}
                  style={{ width: 300 , height: 300 , margin:0}}
                  resizeMode="cover"
                />
              ) : (
                <View/>
              )}
            </View>

            {/* Card blanca */}
            <View className="bg-white rounded-3xl p-8 mb-8">
              {/* Types */}
              <Text className="text-lg font-bold text-black mb-2">Types</Text>
              <View className="flex-row flex-wrap gap-3 mb-5">
                {data.types.map((t) => (
                  <View key={t} className="rounded-full bg-slate-100 px-3 py-1">
                    <Text className="capitalize text-black/80">{t}</Text>
                  </View>
                ))}
              </View>

              {/* Weight */}
              <Text className="text-lg font-bold text-black mb-2">Weight</Text>
              <Text className="text-black/70 mb-5">{data.weight}</Text>

              {/* Stats */}
              <Text className="text-lg font-bold text-black mb-3">Stats</Text>
              <View className="gap-3">
                {data.stats.map((s) => (
                  <View key={s.name} className="flex-row items-center justify-between">
                    <Text className="capitalize text-black/70">
                      {formatStatName(s.name)}
                    </Text>
                    <Text className="font-bold text-black">{s.value}</Text>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    </>
  );
}
