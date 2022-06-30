import React, { FunctionComponent, useEffect, useState } from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import { PokemonDetails, SpeciesInfo } from "../types";

interface ModalProps {
  stats: PokemonDetails;
  details: SpeciesInfo;
}

const PokeModal = (item: PokemonDetails) => {
  // const item = details.stats;

  let flavors = [];

  for (
    let index = 0;
    index < item.speciesInfo.flavor_text_entries.length;
    index++
  ) {
    if (item.speciesInfo.flavor_text_entries[index].language.name === "en") {
      flavors.push(item.speciesInfo.flavor_text_entries[index]);
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
      </Text>
      <Image
        style={styles.image}
        source={{ uri: item.sprites.other.home.front_default }}
      />
      <View style={styles.statsContainer}>
        <Text style={styles.flavor}>
          {flavors[flavors.length - 1].flavor_text.replace(/\n/g, " ")}
        </Text>
        <View style={{ flex: 1, flexDirection: "row" }}>
          {item.stats.map((data: any) => (
            <View key={data.stat.name} style={{ flex: 1 }}>
              <Text style={styles.stats}>
                {data.stat.name
                  .replace("hp", "HP")
                  .replace("attack", "ATK")
                  .replace("special-ATK", "SpA")
                  .replace("defense", "DEF")
                  .replace("special-DEF", "SpD")
                  .replace("speed", "SPE")}
              </Text>
              <Text style={{ textAlign: "center" }}>{data.base_stat}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    borderRadius: 20,
    backgroundColor: "grey",
    flex: 1,
  },
  statsContainer: {
    backgroundColor: "lightgrey",
    flex: 1,
    margin: 30,
    borderRadius: 30,
  },
  flavor: {
    textAlign: "center",
    fontSize: 18,
    backgroundColor: "white",
    margin: 10,
    borderRadius: 20,
    padding: 5,
  },
  stats: { textAlign: "center", fontSize: 16 },
  title: { textAlign: "center", fontSize: 34 },
  image: {
    width: 180,
    alignSelf: "center",
    height: 180,
  },
});

export default PokeModal;
