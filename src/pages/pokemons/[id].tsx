import network from "@/services/network";
import { getPokemonIDListQuery } from "@/gql/pokemon.query";
import { GetStaticPaths, GetStaticProps } from "next";

const PokemonDetailPage: React.FC = () => {
  return (
      <>
        <div></div>
      </>
  );
};

interface PokemonIDListResponseType {
  pokemon_v2_pokemon: {
    id: string
  }[];
}

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

export const getStaticProps: GetStaticProps = async (ctx) => {
  console.log("context ==> ", ctx);

  return {
    props: {}
  };
};

export default PokemonDetailPage;