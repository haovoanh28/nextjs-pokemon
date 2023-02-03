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
  console.log("pokemons ==> ", pokemons);

  return (
      <Container maxWidth={"lg"}>
        <h1>Pokemon List</h1>
        <Grid container spacing={3}>
          {
            pokemons.map(pokemon => (
                <Grid item xs={12} sm={4} md={3} lg={3} key={pokemon.id}>
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
        limit: 20,
      }
    }
  });

  console.log("response ==> ", response);

  return {
    props: {
      pokemons: response.pokemon_v2_pokemon
    }
  };
};

export default PokemonListPage;