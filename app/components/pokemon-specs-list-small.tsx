import { Pokemon } from "@prisma/client"

type PokemonSpecsListSmallProps = {
    title: string
    total: number
    multipleTypeAmount: number
}
export const PokemonSpecsListSmall = ({
    title,
    total,
    multipleTypeAmount
}: PokemonSpecsListSmallProps) => {
    return (
        <div className="max-w-md p-2">
            <h3 className="text-xl">{title}</h3>
            <dl className="grid grid-cols-2 grid-rows-2 mx-2 text-ctp-subtext0">
                <dt>Total pokemon:</dt>
                <dd className="font-bold text-ctp-rosewater">{total}</dd>
                <dt>Multiple typed pokemon:</dt>
                <dd className="font-bold text-ctp-rosewater">
                    {multipleTypeAmount}
                </dd>
            </dl>
        </div>
    )
}
