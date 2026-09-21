import { useLocation, Link } from "react-router-dom";

function Dashboard() {
  const location = useLocation();
  const { score, severity } = location.state || {};

  if (score === undefined) {
    return (
      <div className="max-w-xl mx-auto">
        <p>No assessment results yet.</p>
        <Link to="/assessment" className="text-terracotta underline">
          Take the assessment
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <h2 className="font-serif-display text-2xl text-forest">Your results</h2>
      <p className="text-lg">
        PHQ-9 score: <span className="font-semibold">{score}</span> / 27
      </p>
      <p className="text-lg">
        Severity: <span className="font-semibold">{severity}</span>
      </p>
      <p>
        This is a screening tool, not a diagnosis. Consider discussing these
        results with a mental health professional.
      </p>
    </div>
  );
}

export default Dashboard;
