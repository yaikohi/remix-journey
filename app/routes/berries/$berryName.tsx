import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { BerryInfo } from "~/components/berry-info";
import { getBerryByName } from "~/models/berry.server";

type LoaderData = Awaited<ReturnType<typeof getBerryByName>>;

export const loader: LoaderFunction = async ({ request, context, params }) => {
  return json<LoaderData>(await getBerryByName(params.berryName));
};

export default function Berry() {
  const { berry } = useLoaderData();
  
  return (
    <div className="">
      <BerryInfo berry={berry} />
      {/* TODO: Add pagination to the next berry */}
      <Link to="">Next</Link>
    </div>
  );
}
