import type { Url } from "./global"

export type PokemonEvolutions = {
    first: Pokemon
    second: Pokemon | null
    third: Pokemon | null
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
        front_default: string | null
        front_female: string | null
    }
    home: {
        front_default: string | null
        front_female: string | null
    }
    "official-artwork": {
        front_default: string | null
        front_female: string | null
    }
}

interface PokemonStat {
    base_stat: number
    effort: number
    stat: Stat
}

type PokemonMove = {
    move: Move
    version_group_details: VersionGroupDetails[]
}
type Move = {
    name: string
    url: string
}

type VersionGroupDetails = {
    level_learned_at: number
    move_learn_method: MoveLearnMethod
    version_group: VersionGroup
}
type VersionGroup = {
    name: string
    url: string
}
type Species = {
    name: string
    url: string
}
type MoveLearnMethod = {
    name: string
    url: string
}
type Item = {
    name: string
    url: string
}
type HeldItem = {
    item: Item
    version_details: VersionDetail[]
}
type VersionDetail = [rarity: number, version: Version]
type Ability = {
    name: string
    url: string
}
type GameIndice = {
    game_index: number
    version: Version
}
type Version = {
    name: string
    url: string
}
type Form = {
    name: string
    url: string
}
type PokemonAbility = {
    ability: Ability
    is_hidden: boolean
    slot: number
}
type Stat = {
    name: string
    url: string
}

type PokemonType = {
    slot: number
    type: Type
}

type Type = {
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
