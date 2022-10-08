import type { Pokemon } from "types/pokemon";
import { getTypeColorFromMap } from "~/utils/pokemonTypeColorMap";


type PokemonTypes = { types: Pokemon["types"] };

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
        );
      })}
    </>
  );
};

const DataList = ({ children }: { children: any }) => {
  return (
    <dl className="grid min-h-full grid-cols-2 gap-2 px-6 py-4 capitalize bg-ctp-mantle rounded-b-xl">
      {children}
    </dl>
  );
};

const DataItem = ({
  title,
  content,
}: {
  title: string;
  content: string | number;
}) => {
  return (
    <>
      <dt className="font-light text-ctp-subtext1">{title}</dt>
      <dd className="text-ctp-text">{`${content}`}</dd>
    </>
  );
};

export const PokemonInfo = ({ pokemon }: { pokemon: Pokemon }) => {
  return (
    <div className="max-w-md pt-6 mx-8 mb-8 shadow-md bg-gradient-to-r from-ctp-blue via-ctp-red to-ctp-yellow w-80 rounded-xl hover:shadow-lg">
      <div className="flex flex-col min-w-full px-6 pt-4 pb-12 mx-auto my-4 bg-opacity-40 rounded-xl bg-ctp-overlay0 ">
        <h3 className="py-2 text-4xl font-extrabold text-black capitalize max-w-min">
          {pokemon.name}
        </h3>
        <div className="px-1 pt-4">
          <TypeTags types={pokemon.types} />
        </div>
        <div className="self-center mt-8">
          <img
            src={pokemon?.sprites?.front_default}
            alt={`Sprite of ${pokemon.name}`}
          />
        </div>
      </div>
      <DataList>
        <DataItem title={"height"} content={pokemon.height} />
        <DataItem title={"weight"} content={pokemon.weight} />
      </DataList>
    </div>
  );
};
