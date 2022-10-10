import type { LoaderFunction } from "@remix-run/node"
import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import type { Pokemon as PokemonType } from "types/pokemon"
import PokemonEeveeVolutions from "~/components/  pokemon-eevee-volution"
import PokemonEvolutionChain from "~/components/pokemon-evolution"
import {
    getPokemonByName,
    getPokemonWithEvolutions
} from "~/models/pokemon.server"

type ReturnData = {
    pokemon: Awaited<ReturnType<typeof getPokemonByName>>
    evolutions: Awaited<ReturnType<typeof getPokemonWithEvolutions>>
}

type LoaderData = ReturnData

// fetch evolution chain on page component, feed evolution chain to child component 'PokemonEvolution"
export const loader: LoaderFunction = async ({ request, context, params }) => {
    const pokemon = await getPokemonByName(params.pokemonName)
    const evolutions = await getPokemonWithEvolutions(pokemon.species.url)

    return json<LoaderData>({
        pokemon,
        evolutions
    })
}

export default function Pokemon() {
    const { pokemon } = useLoaderData<typeof loader>()
    const { evolutions } = useLoaderData<typeof loader>()

    const typeOfEvolutions = typeof evolutions === "object" && evolutions.first

    const spriteSrc: PokemonType["sprites"]["front_default"] =
        pokemon.sprites.front_default
    const name: PokemonType["name"] = pokemon.name
    const abilities: PokemonType["abilities"] = pokemon.abilities
    const moves: PokemonType["moves"] = pokemon.moves
    const types: PokemonType["types"] = pokemon.types
    // const stats: PokemonType["stats"] = pokemon.stats;
    // const species: PokemonType["species"] = pokemon.species

    //   const relatedRoutes = useMatches();

    //   const berries = relatedRoutes[1].data?.berries;
    //   const currentBerryIndex = relatedRoutes[1].data?.berries.findIndex(
    //     (pokeman) => pokeman.name === pokemon.name
    //   );
    //   const nextBerryIndex =
    //     currentBerryIndex === berries.length - 1 ? 0 : currentBerryIndex + 1;
    //   const prevBerryIndex =
    //     currentBerryIndex === 0 ? berries.length - 1 : currentBerryIndex - 1;

    //   const nextBerryName = berries[nextBerryIndex]?.name;
    //   const prevBerryName = berries[prevBerryIndex]?.name;

    //   const nextBerryRoute = `${relatedRoutes[1].pathname}/${nextBerryName}`;
    //   const prevBerryRoute = `${relatedRoutes[1].pathname}/${prevBerryName}`;

    return (
        <div className="grid grid-cols-3 gap-10 capitalize">
            <div className="col-span-3 bg-ctp-surface0">
                <h1 className="text-5xl">{name}</h1>
            </div>

            <div className="bg-ctp-surface0">
                <img src={spriteSrc} alt={`${name} sprite`} />
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
            <div className="col-span-3 bg-ctp-surface0">
                {typeOfEvolutions ? (
                    <PokemonEvolutionChain evolutions={evolutions} />
                ) : (
                    <PokemonEeveeVolutions evolutions={evolutions} />
                )}
            </div>

            <div>
                <h2 className="text-2xl">Moves</h2>
                <div>
                    {moves.map((move, idx) => (
                        <p key={idx}>{move.move.name}</p>
                    ))}
                </div>
            </div>

            {/* <Link
          className="p-2 text-black bg-ctp-blue rounded-xl"
          to={prevBerryRoute}
        >
          Back ({prevBerryName})
        </Link>
        <Link
          className="p-2 text-black bg-ctp-blue rounded-xl"
          to={nextBerryRoute}
        >
          Next ({nextBerryName})
        </Link> */}
        </div>
    )
}
