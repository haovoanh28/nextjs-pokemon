import Link from "next/link";
import PokemonGrid from "@/components/PokemonGrid";


export default function Home() {
  return (
      <div>
        <Link href={"/pokemons"}>
          Pokemons
        </Link>
        <PokemonGrid />
      </div>
  );
}
