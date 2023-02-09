import { PokemonIdentifier, PokemonTypesType } from "@/types/pokemon.types";

export interface PokemonTypesResponse {
  pokemon_v2_type: {
    name: PokemonTypesType
  };
}

export interface PokemonListResponseType {
  pokemon_v2_pokemon: ({
    pokemon_v2_pokemontypes: PokemonTypesResponse[]
  } & PokemonIdentifier)[];
}

export interface PokemonIDListResponseType {
  pokemon_v2_pokemon: {
    id: string
  }[];
}

export interface PokemonDetailResponseType {
  pokemon_v2_pokemon: ({
    pokemon_v2_pokemontypes: {
      pokemon_v2_type: {
        id: string,
        name: PokemonTypesType
      }
    }[];
    pokemon_v2_pokemonstats: {
      base_stat: number;
      stat_id: string;
      pokemon_v2_stat: {
        id: string;
        name: 'hp' | 'attack' | 'defense' | 'special-attack' | 'special-defense' | 'speed';
      }
    }[];
  } & PokemonIdentifier)[];
}