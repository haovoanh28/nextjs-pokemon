import network from "@/services/network";
import { getPokemonListQuery } from "@/gql/pokemon.query";

import Link from "next/link";
import PokemonCard from "@/components/PokemonCard";
import { Container, Grid } from "@mui/material";

import { getPokemonImageLink } from "@/utils";

import { GetServerSideProps } from "next";
import { CommonPokemonDataType, PokemonIdentifierType, PokemonTypesType } from "@/types/pokemon.types";

interface IComponentProps {
  pokemons: CommonPokemonDataType[],
}

interface IPokemonListResponse {
  pokemon_v2_pokemon: ({
    pokemon_v2_pokemontypes: {
      pokemon_v2_type: {
        name: PokemonTypesType
      }
    }[]
  } & PokemonIdentifierType)[];
}

const PokemonListPage: React.FC<IComponentProps> = ({ pokemons }) => {
  return (
      <Container maxWidth={"xl"}>
        <h1>Pokemon List</h1>
        <Grid container spacing={3}>
          {
            pokemons.map(pokemon => (
                <Grid item xs={6} sm={4} md={3} lg={2} key={pokemon.id}>
                  <Link href={`/pokemons/${pokemon.id}`} style={{ textDecoration: "none" }}>
                    <PokemonCard pokemon={pokemon} />
                  </Link>
                </Grid>
            ))
          }
        </Grid>
      </Container>
  );
};

export const getServerSideProps: GetServerSideProps<IComponentProps> = async function() {
  const response: IPokemonListResponse = await network.post({
    data: {
      query: getPokemonListQuery,
      variables: {
        limit: 100,
      }
    }
  });

  const formattedPokemons = response.pokemon_v2_pokemon.map(pokemon => {
    return {
      name: pokemon.name,
      id: pokemon.id,
      types: pokemon.pokemon_v2_pokemontypes.map(v => v.pokemon_v2_type),
      image: getPokemonImageLink(pokemon.id),
    };
  });

  // console.log(formattedPokemons);

  return {
    props: {
      pokemons: formattedPokemons
    }
  };
};

export default PokemonListPage;