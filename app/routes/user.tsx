import { Link, Outlet, useOutletContext } from "@remix-run/react"

export default function User() {
    const data = useOutletContext() as any
    const { user } = data
    return (
        <>
            <div className="p-3 bg-ctp-crust">
                <h1 className="text-7xl">User</h1>
            </div>
            <div className="flex flex-col items-center max-w-4xl p-24 mx-auto">
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
