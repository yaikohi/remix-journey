import { json } from "@remix-run/node"
import { Outlet, useLoaderData } from "@remix-run/react"
import { Navbar, routes } from "~/components/navbar"
import { getAllPokemons } from "~/models/pokemon.server"

type LoaderData = Awaited<ReturnType<typeof getAllPokemons>>
export const loader = async () => {
    const data = await getAllPokemons()

    return json<LoaderData>(data)
}

export default function Pokemon() {
    const data = useLoaderData()

    return (
        <>
            <div className="p-3 bg-ctp-crust">
                <h1 className="text-7xl">Pokemon</h1>
            </div>
            <Navbar routes={routes} />
            <div className="flex flex-col items-center max-w-4xl p-24 mx-auto">
                
                <Outlet context={data} />
            </div>
        </>
    )
}
