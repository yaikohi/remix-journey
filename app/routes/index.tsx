import { Link } from "@remix-run/react";
export default function Index() {
  return (
    <div>
      <h1>Welcome to Remix</h1>

      <nav>
        <ul>
          <li>
            <Link to="/berries">Berries </Link>
          </li>
          <li>
            <Link to="/user">User </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
