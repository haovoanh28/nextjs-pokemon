export interface IPokemonOverLook {
  id: number,
  name: string,
  pokemon_v2_pokemontypes: {
    pokemon_v2_type: {
      name: string
    }[]
  }
}