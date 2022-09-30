import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";

export const loader = async () => {
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
      <h1>Berries</h1>
      <Outlet context={allBerries}/>
      <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/user">User</Link>
        </li>
        <li>
          <Link to="/berries">Berries</Link>
        </li>
      </ul>
      </nav>
    </div>
  );
}
