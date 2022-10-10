// take evolutiondata as a prop
// render component for pages

import { Link } from "@remix-run/react/dist/components"
import type { Pokemon } from "types/pokemon"

type PokemonEeveeVolutionsProps = {
    evolutions: Pokemon[]
}

function SpriteImage({ name, url }: { name: string; url: string }) {
    return (
        <div className="p-2 m-2 text-center rounded-md shadow-sm bg-ctp-overlay0 hover:bg-ctp-overlay1">
            <Link to={`/pokemon/${name}`}>
                <span>
                    <h3>{name}</h3>
                    <img src={url} alt={`${name}`} />
                </span>
            </Link>
        </div>
    )
}

/**
 * TODO: 
 * - Show first evolution form on page as well, for example:
 *  eevee isn't showing when on any of its evolution pages.
 *
 * @param evolutions
 * @returns
 */
export default function PokemonEeveeVolutions({
    evolutions
}: PokemonEeveeVolutionsProps) {
    return (
        <>
            <h2 className="text-2xl bg-ctp-surface1">Evolutions</h2>
            <div className="flex justify-center">
                {evolutions.map((evolution, idx) => {
                    return (
                        <SpriteImage
                            key={evolution.id}
                            name={evolution?.name}
                            url={evolution?.sprites?.front_default}
                        />
                    )
                })}
            </div>
        </>
    )
}
