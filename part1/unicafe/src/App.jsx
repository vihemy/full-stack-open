import { useState } from "react";

const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}> {text}</button>
);

const StatisticLine = ({ text, value, suffix = "" }) => (
  <tr>
    <td>{text}</td>
    <td>
      {value} {suffix}
    </td>
  </tr>
);

const Statistics = ({ ratings, calculations }) => {
  return calculations.total ? (
    <table>
      <tbody>
        <StatisticLine text="good" value={ratings.good} />
        <StatisticLine text="neutral" value={ratings.neutral} />
        <StatisticLine text="bad" value={ratings.bad} />
        <StatisticLine text="all" value={calculations.total} />
        <StatisticLine text="average" value={calculations.average} />
        <StatisticLine text="positive" value={calculations.percent} suffix="%" />
      </tbody>
    </table>
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
