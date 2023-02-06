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

export interface CommonPokemonDataType {
  id: string,
  name: string,
  image: string
}

export interface IPokemonOverLook extends CommonPokemonDataType {
  pokemon_v2_pokemontypes: {
    pokemon_v2_type: {
      name: PokemonTypesType
    }
  }[],
}