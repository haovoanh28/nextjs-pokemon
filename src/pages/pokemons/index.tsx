import { useEffect, useState } from "react";

import network from "@/services/network";
import { getPokemonListQuery } from "@/gql/queries";
import { useInfiniteQuery } from "react-query";

import Head from "next/head";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import PokemonCard from "@/components/PokemonCard";
import { Box, Container, Grid, Typography } from "@mui/material";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import { getPokemonImageLink } from "@/utils";

import { GetServerSideProps } from "next";
import { CommonPokemonDataType } from "@/types/pokemon.types";
import { PokemonListResponseType, PokemonTypesResponse } from "@/gql/responses";

interface IComponentProps {
  pokemons: CommonPokemonDataType[],
  nextPage: number,
  prevPage: number
}

const PAGE_SIZE = 20;

async function getPokemonList(page: number): Promise<IComponentProps> {
  const limit: number = PAGE_SIZE;
  const offset: number = (page - 1) * PAGE_SIZE;

  const response: PokemonListResponseType = await network.post({
    data: {
      query: getPokemonListQuery,
      variables: {
        limit: limit,
        offset: offset
      }
    }
  });

  return Promise.resolve({
    pokemons: response.pokemon_v2_pokemon.map(pokemon => {
      return {
        name: pokemon.name,
        id: pokemon.id,
        types: pokemon.pokemon_v2_pokemontypes.map((_v: PokemonTypesResponse) => _v.pokemon_v2_type),
        image: getPokemonImageLink(pokemon.id),
      };
    }),
    nextPage: page + 1,
    prevPage: page - 1,
  });
}

const PokemonListPage: React.FC<IComponentProps> = ({ pokemons, nextPage, prevPage }) => {
  const [pokemonList, setPokemonList] = useState<CommonPokemonDataType[]>(pokemons);

  const { data, status, fetchNextPage, hasNextPage } = useInfiniteQuery(
      ["pokemons", nextPage],
      ({ pageParam = nextPage }) => {
        return getPokemonList(pageParam);
      }, {
        initialData: {
          pageParams: [nextPage - 1],
          pages: [{
            pokemons: pokemons,
            nextPage: nextPage,
            prevPage: prevPage
          }],
        },
        getNextPageParam: (lastPage) => {
          return lastPage.pokemons.length != 0 ? lastPage.nextPage : undefined;
        }
      });

  useEffect(() => {
    if (data && data?.pages.length > 1) {
      console.log("data ==> ", data);
      const newList = data.pages.map(value => {
        return value.pokemons;
      });

      setPokemonList(newList.flat());
    }
  }, [data]);

  return (
      <>
        <Head>
          <title>Pokemons</title>
          {
              prevPage != 0 && (
                  <link rel="prev" href={`/pokemons?page=${prevPage}`} />
              )
          }

          <link rel="next" href={`/pokemons?page=${nextPage}`} />
        </Head>

        <Box py={4}>
          <Container maxWidth={"xl"}>
            <h1>Pokemon List</h1>
            <InfiniteScroll
                scrollThreshold={0.8}
                dataLength={pokemonList.length}
                hasMore={hasNextPage || false}
                style={{
                  overflow: "unset"
                }}
                next={fetchNextPage}
                loader={
                  <Box mt={4} display="flex" justifyContent="center" alignItems="center">
                    <Typography variant={"pokemonName"}> Loading More ... </Typography>
                  </Box>
                }
            >
              <Grid container spacing={3}>
                {
                  pokemonList.map(pokemon => (
                      <Grid item xs={12} sm={6} md={3} lg={2} key={pokemon.id}>
                        <Link href={`/pokemons/${pokemon.id}`} style={{ textDecoration: "none" }}>
                          <PokemonCard pokemon={pokemon} />
                        </Link>
                      </Grid>
                  ))
                }
              </Grid>
            </InfiniteScroll>
          </Container>
        </Box>
      </>

  );
};

export const getServerSideProps: GetServerSideProps<IComponentProps> = async function({ query, res }) {
  if (!query?.page) {
    res.writeHead(302, {
      Location: "/pokemons?page=1"
    });
    res.end();
  }

  const page: number = parseInt(query?.page as string) || 1;
  const { pokemons, nextPage, prevPage } = await getPokemonList(page);

  return {
    props: {
      pokemons: pokemons,
      nextPage: nextPage,
      prevPage: prevPage
    }
  };
};

export default PokemonListPage;