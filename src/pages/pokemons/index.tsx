import { useRef, useState } from "react";

import network from "@/services/network";
import { getPokemonListQuery } from "@/gql/queries";

import Link from "next/link";
import PokemonCard from "@/components/PokemonCard";
import { Box, Container, Grid } from "@mui/material";

import { getPokemonImageLink } from "@/utils";

import { GetServerSideProps } from "next";
import { CommonPokemonDataType } from "@/types/pokemon.types";
import { PokemonListResponseType, PokemonTypesResponse } from "@/gql/responses";

interface IComponentProps {
  pokemons: CommonPokemonDataType[],
  nextPage: string
}

const PokemonListPage: React.FC<IComponentProps> = ({ pokemons, nextPage }) => {
  const [data, setData] = useState<CommonPokemonDataType[]>(pokemons);

  const observer = useRef<IntersectionObserver | null>(null);


  return (
      <Box py={4}>
        <Container maxWidth={"xl"}>
          <h1>Pokemon List</h1>
          <Grid container spacing={3}>
            {
              data.map(pokemon => (
                  <Grid item xs={6} sm={4} md={3} lg={2} key={pokemon.id}>
                    <Link href={`/pokemons/${pokemon.id}`} style={{ textDecoration: "none" }}>
                      <PokemonCard pokemon={pokemon} />
                    </Link>
                  </Grid>
              ))
            }
          </Grid>

          <Link href={nextPage}>
            Next Page
          </Link>
        </Container>
      </Box>
  );
};

const PAGE_LIMIT = 20;
export const getServerSideProps: GetServerSideProps<IComponentProps> = async function(ctx) {
  const page: number = parseInt(ctx.query?.page as string) || 1;
  const limit: number = PAGE_LIMIT;
  const offset: number = (page - 1) * PAGE_LIMIT;

  console.log("page ==> ", page);
  console.log("offset ==> ", offset);
  const response: PokemonListResponseType = await network.post({
    data: {
      query: getPokemonListQuery,
      variables: {
        limit: limit,
        offset: offset
      }
    }
  });

  const formattedPokemons = response.pokemon_v2_pokemon.map(pokemon => {
    return {
      name: pokemon.name,
      id: pokemon.id,
      types: pokemon.pokemon_v2_pokemontypes.map((_v: PokemonTypesResponse) => _v.pokemon_v2_type),
      image: getPokemonImageLink(pokemon.id),
    };
  });

  console.log(formattedPokemons);

  return {
    props: {
      pokemons: formattedPokemons,
      nextPage: `/pokemons?page=${page + 1}`
    }
  };
};

export default PokemonListPage;