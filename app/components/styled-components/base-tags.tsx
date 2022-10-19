import { Link } from "@remix-run/react"

export const BaseTag = ({ children, to }: any) => (
    <Link
        className="p-2 mx-4 my-2 text-xl capitalize rounded-lg text-ctp-rosewater hover:text-ctp-green bg-ctp-surface1 hover:bg-ctp-surface2"
        to={to}
    >
        {children}
    </Link>
)
