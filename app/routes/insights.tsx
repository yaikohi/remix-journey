import { Link, Outlet, useOutletContext } from "@remix-run/react"
import { BaseHeader } from "~/components/styled-components/base-headers"
import {
    GridElementBottom,
    GridElementTR
} from "~/components/styled-components/grid-elements"

export default function InsightsRoute() {
    const data = useOutletContext() as any
    const { user } = data
    console.log(data)
    return (
        <>
            <GridElementTR>
                <BaseHeader>Insights</BaseHeader>
            </GridElementTR>
            <GridElementBottom>
                {user ? (
                    <>
                    {/* <div>hello</div> */}
                        <Outlet context={data} />
                    </>
                ) : (
                    <Link
                        className="text-xl text-ctp-rosewater hover:text-ctp-green"
                        to="/login"
                    >
                        Login
                    </Link>
                )}
            </GridElementBottom>
        </>
    )
}
