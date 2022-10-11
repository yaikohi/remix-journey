/**
 * type
 * category
 * power
 * accuracy
 * pp(powerpoints)
 */

import type { Move } from "types/moves"
import type { Pokemon } from "types/pokemon"
import { getTypeColorFromMap } from "~/utils/pokemonTypeColorMap"

type PokemonMoveProps = {
    move: Move
}

export function PokemonMove({ move }: PokemonMoveProps) {
    return (
        <>
            <li
                className={`hover:bg-ctp-overlay0 p-2 my-2 text-center rounded-lg bg-ctp-${getTypeColorFromMap(
                    move.type.name
                )}`}
            >
                {move.name} - type: {move.type.name}
            </li>
        </>
    )
}

type PokemonMovesProps = {
    moves: Move[]
}

export default function PokemonMoves({ moves }: PokemonMovesProps) {
    return (
        <ul>
            {moves.map((move, idx) => (
                <PokemonMove key={idx} move={move} />
            ))}
        </ul>
    )
}
