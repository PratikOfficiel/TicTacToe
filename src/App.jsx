import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log";
import GameOver from "./components/GameOver"
import { useState } from "react";

const INTITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
}
function deriveActivePlayer(gameTurn) {

  let currentPlayer = 'X';

  if(gameTurn.length>0 && gameTurn[0].player === 'X'){
    currentPlayer = 'O';
  }

  return currentPlayer;
}

function deriveWinner(gameBoard,playerNames) {
  let winner="";

  for(let i=0; i<3;i++) {
    if(gameBoard[i][i] && ((gameBoard[i][0] === gameBoard[i][1] && gameBoard[i][1] === gameBoard[i][2]) || (gameBoard[0][i] === gameBoard[1][i] && gameBoard[1][i] === gameBoard[2][i]))) {
      winner = gameBoard[i][i];
    }
  }

  if(gameBoard[1][1] && ((gameBoard[0][0]===gameBoard[1][1] && gameBoard[1][1]===gameBoard[2][2]) || (gameBoard[0][2]===gameBoard[1][1] && gameBoard[1][1]===gameBoard[2][0]))){
    winner = gameBoard[1][1];
  }

  if(winner) winner = winner==='X'?playerNames['X']:playerNames['O'];
  
  return winner;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INTITIAL_GAME_BOARD.map((row) => [...row])];

  for(const turn of gameTurns) {
    const {square, player} = turn;

    gameBoard[square.row][square.col] = player;
  }

  return gameBoard;
}


function App() {
  
  const [gameTurns, setGameTurns] = useState([]);
  const [playerNames, setPlayerNames] = useState(PLAYERS)
  
  const gameBoard = deriveGameBoard(gameTurns);

  const winner = deriveWinner(gameBoard,playerNames);

  const hasDraw = gameTurns.length === 9 && !winner;

  const activePlayer = deriveActivePlayer(gameTurns);

  function handleSelectSquare(rowIdx, columnIdx) {

    setGameTurns((prevGameTurn) =>{
      let currentPlayer = deriveActivePlayer(prevGameTurn);

      const updatedGameTurn = [
        { square: { row: rowIdx, col: columnIdx}, player: currentPlayer},
        ...prevGameTurn]

      return updatedGameTurn;
    })
  }

  function handleRestart() {
    console.log("restart");
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, name) {
    setPlayerNames((prev) => (
      {
     ...prev,
        [symbol]: name
      }
    ))
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player gname={PLAYERS.X} symbol="X" isActive = {activePlayer ==='X'} onChangePlayer={handlePlayerNameChange}/>
          <Player gname={PLAYERS.O} symbol="O" isActive = {activePlayer ==='O'} onChangePlayer={handlePlayerNameChange}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard 
        onSelectSquare = {handleSelectSquare} 
        board = {gameBoard}
        />
      </div>

      <Log turns = {gameTurns}/>
    </main>
  )
}

export default App
