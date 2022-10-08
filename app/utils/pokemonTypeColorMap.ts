import type { PokemonTypeNames } from "types/pokemon";
import type { CTPColors } from "./CTPTailwindColors";

type CTPPOKEMONMAPITEM = [PokemonTypeNames, CTPColors];

const ctpPokemonArr: CTPPOKEMONMAPITEM[] = [
  ["normal", "rosewater"],
  ["fire", "red"],
  ["water", "blue"],
  ["grass", "green"],
  ["electric", "yellow"],
  ["ice", "sky"],
  ["fighting", "peach"],
  ["poison", "mauve"],
  ["ground", "flamingo"],
  ["flying", "subtext1"],
  ["psychic", "lavender"],
  ["bug", "teal"],
  ["rock", "maroon"],
  ["ghost", "text"],
  ["dark", "surface0"],
  ["dragon", "sapphire"],
  ["steel", "subtext0"],
  ["fairy", "pink"],
];

type TPokemonTypeColorMap = Map<PokemonTypeNames, CTPColors>;

export const PokemonTypeColorMap: TPokemonTypeColorMap = new Map(ctpPokemonArr);

export const getTypeColorFromMap = (pokemonType: PokemonTypeNames) => {
  return PokemonTypeColorMap.get(pokemonType);
};
