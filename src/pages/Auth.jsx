import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Auth() {
  const { user, loading, signIn, signUp } = useAuth();

  const [mode, setMode] = useState("signup"); // "signup" | "login"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const isSignup = mode === "signup";

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setNotice("");
    setSubmitting(true);

    const { data, error } = isSignup
      ? await signUp(email, password)
      : await signIn(email, password);

    setSubmitting(false);

    if (error) {
      setError(error.message);
      return;
    }
    if (isSignup && !data.session) {
      setNotice("Check your email to confirm your account, then log in.");
    }
  }

  function switchMode() {
    setMode(isSignup ? "login" : "signup");
    setError("");
    setNotice("");
  }

  if (loading) return <p className="max-w-md mx-auto">Loading…</p>;

  if (user) {
    return <Navigate to={isSignup ? "/assessment" : "/dashboard"} replace />;
  }

  return (
    <div className="max-w-md mx-auto space-y-4">
      <h2 className="font-serif-display text-2xl text-forest">
        {isSignup ? "Create your account" : "Welcome back"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-sm">Email</span>
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded border border-forest/30 px-3 py-2"
          />
        </label>

        <label className="block">
          <span className="text-sm">Password</span>
          <input
            type="password"
            required
            minLength={8}
            autoComplete={isSignup ? "new-password" : "current-password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded border border-forest/30 px-3 py-2"
          />
        </label>

        {isSignup && (
          <label className="flex items-start gap-2 text-sm">
            <input type="checkbox" required className="mt-1" />
            <span>
              I agree to Menda storing my assessment answers so I can track my
              wellbeing over time.
            </span>
          </label>
        )}

        {error && (
          <p role="alert" className="text-sm text-red-700">
            {error}
          </p>
        )}
        {notice && (
          <p role="status" className="text-sm text-forest">
            {notice}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded bg-forest px-4 py-2 text-white disabled:opacity-60"
        >
          {submitting ? "Please wait…" : isSignup ? "Create account" : "Log in"}
        </button>
      </form>

      <button
        type="button"
        onClick={switchMode}
        className="text-sm text-terracotta underline"
      >
        {isSignup ? "Already have an account? Log in" : "New here? Create an account"}
      </button>
    </div>
  );
}

export default Auth;