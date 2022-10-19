import { Link } from "@remix-run/react"

export const BaseLinkInternal = ({ children, to }: any) => (
    <Link to={to}>{children}</Link>
)

export const BaseLinkExternal = ({ children, href }: any) => (
    <a href={href}>{children}</a>
)
