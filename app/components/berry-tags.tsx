type BerryTagProps = {
    children: any
}
export const BerryTag = ({ children }: BerryTagProps) => {
    return (
        <>
            <li className="p-1 mx-auto hover:bg-ctp-overlay1 bg-ctp-overlay0 rounded-xl">
                {children}
            </li>
        </>
    )
}
