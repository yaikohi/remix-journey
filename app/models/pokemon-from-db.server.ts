import { prisma } from "./prisma.server"

export async function getPokemonFromDb() {
    return await prisma.pokemon.findMany()
}
