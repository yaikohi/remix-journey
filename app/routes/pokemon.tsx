import type { LoaderFunction } from "@remix-run/node"
import { json } from "@remix-run/node"
import { Outlet, useLoaderData } from "@remix-run/react"
import { BaseHeader } from "~/components/styled-components/base-headers"
import {
    getAllPokemons,
    getPokemonsByBases
} from "~/models/pokemon-pokeapi.server"
import { shuffleArray } from "~/utils/shuffle"

export type LoaderData = Awaited<{
    pokemonBases: Awaited<ReturnType<typeof getAllPokemons>>
    pokemonsFromEx: Awaited<ReturnType<typeof getPokemonsByBases>>
}>

export const loader: LoaderFunction = async () => {
    const pokemonBases = await getAllPokemons()
    const randomizedPokemonBases = shuffleArray(pokemonBases)

    const pokemonsFromEx = await getPokemonsByBases(randomizedPokemonBases)
    return json<LoaderData>({ pokemonBases, pokemonsFromEx })
}

export default function Pokemon() {
    const data = useLoaderData<ReturnType<typeof loader>>()
    return (
        <>
            <div className="p-3 bg-ctp-crust">
                <BaseHeader>Pokemon</BaseHeader>
            </div>
            <div className="flex flex-col items-center p-12 mx-auto lg:max-w-[1800px]">
                <Outlet context={data} />
            </div>
        </>
    )
}
