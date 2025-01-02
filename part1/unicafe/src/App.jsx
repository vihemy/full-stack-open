import { useState } from "react";

const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}> {text}</button>
);

const Display = ({ label, value, suffix = "" }) => (
  <p>
    {label} {value} {suffix}
  </p>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [average, setAverage] = useState(0);
  const [percent, setPercent] = useState(0);

  const handleClick = (type) => () => {
    let newGood = good;
    let newNeutral = neutral;
    let newBad = bad;

    switch (type) {
      case "good":
        newGood += 1;
        break;
      case "neutral":
        newNeutral += 1;
        break;
      case "bad":
        newBad += 1;
        break;
      default:
        break;
    }

    const newTotal = newGood + newNeutral + newBad;
    const newAverage = (newGood - newBad) / newTotal;
    const newPercent = (newGood / newTotal) * 100;

    setGood(newGood);
    setNeutral(newNeutral);
    setBad(newBad);
    setTotal(newTotal);
    setAverage(newAverage);
    setPercent(newPercent);
  };

  return (
    <div>
      <Header text="give feedback" />
      <Button handleClick={handleClick("good")} text="good" />
      <Button handleClick={handleClick("neutral")} text="neutral" />
      <Button handleClick={handleClick("bad")} text="bad" />

      <Header text="statistics" />
      <Display label="good" value={good} />
      <Display label="neutral" value={neutral} />
      <Display label="bad" value={bad} />

      <Display label="all" value={total} />
      <Display label="average" value={average} />
      <Display label="positive" value={percent} suffix="%" />
    </div>
  );
};

export default App;
