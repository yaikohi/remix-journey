import { useOutletContext } from "@remix-run/react"
import type { Pokemon as PokemonType } from "types/pokemon"
import { PokemonInfo } from "~/components/pokemon-info/pokemon-info"
import type { LoaderData as ContextType } from "../pokemon"

export default function PokemonOverview() {
    const data = useOutletContext<ContextType>()
    const { pokemonsFromEx } = data
    return (
        <>
            <div className="flex flex-col lg:grid lg:grid-cols-4">
                {pokemonsFromEx.map((pokemon: PokemonType, idx: number) => (
                    <div key={idx}>
                        <PokemonInfo pokemon={pokemon} />
                    </div>
                ))}
            </div>
        </>
    )
}
