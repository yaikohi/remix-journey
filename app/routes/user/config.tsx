import { useOutletContext } from "@remix-run/react";

export default function UserConfig() {
    const user = useOutletContext() as any

    return (
      <div>
        <h2>change something?</h2>
        <p>email: {user.email}</p>
        <p>username: {user.userName}</p>
      </div>
    );
  }
  