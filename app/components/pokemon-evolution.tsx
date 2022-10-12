// take evolutiondata as a prop
// render component for pages

import { Link } from "@remix-run/react/dist/components"
import type { Pokemon } from "types/pokemon"

type PokemonEvolutions = {
    first: null | Pokemon
    second: null | Pokemon
    third: null | Pokemon
}
type PokemonEvolutionsProps = {
    evolutions: PokemonEvolutions
}

function SpriteImage({ name, url }: { name: string; url: string }) {
    return (
        <div className="p-2 m-2 text-center rounded-md shadow-sm bg-ctp-surface1 hover:bg-ctp-surface2">
            <Link to={`/pokemon/${name}`}>
                <span>
                    <h3 className="m-2 text-xl font-bold">{name}</h3>
                    <img src={url} alt={`${name}`} />
                </span>
            </Link>
        </div>
    )
}

// how to show evolution chain: https://github.com/PokeAPI/pokeapi/issues/337
export default function PokemonEvolutionChain({
    evolutions
}: PokemonEvolutionsProps) {
    const first = evolutions.first
    const second = evolutions.second
    const third = evolutions.third

    return (
        <>
            <h2 className="p-2 m-2 text-2xl rounded-md bg-ctp-surface1">Evolutions</h2>
            <div className="grid justify-center grid-cols-3">
                {first && (
                    <SpriteImage
                        name={first?.name}
                        url={
                            first?.sprites?.other["official-artwork"]
                                ?.front_default
                                ? first?.sprites?.other["official-artwork"]
                                      ?.front_default
                                : ""
                        }
                    />
                )}
                {second && (
                    <SpriteImage
                        name={second?.name}
                        url={
                            second?.sprites?.other["official-artwork"]
                                ?.front_default
                                ? second?.sprites?.other["official-artwork"]
                                      ?.front_default
                                : ""
                        }
                    />
                )}
                {third && (
                    <SpriteImage
                        name={third?.name}
                        url={
                            third?.sprites?.other["official-artwork"]
                                ?.front_default
                                ? third?.sprites?.other["official-artwork"]
                                      ?.front_default
                                : ""
                        }
                    />
                )}
            </div>
        </>
    )
}
