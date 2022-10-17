type PokemonCardProps = {
    id: number,
    name: string,
    pokedexId, number,
    image: string,
    sprite: string,
}
export const PokemonCard = ({}: PokemonCardProps) => {
    return (
        <div
                            key={pokeman.id}
                            className="flex flex-col items-center p-4 m-8 rounded-xl bg-ctp-overlay1"
                        >
                            <section className="capitalize">
                                <h2 className="text-2xl font-bold text-ctp-rosewater">
                                    {pokeman.name}
                                </h2>
                                <p className="italic text-ctp-text">
                                    {pokeman.pokedexId}
                                </p>
                                <ul className="flex gap-2 my-2">
                                    {pokeman.types.map((type, idx: number) => (
                                        <li
                                            className="p-2 rounded-md bg-ctp-overlay0"
                                            key={idx}
                                        >
                                            {type}
                                        </li>
                                    ))}
                                </ul>
                                <div className="flex flex-col px-8 py-4 my-4 rounded-lg bg-ctp-overlay2">
                                    <img
                                        src={pokeman.image}
                                        alt={pokeman.name}
                                    />
                                    <h3 className="my-4 text-xl">Base stats</h3>
                                    <dl className="grid grid-cols-2 ">
                                        <dt>hp</dt>
                                        <dd>{pokeman.hpBaseStat}</dd>
                                        <dt>attack</dt>
                                        <dd>{pokeman.attackBaseStat}</dd>
                                        <dt>defence</dt>
                                        <dd>{pokeman.defenseBaseStat}</dd>
                                        <dt>special attack</dt>
                                        <dd>{pokeman.specialAttackBaseStat}</dd>
                                        <dt>special defence</dt>
                                        <dd>
                                            {pokeman.specialDefenseBaseStat}
                                        </dd>
                                        <dt>speed</dt>
                                        <dd>{pokeman.speedBaseStat}</dd>
                                    </dl>
                                </div>
                            </section>
                        </div>
    )
}