import { useState } from "react";
import update from 'immutability-helper';

import Player from "./components/Player";
import GameBoard from "./components/Gameboard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";

import { WINNING_COMBINATIONS } from "./winning-combinations";

const PLAYERS = {
  'X' : 'Player 1',
  'O' : 'Player 2'
}

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function deriveGameBoard(gameTurns){
  let gameBoard = [...initialGameBoard.map(array => [...array])];
  
  for (const turn of gameTurns) {
      const { square, player } = turn;
      const { row, col } = square;
      gameBoard[row][col] = player
  }
  return gameBoard
}

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if(gameTurns.length > 0 && gameTurns[0].player === "X") {
      currentPlayer = "O";
  }
  return currentPlayer;
}

function deriveWinner(gameBoard, PLAYERS){
  let winner = null;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
      winner = PLAYERS[firstSquareSymbol];
    }
  }
  return winner
}


function App() {
  const [players, setPlayers] = useState (PLAYERS)

  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = deriveGameBoard(gameTurns)

  const winner = deriveWinner(gameBoard, players)

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns(prevTurns => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      
      const updatedTurns = [
        {square: {row: rowIndex, col: colIndex}, player: activePlayer}, 
        ...prevTurns
      ];
      return updatedTurns;
    });
  }

  const draw = !winner && gameTurns.length === 9 //set draw if no player won

  function resetGame(){
    setGameTurns([])
  }

  function handleNameChange (symbol, newName) {  // change player names
    if (symbol === 'X' ) { 
      const newPlayers = update(players, {X: {$set: newName}});  
      setPlayers(newPlayers)}
    else { 
      const newPlayers = update(players, {O: {$set: newName}}); 
      setPlayers(newPlayers)}
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player 
            initialName={PLAYERS.X} 
            symbol="X" 
            isActive={activePlayer === "X"} 
            onChangeName={handleNameChange}
          />
          <Player 
            initialName={PLAYERS.O}
            symbol="O" 
            isActive={activePlayer === "O"} 
            onChangeName={handleNameChange}
          />
        </ol>
        {(winner || draw) && <GameOver winner={winner} onRestart={resetGame}/>}
        <GameBoard 
          onSelectSquare={handleSelectSquare} 
          board= {gameBoard}
        />

      </div>
      <Log turns={gameTurns}/>
    </main>
  );
}

export default App
