import { Outlet } from "@remix-run/react";
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
    <>
      <div className="p-3 bg-ctp-crust">
        <h1 className="text-7xl">User</h1>
      </div>
      <Navbar routes={routes} />
      <h1>Hello {user.userName}</h1>
      <div className="flex flex-col items-center max-w-4xl p-24 mx-auto">
        <Outlet context={user} />
        <Navbar routes={userRoutes} />
      </div>
    </>
  );
}
