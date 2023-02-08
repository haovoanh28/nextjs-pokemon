export type PokemonTypesType =
    'normal'
    | 'fire'
    | 'water'
    | 'electric'
    | 'grass'
    | 'ice'
    | 'fighting'
    | 'poison'
    | 'ground'
    | 'flying'
    | 'psychic'
    | 'bug'
    | 'rock'
    | 'ghost'
    | 'dragon'
    | 'dark'
    | 'steel'
    | 'fairy';

export type PokemonStatNames = 'hp' | 'attack' | 'defense' | 'special-attack' | 'special-defense' | 'speed';

export interface PokemonIdentifier {
  id: number;
  name: string;
}

export interface CommonPokemonDataType extends PokemonIdentifier {
  image: string;
  types: {
    name: PokemonTypesType
  }[];
}
