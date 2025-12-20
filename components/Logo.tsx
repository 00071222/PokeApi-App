import { Image, View } from "react-native";

export default function Logo() {
  return (
    <View className="flex-row items-center justify-center gap-2">
      {/* Pokéball */}
      <Image
        source={require("../assets/images/Pokeball.webp")}
        style={{ width: 32, height: 32 }}
        resizeMode="cover"
      />

      {/* Logo Pokémon */}
      <Image
        source={require("../assets/images/Pokemon.png")}
        style={{ width: 110, height: 32 }}
        resizeMode="cover"
      />
    </View>
  );
}
