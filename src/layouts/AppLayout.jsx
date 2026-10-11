import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AppLayout() {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-parchment">
      <header className="bg-forest text-parchment p-4 flex items-center justify-between">
        <h1 className="font-serif-display text-xl">Menda</h1>
        {user && (
          <button onClick={signOut} className="text-sm underline">
            Log out
          </button>
        )}
      </header>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
