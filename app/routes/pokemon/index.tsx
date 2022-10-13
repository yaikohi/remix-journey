import type { LoaderFunction } from "@remix-run/node"
import { Link, useLoaderData, useOutletContext } from "@remix-run/react"
import type { Url } from "types/global"
import { PokemonInfo } from "~/components/pokemon-info/pokemon-info"
import { getPokemonById } from "~/models/pokemon.server"

export const loader: LoaderFunction = async ({ request, context, params }) => {
    const ID = Math.floor(Math.random() * (905 - 0) + 0)

    const pokemonOfTheDay = await getPokemonById(ID)

    return pokemonOfTheDay
}

export default function PokemonOverview() {
    const pokemonOfTheDay = useLoaderData()
    const pokemons = useOutletContext<{ name: string; url: Url }[]>()
    return (
        <>
            <h2 className="text-xl">Todays Pokemon: {pokemonOfTheDay.name} </h2>
            <PokemonInfo pokemon={pokemonOfTheDay} />
            <div className="grid grid-cols-3">
                {pokemons.slice(250, 274).map((pokemon, idx) => (
                    <Link
                        className="p-2 m-2 font-bold text-center rounded-lg bg-ctp-overlay0"
                        to={`/pokemon/${pokemon.name}`}
                        key={idx}
                    >
                        {pokemon.name}
                    </Link>
                ))}
            </div>
        </>
    )
}
