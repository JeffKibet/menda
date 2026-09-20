import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className="min-h-screen bg-parchment">
      <header className="bg-forest text-parchment p-4">
        <h1 className="font-serif-display text-xl">Menda</h1>
      </header>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
