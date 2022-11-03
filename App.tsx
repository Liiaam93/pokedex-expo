import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, TextInput } from "react-native";
import { Promise } from "bluebird";
import { PokemonDetails, PokemonURLS, Pokemon, SpeciesInfo } from "./types";
import PokemonContainer from "./components/PokemonContainer";
import { fetchPoke } from "./api";
const POKEMON_LIMIT = 10;

export default function App() {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filtered, setFiltered] = useState<PokemonDetails[]>();
  const [currentOffset, setCurrentOffset] = useState(0);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (currentOffset > 1100) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const fetchPokemon = async () => {
      const pokemonResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${POKEMON_LIMIT}&offset=${currentOffset}`
      );
      const pokeJSON: Pokemon = await pokemonResponse.json();
      const pokemonDetails: PokemonDetails[] = await Promise.all(
        pokeJSON.results.map(async (f) => await (await fetch(f.url)).json())
      )
        .filter((p) => p.name.includes("-mega") !== true)
        .filter((p) => p.name.includes("-totem-alola") !== true)
        .filter((p) => p.name.includes("pikachu-") !== true)
        .filter((p) => p.name.includes("totem") !== true)
        .filter((p) => p.name.includes("-starter") !== true)
        .filter((p) => p.name.includes("-gmax") !== true);

      setPokemonDetails((prevState) =>
        prevState ? [...prevState, ...pokemonDetails] : [...pokemonDetails]
      );
      setFiltered((prevState) =>
        prevState ? [...prevState, ...pokemonDetails] : [...pokemonDetails]
      );
      setCurrentOffset((prevState) => prevState + POKEMON_LIMIT);
    };
    fetchPokemon();
  }, [currentOffset]);

  const handleSearch = (text: string) => {
    let filter: PokemonDetails[] = [];
    pokemonDetails &&
      pokemonDetails.map((p) => {
        if (text !== "") {
          (p.name.toLowerCase().startsWith(text.toLowerCase()) &&
            filter.push(p)) ||
            (p.types[0].type.name === text.toLowerCase() && filter.push(p)) ||
            (p.types[1] &&
              p.types[1].type.name === text.toLowerCase() &&
              filter.push(p)) ||
            (p.id.toString() === text && filter.push(p));
          setFiltered(filter);
        } else {
          setFiltered(pokemonDetails);
        }
      });
    setSearchQuery(text);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>PokeDex</Text>
      {loading ? (
        <View>
          <Text style={styles.loading}>
            Loading: {((currentOffset / 1100) * 100).toFixed(0) + "%"}
          </Text>
          <Text
            style={{
              backgroundColor: "red",
              width: (currentOffset / 1100) * 100 + "%",
              margin: 20,
              alignSelf: "center",
              textAlign: "center",
            }}
          >
            {" "}
          </Text>
        </View>
      ) : (
        <TextInput
          style={styles.search}
          onChangeText={(text) => handleSearch(text)}
          value={searchQuery}
          underlineColorAndroid="transparent"
          placeholder="Search..."
        />
      )}

      <FlatList
        initialNumToRender={12}
        refreshing={loading}
        data={filtered?.sort((a, b) =>
          a.order !== -1 ? a.order - b.order : 1000
        )}
        renderItem={({ item }) => (
          <PokemonContainer key={item.name} {...item} />
        )}
        keyExtractor={(item) => item.name}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "slategrey",
  },
  title: {
    marginTop: 20,
    fontSize: 38,
    alignSelf: "center",
    marginBottom: 10,
  },
  search: {
    alignSelf: "center",
    width: "80%",
    textAlign: "center",
    backgroundColor: "white",
    height: 40,
    borderRadius: 20,
    marginBottom: 5,
  },
  loading: {
    alignSelf: "center",
  },
  loadingText: {
    borderWidth: 1,
    backgroundColor: "rgba(54, 25, 25, 0)",
    color: "black",
  },
});
