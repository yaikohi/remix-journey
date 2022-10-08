import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { PokemonInfo } from "~/components/pokemon-info/pokemon-info";

export const loader: LoaderFunction = async ({ request, context, params }) => {
  const URL = "https://pokeapi.co/api/v2/pokemon/";

  /**
   * Should be randomized per day in the future.
   *
   * TODO: https://auroratide.com/posts/server-side-rendering-a-random-number
   */
  const ID = 2;

  const res = await fetch(`${URL}${ID}`);
  const pokemonOfTheDay = await res.json();

  return json(pokemonOfTheDay);
};

export default function PokemonOverview() {
  const pokemonOfTheDay = useLoaderData();
  return (
    <>
      <div>
        <h2 className="text-xl">Todays Pokemon: {pokemonOfTheDay.name} </h2>
        <PokemonInfo pokemon={pokemonOfTheDay} />
        <p className="italic">
          {/* Did you know? There are 64 berries in the pokemon universe. */}
        </p>
      </div>
    </>
  );
}
