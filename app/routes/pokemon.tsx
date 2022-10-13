import { json } from "@remix-run/node"
import { Outlet, useLoaderData } from "@remix-run/react"
import { Navbar, routes } from "~/components/navbar"
import { getAllPokemons, getPokemonsByNames } from "~/models/pokemon.server"

type LoaderData = Awaited<
    ReturnType<typeof getAllPokemons | typeof getPokemonsByNames>
>

export const loader = async () => {
    const data = await getAllPokemons()
    const pokemons = await getPokemonsByNames(data.slice(200, 299))

    if (pokemons && pokemons && pokemons.length !== 0) {
        return json<LoaderData>(pokemons)
    }

    return json(data)
}

export default function Pokemon() {
    const data = useLoaderData()
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
