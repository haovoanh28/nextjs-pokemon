import Image from "next/image";
import { Box } from "@mui/material";

import styles from "./styles.module.scss";

import { stopEventPropagation } from "@/utils";

import { PokemonTypesType } from "@/types/pokemon.types";

const PokemonType: React.FC<{ type: PokemonTypesType }> = ({ type }) => {


  return (
      <Box className={`${styles.icon} ${type}`} display="flex" alignItems="center" justifyContent="center"
           padding="8px"
           borderRadius="50%"
           onClick={stopEventPropagation}
      >
        <Image
            src={`/assets/pokemon-types/${type}.svg`} alt="pokemon type"
            // fill
            // sizes="100vw"
            priority
            width={16}
            height={16}
            onClick={stopEventPropagation}
        />
      </Box>
  );
};

export default PokemonType;