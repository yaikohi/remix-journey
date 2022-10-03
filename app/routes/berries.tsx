import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { Navbar, routes } from "~/components/navbar";
import { getAllBerries } from "~/models/berry.server";

type LoaderData = Awaited<ReturnType<typeof getAllBerries>>;

export const loader = async () => {
  return json<LoaderData>(await getAllBerries());
};

export default function Berries() {
  const { berries } = useLoaderData() as LoaderData;
  
  return (
    <div>
      <div className="p-3 bg-slate-100">
        <h1 className="text-7xl">Berries</h1>
      </div>
      <Navbar routes={routes} />
      <div className="flex flex-col items-center max-w-4xl p-24 mx-auto">
        <Outlet context={berries} />
      </div>
    </div>
  );
}
