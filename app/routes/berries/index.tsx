import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData, useOutletContext } from "@remix-run/react";
import { BerryInfo } from "~/components/berry-info";

export const loader: LoaderFunction = async ({ request, context, params }) => {
  const URL = "https://pokeapi.co/api/v2/berry/";

  /**
   * Should be randomized per day in the future.
   *
   * TODO: https://auroratide.com/posts/server-side-rendering-a-random-number
   */
  const ID = 2;

  const res = await fetch(`${URL}${ID}`);
  const berryOfTheDay = await res.json();

  return json(berryOfTheDay);
};

export default function BerriesOverview() {
  const berries = useOutletContext() as any;
  const berryOfTheDay = useLoaderData();

  console.log(berryOfTheDay);

  return (
    <>
      <div>
        <h2 className="text-xl">Todays berry: </h2>
        <BerryInfo berry={berryOfTheDay} />
        <p className="italic">
          Did you know? There are 64 berries in the pokemon universe.
        </p>
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
