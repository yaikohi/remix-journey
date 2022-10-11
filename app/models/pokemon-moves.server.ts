import type { Move } from "types/pokemon"

/**
 * @param name
 */
export async function getMoveByName(name: string | undefined): Promise<Move> {
    const res = await fetch(`https://pokeapi.co/api/v2/move/${name}`)
    const move: Move = await res.json()

    return move
}

export async function getAllMoves(): Promise<{ name: string; url: string }[]> {
    const res = await fetch(
        `https://pokeapi.com/api/v2/move?limit=100000&offset=0`
    )
    const moves: { name: string; url: string }[] = await res.json()

    return moves
}
