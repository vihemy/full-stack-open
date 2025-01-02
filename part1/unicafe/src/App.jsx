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
  const [stats, setStats] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    total: 0,
    average: 0,
    percent: 0,
  });

  const handleClick = (type) => () => {
    setStats((prevStats) => {
      const newStats = { ...prevStats };

      switch (type) {
        case "good":
          newStats.good += 1;
          break;
        case "neutral":
          newStats.neutral += 1;
          break;
        case "bad":
          newStats.bad += 1;
          break;
        default:
          break;
      }

      newStats.total = newStats.good + newStats.neutral + newStats.bad;
      newStats.average = (newStats.good - newStats.bad) / newStats.total;
      newStats.percent = (newStats.good / newStats.total) * 100;

      return newStats;
    });
  };

  return (
    <div>
      <Header text="give feedback" />
      <Button handleClick={handleClick("good")} text="good" />
      <Button handleClick={handleClick("neutral")} text="neutral" />
      <Button handleClick={handleClick("bad")} text="bad" />

      <Header text="statistics" />
      <Display label="good" value={stats.good} />
      <Display label="neutral" value={stats.neutral} />
      <Display label="bad" value={stats.bad} />

      <Display label="all" value={stats.total} />
      <Display label="average" value={stats.average} />
      <Display label="positive" value={stats.percent} suffix="%" />
    </div>
  );
};

export default App;
