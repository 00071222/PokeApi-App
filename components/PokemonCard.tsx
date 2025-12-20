import { Link } from "expo-router";
import { useMemo } from "react";
import { Image, Pressable, Text, View } from "react-native";

export type PokemonCardModel = {
  id: number;
  name: string;
  sprite: string | null;
  types: string[];
  bgClass: string;
};

type Props = {
  pokemon: PokemonCardModel;
};

export default function PokemonCard({ pokemon }: Props) {
  const formattedId = useMemo(
    () => `#${String(pokemon.id).padStart(3, "0")}`,
    [pokemon.id]
  );

  const typesLabel = useMemo(() => {
    if (!pokemon.types?.length) return "Unknown";
    return pokemon.types.join(" / ");
  }, [pokemon.types]);

  return (
    <View className="flex-1">
    <Link
      href={{ pathname: "/pokemon/[name]", params: { name: pokemon.name } }}
      asChild
    >
      <Pressable className={`mb-3 rounded-2xl border border-black/10 p-4 ${pokemon.bgClass} active:opacity-70`}>
        <View className="flex-row items-center gap-4">
          {pokemon.sprite ? (
            <Image
              source={{ uri: pokemon.sprite }}
              className="h-[72px] w-[72px] rounded-xl"
              resizeMode="contain"
            />
          ) : (
            <View className="h-[72px] w-[72px] rounded-xl bg-black/10" />
          )}

          <View className="flex-1">
            <Text className="text-xs text-black/60">{formattedId}</Text>
            <Text className="text-xl font-bold capitalize text-black" numberOfLines={1}>
              {pokemon.name}
            </Text>
            <Text className="mt-1 text-sm capitalize text-black/70" numberOfLines={1}>
              {typesLabel}
            </Text>
          </View>
        </View>
      </Pressable>
    </Link>
    </View>
  );
}
