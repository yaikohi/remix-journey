import type { LoaderFunction } from "@remix-run/node"
import { json } from "@remix-run/node"
import { Outlet, useLoaderData } from "@remix-run/react"
import { Navbar, routes } from "~/components/navbar"
import { getAllPokemons, getPokemonsByBases } from "~/models/pokemon.server"
import { shuffleArray } from "~/utils/shuffle"

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
    const randomizedPokemonBases = shuffleArray(pokemonBases)

    const pokemons = await getPokemonsByBases(randomizedPokemonBases)

    return json<LoaderData>({ pokemonBases, pokemons })
}

export default function Pokemon() {
    const data = useLoaderData<ReturnType<typeof loader>>()

    return (
        <>
            <div className="p-3 bg-ctp-crust">
                <h1 className="text-7xl">Pokemon</h1>
            </div>
            <Navbar routes={routes} />
            <div className="flex flex-col items-center p-12 mx-auto lg:max-w-[1800px]">
                <Outlet context={data} />
            </div>
        </>
    )
}
