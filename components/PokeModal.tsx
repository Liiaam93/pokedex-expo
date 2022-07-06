import React, { FunctionComponent } from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { PokemonDetails } from "../types";

const PokeModal = (item: PokemonDetails) => {
  let flavors = [];
  const bst =
    item.stats[0].base_stat +
    item.stats[1].base_stat +
    item.stats[2].base_stat +
    item.stats[3].base_stat +
    item.stats[4].base_stat +
    item.stats[5].base_stat;

  let bstColor = "red";
  bst > 399 ? (bstColor = "orange") : "";
  bst > 499 ? (bstColor = "yellow") : "";
  bst > 599 ? (bstColor = "green") : "";

  const statColor = (stat: number) => {
    let color = "red";
    stat > 59 ? (color = "orange") : "";
    stat > 79 ? (color = "yellow") : "";
    stat > 99 ? (color = "green") : "";
    return color;
  };

  let evolveURL =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/";

  if (item.speciesInfo.evolves_from_species) {
    evolveURL += item.speciesInfo.evolves_from_species.url.replace(
      "https://pokeapi.co/api/v2/pokemon-species/",
      ""
    );
    evolveURL = evolveURL + ".png";
    evolveURL = evolveURL.replace("/.png", ".png");
  }

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
        <Text style={styles.subtitle}>
          {flavors[flavors.length - 1].version.name
            .toUpperCase()
            .replace("-", " ")}{" "}
          ENTRY
        </Text>
        <Text style={styles.flavorContainer}>
          {flavors[flavors.length - 1].flavor_text.replace(/\n/g, " ")}
        </Text>
        <View style={styles.flexRow}>
          <Text
            style={{
              borderRadius: 10,
              textAlign: "center",
              width: "40%",
              backgroundColor: "white",
              height: 20,
              margin: "5%",
              marginTop: 0,
              marginBottom: 0,
            }}
          >
            {(item.height / 10).toFixed(1)} m
          </Text>
          <Text
            style={{
              borderRadius: 10,
              textAlign: "center",
              width: "40%",
              backgroundColor: "white",
              height: 20,
              margin: "5%",
              marginTop: 0,
              marginBottom: 0,
            }}
          >
            {item.weight / 10} kg
          </Text>
        </View>
        <View
          style={
            (styles.flexColumn,
            { backgroundColor: "white", borderRadius: 10, margin: 10 })
          }
        >
          <Text style={styles.subtitle}>BASE STATS</Text>

          {item.stats.map((data: any) => (
            <View
              key={data.stat.name}
              style={{
                flex: 0,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={styles.stats}>
                {data.stat.name
                  .replace("hp", "HP")
                  .replace("attack", "ATK")
                  .replace("special-ATK", "SpA")
                  .replace("defense", "DEF")
                  .replace("special-DEF", "SpD")
                  .replace("speed", "SPE")}
              </Text>
              <Text style={styles.stats}>{data.base_stat}</Text>

              <Text
                style={{
                  backgroundColor: statColor(data.base_stat),
                  borderRadius: 5,
                  borderWidth: 1,
                  width: (data.base_stat / 255) * 150,
                  height: 15,
                  margin: 5,
                }}
              >
                {"  "}
              </Text>
            </View>
          ))}
          <View style={styles.flexRow}>
            <Text style={styles.stats}>TOTAL </Text>
            <Text style={styles.stats}>{bst}</Text>
            <Text
              style={{
                textAlign: "center",
                backgroundColor: bstColor,
                borderRadius: 5,
                borderWidth: 1,
                width: (bst / 100) * 8 + "%",
                height: 15,
                marginLeft: 3,
              }}
            >
              {"  "}
            </Text>
          </View>
        </View>
        <Text style={styles.subtitle}>ABILITIES</Text>
        <View
          style={{
            margin: 20,
            marginTop: 0,
            flex: 0,
            flexDirection: "row",
            alignContent: "center",
          }}
        >
          {item.abilities.map((p) => (
            <Text
              key={p.ability.name}
              style={{
                marginRight: 5,
                width: 100 / item.abilities.length + "%",
                textAlignVertical: "center",
                textAlign: "center",
                borderRadius: 10,
                backgroundColor: p.is_hidden ? "lightblue" : "lightyellow",
              }}
            >
              {p.ability.name.toLocaleUpperCase().replace("-", " ")}
            </Text>
          ))}
        </View>
        <Text style={styles.subtitle}>
          {item.base_experience} BASE EXPERIENCE {item.speciesInfo.id}
        </Text>
        {item.speciesInfo.evolves_from_species && (
          <View style={styles.flexColumn}>
            <Image
              style={styles.image}
              source={{
                uri: evolveURL,
              }}
            />
          </View>
        )}
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
    borderWidth: 1,
    borderColor: "black",
  },
  title: { textAlign: "center", fontSize: 34 },
  image: {
    width: 100,
    alignSelf: "center",
    height: 100,
  },
  statsContainer: {
    backgroundColor: "lightgrey",
    flex: 1,
    margin: 20,
    borderRadius: 30,
  },
  flavorContainer: {
    textAlign: "center",
    fontSize: 18,
    backgroundColor: "white",
    margin: 10,
    marginTop: 0,
    borderRadius: 20,
    padding: 5,
  },
  stats: {
    textAlign: "center",
    fontSize: 12,
    width: "20%",
  },
  subtitle: {
    textAlign: "center",
    fontSize: 14,
    padding: 2,
  },

  flexRow: {
    flex: 0,
    flexDirection: "row",
    alignContent: "center",
    margin: 5,
  },
  flexColumn: {
    flex: 1,
    flexDirection: "column",
  },
});

export default PokeModal;
