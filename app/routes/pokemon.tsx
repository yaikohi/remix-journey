import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { Navbar, routes } from "~/components/navbar";

export const loader = async () => {
  /**
   * TODO: Fetch sprite img for berries.
   *
   * berry png https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/chesto-berry.png
   * berry.item.name => fetch chesto-berry.png
   */

  // https://pokeapi.co/api/v2/berry/{id or name}/
  const res = await fetch("https://pokeapi.co/api/v2/pokemon/");
  const data = await res.json();
  const allPokemon = data.results;
  return json({ allPokemon });
};

export default function Pokemon() {
  const { allPokemon } = useLoaderData();

  return (
    <>
      <div className="p-3 bg-ctp-crust">
        <h1 className="text-7xl">Pokemon</h1>
      </div>
      <Navbar routes={routes} />
      <div className="flex flex-col items-center max-w-4xl p-24 mx-auto">
        <Outlet context={allPokemon} />
      </div>
    </>
  );
}
