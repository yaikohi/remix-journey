import type { LoaderFunction } from "@remix-run/node"
import { Link } from "@remix-run/react"

import { PokemonSpecsList } from "~/components/pokemon-specs-list"

// export const loader: LoaderFunction = async ({ params }) => {
//     return {}
// }

export default function PokemonTypeMetric() {
    return (
        <div className="col-span-2 bg-ctp-overlay1">
            <Link to="max">Max</Link>
            <Link to="min">Min</Link>
            <Link to="average">Average</Link>
        </div>
    )
}
