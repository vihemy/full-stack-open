import { useState } from "react";

const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}> {text}</button>
);

const Display = ({ label, value }) => (
  <p>
    {label} {value}
  </p>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);

  const handleClick = (type) => () => {
    if (type === "good") {
      setGood(good + 1);
      setTotal(total + 1);
    } else if (type === "neutral") {
      setNeutral(neutral + 1);
      setTotal(total + 1);
    } else if (type === "bad") {
      setBad(bad + 1);
      setTotal(total + 1);
    }
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
    </div>
  );
};

export default App;
