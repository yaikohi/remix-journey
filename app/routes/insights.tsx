import { Link, Outlet, useOutletContext } from "@remix-run/react"

export default function InsightsRoute() {
    const data = useOutletContext() as any
    const { user } = data
    return (
        <>
            <div className="p-3 bg-ctp-crust">
                <h1 className="text-7xl">Insight</h1>
            </div>
            <div className="flex flex-col items-center p-24 mx-auto">
                {user ? (
                    <Outlet context={data} />
                ) : (
                    <Link
                        className="text-xl text-ctp-rosewater hover:text-ctp-green"
                        to="/login"
                    >
                        Login
                    </Link>
                )}
            </div>
        </>
    )
}
