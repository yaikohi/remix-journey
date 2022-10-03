import { NavLink } from "@remix-run/react";
import type { Route } from "../../types/routes";

/**
 * TODO:
 *  - ? Add dropdowns for the navbar for the nested layouts
 *
 * The main routes that aren't nested layouts.
 */
export const routes: Route[] = [
  {
    to: "/",
    text: "Home",
  },
  {
    to: "/berries",
    text: "Berries",
  },
  {
    to: "/pokemon",
    text: "Pokemon",
  },
  {
    to: "/user",
    text: "User",
  },
];

interface NavbarProps {
  routes: Route[];
}

export const Navbar = ({ routes }: NavbarProps) => {
  return (
    <>
      <nav className="flex flex-row py-2 my-2 bg-blue-100">
        <ul className="flex flex-row items-center w-full gap-2">
          {routes.map((route, idx) => (
            <li
              className=" first:mx-4 first:px-2 first:py-1 first:bg-blue-50 first:rounded-xl last:ml-auto"
              key={idx}
            >
              <NavbarLink to={route.to} text={route.text} />
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

interface NavbarLinkProps {
  to: string;
  text: string;
}

export const NavbarLink = ({ to, text }: NavbarLinkProps) => {
  return (
    <>
      <NavLink to={to}>{text}</NavLink>
    </>
  );
};
