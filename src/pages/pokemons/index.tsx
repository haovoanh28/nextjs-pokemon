import network from "@/services/network";

import { GetServerSideProps } from "next";
import { NameAndUrl, PokemonTypes } from "@/types/pokemon.types";

import PokemonCard from "@/components/PokemonCard";

interface IComponentProps {
  pokemons: PokemonTypes[],
  next: string,
}

const PokemonListPage: React.FC<IComponentProps> = ({ pokemons, next }) => {
  // console.log("pokemons ==> ", pokemons);

  return (
      <div style={{width: "100%"}}>
        <h1>Pokemon List</h1>
        {
          pokemons.map(pokemon => <PokemonCard key={pokemon.id} pokemon={pokemon} />)
        }
      </div>
  );
};

interface IPokemonListResponse {
  count: number,
  next: string,
  previous: string | null,
  results: NameAndUrl[],
}

export const getServerSideProps: GetServerSideProps<IComponentProps> = async function(context) {
  const response: IPokemonListResponse = await network.get({
    url: "/pokemon",
    params: {
      limit: 15,
      offset: 0
    }
  });

  const promiseArr: Promise<PokemonTypes>[] = [];
  response.results.forEach(poke => {
    promiseArr.push(network.get({
      url: poke.url
    }));
  });

  const allPokeData = await Promise.all(promiseArr);

  return {
    props: {
      pokemons: allPokeData,
      next: response.next,
    }
  };
};

export default PokemonListPage;