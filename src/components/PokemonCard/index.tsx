import { Box, Card, Typography } from "@mui/material";

import { formatID } from "@/utils";

import { IPokemonOverLook } from "@/types/pokemon.types";
import Image from "next/image";

interface IPokemonCardProps {
  pokemon: IPokemonOverLook;
}

const imageLink = "";

const PokemonCard: React.FC<IPokemonCardProps> = ({ pokemon }) => {
  const imageLink = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`;

  return (
      <div>
        <Card variant={"outlined"}>
          <Box m={2}>
            <Typography sx={{ fontFamily: "oswald", fontWeight: 500 }}>
              {formatID(pokemon.id)}
            </Typography>
            <Typography>
              {pokemon.name}
            </Typography>

            <Box position={"relative"} height={240}>
              <Image src={imageLink} alt={`${pokemon.name} image`} fill style={{ objectFit: "contain" }}

              />
            </Box>
          </Box>

        </Card>
      </div>
  );
};

export default PokemonCard;