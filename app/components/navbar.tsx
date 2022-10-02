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
      <nav>
        <ul>
          {routes.map((route, idx) => (
            <li key={idx}>
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
