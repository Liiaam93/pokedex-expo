import React, { useState, useEffect, memo } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import { PokemonDetails } from "../types";
// import { LinearGradient } from "expo-linear-gradient";
import PokeModal from "./PokeModal";

const colors = {
  bug: "#8CB230",
  dark: "#58575F",
  dragon: "#8F6AC8",
  electric: "#EED535",
  fairy: "#ED6EC7",
  fighting: "#D04164",
  fire: "#FD7D24",
  flying: "#748FC9",
  ghost: "#556AAE",
  grass: "#62B957",
  ground: "#DD7748",
  ice: "#61CEC0",
  normal: "#9DA0AA",
  poison: "#A552CC",
  psychic: "purple",
  rock: "#BAAB82",
  steel: "#417D9A",
  water: "blue",
};

const PokemonContainer = (item: PokemonDetails) => {
  const [typeOne, setTypeOne] = useState(require("../assets/Fire.png"));
  const [typeTwo, setTypeTwo] = useState(require("../assets/icon.png"));
  const [backGround, setBackGround] = useState("grey");
  const [backGroundTwo, setBackGroundTwo] = useState("grey");
  const [isClicked, setIsClicked] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [details, setDetails] = useState();

  useEffect(() => {
    switch (item.types[0].type.name) {
      case "dark":
        setTypeOne(require("../assets/Dark.png"));
        setBackGround(colors.dark);
        break;
      case "dragon":
        setTypeOne(require("../assets/Dragon.png"));
        setBackGround(colors.dragon);
        break;
      case "fire":
        setTypeOne(require("../assets/Fire.png"));
        setBackGround(colors.fire);
        break;
      case "grass":
        setTypeOne(require("../assets/Grass.png"));
        setBackGround(colors.grass);
        break;
      case "ghost":
        setTypeOne(require("../assets/Ghost.png"));
        setBackGround(colors.ghost);
        break;
      case "poison":
        setTypeOne(require("../assets/Poison.png"));
        setBackGround(colors.poison);
        break;
      case "water":
        setTypeOne(require("../assets/Water.png"));
        setBackGround(colors.water);
        break;
      case "normal":
        setTypeOne(require("../assets/Normal.png"));
        setBackGround(colors.normal);
        break;
      case "rock":
        setTypeOne(require("../assets/Rock.png"));
        setBackGround(colors.rock);
        break;
      case "steel":
        setTypeOne(require("../assets/Steel.png"));
        setBackGround(colors.steel);
        break;
      case "flying":
        setTypeOne(require("../assets/Flying.png"));
        setBackGround(colors.flying);
        break;
      case "ground":
        setTypeOne(require("../assets/Ground.png"));
        setBackGround(colors.ground);
        break;
      case "ice":
        setTypeOne(require("../assets/Ice.png"));
        setBackGround(colors.ice);
        break;
      case "bug":
        setTypeOne(require("../assets/Bug.png"));
        setBackGround(colors.bug);
        break;
      case "electric":
        setTypeOne(require("../assets/Electric.png"));
        setBackGround(colors.electric);
        break;
      case "fighting":
        setTypeOne(require("../assets/Fighting.png"));
        setBackGround(colors.fighting);
        break;
      case "psychic":
        setTypeOne(require("../assets/Psychic.png"));
        setBackGround(colors.psychic);
        break;
      case "fairy":
        setTypeOne(require("../assets/Fairy.png"));
        setBackGround(colors.fairy);
        break;
    }

    if (item.types[1]) {
      switch (item.types[1].type.name) {
        case "fire":
          setTypeTwo(require("../assets/Fire.png"));
          setBackGroundTwo(colors.fire);
          break;
        case "grass":
          setTypeTwo(require("../assets/Grass.png"));
          setBackGroundTwo(colors.grass);
          break;
        case "poison":
          setTypeTwo(require("../assets/Poison.png"));
          setBackGroundTwo(colors.poison);
          break;
        case "water":
          setTypeTwo(require("../assets/Water.png"));
          setBackGroundTwo(colors.water);
          break;
        case "rock":
          setTypeTwo(require("../assets/Rock.png"));
          setBackGroundTwo(colors.rock);
          break;
        case "flying":
          setTypeTwo(require("../assets/Flying.png"));
          setBackGroundTwo(colors.flying);
          break;
        case "steel":
          setTypeTwo(require("../assets/Steel.png"));
          setBackGroundTwo(colors.steel);
          break;
        case "ground":
          setTypeTwo(require("../assets/Ground.png"));
          setBackGroundTwo(colors.ground);
          break;
        case "electric":
          setTypeTwo(require("../assets/Electric.png"));
          setBackGroundTwo(colors.electric);
          break;
        case "ice":
          setTypeTwo(require("../assets/Ice.png"));
          setBackGroundTwo(colors.ice);
          break;
        case "psychic":
          setTypeTwo(require("../assets/Psychic.png"));
          setBackGroundTwo(colors.psychic);
          break;
        case "ghost":
          setTypeTwo(require("../assets/Ghost.png"));
          setBackGroundTwo(colors.ghost);
          break;
        case "dark":
          setTypeTwo(require("../assets/Dark.png"));
          setBackGroundTwo(colors.dark);
          break;
        case "dragon":
          setTypeTwo(require("../assets/Dragon.png"));
          setBackGroundTwo(colors.dragon);
          break;
        case "fighting":
          setTypeTwo(require("../assets/Fighting.png"));
          setBackGroundTwo(colors.fighting);
          break;
        case "normal":
          setTypeTwo(require("../assets/Normal.png"));
          setBackGroundTwo(colors.normal);
          break;
        case "fairy":
          setTypeTwo(require("../assets/Fairy.png"));
          setBackGroundTwo(colors.fairy);
          break;
      }
    }
  }, []);

  const handlePress = async () => {
    let eData;
    let json = [];
    modalVisible ? setModalVisible(false) : setModalVisible(true);
    item.speciesInfo.evolves_from_species
      ? (eData = await fetch(item.speciesInfo.evolution_chain.url))
      : "";
    eData ? (json = await eData.json()) : "";
    setDetails(json);
  };

  return (
    <TouchableOpacity key={item.id} onPress={handlePress}>
      <View style={[styles.pokemonContainer, { backgroundColor: "grey" }]}>
        {/* <LinearGradient
        end={{ x: 0.8, y: 0.5 }}
        start={{ x: 0.2, y: 0.5 }}
        colors={[
          backGround,
          item.speciesInfo.color.name,
          backGround === item.speciesInfo.color.name ? "grey" : backGroundTwo,
        ]}
        style={[
          styles.pokemonContainer,
          { backgroundColor: item.speciesInfo.color.name },
        ]}
      > */}
        <View style={styles.pokemonTitle}>
          <Text style={styles.dex}>
            #
            {parseInt(
              item.species.url
                .replace("https://pokeapi.co/api/v2/pokemon-species/", "")
                .replace("/", "")
            ) < 10 && "0"}
            {parseInt(
              item.species.url
                .replace("https://pokeapi.co/api/v2/pokemon-species/", "")
                .replace("/", "")
            ) < 100 && "0"}
            {parseInt(
              item.species.url
                .replace("https://pokeapi.co/api/v2/pokemon-species/", "")
                .replace("/", "")
            )}
          </Text>
          <Text style={styles.pokemonName}>
            {item.name.charAt(0).toUpperCase() +
              item.name
                .slice(1)
                .replace("oran-m", "ran ♂")
                .replace("oran-f", "ran	♀")
                .replace("-average", "")
                .replace("-normal", "")
                .replace("-altered", "")
                .replace("-standard", "")
                .replace("-incarnate", "")
                .replace("-ordinary", "")
                .replace("-50", "")
                .replace("-solo", "")
                .replace("-amped", "")
                .replace("-full-belly", "")
                .replace("-single-strike", "")
                .replace("-male", "")
                .replace("-", " ")}
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignSelf: "center",
            }}
          >
            <Image style={styles.pokemonTypes} source={typeOne} />

            {item.types[1] && (
              <Image style={styles.pokemonTypes} source={typeTwo} />
            )}
          </View>
        </View>
        <TouchableOpacity
          style={styles.pokemonSprite}
          onPress={() => setIsClicked(isClicked ? false : true)}
        >
          <Image
            style={styles.pokemonSprite}
            source={{
              uri: isClicked
                ? item.sprites.other.home.front_default
                : item.sprites.other.home.front_shiny,
            }}
          />
        </TouchableOpacity>
        {/* </LinearGradient> */}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <PokeModal {...item} />
      </Modal>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pokemonContainer: {
    margin: 2,
    marginRight: 2,
    borderWidth: 1,

    borderColor: "white",
    flex: 1,
    flexDirection: "row",
    height: 69,
    borderRadius: 50,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  backGround: {
    flexDirection: "row",
  },
  dex: {
    fontSize: 20,
    textAlign: "center",
    textAlignVertical: "center",
    borderRadius: 10,
    borderBottomRightRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: "rgba(91, 83, 87, 0.5)",
    padding: 10,
    marginRight: 10,
    color: "white",
    height: 68,
  },
  pokemonTitle: {
    width: "65%",
    fontSize: 20,
    alignSelf: "center",
    textAlign: "center",
    flex: 1,
    flexDirection: "row",
    textAlignVertical: "center",
  },
  pokemonTypes: {
    width: 30,
    height: 30,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 50,
    margin: 5,
    marginLeft: 10,
  },
  pokemonName: {
    backgroundColor: "white",
    textAlign: "center",
    borderWidth: 0,
    fontSize: 16,
    borderRadius: 10,
    alignSelf: "center",
    width: 120,
    padding: 5,
  },
  pokemonSprite: {
    width: 85,
    height: 85,
    alignSelf: "flex-end",
  },
});
export default memo(PokemonContainer);
