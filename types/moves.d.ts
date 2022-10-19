import type { Url } from "./global"
import type { Pokemon, PokemonTypeNames } from "./pokemon-pokeapi"

export type Move = {
    accuracy: number
    contest_combos: ContestCombos
    contest_effect: { url: Url }
    contest_type: ContestType
    damage_class: DamageClass
    effect_chance: number | null | any
    effect_changes: any[]
    effect_entries: EffectEntry[]
    flavor_text_entries: FlavorTextEntry[]
    generation: any
    id: number
    learned_by_pokemon: { name: Pokemon["name"]; url: string }[]
    machines: any[]
    meta: any
    name: string
    names: any[]
    past_values: any[]
    power: number
    pp: number
    priority: number
    stat_changes: any[]
    super_contest_effect: any
    target: any
    type: { name: PokemonTypeNames; url: string }
}

export type ContestCombos = {
    normal: any
    super: any
}

export type ContestType = {
    name: string
    url: string
}

export type DamageClass = {
    name: PokemonTypeNames
    url: string
}

export type EffectEntry = {
    effect: string
    language: {
        name: string
        url: string
    }
    short_effect: string
}

export type FlavorTextEntry = {
    flavor_text: string
    language: {
        name: string
        url: string
    }
    version_group: any
}
