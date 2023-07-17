import { useState } from 'react';
import './App-modified.css';

function History({ historyItems }) {
    return (
        <ul className="history">
            {historyItems}
        </ul>
    )
}

function Board({ values, handleClick }) {
    return (
        <div>
            <div className='row'>
                <Sqaure value={values[0]} handleClick={() => handleClick(0)} />
                <Sqaure value={values[1]} handleClick={() => handleClick(1)} />
                <Sqaure value={values[2]} handleClick={() => handleClick(2)} />
            </div>
            <div className='row'>
                <Sqaure value={values[3]} handleClick={() => handleClick(3)} />
                <Sqaure value={values[4]} handleClick={() => handleClick(4)} />
                <Sqaure value={values[5]} handleClick={() => handleClick(5)} />
            </div>
            <div className='row'>
                <Sqaure value={values[6]} handleClick={() => handleClick(6)} />
                <Sqaure value={values[7]} handleClick={() => handleClick(7)} />
                <Sqaure value={values[8]} handleClick={() => handleClick(8)} />
            </div>
        </div>
    )
}
function Sqaure({ value, handleClick }) {
    return <button className="sqaure" onClick={handleClick}>{value}</button>;
}
function Status({ nextP,history }) {
    let winner = history.length%2 == 0 ? 'X': 'O';
    return (
        <div>{calculateWinner(history[history.length - 1][1])?`winner is ${winner}`:(((nextP+1)%2===0)?'next player is O':'next player is X')}</div>
    )
}
function calculateWinner(array) {
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
function addHistory(history,currentMove,index,value){
    if(history.length-1 === currentMove){
        let arr = history[currentMove][1].slice();
        arr[index] = value;
        history.push([currentMove+1,arr]);
    }else{
        history.splice(currentMove + 1, history.length - 1 - currentMove);
        let arr = history[currentMove][1].slice();
        arr[index] = value;
        history.push([currentMove+1,arr]);
    }
    return history;
}
function Game() {
    const [history, setHistory] = useState([[0, new Array(9).fill(null)]]);
    const [currentMove, setCurrentMove] = useState(0);

    function handleClick(i) {

        if (!calculateWinner(history[currentMove][1])) {
            if (history[currentMove][1][i] === null) {
                if((currentMove+1)%2 === 0)
                {
                    setHistory(addHistory(history,currentMove,i,'O'));
                    setCurrentMove(currentMove+1);
                }
                else{
                    setHistory(addHistory(history,currentMove,i,'X'));
                    setCurrentMove(currentMove+1);
                }
            }
        }
    

    }
    function handleHistoryClick(historyIndex) {
        setCurrentMove(historyIndex);
    }
    return (
        <>
            <Status nextP={currentMove} history={history} />
            <div className="boardAndHistory">
                <Board values={history[currentMove][1]} handleClick={handleClick} />
                <History historyItems={
                    history.map(([historyIndex, valuesArray]) => {
                        if (historyIndex == 0) return <li key={historyIndex}><button onClick={() => handleHistoryClick(historyIndex)}>{'Go to Game start'}</button></li>
                        else return <li key={historyIndex}><button onClick={() => handleHistoryClick(historyIndex)}>{`Go to move#${historyIndex}`}</button></li>
                    }
                    )
                } />
            </div>
        </>
    )
}

export default Game;