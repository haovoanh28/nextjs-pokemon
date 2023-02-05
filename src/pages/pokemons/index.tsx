import network from "@/services/network";
import { getPokemonListQuery } from "@/gql/pokemon.query";

import { Container, Grid } from "@mui/material";
import PokemonCard from "@/components/PokemonCard";

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
      <Container maxWidth={"lg"}>
        <h1>Pokemon List</h1>
        <Grid container spacing={3}>
          {
            pokemons.map(pokemon => (
                <Grid item xs={12} sm={4} md={2} lg={2} key={pokemon.id}>
                  <PokemonCard pokemon={pokemon} />
                </Grid>
            ))
          }
        </Grid>
      </Container>
  );
};

export const getServerSideProps: GetServerSideProps<IComponentProps> = async function(context) {
  const response: IPokemonListResponse = await network.post({
    data: {
      query: getPokemonListQuery,
      variables: {
        limit: 50,
      }
    }
  });

  const formattedPokemons = response.pokemon_v2_pokemon.map(pokemon => {
    const imageLink = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`;

    return {
      ...pokemon,
      image: imageLink,
    };
  });

  return {
    props: {
      pokemons: formattedPokemons
    }
  };
};

export default PokemonListPage;