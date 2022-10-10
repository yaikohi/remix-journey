import type { Pokemon } from "types/pokemon"
import type { PokemonEvolutionChain } from "types/pokemonEvolutionChain"

/**
 * Fetches all the pokemons given the url's parameters.
 *
 */
export async function getAllPokemons() {
    const res = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
    )
    const data = await res.json()

    return data.results
}

/**
 * Returns the Pokemon object given the desired pokemon's name.
 *
 * @param name
 */
export async function getPokemonByName(name: string | undefined) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    const pokemon: Pokemon = await res.json()

    return pokemon
}

/**
 * Fetches the url from a pokemon that links to the evolution chain of that pokemon's species.
 *
 * @param url
 */
async function getPokemonEvolutionChainUrl(url: Pokemon["species"]["url"]) {
    const res = await fetch(url)
    const data = await res.json()

    return data.evolution_chain.url
}

/**
 * Fetches the evolution_chain (EvolutionChain) of a pokemon given the `pokemon.species.url`.
 *
 * @param url
 */
export async function getPokemonEvolutionChain(url: Pokemon["species"]["url"]) {
    const URL = await getPokemonEvolutionChainUrl(url)
    const res = await fetch(URL)
    const evolutionChain: PokemonEvolutionChain = await res.json()

    return evolutionChain
}

/**
 * - TODO: Refactor!!!!!!!!!!! PLEASE
 *
 * Fetches the first, second, and third evolution of a pokemon.
 *
 * @param url
 * @returns
 */
export async function getPokemonWithEvolutions(url: Pokemon["species"]["url"]) {
    const evolutionChain = await getPokemonEvolutionChain(url)

    // first 'evolution'
    const firstEvolutionPokemon = await getPokemonByName(
        evolutionChain.chain.species.name
    )

    // If the pokemon has no evolutions, return null
    if (evolutionChain.chain.evolves_to.length === 0) {
        return { first: firstEvolutionPokemon, second: null, third: null }
    }

    // true if pokemon can evolve into different kinds of pokemon
    if (evolutionChain.chain.evolves_to.length > 1) {
        const names = await getEvolutionNames(evolutionChain)
        const pokemons: Pokemon[] = await Promise.all(
            names.map(async (name) => {
                return await getPokemonByName(name)
            })
        )

        return pokemons
    }

    // second evolution
    const secondEvolutionPokemon = await getPokemonByName(
        evolutionChain.chain.evolves_to[0].species.name
    )

    // third evolution
    if (evolutionChain.chain.evolves_to[0].evolves_to[0].species.name) {
        const thirdEvolutionPokemon = await getPokemonByName(
            evolutionChain.chain.evolves_to[0].evolves_to[0].species.name
        )

        return {
            first: firstEvolutionPokemon,
            second: secondEvolutionPokemon,
            third: thirdEvolutionPokemon
        }
    }

    return {
        first: firstEvolutionPokemon,
        second: secondEvolutionPokemon,
        third: null
    }
}

export async function getEvolutionNames(evolutionChain: PokemonEvolutionChain) {
    const evolutionsToGet = evolutionChain.chain.evolves_to
    let evolutionNames: string[] = []
    evolutionsToGet.forEach((evolution) => {
        return evolutionNames.push(evolution.species.name)
    })

    return evolutionNames
}
