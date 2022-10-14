import { Link } from "@remix-run/react"
import type { Pokemon as PokemonType } from "types/pokemon"

type PaginationProps = {
    relatedRoutes: any
    currentRoute: string
}
export default function Pagination({
    relatedRoutes,
    currentRoute
}: PaginationProps) {
    const pokemons = relatedRoutes[1].data.pokemons
    const currentPokemonIndex: number = pokemons.findIndex(
        (pokeman: PokemonType) => pokeman.name === currentRoute
    )
    const nextPokemonIndex =
        currentPokemonIndex === pokemons.length - 1
            ? 0
            : currentPokemonIndex + 1
    const prevPokemonIndex =
        currentPokemonIndex === 0
            ? pokemons.length - 1
            : currentPokemonIndex - 1

    const nextPokemonName = pokemons[nextPokemonIndex]?.name
    const prevPokemonName = pokemons[prevPokemonIndex]?.name

    const nextPokemonRoute = `${relatedRoutes[1].pathname}/${nextPokemonName}`
    const prevPokemonRoute = `${relatedRoutes[1].pathname}/${prevPokemonName}`

    return (
        <>
            <div className="flex justify-center col-span-3 align-middle bg-ctp-surface0">
                <Link
                    className="self-center p-2 m-4 bg-ctp-overlay0 hover:bg-ctp-overlay1 rounded-xl"
                    to={prevPokemonRoute}
                >
                    back ({prevPokemonName})
                </Link>
                <Link
                    className="self-center p-2 m-4 bg-ctp-overlay0 hover:bg-ctp-overlay1 rounded-xl"
                    to={nextPokemonRoute}
                >
                    Next ({nextPokemonName})
                </Link>
            </div>
        </>
    )
}
