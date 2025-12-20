import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useMemo } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { usePokemonDetail } from "../../src/hooks/usePokemonDetail";

function formatStatName(stat: string) {
  return stat.replace("-", " ");
}

export default function PokemonDetailScreen() {
  const { name } = useLocalSearchParams<{ name: string }>();
  const router = useRouter();

  const { data, loading, error } = usePokemonDetail(String(name ?? ""));

  const formattedId = useMemo(() => {
    if (!data) return "";
    return `#${String(data.id).padStart(3, "0")}`;
  }, [data]);

  return (
    <>
      <View className={`flex-1 ${data?.bgClass ?? "bg-white"}`}>
        {loading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator />
            <Text className="mt-3 text-black/70">Cargando...</Text>
          </View>
        ) : error || !data ? (
          <View className="flex-1 items-center justify-center px-6">
            <Text className="text-red-600 font-semibold text-center">
              {error ?? "Error"}
            </Text>
            <Pressable
              onPress={() => router.back()}
              className="mt-4 rounded-full bg-black/10 px-4 py-2 active:opacity-70"
            >
              <Text className="text-black/80 font-semibold">Volver</Text>
            </Pressable>
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            className="flex-1 px-4"
          >
            <Text className="text-4xl pt-4 font-extrabold capitalize text-center text-black">
              {data.name} {formattedId}
            </Text>

            <View className="items-center">
              {data.sprite ? (
                <Image
                  source={{ uri: data.sprite }}
                  style={{ width: 300, height: 300 }}
                  resizeMode="cover"
                />
              ) : (
                <View />
              )}
            </View>

            <View className="bg-white rounded-3xl p-8 mb-8">
              <Text className="text-lg font-bold text-black mb-2">Types</Text>
              <View className="flex-row flex-wrap gap-3 mb-5">
                {data.types.map((t) => (
                  <View key={t} className="rounded-full bg-slate-100 px-3 py-1">
                    <Text className="capitalize text-black/80">{t}</Text>
                  </View>
                ))}
              </View>

              <Text className="text-lg font-bold text-black mb-2">Weight</Text>
              <Text className="text-black/70 mb-5">{data.weight}</Text>

              <Text className="text-lg font-bold text-black mb-3">Stats</Text>
              <View className="gap-3">
                {data.stats.map((s) => (
                  <View
                    key={s.name}
                    className="flex-row items-center justify-between"
                  >
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
