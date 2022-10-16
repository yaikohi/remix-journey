import { prisma, PrismaClient } from "@prisma/client"
import type { LoaderFunction } from "@remix-run/node"
import { json } from "@remix-run/node"
import { Outlet, useLoaderData } from "@remix-run/react"
import { Navbar, routes } from "~/components/navbar"
import { getPokemonFromDb } from "~/models/pokemon-from-db.server"
import { addPokemonToDb } from "~/models/pokemon-to-db.server"
import { getAllPokemons, getPokemonsByBases } from "~/models/pokemon.server"
import { shuffleArray } from "~/utils/shuffle"

export type LoaderData = Awaited<{
    pokemonBases: Awaited<ReturnType<typeof getAllPokemons>>
    pokemonsFromEx: Awaited<ReturnType<typeof getPokemonsByBases>>
}>

export const loader: LoaderFunction = async () => {
    const pokemonBases = await getAllPokemons()
    const randomizedPokemonBases = shuffleArray(pokemonBases)

    const pokemonsFromEx = await getPokemonsByBases(randomizedPokemonBases)

    // const result = await Promise.all(
    //     pokemonsFromEx.map(async (pokemon) => {
    //         return await addPokemonToDb(pokemon)
    //     })
    // )
    // console.log(result)

    // const pokemons = await getPokemonFromDb()

    return json<LoaderData>({ pokemonBases, pokemonsFromEx })
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
