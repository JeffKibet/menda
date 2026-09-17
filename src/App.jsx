import { Routes, Route } from "react-router-dom";

function Home() {
  return (
    <h1 className="bg-forest font-serif-display text-parchment p-8">
      Menda — Home
    </h1>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
