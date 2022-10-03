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
  const res = await fetch("https://pokeapi.co/api/v2/berry/");
  const data = await res.json();
  const allBerries = data.results;
  return json({ allBerries });
};

export default function Berries() {
  const { allBerries } = useLoaderData();

  return (
    <div>
      <div className="p-3 bg-slate-100">
        <h1 className="text-7xl">Berries</h1>
      </div>
      <Navbar routes={routes} />
      <div className="flex flex-col items-center max-w-4xl p-24 mx-auto">
        <Outlet context={allBerries} />
      </div>
    </div>
  );
}
