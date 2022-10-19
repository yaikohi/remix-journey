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
import { GridElementBL } from "~/components/styled-components/grid-elements"
import { BaseHeader2 } from "~/components/styled-components/base-headers"

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
                hp: maxHp,
                attack: maxAttack,
                defense: maxDefense,
                specialAttack: maxSpecialAttack,
                specialDefense: maxSpecialDefense,
                speed: maxSpeed
            },
            min: {
                hp: minHp,
                attack: minAttack,
                defense: minDefense,
                specialAttack: minSpecialAttack,
                specialDefense: minSpecialDefense,
                speed: minSpeed
            },
            average: {
                hp: averageHp ? Math.round(averageHp) : 0,
                attack: averageAttack ? Math.round(averageAttack) : 0,
                defense: averageDefense ? Math.round(averageDefense) : 0,
                specialAttack: averageSpecialAttack
                    ? Math.round(averageSpecialAttack)
                    : 0,
                specialDefense: averageSpecialDefense
                    ? Math.round(averageSpecialDefense)
                    : 0,
                speed: averageSpeed ? Math.round(averageSpeed) : 0
            }
        }
    }
}

const GridContainer = ({ children }: any) => (
    <div className="grid grid-cols-2 grid-rows-2">{children} </div>
)

export default function PokemonTypeRoute() {
    const { pokemons, param, metrics } = useLoaderData()
    return (
        <>
            <GridContainer>
                <div className="col-start-2 row-start-1">
                    <div className="flex flex-col">
                        <BaseHeader2>
                            All pokemons that have the{" "}
                            <span className="font-bold">{param}</span> type.
                        </BaseHeader2>

                        <PokemonSpecsListSmall
                            title="Summary"
                            total={pokemons.length}
                            multipleTypeAmount={
                                pokemons.filter((pokemon: Pokemon) => {
                                    return pokemonHasMultipleTypes(pokemon)
                                }).length
                            }
                        />
                        <Link
                            className="mt-16 text-xl italic font-extrabold "
                            to="/insights"
                        >
                            Choose another type
                        </Link>
                    </div>
                </div>
                <div className="col-start-1 row-start-1">
                    <Outlet context={{ pokemons, param, metrics }} />
                </div>
                <div className="flex flex-col max-h-full col-span-2 col-start-2 row-start-2">
                    {/* {pokemons.slice(0, 1).map((pokeman: Pokemon) => {
                        return (
                            <PokemonCard key={pokeman.id} pokemon={pokeman} />
                        )
                    })} */}
                        hello <h2>hello</h2>
                </div>
            </GridContainer>
        </>
    )
}
