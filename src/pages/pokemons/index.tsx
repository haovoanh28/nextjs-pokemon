import network from "@/services/network";
import { getPokemonListQuery } from "@/gql/pokemon.query";

import Link from "next/link";
import PokemonCard from "@/components/PokemonCard";
import { Container, Grid } from "@mui/material";

import { getPokemonImageLink } from "@/utils";

import { GetServerSideProps } from "next";
import { IPokemonOverLook } from "@/types/pokemon.types";

type PokemonOverLookArrayType = IPokemonOverLook[]

interface IComponentProps {
  pokemons: PokemonOverLookArrayType,
}

interface IPokemonListResponse {
  pokemon_v2_pokemon: PokemonOverLookArrayType;
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
        limit: 50,
      }
    }
  });

  const formattedPokemons = response.pokemon_v2_pokemon.map(pokemon => {
    return {
      ...pokemon,
      image: getPokemonImageLink(pokemon.id),
    };
  });

  return {
    props: {
      pokemons: formattedPokemons
    }
  };
};

export default PokemonListPage;