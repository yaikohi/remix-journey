import type { LoaderFunction } from "@remix-run/node"
import { json } from "@remix-run/node"
import { Link, useLoaderData, useOutletContext } from "@remix-run/react"
import { BerryInfo } from "~/components/berry-info"
import { BerryTag } from "~/components/berry-tags"

export const loader: LoaderFunction = async ({ request, context, params }) => {
    const URL = "https://pokeapi.co/api/v2/berry/"
    const ID = 2
    const res = await fetch(`${URL}${ID}`)
    const berryOfTheDay = await res.json()

    return json(berryOfTheDay)
}

export default function BerriesOverview() {
    const berries = useOutletContext() as any
    const berryOfTheDay = useLoaderData()

    return (
        <>
            <div>
                <h2 className="text-xl">Todays berry: </h2>
                <BerryInfo berry={berryOfTheDay} />
                <p className="italic">
                    Did you know? There are 64 different berries? in pokemon?
                </p>
            </div>
            <div className="flex flex-col my-8">
                <nav>
                    <ul className="grid grid-cols-4 gap-2">
                        {berries.map((berry: any, index: number) => (
                            <BerryTag key={index}>
                                <Link to={`/berries/${berry.name}`}>
                                    {berry.name}
                                </Link>
                            </BerryTag>
                        ))}
                    </ul>
                </nav>
            </div>
        </>
    )
}
