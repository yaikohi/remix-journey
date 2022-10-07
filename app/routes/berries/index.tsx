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

type BerryTagProps = {
  children: any;
};
const BerryTag = ({ children }: BerryTagProps) => {
  return (
    <>
      <li className="p-1 mx-auto hover:bg-ctp-overlay1 bg-ctp-overlay0 rounded-xl">
        {children}
      </li>
    </>
  );
};

export default function BerriesOverview() {
  const berries = useOutletContext() as any;
  const berryOfTheDay = useLoaderData();

  return (
    <>
      <div>
        <h2 className="text-xl">Todays berry: </h2>
        <BerryInfo berry={berryOfTheDay} />
        <p className="italic">
          Did you know? There are 64 different berries? in pokemon?
        </p>
      </div>
      <div className="flex flex-col my-8">
        <nav>
          <ul className="grid grid-cols-4 gap-2">
            {berries.map((berry: any, index: number) => (
              <BerryTag key={index}>
                <Link to={`/berries/${berry.name}`}>{berry.name}</Link>
              </BerryTag>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
