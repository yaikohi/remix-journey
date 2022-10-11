import type { PokemonTypeNames } from "types/pokemon"
import type { CTPBgColors } from "./CTPTailwindColors"

type CTPPOKEMONMAPITEM = [PokemonTypeNames, CTPBgColors]

const ctpPokemonArr: CTPPOKEMONMAPITEM[] = [
    ["normal", "bg-ctp-rosewater"],
    ["fire", "bg-ctp-red"],
    ["water", "bg-ctp-blue"],
    ["grass", "bg-ctp-green"],
    ["electric", "bg-ctp-yellow"],
    ["ice", "bg-ctp-sky"],
    ["fighting", "bg-ctp-peach"],
    ["poison", "bg-ctp-mauve"],
    ["ground", "bg-ctp-flamingo"],
    ["flying", "bg-ctp-subtext1"],
    ["psychic", "bg-ctp-lavender"],
    ["bug", "bg-ctp-teal"],
    ["rock", "bg-ctp-maroon"],
    ["ghost", "bg-ctp-text"],
    ["dark", "bg-ctp-surface0"],
    ["dragon", "bg-ctp-sapphire"],
    ["steel", "bg-ctp-subtext0"],
    ["fairy", "bg-ctp-pink"]
]

type TPokemonTypeColorMap = Map<PokemonTypeNames, CTPBgColors>

export const PokemonTypeColorMap: TPokemonTypeColorMap = new Map(ctpPokemonArr)

export const getTypeColorFromMap = (pokemonType: PokemonTypeNames) => {
    return PokemonTypeColorMap.get(pokemonType)
}
