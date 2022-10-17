import type {
    ErrorBoundaryComponent,
    LoaderFunction,
    MetaFunction
} from "@remix-run/node"
import { json } from "@remix-run/node"
import {
    Link,
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLoaderData
} from "@remix-run/react"
import { getAllPokemon } from "./models/pokemon.server"
import { prisma } from "./models/prisma.server"
import { getUser } from "./models/session.server"
import styles from "./styles/app.css"

export function links() {
    return [{ rel: "stylesheet", href: styles }]
}

export const meta: MetaFunction = () => ({
    charset: "utf-8",
    title: "remix",
    viewport: "width=device-width,initial-scale=1"
})

export const loader: LoaderFunction = async ({ request }) => {
    const user = await getUser(request)
    return json({
        pokemon: await getAllPokemon(),
        user
    })
}

export default function App() {
    const data = useLoaderData()
    const { user } = data
    return (
        <html lang="en">
            <head>
                <Meta />
                <Links />
            </head>
            <body className="bg-ctp-base text-ctp-text">
                {user ? (
                    <>
                        <nav className="flex flex-row py-2 my-2 text-ctp-rosewater bg-ctp-surface0">
                            <ul className="flex flex-row items-center w-full gap-2 px-8 mx-8 rounded-md last:ml-auto last:mr-8">
                                <li className="text-xl capitalize hover:text-ctp-green">
                                    <Link to="/">home</Link>
                                </li>
                                <li className="text-xl capitalize hover:text-ctp-green">
                                    <Link to="/insights">Insights</Link>
                                </li>
                                {/* <li className="text-xl capitalize hover:text-ctp-green">
                                    <Link to="/berries">berries</Link>
                                </li> */}
                                <li className="text-xl capitalize hover:text-ctp-green">
                                    <Link to="/user">{user.username}</Link>
                                </li>
                            </ul>
                            <form action="/logout" method="post">
                                <button
                                    type="submit"
                                    className="p-2 mx-4 text-xl rounded-md hover:text-ctp-green bg-ctp-surface1"
                                >
                                    Logout
                                </button>
                            </form>
                        </nav>
                    </>
                ) : (
                    <>
                        <nav className="flex flex-row py-2 my-2 text-ctp-rosewater bg-ctp-surface0">
                            <ul className="flex flex-row items-center w-full gap-2 px-8 mx-8 rounded-md">
                                <li className="text-xl capitalize hover:text-ctp-green">
                                    <Link to="/">home</Link>
                                </li>
                                {/* <li className="text-xl capitalize hover:text-ctp-green">
                                    <Link to="/pokemon">pokemon</Link>
                                </li>
                                <li className="text-xl capitalize hover:text-ctp-green">
                                    <Link to="berries">berries</Link>
                                </li> */}
                                <li className="text-xl capitalize hover:text-ctp-green">
                                    <Link to="/login">Login</Link>
                                </li>
                            </ul>
                            <form action="/logout" method="post">
                                <button
                                    type="submit"
                                    className="p-2 mx-4 text-xl rounded-md hover:text-ctp-green bg-ctp-surface1"
                                >
                                    Logout
                                </button>
                            </form>
                        </nav>
                    </>
                )}
                <Outlet context={data} />
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    )
}

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
    console.error(error)
    return (
        <html>
            <head>
                <title>Oh no!</title>
                <Meta />
                <Links />
            </head>
            <body className="bg-ctp-base text-ctp-text">
                <div className="max-w-5xl mx-auto">
                    <h1 className="p-4 m-2 text-4xl">{`${error}`}</h1>
                </div>
                <Scripts />
            </body>
        </html>
    )
}
