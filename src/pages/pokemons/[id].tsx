import network from "@/services/network";
import { getPokemonDetailQuery, getPokemonIDListQuery } from "@/gql/pokemon.query";
import { GetStaticPaths, GetStaticProps } from "next";

interface PokemonIDListResponseType {
  pokemon_v2_pokemon: {
    id: string
  }[];
}

interface PokemonDetailResponseType {
  pokemon_v2_pokemon: {
    id: string,
    name: string,

  }[];
}

interface PokemonDetailType {
  id: string,
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

export const getStaticProps: GetStaticProps<{}, { id: string }> = async ({ params }) => {
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

    const pokemonData = response.pokemon_v2_pokemon[0];

    console.log("pokemonData ==> ", pokemonData);
  }

  return {
    props: returnedData
  };
};

export default PokemonDetailPage;