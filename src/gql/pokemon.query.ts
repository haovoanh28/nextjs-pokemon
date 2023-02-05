export const getPokemonListQuery = `
  query pokemonList($limit: Int) {
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

export const getPokemonIDListQuery = `
  query pokemonIDList {
    pokemon_v2_pokemon {
      id
    }
  }
`;