import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Circle } from 'lucide-react';

const TicTacToe = () => {
  const [gameMode, setGameMode] = useState(null); // 'bot' or 'multiplayer'
  const [gameState, setGameState] = useState({
    player1Name: '',
    player2Name: '',
    rounds: 3,
    currentRound: 1,
    scores: { player1: 0, player2: 0 },
    setupComplete: false
  });
  
  const [board, setBoard] = useState(Array(3).fill(Array(3).fill('')));
  const [currentPlayer, setCurrentPlayer] = useState('O');
  const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'won', 'tie'

  const resetBoard = () => {
    setBoard(Array(3).fill(Array(3).fill('')));
    setCurrentPlayer('O');
    setGameStatus('playing');
  };

  const checkWinner = (boardState) => {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (boardState[i][0] && 
          boardState[i][0] === boardState[i][1] && 
          boardState[i][1] === boardState[i][2] ) {
        return boardState[i][0];
      }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
      if (boardState[0][i] && 
          boardState[0][i] === boardState[1][i] && 
          boardState[1][i] === boardState[2][i]) {
        return boardState[0][i];
      }
    }

    // Check diagonals
    if (boardState[0][0] && 
        boardState[0][0] === boardState[1][1] && 
        boardState[1][1] === boardState[2][2]) {
      return boardState[0][0];
    }
    
    if (boardState[0][2] && 
        boardState[0][2] === boardState[1][1] && 
        boardState[1][1] === boardState[2][0]) {
      return boardState[0][2];
    }

    // Check for tie
    if (boardState.flat().every(cell => cell !== '')) {
      return 'tie';
    }

    return null;
  };

  const minimax = (board, depth, isMaximizing) => {
    const result = checkWinner(board);
    if (result === 'X') return 10 - depth;
    if (result === 'O') return depth - 10;
    if (result === 'tie') return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (!board[i][j]) {
            const newBoard = board.map(row => [...row]);
            newBoard[i][j] = 'X';
            const score = minimax(newBoard, depth + 1, false);
            bestScore = Math.max(score, bestScore);
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (!board[i][j]) {
            const newBoard = board.map(row => [...row]);
            newBoard[i][j] = 'O';
            const score = minimax(newBoard, depth + 1, true);
            bestScore = Math.min(score, bestScore);
          }
        }
      }
      return bestScore;
    }
  };

  const getBotMove = useCallback((currentBoard) => {
    let bestScore = -Infinity;
    let move = { i: 0, j: 0 };

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (!currentBoard[i][j]) {
          const newBoard = currentBoard.map(row => [...row]);
          newBoard[i][j] = 'X';
          const score = minimax(newBoard, 0, false);
          if (score > bestScore) {
            bestScore = score;
            move = { i, j };
          }
        }
      }
    }
    return move;
  }, []);

  const handleCellClick = (row, col) => {
    if (gameStatus !== 'playing' || board[row][col]) return;

    const newBoard = board.map(r => [...r]);
    newBoard[row][col] = currentPlayer;
    setBoard(newBoard);

    const winner = checkWinner(newBoard);
    console.log(winner)
    if (winner) {
      handleGameEnd(winner);
    } else {
      if (gameMode === 'bot' && currentPlayer === 'O') {
        const botMove = getBotMove(newBoard);
        setTimeout(() => {
          const botBoard = newBoard.map(r => [...r]);
          botBoard[botMove.i][botMove.j] = 'X';
          setBoard(botBoard);
          
          const botWinner = checkWinner(botBoard);
          if (botWinner) {
            handleGameEnd(botWinner);
          }
        }, 500);
      } else {
        setCurrentPlayer(currentPlayer === 'O' ? 'X' : 'O');
      }
    }
  };

  const handleGameEnd = (result) => {
    if (result === 'tie') {
        setGameStatus('tie');
    } else {
        setGameStatus('won');
        const winner = result === 'O' ? 'player1' : 'player2';
        setGameState(prev => ({
            ...prev,
            scores: {
                ...prev.scores,
                [winner]: prev.scores[winner] + 1
            }
        }));
    }

    if (gameState.currentRound < gameState.rounds) {
      setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          currentRound: prev.currentRound + 1
        }));
        resetBoard();
      }, 1500);
    }
  };

  const handleSetup = (e) => {
    e.preventDefault();
    setGameState(prev => ({
      ...prev,
      setupComplete: true
    }));
    resetBoard();
  };

  if (!gameMode) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-4">
          <Card className="w-full max-w-lg p-8 bg-white/95 backdrop-blur shadow-xl">
            <CardHeader className="pb-8">
              <CardTitle className="text-3xl font-bold text-center text-gray-800">Choose Game Mode</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <Button 
                onClick={() => setGameMode('bot')} 
                className="h-16 text-lg bg-indigo-600 hover:bg-indigo-700 transition-colors"
              >
                Play vs Bot
              </Button>
              <Button 
                onClick={() => setGameMode('multiplayer')} 
                className="h-16 text-lg bg-purple-600 hover:bg-purple-700 transition-colors"
              >
                Play vs Friend
              </Button>
            </CardContent>
          </Card>
        </div>
      );
  }

  if (!gameState.setupComplete) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-4">
        <Card className="w-full max-w-lg p-8 bg-white/95 backdrop-blur shadow-xl">
          <CardHeader className="pb-8">
            <CardTitle className="text-3xl font-bold text-center text-gray-800">Game Setup</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSetup} className="flex flex-col gap-6">
              <Input
                placeholder="Player 1 Name"
                value={gameState.player1Name}
                onChange={e => setGameState(prev => ({...prev, player1Name: e.target.value}))}
                required
                className="h-16 text-lg px-6"
              />
              {gameMode === 'multiplayer' && (
                <Input
                  placeholder="Player 2 Name"
                  value={gameState.player2Name}
                  onChange={e => setGameState(prev => ({...prev, player2Name: e.target.value}))}
                  required
                  className="h-16 text-lg px-6"
                />
              )}
              <Input
                type="number"
                min="1"
                max="10"
                placeholder="Number of Rounds"
                value={gameState.rounds}
                onChange={e => setGameState(prev => ({...prev, rounds: parseInt(e.target.value)}))}
                required
                className="h-16 text-lg px-6"
              />
              <Button 
                type="submit"
                className="h-16 text-lg bg-indigo-600 hover:bg-indigo-700 transition-colors mt-4"
              >
                Start Game
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-4">
    <Card className="w-full max-w-lg p-8 bg-white/95 backdrop-blur shadow-xl">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center text-gray-800">
          Round {gameState.currentRound} of {gameState.rounds}
        </CardTitle>
        <div className="flex justify-between text-lg font-semibold mt-4 px-4">
          <div className="text-indigo-600">{gameState.player1Name}: {gameState.scores.player1}</div>
          <div className="text-purple-600">{gameMode === 'bot' ? 'Bot' : gameState.player2Name}: {gameState.scores.player2}</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-6">
          {board.map((row, i) => (
            row.map((cell, j) => (
              <Button
                key={`${i}-${j}`}
                variant="outline"
                className={`h-24 w-24 flex items-center justify-center text-3xl font-bold transition-all duration-300 hover:bg-indigo-50 
                  ${cell ? 'animate-pop-in' : ''}`}
                onClick={() => handleCellClick(i, j)}
                disabled={!!cell || (gameMode === 'bot' && currentPlayer === 'X')}
              >
                {cell === 'O' && <Circle className="w-12 h-12 text-indigo-600 animate-draw" />}
                {cell === 'X' && <X className="w-12 h-12 text-purple-600 animate-draw" />}
              </Button>
            ))
          ))}
        </div>
        <div className="text-center">
          {gameStatus === 'playing' && (
            <p className="text-lg font-medium text-gray-700">
              Current Player: {currentPlayer === 'O' ? gameState.player1Name : (gameMode === 'bot' ? 'Bot' : gameState.player2Name)}
            </p>
          )}
          {gameStatus !== 'playing' && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center animate-fade-in z-50">
              <div className="bg-white p-8 rounded-lg shadow-xl animate-scale-in">
                <h2 className="text-3xl font-bold mb-4 text-gray-800">
                  {console.log(gameStatus)}
                  {gameStatus === 'won' ? 'Winner!' : 'Tie Game!'}
                </h2>
                {gameState.currentRound < gameState.rounds ? (
                  <p className="text-xl text-gray-600 mb-6">Next round starting soon...</p>
                ) : (
                  <div className="space-y-4">
                    <p className="text-xl text-gray-600">Game Over!</p>
                    <Button 
                      onClick={() => {
                        setGameMode(null);
                        setGameState({
                          player1Name: '',
                          player2Name: '',
                          rounds: 3,
                          currentRound: 1,
                          scores: { player1: 0, player2: 0 },
                          setupComplete: false
                        });
                      }}
                      className="bg-indigo-600 hover:bg-indigo-700 text-lg py-2 px-6"
                    >
                      New Game
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  </div>
  );
};

export default TicTacToe;