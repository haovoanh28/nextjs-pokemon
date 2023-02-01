import { Card } from "@mui/material";

import { IPokemonOverLook } from "@/types/pokemon.types";


interface IPokemonCardProps {
  pokemon: IPokemonOverLook;
}

const PokemonCard: React.FC<IPokemonCardProps> = ({ pokemon }) => {
  return (
      <div>
        <Card>
          <p>{pokemon.name}</p>

        </Card>
      </div>
  );
};

export default PokemonCard;