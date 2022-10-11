import type { CTPBgColors } from "./CTPTailwindColors"
export type FlavorNames = "dry" | "spicy" | "sweet" | "bitter" | "sour"

type CTPFLAVORMAPITEM = [FlavorNames, CTPBgColors]

const ctpPokemonArr: CTPFLAVORMAPITEM[] = [
    ["dry", "bg-ctp-peach"],
    ["spicy", "bg-ctp-red"],
    ["sweet", "bg-ctp-pink"],
    ["bitter", "bg-ctp-mauve"],
    ["sour", "bg-ctp-green"]
]

export type TFlavorColorMap = Map<FlavorNames, CTPBgColors>

export const FlavorColorMap: TFlavorColorMap = new Map(ctpPokemonArr)

export const getFlavorColorFromMap = (
    flavor: FlavorNames
): CTPBgColors | undefined => {
    return FlavorColorMap.get(flavor)
}
