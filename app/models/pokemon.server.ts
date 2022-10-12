import type {
    Pokemon,
    PokemonEeveevolutions,
    PokemonEvolutions,
    PokemonSpecies
} from "types/pokemon"
import type { PokemonEvolutionChain } from "types/pokemonEvolutionChain"
import {
    pokemonHasNoEvolutions,
    pokemonHasThirdEvolution,
    pokemonIsEeveeLike,
    pokemonIsUrshifu
} from "~/utils/pokemonFilters"

export async function getAllPokemons(): Promise<
    { name: Pokemon["name"]; url: string }[]
> {
    const res = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=905&offset=0"
    )
    const data = await res.json()

    return data.results
}

export async function getPokemonByName(
    name: string | undefined
): Promise<Pokemon> {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    const pokemon: Pokemon = await res.json()

    return pokemon
}

export async function getPokemonById(
    id: string | number
): Promise<Pokemon>{
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const pokemon: Pokemon = await res.json()

    return pokemon
}

async function getPokemonSpecies(pokemon: Pokemon): Promise<PokemonSpecies> {
    const res = await fetch(pokemon.species.url)
    const pokemonSpecies = await res.json()

    return pokemonSpecies
}

export async function getPokemonEvolutionChain(
    pokemon: Pokemon
): Promise<PokemonEvolutionChain | undefined> {
    const pokemonSpecies = await getPokemonSpecies(pokemon)

    if (pokemonSpecies.evolution_chain === null) {
        return
    }

    const res = await fetch(pokemonSpecies.evolution_chain.url)
    const evolutionChain: PokemonEvolutionChain = await res.json()

    return evolutionChain
}

/**
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

    if (evolutionChain === undefined) {
        return { first: pokemon, second: null, third: null }
    }

    const firstEvolutionPokemon = await getPokemonByName(
        evolutionChain.chain.species.name
    )

    if (pokemonHasNoEvolutions(evolutionChain)) {
        return { first: firstEvolutionPokemon, second: null, third: null }
    }

    // true if pokemon can evolve into different kinds of pokemon, like eevee
    if (pokemonIsEeveeLike(evolutionChain)) {
        return await getEeveeLikePokemonEvolutions(evolutionChain)
    }

    // Pokemon 'Urshifu' bug-fix. API is not consistent so I need to manually account for this...
    if (pokemonIsUrshifu(evolutionChain)) {
        const secondEvolutionPokemon = await getPokemonByName(
            "urshifu-single-strike"
        )

        return {
            first: firstEvolutionPokemon,
            second: secondEvolutionPokemon,
            third: null
        }
    }

    const secondEvolutionPokemon = await getPokemonByName(
        evolutionChain.chain.evolves_to[0].species.name
    )

    // third evolution
    if (pokemonHasThirdEvolution(evolutionChain)) {
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

export async function getEeveeLikePokemonEvolutions(
    evolutionChain: PokemonEvolutionChain,
): Promise<Pokemon[]> {
    const names = await getEvolutionNames(evolutionChain)
    const pokemons: Pokemon[] = await Promise.all(
        names.map(async (name) => {
            return await getPokemonByName(name)
        })
    )
    // adds the first evolution to the list.
    pokemons.push(await getPokemonByName(evolutionChain.chain.species.name))
    return pokemons
}

export async function getEvolutionNames(evolutionChain: PokemonEvolutionChain) {
    const evolutionsToGet = evolutionChain.chain.evolves_to
    let evolutionNames: string[] = []

    evolutionsToGet.forEach((evolution) => {
        return evolutionNames.push(evolution.species.name)
    })

    return evolutionNames
}
