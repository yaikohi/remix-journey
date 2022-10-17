import type { Pokemon } from "@prisma/client"
import type { LoaderFunction } from "@remix-run/node"
import type { PokemonTypeNames } from "types/pokemon"
import { Link, useLoaderData } from "@remix-run/react"
import { getPokemonByType } from "~/models/pokemon.server"
import { pokemonHasMultipleTypes } from "~/utils/pokemonFilters"
import {
    getAverageAttackBaseStat,
    getAverageDefenseBaseStat,
    getAverageHpBaseStat,
    getAverageSpecialAttackBaseStat,
    getAverageSpecialDefenseBaseStat,
    getAverageSpeedBaseStat,
    getHighestAttackBaseStat,
    getHighestDefenseBaseStat,
    getHighestHpBaseStat,
    getHighestSpecialAttackBaseStat,
    getHighestSpecialDefenseBaseStat,
    getHighestSpeedBaseStat,
    getLowestAttackBaseStat,
    getLowestDefenseBaseStat,
    getLowestHpBaseStat,
    getLowestSpecialAttackBaseStat,
    getLowestSpecialDefenseBaseStat,
    getLowestSpeedBaseStat
} from "~/models/pokemon-aggregations.server"
import { PokemonSpecsList } from "~/components/pokemon-specs-list"
import { PokemonSpecsListSmall } from "~/components/pokemon-specs-list-small"

export const loader: LoaderFunction = async ({ params }) => {
    const pokemonTypeParam = params.pokemonType as PokemonTypeNames
    const pokemons = await getPokemonByType(pokemonTypeParam)

    // MAXES
    const maxHp = await getHighestHpBaseStat(pokemonTypeParam)
    const maxAttack = await getHighestAttackBaseStat(pokemonTypeParam)
    const maxDefense = await getHighestDefenseBaseStat(pokemonTypeParam)
    const maxSpecialAttack = await getHighestSpecialAttackBaseStat(
        pokemonTypeParam
    )
    const maxSpecialDefense = await getHighestSpecialDefenseBaseStat(
        pokemonTypeParam
    )
    const maxSpeed = await getHighestSpeedBaseStat(pokemonTypeParam)

    // MINS
    const minHp = await getLowestHpBaseStat(pokemonTypeParam)
    const minAttack = await getLowestAttackBaseStat(pokemonTypeParam)
    const minDefense = await getLowestDefenseBaseStat(pokemonTypeParam)
    const minSpecialAttack = await getLowestSpecialAttackBaseStat(
        pokemonTypeParam
    )
    const minSpecialDefense = await getLowestSpecialDefenseBaseStat(
        pokemonTypeParam
    )
    const minSpeed = await getLowestSpeedBaseStat(pokemonTypeParam)

    // AVERAGES
    const averageHp = await getAverageHpBaseStat(pokemonTypeParam)
    const averageAttack = await getAverageAttackBaseStat(pokemonTypeParam)
    const averageDefense = await getAverageDefenseBaseStat(pokemonTypeParam)
    const averageSpecialAttack = await getAverageSpecialAttackBaseStat(
        pokemonTypeParam
    )
    const averageSpecialDefense = await getAverageSpecialDefenseBaseStat(
        pokemonTypeParam
    )
    const averageSpeed = await getAverageSpeedBaseStat(pokemonTypeParam)
    return {
        pokemons,
        param: pokemonTypeParam,
        max: {
            maxHp,
            maxAttack,
            maxDefense,
            maxSpecialAttack,
            maxSpecialDefense,
            maxSpeed
        },
        min: {
            minHp,
            minAttack,
            minDefense,
            minSpecialAttack,
            minSpecialDefense,
            minSpeed
        },
        average: {
            averageHp: averageHp ? Math.round(averageHp) : 0,
            averageAttack: averageAttack ? Math.round(averageAttack) : 0,
            averageDefense: averageDefense ? Math.round(averageDefense) : 0,
            averageSpecialAttack: averageSpecialAttack
                ? Math.round(averageSpecialAttack)
                : 0,
            averageSpecialDefense: averageSpecialDefense
                ? Math.round(averageSpecialDefense)
                : 0,
            averageSpeed: averageSpeed ? Math.round(averageSpeed) : 0
        }
    }
}

export default function PokemonTypeRoute() {
    const { pokemons, param, max, min, average } = useLoaderData()

    console.log(average)
    return (
        <>
            <main className="grid max-w-xl min-w-full grid-cols-4 p-4 rounded-xl bg-ctp-overlay0">
                <h2 className="col-span-4 text-2xl">
                    All pokemons that have the{" "}
                    <span className="font-bold text-ctp-rosewater">
                        {param}
                    </span>{" "}
                    type
                </h2>
                <Link
                    className="col-span-4 p-2 text-4xl font-extrabold text-ctp-red text-italic"
                    to="/insights"
                >
                    back
                </Link>
                <div className="col-span-2 bg-ctp-overlay1">
                    <PokemonSpecsListSmall
                        title="General"
                        total={pokemons.length}
                        multipleTypeAmount={
                            pokemons.filter((pokemon: Pokemon) => {
                                return pokemonHasMultipleTypes(pokemon)
                            }).length
                        }
                    />

                    <PokemonSpecsList
                        title="Maxes"
                        hp={max.maxHp}
                        attack={max.maxAttack}
                        defense={max.maxDefense}
                        specialAttack={max.maxSpecialAttack}
                        specialDefense={max.maxSpecialDefense}
                        speed={max.maxSpeed}
                    />
                    <PokemonSpecsList
                        title="Mins"
                        hp={min.minHp}
                        attack={min.minAttack}
                        defense={min.minDefense}
                        specialAttack={min.minSpecialAttack}
                        specialDefense={min.minSpecialDefense}
                        speed={min.minSpeed}
                    />
                    <PokemonSpecsList
                        title="Averages"
                        hp={average.averageHp}
                        attack={average.averageAttack}
                        defense={average.averageDefense}
                        specialAttack={average.averageSpecialAttack}
                        specialDefense={average.averageSpecialDefense}
                        speed={average.averageSpeed}
                    />
                </div>
                {pokemons.slice(0, 100).map((pokeman: Pokemon) => {
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
                })}
            </main>
        </>
    )
}
