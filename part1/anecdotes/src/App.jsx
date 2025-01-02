import { useState } from "react";

const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));
  const [selected, setSelected] = useState(0);

  const nextAnecdote = () => {
    setSelected(getRandomInt(anecdotes.length - 1));
  };

  function getRandomInt(max) {
    let random;
    do {
      random = Math.floor(Math.random() * max);
    } while (random === selected);
    return random;
  }

  const vote = () => {
    setPoints((prevPoints) => {
      const newPoints = [...prevPoints];
      newPoints[selected] += 1;
      return newPoints;
    });
  };

  const getMostVotedIndex = () =>
    points.indexOf(Math.max(...points));

  return (
    <div>
      <Header text="Anecdote of the day" />
      <div>{anecdotes[selected]}</div>
      <Button handleClick={vote} text="vote" />
      <Button handleClick={nextAnecdote} text="next anecdote" />
      <Header text="Anecdote with most votes" />
      <div>{anecdotes[getMostVotedIndex()]}</div>
      <div>has {Math.max(...points)} votes</div>
    </div>
  );
};

export default App;
