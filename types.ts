export interface PokemonURLS {
  name: string;
  url: string;
}
export interface Pokemon {
  count: number;
  next: string;
  previous: null;
  results: PokemonURLS[];
}

interface Abilities {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}
interface Forms {
  name: string;
  url: string;
}
interface GameIndices {
  game_index: number;
  version: {
    name: string;
    url: string;
  };
}

interface VersionDetails {
  rarity: number;
  version: {
    name: string;
    url: string;
  };
}
interface HeldItems {
  item: {
    name: string;
    url: string;
  };
  version_details: VersionDetails[];
}

interface MoveVersionGroupDetails {
  level_learned_at: number;
  move_learn_method: {
    name: string;
    url: string;
  };
  version_group: {
    name: string;
    url: string;
  };
}
interface Moves {
  move: {
    name: string;
    url: string;
  };
  version_group_details: MoveVersionGroupDetails[];
}
interface PastTypes {}
interface Stats {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}
interface Types {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonDetails {
  abilities: Abilities[];
  base_experience: number;
  forms: Forms[];
  game_indices: GameIndices[];
  height: number;
  held_items: HeldItems[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Moves[];
  name: string;
  order: number;
  past_types: PastTypes[];
  species: PokemonURLS;
  sprites: {
    back_default: string;
    back_female: string;
    back_shiny: string;
    back_shiny_female: string;
    front_default: string;
    front_female: string;
    front_shiny: string;
    front_shiny_female: string;
    other: {
      home: {
        front_default: string;
        front_shiny: string;
      };
    };
    dex: number;
  };
  varieties: Varieties[];
  stats: Stats[];
  types: Types[];
  weight: number;
  speciesInfo: SpeciesInfo;
}

interface Flavor {
  flavor_text: string;
  language: {
    name: string;
    url: string;
  };
  version: {
    name: string;
    url: string;
  };
}

interface Varieties {
  is_default: boolean;
  pokemon: {
    name: string;
    url: string;
  };
}

export interface SpeciesInfo {
  color: {
    name: string;
    url: string;
  };
  flavor_text_entries: Flavor[];
  evolves_from_species: {
    name: string;
    url: string;
  };
  evolution_chain: {
    url: string;
  };
  varieties: Varieties[];
  id: number;
}
