import type { CTPColors } from "./CTPTailwindColors";
export type PokemonTypeNames =
  | "normal"
  | "fire"
  | "water"
  | "grass"
  | "electric"
  | "ice"
  | "fighting"
  | "poison"
  | "ground"
  | "flying"
  | "psychic"
  | "bug"
  | "rock"
  | "ghost"
  | "dark"
  | "dragon"
  | "steel"
  | "fairy";

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

export type TPokemonTypeColorMap = Map<PokemonTypeNames, CTPColors>;

export const PokemonTypeColorMap: TPokemonTypeColorMap = new Map(ctpPokemonArr);

export const getColorFromMap = (pokemonType: PokemonTypeNames) => {
    return PokemonTypeColorMap.get(pokemonType)
}
