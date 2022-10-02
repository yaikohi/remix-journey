import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { BerryInfo } from "~/components/berry-info";

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
  // console.log(berry);
  return (
    <div>
      <h1>name: {berry.name}</h1>
      <BerryInfo berry={berry} />
    </div>
  );
}
