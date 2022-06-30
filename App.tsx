import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Promise } from "bluebird";

const pokePath = "https://pokeapi.co/api/v2/";
const pokeQuery = "pokemon?limit=820&offset=0";
const firstGenPokemonPath = `${pokePath}${pokeQuery}`;
import { PokemonDetails, PokemonURLS, Pokemon, SpeciesInfo } from "./types";
import PokemonContainer from "./components/PokemonContainer";

//1 Call Pokemon IDs --> 151 = 152 Calls to the API

export default function App() {
  const [firstGenPokemonDetails, setfirstGenPokemonDetails] =
    useState<PokemonDetails[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFirstGenPokemons = async () => {
      setLoading(true);
      const firstGenPokemonIdsResponse = await fetch(firstGenPokemonPath);
      const firstGenPokemonIdsBody: Pokemon =
        await firstGenPokemonIdsResponse.json();

      const pokemonDetails = await Promise.all(
        firstGenPokemonIdsBody.results.map(async (p: PokemonURLS) => {
          const pDetails = await fetch(p.url);
          const json: PokemonDetails = await pDetails.json();
          return json;
        })
      );

      const getPokemonDescriptions = await Promise.all(
        pokemonDetails.map(async (item: PokemonDetails, index: number) => {
          const species = await fetch(item.species.url);
          const json: SpeciesInfo = await species.json();
          return json;
        })
      );

      let full: PokemonDetails[] = pokemonDetails;

      for (let index = 0; index < pokemonDetails.length; index++) {
        full[index].speciesInfo = getPokemonDescriptions[index];
      }
      setfirstGenPokemonDetails(full);
      setLoading(false);
    };

    fetchFirstGenPokemons();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liams PokeDex</Text>
      {loading && <Text style={styles.title}>Loading...</Text>}
      <FlatList
        initialNumToRender={12}
        refreshing={loading}
        data={firstGenPokemonDetails}
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
});
