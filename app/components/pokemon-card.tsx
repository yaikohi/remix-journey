import type { Pokemon } from "@prisma/client"


const CardContainer = ({ children }: any) => (
    <div className="flex flex-col items-center p-4 m-8 rounded-xl bg-ctp-overlay1">
        {children}
    </div>
)
const CardSection = ({ children }: any) => (
    <div className="capitalize">{children}</div>
)
const CardTitle = ({ children }: any) => (
    <h2 className="text-2xl font-bold text-ctp-rosewater">{children}</h2>
)

const CardSubtitle = ({ children }: any) => (
    <p className="italic text-ctp-text">{children}</p>
)

const CardImageContainer = ({ children }: any) => (
    <div className="flex flex-col px-8 py-4 my-4 rounded-lg bg-ctp-overlay2">
        {children}
    </div>
)

type PokemonCardBaseStatsProps = {
    hpBaseStat: number
    attackBaseStat: number
    defenseBaseStat: number
    specialAttackBaseStat: number
    specialDefenseBaseStat: number
    speedBaseStat: number
}
export const PokemonCardBaseStats = ({
    hpBaseStat,
    attackBaseStat,
    defenseBaseStat,
    specialAttackBaseStat,
    specialDefenseBaseStat,
    speedBaseStat
}: PokemonCardBaseStatsProps) => {
    return (
        <dl className="grid grid-cols-2 ">
            <dt>hp</dt>
            <dd>{hpBaseStat}</dd>
            <dt>attack</dt>
            <dd>{attackBaseStat}</dd>
            <dt>defence</dt>
            <dd>{defenseBaseStat}</dd>
            <dt>special attack</dt>
            <dd>{specialAttackBaseStat}</dd>
            <dt>special defence</dt>
            <dd>{specialDefenseBaseStat}</dd>
            <dt>speed</dt>
            <dd>{speedBaseStat}</dd>
        </dl>
    )
}

type PokemonCardProps = {
    pokemon: Pokemon
}
export const PokemonCard = ({ pokemon }: PokemonCardProps) => {
    const {
        id,
        name,
        pokedexId,
        types,
        image,
        hpBaseStat,
        attackBaseStat,
        defenseBaseStat,
        specialAttackBaseStat,
        specialDefenseBaseStat,
        speedBaseStat
    } = pokemon

    return (
        <CardContainer key={id}>
            <CardSection>
                <CardTitle>{name}</CardTitle>
                <CardSubtitle>{pokedexId}</CardSubtitle>
                <ul className="flex gap-2 my-2">
                    {types.map((type: string, idx: number) => (
                        <li
                            className="p-2 rounded-md bg-ctp-overlay0"
                            key={idx}
                        >
                            {type}
                        </li>
                    ))}
                </ul>
                <CardImageContainer>
                    <img src={image} alt={name} />
                    <h3 className="my-4 text-xl">Base stats</h3>
                    <PokemonCardBaseStats
                        hpBaseStat={hpBaseStat}
                        attackBaseStat={attackBaseStat}
                        defenseBaseStat={defenseBaseStat}
                        specialAttackBaseStat={specialAttackBaseStat}
                        specialDefenseBaseStat={specialDefenseBaseStat}
                        speedBaseStat={speedBaseStat}
                    />
                </CardImageContainer>
            </CardSection>
        </CardContainer>
    )
}
