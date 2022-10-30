import { PokemonURLS, PokemonDetails, SpeciesInfo, Pokemon } from "./types";

// const POKEMON_LIMIT = 10;
let currentOffset = 0;

export const fetchPoke = (currentOffset: number): PokemonDetails[] => {
  let mon: PokemonDetails[] = [];
  fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${currentOffset}`)
    .then((response) => response.json())
    .then((data: Pokemon) => {
      return data.results;
    })
    .then(async (data) => {
      await Promise.all(
        data.map((p, index) => {
          return fetch(p.url)
            .then((response) => response.json())
            .then((data: PokemonDetails) => {
              return fetch(data.species.url)
                .then((resp) => resp.json())
                .then((d: SpeciesInfo) => {
                  mon[index] = { ...data };
                  mon[index].speciesInfo = d;
                });
            });
        })
      );
      return mon;
      // console.log(mon[0].speciesInfo);
    });
  return mon;
};
