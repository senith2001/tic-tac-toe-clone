import { useState } from "react";
import "./App.css";

function Sqaure({ value, handleClick }) {
  return (
    <button onClick={handleClick} className="sqaure">
      {value}
    </button>
  );
}
function claculateWinner(array) {
  const winningStates = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < 8; i++) {
    const [a, b, c] = winningStates[i];
    if (array[a] && array[a] === array[b] && array[a] === array[c]) return true;
  }
  return false;
}

function addHistory(previousHistory, currentValueArray, count) {
  previousHistory.push([count, currentValueArray]);
  return previousHistory;
}

function Board() {
  const [valueArray, setValueArray] = useState(new Array(9).fill(null));
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([[count, valueArray]]);
  const [xIsNext, setXIsNext] = useState(true);

  function handleClick(i) {
    let newArray = valueArray.slice();

    if (!claculateWinner(newArray)) {
      if (!newArray[i]) {
        if (xIsNext) {
          newArray[i] = "X";
          setXIsNext(false);
        } else {
          newArray[i] = "O";
          setXIsNext(true);
        }

        setValueArray(newArray);
        if (history.lenght - 1 === count) {
          let y = count + 1;
          setCount(y);
          setHistory(addHistory(history, newArray, y));
        } else {
          history.splice(count + 1, history.length - 1 - count);

          let y = count + 1;
          setCount(y);
          setHistory(addHistory(history, newArray, y));
        }
      }
    }
  }
  const gameState = claculateWinner(valueArray)
    ? `winner is ${xIsNext ? "O" : "X"}`
    : `next player :${xIsNext ? "X" : "O"}`;
  const historyButtons = history.map(([i, his]) =>
    i === 0 ? (
      <button
        onClick={() => {
          setValueArray(history[0][1]);
          setCount(i);
        }}
        key={i}
      >
        {"Go to game start"}
      </button>
    ) : (
      <button
        onClick={() => {
          setValueArray(history[i][1]);
          setCount(i);
        }}
        key={i}
      >{`Go to move#${i}`}</button>
    )
  );

  return (
    <div className="app">
      <div>
        <h3>{gameState}</h3>
      </div>
      <div style={{ display: "flex" }}>
        <div>
          <div className="row">
            <Sqaure handleClick={() => handleClick(0)} value={valueArray[0]} />
            <Sqaure handleClick={() => handleClick(1)} value={valueArray[1]} />
            <Sqaure handleClick={() => handleClick(2)} value={valueArray[2]} />
          </div>
          <div className="row">
            <Sqaure handleClick={() => handleClick(3)} value={valueArray[3]} />
            <Sqaure handleClick={() => handleClick(4)} value={valueArray[4]} />
            <Sqaure handleClick={() => handleClick(5)} value={valueArray[5]} />
          </div>
          <div className="row">
            <Sqaure handleClick={() => handleClick(6)} value={valueArray[6]} />
            <Sqaure handleClick={() => handleClick(7)} value={valueArray[7]} />
            <Sqaure handleClick={() => handleClick(8)} value={valueArray[8]} />
          </div>
        </div>
        <div className="history">{historyButtons}</div>
      </div>
    </div>
  );
}
function App() {
  return <Board />;
}

export default App;
