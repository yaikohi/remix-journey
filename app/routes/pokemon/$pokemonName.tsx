import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData, useMatches } from "@remix-run/react";
import { getPokemonByName } from "~/models/pokemon.server";

type LoaderData = Awaited<ReturnType<typeof getPokemonByName>>;


export const loader: LoaderFunction = async ({ request, context, params }) => {
  return json<LoaderData>(await getPokemonByName(params.pokemonName));
};

export default function Pokemon() {
  const { pokemon } = useLoaderData();

  const spriteSrc: string = pokemon.sprites.front_default;
  const name: string = pokemon.name;
  const abilities: any[] = pokemon.abilities;
  const moves: any[] = pokemon.moves;
  const types = pokemon.types;
  const stats = pokemon.stats;


//   const relatedRoutes = useMatches();
  console.log(pokemon);

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

      <div className="col-span-3 bg-ctp-surface0">
        <h2 className="text-2xl">Evolution</h2>
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
  );
}
