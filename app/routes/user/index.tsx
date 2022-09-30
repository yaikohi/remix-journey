import { useOutletContext } from "@remix-run/react";

export default function UserOverview() {
  const user = useOutletContext() as any;

  return (
    <div>
      <h2>it's u</h2>
      <p>email: {user.email}!</p>
      <p>whats up</p>
    </div>
  );
}
