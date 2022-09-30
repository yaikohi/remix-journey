import { Link, Outlet } from "@remix-run/react";
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

  return (
    <div>
      <h1>Hello {user.userName}</h1>
      <Outlet context={user} />

      <div className="sec nav">
        <nav>
          <ul>
            <li>
              <Link to="/user"> overview</Link>
            </li>
            <li>
              <Link to="/user/config">config</Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="main nav">
        <nav>
          <ul>
            <li>
              <Link to="/berries">Berries </Link>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
