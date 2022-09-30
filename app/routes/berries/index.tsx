import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData, useOutletContext } from "@remix-run/react";

export const loader: LoaderFunction = async ({ request, context, params }) => {
  const URL = "https://pokeapi.co/api/v2/berry/";
  const ID = 2; // should be randomized per day in the future.

  const res = await fetch(`${URL}${ID}`);
  const berryOfTheDay = await res.json();

  return json(berryOfTheDay);
};

export default function BerriesOverview() {
  const berries = useOutletContext() as any;
  const berryOfTheDay = useLoaderData()

  console.log(berryOfTheDay)

  return (
    <>
      <div>
        <h2>Todays berry: {berryOfTheDay.name}</h2>
        <p className="italic">Did you know? There are 64 berries in the pokemon universe.</p>
        {/* TODO: Create a berry-info component. */}
        {/* <p>-- Some information about this particular berry --</p> */}
      </div>
      <div>
        <nav>
          <ul>
            {berries.map((berry: any, index: number) => (
              <li key={index}>
                <Link to={`/berries/${index}`}>{berry.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
