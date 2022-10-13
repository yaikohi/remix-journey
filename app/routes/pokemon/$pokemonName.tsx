import type { LoaderFunction } from "@remix-run/node"
import { json } from "@remix-run/node"
import { Link, useLoaderData, useMatches } from "@remix-run/react"
import type { PokemonStat, Pokemon as PokemonType } from "types/pokemon"
import PokemonEeveeVolutions from "~/components/pokemon-eevee-volution"
import PokemonEvolutionChain from "~/components/pokemon-evolution"
import {
    getPokemonByName,
    getPokemonWithEvolutions
} from "~/models/pokemon.server"

type LoaderData = {
    pokemon: Awaited<ReturnType<typeof getPokemonByName>>
    evolutions: Awaited<ReturnType<typeof getPokemonWithEvolutions>>
}

export const loader: LoaderFunction = async ({ request, context, params }) => {
    const pokemon = await getPokemonByName(params.pokemonName)
    const evolutions = await getPokemonWithEvolutions(pokemon)

    return json<LoaderData>({
        pokemon,
        evolutions
    })
}

export default function Pokemon() {
    const { pokemon } = useLoaderData<typeof loader>()
    const { evolutions } = useLoaderData<typeof loader>()

    const isOnlyEvolution = !!evolutions.first && !evolutions.second
    const hasEvolutions = !!evolutions.second

    const spriteSrc: PokemonType["sprites"]["other"]["official-artwork"]["front_default"] =
        pokemon.sprites.other["official-artwork"].front_default
    const name: PokemonType["name"] = pokemon.name
    const abilities: PokemonType["abilities"] = pokemon.abilities
    const types: PokemonType["types"] = pokemon.types
    const moves: PokemonType["moves"] = pokemon.moves

    const relatedRoutes = useMatches()

    const pokemons = relatedRoutes[1].data.pokemons
    const currentPokemonIndex: number = pokemons.findIndex(
        (pokeman: PokemonType) => pokeman.name === pokemon.name
    )
    const nextPokemonIndex =
        currentPokemonIndex === pokemons.length - 1
            ? 0
            : currentPokemonIndex + 1
    const prevPokemonIndex =
        currentPokemonIndex === 0
            ? pokemons.length - 1
            : currentPokemonIndex - 1

    const nextPokemonName = pokemons[nextPokemonIndex]?.name
    const prevPokemonName = pokemons[prevPokemonIndex]?.name

    const nextPokemonRoute = `${relatedRoutes[1].pathname}/${nextPokemonName}`
    const prevPokemonRoute = `${relatedRoutes[1].pathname}/${prevPokemonName}`

    return (
        <div className="grid grid-cols-3 gap-10 capitalize">
            <div className="flex justify-center col-span-3 align-middle bg-ctp-surface0">
                <Link
                    className="self-center p-2 m-4 bg-ctp-overlay0 hover:bg-ctp-overlay1 rounded-xl"
                    to={prevPokemonRoute}
                >
                    back ({prevPokemonName})
                </Link>
                <h1 className="p-2 m-4 text-5xl font-extrabold">{name}</h1>
                <Link
                    className="self-center p-2 m-4 bg-ctp-overlay0 hover:bg-ctp-overlay1 rounded-xl"
                    to={nextPokemonRoute}
                >
                    Next ({nextPokemonName})
                </Link>
            </div>

            <div className="bg-ctp-surface0">
                <img src={spriteSrc ? spriteSrc : ""} alt={`${name} sprite`} />
                <h2 className="px-4 pt-2 text-2xl font-bold">Stats</h2>
                <dl className="px-4">
                    {pokemon.stats.map((stat: PokemonStat, idx: number) => (
                        <div
                            key={idx}
                            className="flex justify-between min-w-[170px]"
                        >
                            <dt className="my-1 font-light">
                                {stat.stat.name}
                            </dt>
                            <dd className="my-1 ">{stat.base_stat}</dd>
                        </div>
                    ))}
                </dl>
            </div>

            <div className="col-span-2 bg-ctp-surface0">
                <div className="flex flex-col px-4">
                    <h2 className="pt-2 text-2xl font-bold">Type</h2>
                    {types.map((type: any, idx: number) => (
                        <p className="" key={idx}>
                            {/* TODO: Create a dedicated UI component */}
                            {type.type.name}
                        </p>
                    ))}
                </div>

                <div className="flex flex-col p-2 px-4">
                    <h2 className="pt-2 text-2xl font-bold">Abilities</h2>
                    {abilities.map((ability, idx) => (
                        <p className="" key={idx}>
                            {/* TODO: Create a dedicated UI component */}
                            {ability.ability.name}
                        </p>
                    ))}
                </div>
            </div>

            {isOnlyEvolution ? (
                <>
                    <div className="col-span-3 bg-ctp-surface0">
                        <h2 className="text-2xl">No evolutions</h2>
                    </div>
                </>
            ) : (
                <div className="col-span-3 bg-ctp-surface0">
                    {hasEvolutions ? (
                        <PokemonEvolutionChain evolutions={evolutions} />
                    ) : (
                        <PokemonEeveeVolutions evolutions={evolutions} />
                    )}
                </div>
            )}

            {/* TODO: Create a 'moves' UI component. */}
            <div>
                <h2 className="text-2xl">Moves</h2>
                {moves.map((move, idx) => (
                    <p className="" key={idx}>
                        {/* TODO: Create a dedicated UI component */}
                        {move.move.name}
                    </p>
                ))}
            </div>
        </div>
    )
}
