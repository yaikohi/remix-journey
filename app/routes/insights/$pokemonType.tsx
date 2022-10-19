import type { Pokemon } from "@prisma/client"
import type { LoaderFunction } from "@remix-run/node"
import type { PokemonTypeNames } from "types/pokemon-pokeapi"
import { Link, Outlet, useLoaderData } from "@remix-run/react"
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
import { PokemonCard } from "~/components/pokemon-card"

export const loader: LoaderFunction = async ({ params }) => {
    const pokemonTypeParam = params.pokemonType as PokemonTypeNames
    const pokemons = await getPokemonByType(pokemonTypeParam)

    /**
     * TODO: Refactor all of this.
     */

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
        metrics: {
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
}

export default function PokemonTypeRoute() {
    const { pokemons, param, metrics } = useLoaderData()
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
                    <Outlet context={{ pokemons, param, metrics }} />

                    {/*                     
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
                    /> */}
                </div>
                {pokemons.slice(0, 100).map((pokeman: Pokemon) => {
                    return <PokemonCard key={pokeman.id} pokemon={pokeman} />
                })}
            </main>
        </>
    )
}
