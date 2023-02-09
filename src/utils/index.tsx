import { MouseEvent } from "react";
import { PokemonTypesType } from "@/types/pokemon.types";

// 1    => #001
// 11   => #011
// 111  => #111
export function formatID(id: string | number) {
  return "#" + id.toString().padStart(3, "0");
}

export const pokemonColours = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
};

export function getPokemonColorByType(type: PokemonTypesType): string {
  return `${pokemonColours[type]}` || "#777777";
}

export function getPokemonImageLink(id: string | number) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
}

export function getGradientColorByTypes(types: { name: PokemonTypesType }[], opacityValue = ""): string {
  let linearColors = "";

  if (types.length == 1) {
    const colorType = getPokemonColorByType(types[0].name);
    linearColors = `${colorType}${opacityValue}, ${colorType}${opacityValue}`;
  } else {
    linearColors = types.map(type => {
      return getPokemonColorByType(type.name) + opacityValue;
    }).join(',');
  }

  return linearColors;
}

export function stopEventPropagation(e: MouseEvent) {
  e.preventDefault();
  e.stopPropagation();
}