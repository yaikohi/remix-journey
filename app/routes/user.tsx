import { Link, Outlet } from "@remix-run/react";
import { Navbar, routes } from "~/components/navbar";

export default function User() {
  /**
   * TODO:
   * - Get the userdata object from the user that's currently in an active session
   * - Pass this userdata to the outlet so this data can be accessed from the subpages (= `/routes/user/*.tsx`)
   */
  // const user = 'fetch from db / session / whatever?'
  const user = {
    id: 0,
    email: "someemail@email.com",
    name: "henk",
    userName: "destroyer of berries",
  };

  const userRoutes = [
    {
      to: "/user",
      text: "User",
    },
    {
      to: "/user/config",
      text: "Config",
    },
  ];
  return (
    <div>
      <h1>Hello {user.userName}</h1>

      <div className="p-3 bg-slate-100">
        <h1 className="text-7xl">Berries</h1>
      </div>
      <div className="mx-auto items-center flex flex-col max-w-4xl p-24">
        <Outlet context={user} />
        <Navbar routes={userRoutes} />
        <Navbar routes={routes} />
      </div>
    </div>
  );
}
