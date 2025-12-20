import { Text, View } from "react-native";

export default function AboutTab() {
  return (
    <View className="flex-1 bg-slate-50 px-4 pt-6">
      {/* Título */}
      <Text className="text-3xl font-extrabold text-black mb-4">
        About
      </Text>

      {/* Card principal */}
      <View className="bg-white rounded-2xl p-5 shadow-sm">
        <Text className="text-lg font-semibold text-black mb-2">
          PokeAPI
        </Text>

        <Text className="text-slate-700 leading-6 mb-4">
          Esta aplicación utiliza{" "}
          <Text className="font-semibold text-black">PokeAPI</Text>, una API pública
          que provee información completa del universo Pokémon.
        </Text>

        {/* Lista de features */}
        <View className="gap-2">
          <Text className="text-slate-700">• Nombres y números de Pokédex</Text>
          <Text className="text-slate-700">• Tipos y estadísticas base</Text>
          <Text className="text-slate-700">• Especies y colores</Text>
          <Text className="text-slate-700">• Sprites oficiales</Text>
        </View>
      </View>

      {/* Footer / nota */}
      <View className="mt-6">
        <Text className="text-sm text-slate-500 leading-5">
          Esta app fue desarrollada con React Native + Expo como proyecto de aprendizaje,
          enfocándose en buenas prácticas de arquitectura, navegación y consumo de APIs.
        </Text>
      </View>
    </View>
  );
}
