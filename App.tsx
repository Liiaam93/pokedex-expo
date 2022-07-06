import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, TextInput } from "react-native";
import { Promise } from "bluebird";
import { PokemonDetails, PokemonURLS, Pokemon, SpeciesInfo } from "./types";
import PokemonContainer from "./components/PokemonContainer";
import { __ } from "lodash";
import _ from "lodash";
const POKEMON_LIMIT = 12;

export default function App() {
  const [firstGenPokemonDetails, setfirstGenPokemonDetails] =
    useState<PokemonDetails[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filtered, setFiltered] = useState<PokemonDetails[]>();
  const [currentOffset, setCurrentOffset] = useState(0);

  useEffect(() => {
    if (currentOffset > 1100) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const fetchFirstGenPokemons = async () => {
      const pokemonResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${POKEMON_LIMIT}&offset=${currentOffset}`
      );
      const pokeJSON: Pokemon = await pokemonResponse.json();
      const pokemonDetails: PokemonDetails[] = await Promise.map(
        pokeJSON.results,
        async (f: PokemonURLS) => (await fetch(f.url)).json(),
        { concurrency: 5 }
      );
      const getPokemonDescriptions: SpeciesInfo[] = await Promise.map(
        pokemonDetails,
        async (item: PokemonDetails) => (await fetch(item.species.url)).json(),
        { concurrency: 5 }
      );
      let full: PokemonDetails[] = pokemonDetails
        .map((p, index) => ({
          ...p,
          speciesInfo: getPokemonDescriptions[index],
          dex: getPokemonDescriptions[index].id,
        }))
        .filter((p) => p.name.includes("-mega") !== true)
        .filter((p) => p.name.includes("-totem-alola") !== true)
        .filter((p) => p.name.includes("pikachu-") !== true)
        .filter((p) => p.name.includes("totem") !== true)
        .filter((p) => p.name.includes("-starter") !== true)
        .filter((p) => p.name.includes("-gmax") !== true);

      setfirstGenPokemonDetails((prevState) =>
        prevState ? [...prevState, ...full] : [...full]
      );
      setFiltered((prevState) =>
        prevState ? [...prevState, ...full] : [...full]
      );
      setCurrentOffset((prevState) => prevState + POKEMON_LIMIT);
    };
    fetchFirstGenPokemons();
  }, [currentOffset]);

  const handleSearch = (text: string) => {
    let filter: PokemonDetails[] = [];
    firstGenPokemonDetails &&
      firstGenPokemonDetails.map((p) => {
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
          setFiltered(firstGenPokemonDetails);
        }
      });
    setSearchQuery(text);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>PokeDex</Text>
      {/* <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} /> */}
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
        data={filtered?.sort((a, b) => a.speciesInfo.id - b.speciesInfo.id)}
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
