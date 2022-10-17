type PokemonSpecsListProps = {
    title: string
    hp: number
    attack: number
    defense: number
    specialAttack: number
    specialDefense: number
    speed: number
}
export const PokemonSpecsList = ({
    title,
    hp,
    attack,
    defense,
    specialAttack,
    specialDefense,
    speed
}: PokemonSpecsListProps) => {
    return (
        <div className="max-w-md p-2">
            <h3 className="text-xl">{title}</h3>
            <dl className="grid grid-cols-2 mx-2 text-ctp-subtext0">
                <dt>
                    <span className="capitalize">hp</span>:
                </dt>
                <dd className="font-bold text-ctp-rosewater">{hp}</dd>
                <dt>
                    <span className="capitalize">attack</span>:
                </dt>
                <dd className="font-bold text-ctp-rosewater">{attack}</dd>
                <dt>
                    <span className="capitalize">defense</span>:
                </dt>
                <dd className="font-bold text-ctp-rosewater">{defense}</dd>
                <dt>
                    <span className="capitalize">special attack</span>:
                </dt>
                <dd className="font-bold text-ctp-rosewater">
                    {specialAttack}
                </dd>
                <dt>
                    <span className="capitalize">special defense</span>:
                </dt>
                <dd className="font-bold text-ctp-rosewater">
                    {specialDefense}
                </dd>
                <dt>
                    <span className="capitalize">speed</span>:
                </dt>
                <dd className="font-bold text-ctp-rosewater">{speed}</dd>
            </dl>
        </div>
    )
}
