import network from "@/services/network";
import { getPokemonListQuery } from "@/gql/pokemon.query";

import PokemonCard from "@/components/PokemonCard";

import { GetServerSideProps } from "next";
import { IPokemonOverLook } from "@/types/pokemon.types";

type PokemonOverLookArrayType = IPokemonOverLook[]

interface IComponentProps {
  pokemons: PokemonOverLookArrayType,
  next: string,
}

interface IPokemonListResponse {
  pokemons: {
    count: number,
    next: string,
    previous: string | null,
    results: PokemonOverLookArrayType,
  };
}

const PokemonListPage: React.FC<IComponentProps> = ({ pokemons, next }) => {
  console.log("pokemons ==> ", pokemons);
  console.log("next ==> ", next);

  return (
      <div>
        <h1>Pokemon List</h1>
        {
          pokemons.map(pokemon => <PokemonCard key={pokemon.id} pokemon={pokemon} />)
        }
      </div>
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

  console.log("response ==> ", response.pokemons);

  return {
    props: {
      pokemons: response.pokemons.results,
      next: response.pokemons.next,
    }
  };
};

export default PokemonListPage;