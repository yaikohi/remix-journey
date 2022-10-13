import { Link, useOutletContext } from "@remix-run/react"
import { PokemonInfo } from "~/components/pokemon-info/pokemon-info"
import type { ContextType } from "../pokemon"
import Pokemon from "../pokemon"

export default function PokemonOverview() {
    const { pokemonBases, pokemons } = useOutletContext<ContextType>()

    const pokemonOfTheDay = pokemons[0]
    console.log("pokemons", pokemons)
    console.log("pokemonOfTheDay", pokemonOfTheDay)

    return (
        <>
            <h2 className="text-2xl">Todays Pokemon</h2>
            <PokemonInfo pokemon={pokemonOfTheDay} />
            <div className="grid grid-cols-3">
                {pokemons.map((pokemon, idx) => (
                    <div key={idx}>
                        <PokemonInfo pokemon={pokemon} />
                    </div>
                ))}
            </div>
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
