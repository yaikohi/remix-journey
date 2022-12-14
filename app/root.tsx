import type { ErrorBoundaryComponent, MetaFunction } from "@remix-run/node"
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration
} from "@remix-run/react"
import styles from "./styles/app.css"

/**
 * For adding a global css file
 */
export function links() {
    return [{ rel: "stylesheet", href: styles }]
}

export const meta: MetaFunction = () => ({
    charset: "utf-8",
    title: "remix",
    viewport: "width=device-width,initial-scale=1"
})

export default function App() {
    return (
        <html lang="en">
            <head>
                <Meta />
                <Links />
            </head>
            <body className="bg-ctp-base text-ctp-text">
                <Outlet />
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
            {/* add the UI you want your users to see */}
            <body className="bg-ctp-base text-ctp-text">
                <div className="max-w-5xl mx-auto">
                    <h1 className="p-4 m-2 text-4xl">{`${error}`}</h1>
                </div>
                <Scripts />
            </body>
        </html>
    )
}
