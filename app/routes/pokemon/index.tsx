import { useOutletContext } from "@remix-run/react"
import { PokemonInfo } from "~/components/pokemon-info/pokemon-info"
import type { ContextType } from "../pokemon"

export default function PokemonOverview() {
    const { pokemonBases, pokemons } = useOutletContext<ContextType>()

    return (
        <>
            <div className="flex flex-col lg:grid lg:grid-cols-4">
                {pokemons.map((pokemon, idx) => (
                    <div key={idx}>
                        <PokemonInfo pokemon={pokemon} />
                    </div>
                ))}
            </div>
        </>
    )
}
