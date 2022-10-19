import type { Url } from "./global"

export type PokemonEvolutions = {
    first: Pokemon
    second: Pokemon | null
    third: Pokemon | null
}

export type PokemonBase = {
    name: Pokemon["name"]
    url: Url
}
export type PokemonEeveevolutions = Pokemon[]

export type Pokemon = {
    abilities: PokemonAbility[]
    base_experience: number
    forms: Form[]
    game_indices: GameIndice[]
    height: number
    held_items: HeldItem[]
    id: number
    is_default: boolean
    location_area_encounters: string | string[] | any[]
    moves: PokemonMove[]
    name: string
    order: number
    past_types: any[]
    species: Species
    sprites: Sprites
    stats: PokemonStat[]
    types: PokemonType[]
    weight: number
}

export type PokemonSpecies = {
    base_happiness: null
    capture_rate: number
    color: any
    egg_groups: any[]
    evolution_chain: null | { url: Url }
    evolves_from_species: any
    flavor_text_entries: any[]
    form_descriptions: []
    forms_switchable: false
    gender_rate: number
    genera: any[]
    generation: any
    growth_rate: any
    habitat: null
    has_gender_differences: false
    hatch_counter: null
    id: number
    is_baby: false
    is_legendary: false
    is_mythical: false
    name: string
    names: any[]
    order: number
    pal_park_encounters: []
    pokedex_numbers: any[]
    shape: any
    varieties: any[]
}

interface Sprites {
    back_default: string
    back_female: string | undefined
    back_shiny: string | undefined
    back_shiny_female: string | undefined
    front_default: string
    front_female: string | undefined
    front_shiny: string | undefined
    front_shiny_female: string | undefined
    other: SpritesOther
    versions: any
}

type SpritesOther = {
    dream_world: {
        front_default: string | undefined
        front_female: string | undefined
    }
    home: {
        front_default: string | undefined
        front_female: string | undefined
    }
    "official-artwork": {
        front_default: string | undefined
        front_female: string | undefined
    }
}

interface PokemonStat {
    base_stat: number
    effort: number
    stat: Stat
}

export type PokemonMove = {
    move: Move
    version_group_details: VersionGroupDetails[]
}
export type Move = {
    name: string
    url: string
}

export type VersionGroupDetails = {
    level_learned_at: number
    move_learn_method: MoveLearnMethod
    version_group: VersionGroup
}
export type VersionGroup = {
    name: string
    url: string
}
export type Species = {
    name: string
    url: string
}
export type MoveLearnMethod = {
    name: string
    url: string
}
export type Item = {
    name: string
    url: string
}
export type HeldItem = {
    item: Item
    version_details: VersionDetail[]
}
export type VersionDetail = [rarity: number, version: Version]
export type Ability = {
    name: string
    url: string
}
export type GameIndice = {
    game_index: number
    version: Version
}
export type Version = {
    name: string
    url: string
}
export type Form = {
    name: string
    url: string
}
export type PokemonAbility = {
    ability: Ability
    is_hidden: boolean
    slot: number
}
export type Stat = {
    name: string
    url: string
}

export type PokemonType = {
    slot: number
    type: Type
}

export type Type = {
    type: any
    name: PokemonTypeNames
    url: string
}

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
    | "fairy"
