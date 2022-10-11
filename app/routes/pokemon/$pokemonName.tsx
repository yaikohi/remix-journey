import type { LoaderFunction } from "@remix-run/node"
import { json } from "@remix-run/node"
import { Link, useLoaderData, useMatches } from "@remix-run/react"
import type { Move, Pokemon as PokemonType } from "types/pokemon"
import PokemonEeveeVolutions from "~/components/pokemon-eevee-volution"
import PokemonEvolutionChain from "~/components/pokemon-evolution"
import PokemonMoves from "~/components/pokemon-moves"
import { getMoveByName } from "~/models/pokemon-moves.server"
import {
    getPokemonByName,
    getPokemonWithEvolutions
} from "~/models/pokemon.server"

type ReturnData = {
    pokemon: Awaited<ReturnType<typeof getPokemonByName>>
    evolutions: Awaited<ReturnType<typeof getPokemonWithEvolutions>>
    // moves: Awaited<ReturnType<typeof getMoveByName>>[]
}

type LoaderData = ReturnData

export const loader: LoaderFunction = async ({ request, context, params }) => {
    const pokemon = await getPokemonByName(params.pokemonName)
    // console.log("\n\npokemon.species.url - from LOADER: ", pokemon.species.url)

    const evolutions = await getPokemonWithEvolutions(pokemon)

    // console.log("\n\nevolution from LOADER: ", evolutions, "\n\n")
    // const moves: Move[] = await Promise.all(
    //     pokemon.moves.map(async (move, idx) => {
    //         return await getMoveByName(move.move.name)
    //     })
    // )

    return json<LoaderData>({
        pokemon,
        evolutions
        // moves
    })
}

export default function Pokemon() {
    const { pokemon } = useLoaderData<typeof loader>()
    // console.log(pokemon)

    const { evolutions } = useLoaderData<typeof loader>()
    // console.log(pokemon.name, evolutions)
    const { moves } = useLoaderData<typeof loader>()
    console.log(moves)
    const isOnlyEvolution = !!evolutions.first && !evolutions.second
    const hasEvolutions = !!evolutions.second

    const spriteSrc: PokemonType["sprites"]["other"]["official-artwork"]["front_default"] =
        pokemon.sprites.other["official-artwork"].front_default
    const name: PokemonType["name"] = pokemon.name
    const abilities: PokemonType["abilities"] = pokemon.abilities
    const types: PokemonType["types"] = pokemon.types

    const relatedRoutes = useMatches()
    const pokemons = relatedRoutes[1].data
    const currentPokemonIndex: number = relatedRoutes[1].data?.findIndex(
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
                <h1 className="p-2 m-4 text-5xl">{name}</h1>
                <Link
                    className="self-center p-2 m-4 bg-ctp-overlay0 hover:bg-ctp-overlay1 rounded-xl"
                    to={nextPokemonRoute}
                >
                    Next ({nextPokemonName})
                </Link>
            </div>

            <div className="bg-ctp-surface0">
                <img src={spriteSrc ? spriteSrc : ""} alt={`${name} sprite`} />
                <h2 className="text-2xl">Stats</h2>
            </div>

            <div className="col-span-2 bg-ctp-surface0">
                <div>
                    <h2 className="text-2xl">Type</h2>
                    {types.map((type: any, idx: number) => (
                        <p key={idx}>{type.type.name}</p>
                    ))}
                </div>

                <div>
                    <h2 className="text-2xl">Abilities</h2>
                    {abilities.map((ability, idx) => (
                        <p key={idx}>{ability.ability.name}</p>
                    ))}
                </div>
            </div>

            {/* Evolution component here */}
            {isOnlyEvolution ? (
                <></>
            ) : (
                <div className="col-span-3 bg-ctp-surface0">
                    {hasEvolutions ? (
                        <PokemonEvolutionChain evolutions={evolutions} />
                    ) : (
                        <PokemonEeveeVolutions evolutions={evolutions} />
                    )}
                </div>
            )}

            <div>
                <h2 className="text-2xl">Moves</h2>
                {/* <div><PokemonMoves moves={moves} /></div> */}
            </div>
        </div>
    )
}
