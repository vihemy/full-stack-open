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

const Statistics = ({ ratings, calculations }) => {
  return calculations.total ? (
    <div>
      <Display label="good" value={ratings.good} />
      <Display label="neutral" value={ratings.neutral} />
      <Display label="bad" value={ratings.bad} />
      <Display label="all" value={calculations.total} />
      <Display label="average" value={calculations.average} />
      <Display label="positive" value={calculations.percent} suffix="%" />
    </div>
  ) : (
    <div>No feedback given</div>
  );
};

const App = () => {
  const [ratings, setRatings] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleClick = (type) => () => {
    setRatings((prevRatings) => {
      const newRatings = { ...prevRatings };

      switch (type) {
        case "good":
          newRatings.good += 1;
          break;
        case "neutral":
          newRatings.neutral += 1;
          break;
        case "bad":
          newRatings.bad += 1;
          break;
        default:
          break;
      }
      return newRatings;
    });
  };

  const total = ratings.good + ratings.neutral + ratings.bad;
  const average = total ? (ratings.good - ratings.bad) / total : 0;
  const percent = total ? (ratings.good / total) * 100 : 0;

  const calculations = {
    total,
    average,
    percent,
  };

  return (
    <div>
      <Header text="give feedback" />
      <Button handleClick={handleClick("good")} text="good" />
      <Button handleClick={handleClick("neutral")} text="neutral" />
      <Button handleClick={handleClick("bad")} text="bad" />
      <Header text="statistics" />
      <Statistics ratings={ratings} calculations={calculations} />
    </div>
  );
};

export default App;
