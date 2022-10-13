import type { Pokemon } from "types/pokemon"
import { getTypeColorFromMap } from "~/utils/pokemonTypeColorMap"

type PokemonTypes = { types: Pokemon["types"] }

export const TypeTags = ({ types }: PokemonTypes) => {
    return (
        <>
            {types.map((type, idx) => {
                return (
                    <span
                        className={`p-2 mx-1 text-white bg-ctp-${getTypeColorFromMap(
                            type.type.name
                        )} shadow-md rounded-xl first:mx-0`}
                        key={idx}
                    >
                        {type.type.name}
                    </span>
                )
            })}
        </>
    )
}

const DataList = ({ children }: { children: any }) => {
    return (
        <dl className="grid min-w-full grid-cols-2 gap-2 px-6 py-4 capitalize bg-ctp-mantle rounded-b-xl">
            {children}
        </dl>
    )
}

const DataItem = ({
    title,
    content
}: {
    title: string
    content: string | number
}) => {
    return (
        <>
            <dt className="font-light lowercase text-ctp-subtext1">{title}</dt>
            <dd className="text-ctp-text">{`${content}`}</dd>
        </>
    )
}

const DataItems = ({
    title,
    content
}: {
    title: string
    content: string[] | number[]
}) => {
    return (
        <>
            <dt className="font-light lowercase text-ctp-subtext1">{title}</dt>
            <div>
                {content.map((contentItem) => (
                    <>
                        <dd className="text-ctp-text">{`${contentItem}`}</dd>
                    </>
                ))}
            </div>
        </>
    )
}

export const PokemonInfo = ({ pokemon }: { pokemon: Pokemon }) => {
    // const pokemonMoves = pokemon.moves.slice(0, 4).map((move) => move.move.name)
    const pokemonAbilities = pokemon.abilities.map(
        (ability) => ability.ability.name
    )
    return (
        <div className="flex flex-col items-center m-2 bg-ctp-surface0 rounded-xl hover:shadow-lg">
            <h3 className="py-2 text-4xl font-extrabold capitalize max-w-min">
                {pokemon.name}
            </h3>
            <div className="px-1 pt-4">
                <TypeTags types={pokemon.types} />
            </div>
            <div className="self-center mt-8">
                <img
                    src={
                        pokemon?.sprites?.other["official-artwork"]
                            .front_default
                            ? pokemon?.sprites?.other["official-artwork"]
                                  .front_default
                            : ""
                    }
                    alt={`Sprite of ${pokemon.name}`}
                />
            </div>
            <DataList>
                <DataItem title={"height (dm)"} content={pokemon.height} />
                <DataItem title={"weight (hg)"} content={pokemon.weight} />
                {/* <DataItems title={"moves"} content={pokemonMoves} /> */}
                <DataItems title={"abilities"} content={pokemonAbilities} />
            </DataList>
        </div>
    )
}
