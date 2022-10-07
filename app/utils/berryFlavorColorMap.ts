import type { CTPColors } from "./CTPTailwindColors";
export type FlavorNames = "dry" | "spicy" | "sweet" | "bitter" | "sour";

type CTPFLAVORMAPITEM = [FlavorNames, CTPColors];

const ctpPokemonArr: CTPFLAVORMAPITEM[] = [
  ["dry", "peach"],
  ["spicy", "red"],
  ["sweet", "pink"],
  ["bitter", "mauve"],
  ["sour", "green"],
];

export type TFlavorColorMap = Map<FlavorNames, CTPColors>;

export const FlavorColorMap: TFlavorColorMap = new Map(ctpPokemonArr);

export const getColorFromMap = (flavor: FlavorNames) => {
  return FlavorColorMap.get(flavor);
};
