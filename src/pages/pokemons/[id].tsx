import network from "@/services/network";
import { getPokemonDetailQuery, getPokemonIDListQuery } from "@/gql/pokemon.query";

import { CommonPokemonDataType, PokemonIdentifierType } from "@/types/pokemon.types";
import { GetStaticPaths, GetStaticProps } from "next";

interface PokemonIDListResponseType {
  pokemon_v2_pokemon: {
    id: string
  }[];
}

interface PokemonDetailResponseType {
  pokemon_v2_pokemon: {
    id: number,
    name: string,
    pokemon_v2_pokemontypes: {
      pokemon_v2_type: PokemonIdentifierType
    }[]
  }[];
}

interface PokemonDetailType extends CommonPokemonDataType {

}

const PokemonDetailPage: React.FC = ({}) => {
  return (
      <>
        <div>he</div>
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

export const getStaticProps: GetStaticProps<PokemonDetailType, { id: string }> = async ({ params }) => {
  let returnedData = {};

  if (params) {
    console.log("params ==> ", params);
    const response: PokemonDetailResponseType = await network.post({
      data: {
        query: getPokemonDetailQuery,
        variables: {
          id: params.id
        }
      }
    });

    returnedData = response.pokemon_v2_pokemon[0];

    console.log("returnedData ==> ", returnedData);
  }

  return {
    props: returnedData
  };
};

export default PokemonDetailPage;