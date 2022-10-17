import { Link } from "@remix-run/react"
import { pokemonTypes } from "~/utils/pokemonTypeColorMap"

export default function InsightsIndexRoute() {
    // const data = useOutletContext() as any
    return (
        <>
            <main className="max-w-xl min-w-full p-4 rounded-xl bg-ctp-overlay0">
                <h2 className="col-span-2 text-2xl">Insights per type</h2>
                <div className="grid items-center max-w-lg grid-cols-3 p-4 m-8 text-center rounded-xl bg-ctp-overlay1">
                    {pokemonTypes.map((type, idx) => (
                        <Link
                            className="p-2 mx-4 my-2 text-xl capitalize rounded-lg text-ctp-rosewater hover:text-ctp-green bg-ctp-surface1 hover:bg-ctp-surface2"
                            to={type}
                            key={idx}
                        >
                            {type}
                        </Link>
                    ))}
                </div>
            </main>
        </>
    )
}
