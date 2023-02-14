import { useEffect } from "react";

import network from "@/services/network";
import { getPokemonDetailQuery, getPokemonIDListQuery } from "@/gql/queries";

import Head from "next/head";
import { Box } from "@mui/material";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import { formatName, getPokemonColorByType, getPokemonImageLink, getGradientColorByTypes } from "@/utils";

import { GetStaticPaths, GetStaticProps } from "next";
import { CommonPokemonDataType } from "@/types/pokemon.types";
import { PokemonDetailResponseType, PokemonIDListResponseType } from "@/gql/responses";

interface PokemonDetailType extends CommonPokemonDataType {
  baseStats: {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
  };
}

const PokemonDetailPage: React.FC<{ data: PokemonDetailType }> = ({ data }) => {
  useEffect(() => {
    console.log("data ==> ", data);
  }, []);

  const linearColors = data.types.map((type, index) => {
    const color = getPokemonColorByType(type.name);
    const percentageStart = 50 * index;
    const percentageEnd = 50 * (index + 1);
    return `${color} ${percentageStart}%, ${color} ${percentageEnd}%`;
  });

  return (
      <>
        <Head>
          <title>{formatName(data.name)}</title>
        </Head>
        <Box p={2} sx={{
          background: `linear-gradient(${getGradientColorByTypes(data.types)})`
        }}>
          <KeyboardBackspaceIcon sx={{
            display: "block",
            color: "white"
          }} />
        </Box>
      </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response: PokemonIDListResponseType = await network.post({
    data: {
      query: getPokemonIDListQuery,
    }
  });

  return {
    paths: response.pokemon_v2_pokemon.map(pokemon =>
        ({
          params: {
            id: pokemon.id.toString()
          }
        })
    ),
    fallback: false
  };
};

const generatePokemonDetailData = (pokemonDataResponse: PokemonDetailResponseType["pokemon_v2_pokemon"][0]): PokemonDetailType => {
  return {
    id: pokemonDataResponse.id,
    name: pokemonDataResponse.name,
    image: getPokemonImageLink(pokemonDataResponse.id),
    types: pokemonDataResponse.pokemon_v2_pokemontypes.map(_v => _v.pokemon_v2_type),
    baseStats: pokemonDataResponse.pokemon_v2_pokemonstats.reduce((acc, cur) => {
      switch (cur.pokemon_v2_stat.name) {
        case "hp":
          return { ...acc, hp: cur.base_stat };
        case 'attack':
          return { ...acc, attack: cur.base_stat };
        case 'defense':
          return { ...acc, defense: cur.base_stat };
        case 'special-attack':
          return { ...acc, specialAttack: cur.base_stat };
        case 'special-defense':
          return { ...acc, specialDefense: cur.base_stat };
        case 'speed':
          return { ...acc, speed: cur.base_stat };
        default:
          return acc;
      }
    }, {
      hp: 0,
      attack: 0,
      defense: 0,
      specialAttack: 0,
      specialDefense: 0,
      speed: 0
    }),
  };
};

export const getStaticProps: GetStaticProps<{ data: PokemonDetailType }, { id: string }> = async ({ params }) => {
  const response: PokemonDetailResponseType = await network.post({
    data: {
      query: getPokemonDetailQuery,
      variables: {
        id: params!.id
      }
    }
  });

  const pokemonDataResponse = response.pokemon_v2_pokemon[0];
  const pokemonDetailData: PokemonDetailType = generatePokemonDetailData(pokemonDataResponse);

  return {
    props: {
      data: pokemonDetailData
    }
  };
};

export default PokemonDetailPage;