import { Link, useOutletContext } from "@remix-run/react"
import { PokemonInfo } from "~/components/pokemon-info/pokemon-info"
import type { ContextType } from "../pokemon"

export default function PokemonOverview() {
    const { pokemonBases, pokemons } = useOutletContext<ContextType>()

    const pokemonOfTheDay = pokemons[0]
    console.log("pokemonBases", pokemonBases)
    console.log("pokemonOfTheDay", pokemonOfTheDay)

    return (
        <>
            <h2 className="text-xl">Todays Pokemon: {pokemonOfTheDay.name}</h2>
            <PokemonInfo pokemon={pokemonOfTheDay} />
            <div className="grid grid-cols-3">
                {pokemonBases.slice(0, 7).map((pokemon, idx) => (
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
