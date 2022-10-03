import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { BerryInfo } from "~/components/berry-info";

export const loader: LoaderFunction = async ({ request, context, params }) => {
  const URL = "https://pokeapi.co/api/v2/berry/";

  // TODO: Research removal of ts-ignore for params.berryId
  // @ts-ignore
  const ID = parseInt(params.berryId) + 1;

  const res = await fetch(`${URL}${ID}`);
  const berry = await res.json();

  return json(berry);
};

export default function Berry() {
  const berry = useLoaderData();
  return (
    <div className="">
      <BerryInfo berry={berry} />
      {/* TODO: Add pagination to the next berry */}
      <Link to="">Next</Link>
    </div>
  );
}
