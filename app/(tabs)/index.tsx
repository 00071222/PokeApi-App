import "../global.css";
import { FlatList, Text, View } from "react-native";
import PokemonCard from "../../components/PokemonCard";
import SearchBar from "../../components/SearchBar";
import { usePokemonList } from "../../src/hooks/usePokemonList";

export default function PokemonsTab() {
  const { query, setQuery, loading, pokemons, loadNextPage, canPaginate } = usePokemonList();

  return (
    <View className="flex-1 bg-white p-4">
      <SearchBar value={query} onChangeText={setQuery} />

      <FlatList
        data={pokemons}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        columnWrapperStyle={{ gap: 4 }}
        contentContainerStyle={{ gap: 1, paddingBottom: 24 }}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
        showsVerticalScrollIndicator={false}
        onEndReached={() => {
          if (canPaginate) loadNextPage();
        }}
        onEndReachedThreshold={0.4}
        ListFooterComponent={loading ? <Text className="text-center py-4">Cargando más...</Text> : null}
        ListEmptyComponent={
          <Text className="text-black/60 mt-4">No hay resultados para “{query}”</Text>
        }
      />
    </View>
  );
}
