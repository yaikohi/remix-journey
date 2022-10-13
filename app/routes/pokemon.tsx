import type { LoaderFunction } from "@remix-run/node"
import { json } from "@remix-run/node"
import { Outlet, useLoaderData } from "@remix-run/react"
import { PokemonBase } from "types/pokemon"
import { Navbar, routes } from "~/components/navbar"
import { getAllPokemons, getPokemonsByBases } from "~/models/pokemon.server"

type LoaderData = Awaited<{
    pokemonBases: Awaited<ReturnType<typeof getAllPokemons>>
    pokemons: Awaited<ReturnType<typeof getPokemonsByBases>>
}>
export type ContextType = {
    pokemonBases: Awaited<ReturnType<typeof getAllPokemons>>
    pokemons: Awaited<ReturnType<typeof getPokemonsByBases>>
}
export const loader: LoaderFunction = async () => {
    const pokemonBases = await getAllPokemons()
    const getRandomPokemons = (
        pokemonArray: PokemonBase[],
        maxLength: number
    ): PokemonBase[] => {
        return pokemonArray.sort(() => 0.5 - Math.random()).slice(0, maxLength)
    }
    const pokemons = await getPokemonsByBases(
        getRandomPokemons(pokemonBases, 9)
    )

    return json<LoaderData>({ pokemonBases, pokemons })
}

export default function Pokemon() {
    const data = useLoaderData<ReturnType<typeof loader>>()
    console.log(data)

    return (
        <>
            <div className="p-3 bg-ctp-crust">
                <h1 className="text-7xl">Pokemon</h1>
            </div>
            <Navbar routes={routes} />
            <div className="flex flex-col items-center max-w-4xl p-24 mx-auto">
                <Outlet context={data} />
            </div>
        </>
    )
}
