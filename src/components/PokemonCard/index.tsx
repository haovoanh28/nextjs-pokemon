import { Card } from "@mui/material";

import styles from "./styles.module.scss"

import { PokemonTypes } from "@/types/pokemon.types";



interface IPokemonCardProps {
  pokemon: PokemonTypes;
}

export default function({ pokemon }: IPokemonCardProps) {
  return (
      <div>
        <Card>
          <p>{pokemon.name}</p>

        </Card>
      </div>
  );
}