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

export const getPokemonDetailQuery = `
  query pokemmonDetail($id: Int) {
    pokemon_v2_pokemon(where: {id: {_eq: $id}}) {
      name
      height
      id
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
          id
        }
      }
      pokemon_v2_pokemonstats {
        base_stat
        stat_id
        pokemon_v2_stat {
          name
          id
        }
      }
    }
  }
`;