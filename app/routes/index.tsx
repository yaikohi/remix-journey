import { Navbar, routes } from "~/components/navbar";
export default function Index() {
  return (
    <>
      <div className="p-3 bg-ctp-crust">
        <h1 className="text-7xl">Home</h1>
      </div>
      <Navbar routes={routes} />
    </>
  );
}
