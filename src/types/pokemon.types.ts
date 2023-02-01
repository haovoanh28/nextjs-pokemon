export type NameAndUrl = {
  name: string,
  url: string
}

interface Ability {
  is_hidden: boolean;
  slot: number;
  ability: NameAndUrl;
}

interface VersionDetail {
  rarity: number;
  version: NameAndUrl;
}

interface HeldItem {
  item: NameAndUrl;
  version_details: VersionDetail[];
}

export interface PokemonTypes {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: Ability[];
  forms: NameAndUrl[];
  held_items: HeldItem[];
  location_area_encounters: string;
  species: NameAndUrl;
  sprites: {
    back_default: string;
    back_female: string | null;
    back_shiny: string;
    back_shiny_female: string | null;
    front_default: string;
    front_female: string | null;
    front_shiny: string;
    front_shiny_female: string | null;
    other: {
      dream_world: {
        front_default: string;
        front_female: string | null;
      };
      home: {
        front_default: string;
        front_female: string | null;
        front_shiny: string;
        front_shiny_female: string | null;
      };
      'official-artwork': {
        front_default: string;
      };
    };
  };
}