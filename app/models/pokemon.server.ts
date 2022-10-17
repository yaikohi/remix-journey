import type { Pokemon } from "@prisma/client"
import type { PokemonTypeNames } from "types/pokemon"
import { prisma } from "./prisma.server"

export async function getAllPokemon() {
    return await prisma.pokemon.findMany({
        orderBy: {
            pokedexId: "asc"
        }
    })
}

export async function getPokemonByType(type: PokemonTypeNames) {
    return await prisma.pokemon.findMany({
        where: {
            types: {
                has: type
            }
        },
        orderBy: {
            pokedexId: "asc"
        }
    })
}

export async function getPokemonByName(
    pokemonName: Pokemon["name"]
): Promise<Pokemon | null> {
    return await prisma.pokemon.findFirst({
        where: {
            name: pokemonName
        }
    })
}
