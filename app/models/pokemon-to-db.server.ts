import type { Pokemon, PokemonType } from "types/pokemon"
import { prisma } from "./prisma.server"

export async function addPokemonToDb(pokemon: Pokemon) {
    const exists = await prisma.pokemon.count({
        where: {
            name: pokemon.name
        }
    })

    if (exists === 0) {
        const result = await addPokemon(pokemon)
        return {
            result: result,
            message: `${pokemon.name} was added to the db!`
        }
    }
    return { result: `${pokemon.name} already exists in the db!` }
}

async function addPokemon(pokemon: Pokemon) {
    return await prisma.pokemon.create({
        data: {
            name: pokemon.name,
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
            weight: pokemon.weight,
            height: pokemon.height,
            hpBaseStat: pokemon.stats[0].base_stat,
            attackBaseStat: pokemon.stats[1].base_stat,
            defenseBaseStat: pokemon.stats[2].base_stat,
            specialAttackBaseStat: pokemon.stats[3].base_stat,
            specialDefenseBaseStat: pokemon.stats[4].base_stat,
            speedBaseStat: pokemon.stats[5].base_stat,
            types: pokemon.types.map((type: PokemonType) => {
                return type.type.name
            }),
            pokedexId: pokemon.id
        }
    })
}
