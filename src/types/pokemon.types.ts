export type NameAndUrl = {
  name: string,
  url: string
}

export interface IPokemonOverLook {
  id: number,
  url: string,
  name: string,
  image: string
}

export interface PokemonTypes {
  id: number,
  name: string,
  sprites: {
    front_default: string
  }
  types: {
    type: {
      name: string
    }[]
  }
}