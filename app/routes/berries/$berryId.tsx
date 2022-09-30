import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = async ({ request, context, params }) => {
  const URL = "https://pokeapi.co/api/v2/berry/";

  // TODO: Research removal of ts-ignore for params.berryId
  // @ts-ignore
  const ID = parseInt(params.berryId) + 1;

  const res = await fetch(`${URL}${ID}`);
  const berry = await res.json();

  // console.log("res: ", berry);
  return json(berry);
};

export default function Berry() {
  const berry = useLoaderData();
  console.log(berry);
  return (
    <div>
      <h1>name: {berry.name}</h1>
      <section>
        <h2>flavors</h2>
        {/* TODO: make util function that returns a single string for proper styling later. */}
        {berry.flavors.map((flavor: any, index: number) => (
          <p className="bg-red-800" key={berry.id + index}>
            {flavor.flavor.name}
          </p>
        ))}
      </section>
      <section>
        <h2>firmness</h2>
        <p>{berry.firmness.name}</p>
      </section>
    </div>
  );
}
