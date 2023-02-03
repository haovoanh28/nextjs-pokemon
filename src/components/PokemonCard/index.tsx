import Image from "next/image";
import { Oswald } from "@next/font/google";

import { Box, Card, Typography } from "@mui/material";

import { formatID, getPokemonColorByType } from "@/utils";

import { IPokemonOverLook } from "@/types/pokemon.types";

interface IPokemonCardProps {
  pokemon: IPokemonOverLook;
}

const oswald = Oswald({ subsets: ['latin'] });

const PokemonCard: React.FC<IPokemonCardProps> = ({ pokemon }) => {
  let linearColors = "";

  if (pokemon.pokemon_v2_pokemontypes.length == 1) {
    const colorType = getPokemonColorByType(pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type.name);
    linearColors = `${colorType}, ${colorType}`;
  } else {
    linearColors = pokemon.pokemon_v2_pokemontypes.map(type => {
      return getPokemonColorByType(type.pokemon_v2_type.name);
    }).join(',');
  }

  return (
      <div>
        <Card variant={"outlined"} sx={{
          background: `linear-gradient(${linearColors})`
        }}>
          <Box m={2}>
            <Typography className={oswald.className} sx={{ fontWeight: 500 }}>
              {formatID(pokemon.id)}
            </Typography>
            <Box position={"relative"} height={160} mt={3}
            >
              <Image src={pokemon.image} alt={`${pokemon.name} image`} fill style={{ objectFit: "contain" }}
                     priority={pokemon.id < 10}
                     sizes="(max-width: 768px) 100vw,
                         (max-width: 1200px) 25vw,
                         25vw"
              />
            </Box>
            <Box mt={4} textAlign={"center"}>
              <Typography variant={"pokemonName"} color={"whitesmoke"} letterSpacing={2}>
                {pokemon.name}
              </Typography>
            </Box>
          </Box>
        </Card>
      </div>
  );
};

export default PokemonCard;