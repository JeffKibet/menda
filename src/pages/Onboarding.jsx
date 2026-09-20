import { useState } from "react";
import { useNavigate } from "react-router-dom";

const steps = ["welcome", "confidentiality", "consent"];

function Onboarding() {
  const [stepIndex, setStepIndex] = useState(0);
  const [consented, setConsented] = useState(false);
  const navigate = useNavigate();

  const step = steps[stepIndex];
  const isLastStep = stepIndex === steps.length - 1;

  function handleNext() {
    if (isLastStep) {
      navigate("/assessment");
    } else {
      setStepIndex(stepIndex + 1);
    }
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      {step === "welcome" && (
        <div>
          <h2 className="font-serif-display text-2xl text-forest">
            Welcome to Menda
          </h2>
          <p className="mt-2">
            Menda is a self-guided CBT tool to support your mental wellness. It
            isn't a substitute for professional care, and it isn't a crisis
            service.
          </p>
        </div>
      )}

      {step === "confidentiality" && (
        <div>
          <h2 className="font-serif-display text-2xl text-forest">
            Your privacy
          </h2>
          <p className="mt-2">
            Your responses are private to you. Menda does not monitor, review,
            or act on what you enter. If your answers suggest you may be at
            risk, we'll show you crisis resources — but no one is automatically
            notified.
          </p>
        </div>
      )}

      {step === "consent" && (
        <div>
          <h2 className="font-serif-display text-2xl text-forest">
            Before you continue
          </h2>
          <label className="flex items-start gap-2 mt-4">
            <input
              type="checkbox"
              checked={consented}
              onChange={(e) => setConsented(e.target.checked)}
              className="mt-1"
            />
            <span>I understand and agree to the above.</span>
          </label>
        </div>
      )}

      <button
        type="button"
        onClick={handleNext}
        disabled={step === "consent" && !consented}
        className="bg-terracotta text-parchment px-4 py-2 rounded disabled:opacity-40"
      >
        {isLastStep ? "Start Assessment" : "Continue"}
      </button>
    </div>
  );
}

export default Onboarding;
