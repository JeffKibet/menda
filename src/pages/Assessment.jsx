import { useState } from "react";
import { useNavigate } from "react-router-dom";

const questions = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble falling/staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself — or that you're a failure",
  "Trouble concentrating",
  "Moving/speaking slowly, or being fidgety/restless",
  "Thoughts of being better off dead or of self-harm",
];

const options = [
  { label: "Not at all", value: 0 },
  { label: "Several days", value: 1 },
  { label: "More than half the days", value: 2 },
  { label: "Nearly every day", value: 3 },
];

function scoreToSeverity(score) {
  if (score <= 4) return "Minimal";
  if (score <= 9) return "Mild";
  if (score <= 14) return "Moderate";
  if (score <= 19) return "Moderately severe";
  return "Severe";
}

function Assessment() {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCrisisScreen, setShowCrisisScreen] = useState(false);
  const navigate = useNavigate();

  const isItem9 = currentIndex === 8;
  const isLastQuestion = currentIndex === questions.length - 1;

  function handleAnswer(value) {
    const updated = [...answers];
    updated[currentIndex] = value;
    setAnswers(updated);

    if (isItem9 && value > 0) {
      setShowCrisisScreen(true);
      return;
    }

    advance();
  }

  function advance() {
    if (isLastQuestion) {
      const total = answers.reduce((sum, v) => sum + (v ?? 0), 0);
      navigate("/dashboard", {
        state: { score: total, severity: scoreToSeverity(total) },
      });
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  }

  if (showCrisisScreen) {
    return (
      <div className="max-w-xl mx-auto space-y-4">
        <h2 className="font-serif-display text-2xl text-forest">
          You're not alone
        </h2>
        <p>
          Thank you for being honest. If you're having thoughts of harming
          yourself, please reach out for support right now.
        </p>
        <p className="font-semibold">
          Kenya Red Cross / Befrienders Kenya: +254 722 178 177
        </p>
        <p>
          This isn't monitored by Menda in real time — please contact the number
          above or someone you trust directly.
        </p>
        <button
          type="button"
          onClick={() => {
            setShowCrisisScreen(false);
            advance();
          }}
          className="bg-terracotta text-parchment px-4 py-2 rounded"
        >
          Continue assessment
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <p className="text-sm text-forest">
        Question {currentIndex + 1} of {questions.length}
      </p>
      <h2 className="font-serif-display text-xl">{questions[currentIndex]}</h2>
      <div className="space-y-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => handleAnswer(opt.value)}
            className="block w-full text-left border border-forest rounded px-4 py-2 hover:bg-forest hover:text-parchment"
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Assessment;
