// take evolutiondata as a prop
// render component for pages

import { Link } from "@remix-run/react/dist/components"
import tw from "tailwind-styled-components"
import type { Pokemon } from "types/pokemon"

type PokemonEvolutionsProps = {
    evolutions: {
        first: null | Pokemon
        second: null | Pokemon
        third: null | Pokemon
    }
}

const SpriteContainer = tw.div`p-2 m-2 text-center rounded-md shadow-sm bg-ctp-overlay0 hover:bg-ctp-overlay1`

function SpriteImage({ name, url }: { name: string; url: string }) {
    return (
        <SpriteContainer>
            <Link to={`/pokemon/${name}`}>
                <span>
                    <h3>{name}</h3>
                    <img src={url} alt={`${name}`} />
                </span>
            </Link>
        </SpriteContainer>
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
            <h2 className="text-2xl bg-ctp-surface1">Evolutions</h2>
            <div className="flex justify-center">
                {first && (
                    <SpriteImage
                        name={first?.name}
                        url={first?.sprites?.front_default}
                    />
                )}
                {second && (
                    <SpriteImage
                        name={second?.name}
                        url={second?.sprites?.front_default}
                    />
                )}
                {third && (
                    <SpriteImage
                        name={third?.name}
                        url={third?.sprites.front_default}
                    />
                )}
            </div>
        </>
    )
}
