import { Navbar, routes } from "~/components/navbar";
export default function Index() {
  return (
    <div>
      <h1>Welcome to Remix</h1>
    <Navbar routes={routes} />

    </div>
  );
}
