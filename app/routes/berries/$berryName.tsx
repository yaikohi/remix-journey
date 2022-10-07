import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData, useMatches } from "@remix-run/react";
import type { Berry as BerryType } from "~/../types/berry";
import { BerryInfo } from "~/components/berry-info";
import { getBerryByName } from "~/models/berry.server";

type LoaderData = Awaited<ReturnType<typeof getBerryByName>>;

export const loader: LoaderFunction = async ({ request, context, params }) => {
  return json<LoaderData>(await getBerryByName(params.berryName));
};

export default function Berry() {
  const { berry } = useLoaderData();
  const relatedRoutes = useMatches();

  const berries = relatedRoutes[1].data?.berries;
  const currentBerryIndex = relatedRoutes[1].data?.berries.findIndex(
    (bry: BerryType) => bry.name === berry.name
  );
  const nextBerryIndex =
    currentBerryIndex === berries.length - 1 ? 0 : currentBerryIndex + 1;
  const prevBerryIndex =
    currentBerryIndex === 0 ? berries.length - 1 : currentBerryIndex - 1;

  const nextBerryName = berries[nextBerryIndex]?.name;
  const prevBerryName = berries[prevBerryIndex]?.name;

  const nextBerryRoute = `${relatedRoutes[1].pathname}/${nextBerryName}`;
  const prevBerryRoute = `${relatedRoutes[1].pathname}/${prevBerryName}`;

  return (
    <div className="">
      <BerryInfo berry={berry} />
      <div className="flex justify-between">
        <Link
          className="p-2 text-black bg-ctp-blue rounded-xl"
          to={prevBerryRoute}
        >
          Back ({prevBerryName})
        </Link>
        <Link
          className="p-2 text-black bg-ctp-blue rounded-xl"
          to={nextBerryRoute}
        >
          Next ({nextBerryName})
        </Link>
      </div>
    </div>
  );
}
