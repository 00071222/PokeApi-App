import { TextInput, View } from "react-native";

type Props = {
  value: string;
  onChangeText: (v: string) => void;
};

export default function SearchBar({ value, onChangeText }: Props) {
  return (
    <View className="mb-3">
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Buscar por nombre o # (ej: pikachu o 25)"
        className="bg-slate-100 rounded-2xl px-4 py-3"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="default"
        returnKeyType="search"
      />
    </View>
  );
}
