import type {
    Pokemon,
    PokemonEeveevolutions,
    PokemonEvolutions,
    PokemonSpecies
} from "types/pokemon"
import type { PokemonEvolutionChain } from "types/pokemonEvolutionChain"

/**
 * Fetches all the pokemons given the url's parameters.
 *
 */
export async function getAllPokemons(): Promise<
    { name: Pokemon["name"]; url: string }[]
> {
    const res = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=905&offset=0"
    )
    const data = await res.json()

    return data.results
}

/**
 * Returns a `Pokemon` object by name.
 *
 * @param name
 */
export async function getPokemonByName(
    name: string | undefined
): Promise<Pokemon> {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    const pokemon: Pokemon = await res.json()

    return pokemon
}

/**
 * Fetches the url from a pokemon that links to the evolution chain of that pokemon's species.
 *
 * @param pokemon
 */
async function getPokemonSpecies(pokemon: Pokemon): Promise<PokemonSpecies> {
    const res = await fetch(pokemon.species.url)
    const pokemonSpecies = await res.json()

    return pokemonSpecies
}

/**
 * Fetches the evolution_chain (EvolutionChain) of a pokemon given the `pokemon.species.url`.
 *
 * @param pokemon
 */
export async function getPokemonEvolutionChain(
    pokemon: Pokemon
): Promise<PokemonEvolutionChain | any> {
    const pokemonSpecies = await getPokemonSpecies(pokemon)

    if (pokemonSpecies.evolution_chain === null) {
        return
    }

    const res = await fetch(pokemonSpecies.evolution_chain.url)
    const evolutionChain: PokemonEvolutionChain = await res.json()

    return evolutionChain
}

/**
 * - TODO: Refactor!!!!!!!!!!! PLEASE
 *
 * Fetches the first, second, and third evolution of a pokemon.
 * Also returns all kinds of potential evolutions of eevee-like pokemon.
 *
 * @param pokemon
 * @returns
 */
export async function getPokemonWithEvolutions(
    pokemon: Pokemon
): Promise<Pokemon | PokemonEvolutions | PokemonEeveevolutions> {
    const evolutionChain = await getPokemonEvolutionChain(pokemon)

    console.log("evolutionChain: \n\n\n\n", pokemon.name, evolutionChain)

    if (evolutionChain === undefined) {
        return { first: pokemon, second: null, third: null }
    }

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
        pokemons.push(pokemon)

        return pokemons
    }

    // second evolution
    if (evolutionChain.chain.evolves_to[0].species.name === "urshifu") {
        const secondEvolutionPokemon = await getPokemonByName(
            "urshifu-single-strike"
        )

        // console.log(secondEvolutionPokemon)

        return {
            first: firstEvolutionPokemon,
            second: secondEvolutionPokemon,
            third: null
        }
    }
    const secondEvolutionPokemon = await getPokemonByName(
        evolutionChain.chain.evolves_to[0].species.name
    )

    // console.log("SECOND POKEMON\n\n\n", secondEvolutionPokemon)

    /**
     * TODO:
     * Fix the error here. Going to aurorus, phantump causes an error at line 93.
     * Has to do with the fact that some pokemon do not have an `evolution_chain`.
     * Error branching necessary. Maybe create an error-boundary component.
     * - research error-boundaries in remix
     */
    // third evolution
    if (evolutionChain.chain.evolves_to[0].evolves_to.length !== 0) {
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
