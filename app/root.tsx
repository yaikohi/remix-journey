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

const BodyGrid = ({ children }: any) => (
    <body className="grid grid-cols-2 grid-rows-2 bg-ctp-base text-ctp-text">
        {children}
    </body>
)

const NavbarContainer = ({ children }: any) => (
    <nav className="flex flex-row col-start-1 row-start-1 max-h-10">
        {children}
    </nav>
)

const NavbarList = ({ children }: any) => (
    <ul className="flex flex-row items-center w-full gap-2 px-8 rounded-md last:ml-auto last:mr-8">
        {children}
    </ul>
)

const NavbarListItem = ({ children }: any) => (
    <li className="text-xl capitalize hover:text-ctp-green">{children}</li>
)

const LogoutButton = ({ children }: any) => (
    <button
        type="submit"
        className="p-2 text-xl rounded-md hover:text-ctp-green bg-ctp-surface1"
    >
        {children}
    </button>
)

export default function App() {
    const data = useLoaderData()
    const { user } = data
    
    return (
        <html lang="en">
            <head>
                <Meta />
                <Links />
            </head>
            <BodyGrid>
                {user ? (
                    <>
                        <NavbarContainer>
                            <NavbarList>
                                <NavbarListItem>
                                    <Link to="/">home</Link>
                                </NavbarListItem>
                                <NavbarListItem>
                                    <Link to="/insights">Insights</Link>
                                </NavbarListItem>
                                <NavbarListItem>
                                    <Link to="/user">{user.username}</Link>
                                </NavbarListItem>
                            </NavbarList>
                        </NavbarContainer>
                        <form
                            className="col-start-2 row-start-1 ml-auto mr-8 max-w-max max-h-12"
                            action="/logout"
                            method="post"
                        >
                            <LogoutButton>Logout</LogoutButton>
                        </form>
                    </>
                ) : (
                    <>
                        <NavbarContainer>
                            <NavbarList>
                                <NavbarListItem>
                                    <Link to="/">home</Link>
                                </NavbarListItem>
                                <NavbarListItem>
                                    <Link to="/login">Login</Link>
                                </NavbarListItem>
                            </NavbarList>
                            <form action="/logout" method="post">
                                <LogoutButton>Logout</LogoutButton>
                            </form>
                        </NavbarContainer>
                    </>
                )}
                <Outlet context={data} />
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </BodyGrid>
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
