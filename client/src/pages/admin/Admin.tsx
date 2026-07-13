import { useState } from "react";
import { getToken } from "../../lib/api";
import Login from "./Login";
import Dashboard from "./Dashboard";

export default function Admin() {
  const [authed, setAuthed] = useState(() => Boolean(getToken()));

  return authed ? (
    <Dashboard onLogout={() => setAuthed(false)} />
  ) : (
    <Login onSuccess={() => setAuthed(true)} />
  );
}
