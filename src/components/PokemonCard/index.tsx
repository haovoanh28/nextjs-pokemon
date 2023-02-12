import { Oswald } from "@next/font/google";

import Image from "next/image";
import { Box, Card, Typography, Fade } from "@mui/material";

import { formatID, formatName, getGradientColorByTypes } from "@/utils";

import { CommonPokemonDataType } from "@/types/pokemon.types";
import PokemonType from "@/components/PokemonTypeIcon";

import styles from "./styles.module.scss";

interface IPokemonCardProps {
  pokemon: CommonPokemonDataType;
}

const oswald = Oswald();

const postfixFactor = "99";

const PokemonCard: React.FC<IPokemonCardProps> = ({ pokemon }) => {
      const linearColors = getGradientColorByTypes(pokemon.types, "99");

      return (
          <Fade in={true}>
            <Card className={styles.card} variant={"outlined"} sx={{
              height: "100%",
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
                  <Image className={styles.pokemonImage} src={pokemon.image} alt={`${pokemon.name} image`} fill
                         priority={pokemon.id < 10}
                         sizes="
                         (max-width: 576px) 100vw,
                         (max-width: 768px) 50vw,
                         (max-width: 1200px) 25vw,
                         15vw"
                  />
                </Box>
                <Box mt={2} textAlign={"center"}>
                  <Typography variant={"pokemonName"} letterSpacing={2}>
                    {formatName(pokemon.name)}
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Fade>
      );
    }
;

export default PokemonCard;