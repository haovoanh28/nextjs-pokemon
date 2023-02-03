export const getPokemonListQuery = `
  query pokemons($limit: Int) {
    pokemon_v2_pokemon(limit: $limit) {
      name
      id
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonforms {
        name
      }
    }
  }
`;

export const getPokemonDataQuery = `
  query pokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      sprites {
        front_default
      }
      types {
        type {
          name
        }
      }
    }
  }
`;