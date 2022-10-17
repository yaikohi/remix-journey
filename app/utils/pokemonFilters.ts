import { Pokemon } from "@prisma/client"
import type { Pokemon as PokeApiPokemon } from "types/pokemon"
import type { PokemonEvolutionChain } from "types/pokemonEvolutionChain"
import { getEvolutionNames } from "~/models/pokemon-pokeapi.server"

export function pokemonIsEeveeLike(
    evolutionChain: PokemonEvolutionChain
): boolean {
    return evolutionChain.chain.evolves_to.length > 1
}

export function pokemonHasThirdEvolution(
    evolutionChain: PokemonEvolutionChain
): boolean {
    return evolutionChain.chain?.evolves_to[0].evolves_to.length !== 0
}

export function pokemonHasNoEvolutions(
    evolutionChain: PokemonEvolutionChain
): boolean {
    return (
        evolutionChain.chain.evolves_to.length === 0 ||
        evolutionChain === undefined
    )
}

/**
 * Pokemon 'Urshifu' bug-fix. The pokeAPI is not consistent
 *  and I need to manually account for the difference in
 *  `species.name` and `pokemon.name`.
 *
 * @param evolutionChain
 * @returns
 */
export function pokemonIsUrshifu(
    evolutionChain: PokemonEvolutionChain
): boolean {
    return evolutionChain.chain.evolves_to[0].species.name === "urshifu"
}

export function pokemonHasMultipleTypes(pokemon: Pokemon): boolean {
    return pokemon.types.length > 1
}