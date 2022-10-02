export const TypeTags = ({ types }: PokemonTypes) => {
  return (
    <>
      {types.map((type, idx) => {
        return (
          <span
            className="p-2 bg-blue-300 shadow-md text-white rounded-xl mx-1 first:mx-0"
            key={idx}
          >
            {type.type.name}
          </span>
        );
      })}
    </>
  );
};

type PokemonTypes = {
  types: Array<{
    slot: number;
    type: Type;
  }>;
};

interface Type {
  name: string;
  url: string;
}
type PokemonInfoProps = {
  pokemon: {
    base_experience: number;
    forms: any[];
    game_indices: any[];
    height: number;
    held_items: any[];
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: any[];
    name: string;
    order: number;
    past_types: any[];
    species: any;
    sprites: any;
    stats: any[];
    types: PokemonTypes["types"];
    weight: number;
  };
};

export const PokemonInfo = ({ pokemon }: PokemonInfoProps) => {
  return (
    <div className="bg-gradient-to-r from-indigo-300 via-red-200 to-yellow-100 text-white w-80 max-w-md pt-6 rounded-xl mb-8 mx-8 shadow-md hover:shadow-lg">
      <div className="my-4  min-w-full px-6 pb-12 pt-4 mx-auto flex flex-col">
        <h3 className="text-4xl py-2 capitalize font-extrabold ">
          {pokemon.name}
        </h3>
        <div className="pt-4 px-1">
          <TypeTags types={pokemon.types} />
        </div>
        <div className="self-center mt-8">
          <img
            src={pokemon.sprites.front_default}
            alt={`Sprite of ${pokemon.name}`}
          />
        </div>
      </div>

      <dl className="grid grid-cols-2 py-4 rounded-xl gap-2 capitalize px-6 bg-white min-h-full">
        <dt className="font-light text-slate-700">height</dt>
        <dd className="text-black">{pokemon.height}</dd>

        <dt className="font-light text-slate-700">weight</dt>
        <dd className="text-black">{pokemon.weight}</dd>
      </dl>
    </div>
  );
};
