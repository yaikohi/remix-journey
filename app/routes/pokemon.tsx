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
    <div>
      <div className="p-3 bg-slate-100">
        <h1 className="text-7xl">Pokemon</h1>
      </div>
      <div className="mx-auto items-center flex flex-col max-w-4xl p-24">
        <Outlet context={allPokemon} />
        <Navbar routes={routes} />
      </div>
    </div>
  );
}
