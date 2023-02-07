import Image from "next/image";
import { Oswald } from "@next/font/google";

import { Box, Card, Typography } from "@mui/material";

import { formatID, getPokemonColorByType } from "@/utils";

import { CommonPokemonDataType } from "@/types/pokemon.types";
import PokemonType from "@/components/PokemonTypeIcon";

interface IPokemonCardProps {
  pokemon: CommonPokemonDataType;
}

const oswald = Oswald();

const postfixFactor = "99";

const PokemonCard: React.FC<IPokemonCardProps> = ({ pokemon }) => {
      let linearColors = "";

      if (pokemon.types.length == 1) {
        const colorType = getPokemonColorByType(pokemon.types[0].name);
        linearColors = `${colorType}${postfixFactor}, ${colorType}${postfixFactor}`;
      } else {
        linearColors = pokemon.types.map(type => {
          return getPokemonColorByType(type.name) + postfixFactor;
        }).join(',');
      }

      return (
          <div>
            <Card variant={"outlined"} sx={{
              background: `linear-gradient(${linearColors})`
            }}>
              <Box m={2}>
                <Box display="flex" position="relative" alignItems="center" justifyContent="space-between">
                  <Typography variant={"pokemonID"}>
                    {formatID(pokemon.id)}
                  </Typography>

                  <Box display="flex" flexDirection="row" gap={1.2}>
                    {
                      pokemon.types.map(type => {
                        const _typeName = type.name;
                        return (
                            <PokemonType type={_typeName} key={`${pokemon.id}-${_typeName}`} />
                        );
                      })
                    }
                  </Box>
                </Box>
                <Box position={"relative"} height={160} mt={4}
                >
                  <Image src={pokemon.image} alt={`${pokemon.name} image`} fill style={{ objectFit: "contain" }}
                         priority={pokemon.id < 10}
                         sizes="(max-width: 768px) 100vw,
                         (max-width: 1200px) 25vw,
                         25vw"
                  />
                </Box>
                <Box mt={2} textAlign={"center"}>
                  <Typography variant={"pokemonName"} color={"whitesmoke"} letterSpacing={2}>
                    {pokemon.name}
                  </Typography>
                </Box>
              </Box>
            </Card>
          </div>
      );
    }
;

export default PokemonCard;