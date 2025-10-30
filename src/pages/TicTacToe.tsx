import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import LogoBadge from "@/components/LogoBadge";

type Player = "X" | "O" | null;

const TicTacToe = () => {
  const navigate = useNavigate();
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  const checkWinner = (squares: Player[]): Player => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6], // diagonals
    ];

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index: number) => {
    if (board[index] || gameOver || !isPlayerTurn) return;

    const newBoard = [...board];
    newBoard[index] = "O";
    setBoard(newBoard);
    setIsPlayerTurn(false);

    const winner = checkWinner(newBoard);
    if (winner === "O") {
      setGameOver(true);
      toast({
        title: "Win this game...",
        description: "STOP the alarm..!",
      });
      setTimeout(() => navigate("/alarms"), 2000);
      return;
    }

    // AI move
    setTimeout(() => {
      const emptySquares = newBoard.map((val, idx) => val === null ? idx : null).filter(val => val !== null);
      if (emptySquares.length > 0) {
        const randomIndex = emptySquares[Math.floor(Math.random() * emptySquares.length)];
        const aiBoard = [...newBoard];
        aiBoard[randomIndex as number] = "X";
        setBoard(aiBoard);
        setIsPlayerTurn(true);

        const aiWinner = checkWinner(aiBoard);
        if (aiWinner === "X") {
          toast({
            title: "Try again!",
            description: "You need to win to stop the alarm",
          });
          setTimeout(() => {
            setBoard(Array(9).fill(null));
            setGameOver(false);
          }, 1500);
        }
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background pb-6">
      <div className="max-w-md mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <LogoBadge />
          <h1 className="text-2xl font-bold">Tic-Tac-Toe</h1>
        </div>

        {/* Game Board */}
        <div className="bg-card rounded-3xl p-6 space-y-6">
          <div className="grid grid-cols-3 gap-3">
            {board.map((cell, index) => (
              <button
                key={index}
                onClick={() => handleClick(index)}
                className="aspect-square bg-background rounded-2xl flex items-center justify-center text-4xl font-bold hover:bg-secondary/50 transition-colors"
                disabled={!!cell || gameOver || !isPlayerTurn}
              >
                {cell}
              </button>
            ))}
          </div>

          <div className="text-center space-y-2">
            <Button
              onClick={() => navigate("/alarms")}
              className="w-full h-14 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
            >
              Win this game...
            </Button>
            <p className="text-sm font-semibold">STOP the alarm..!</p>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex justify-around pt-4 border-t border-border">
          <button onClick={() => navigate(-1)} className="flex flex-col items-center gap-1 text-muted-foreground">
            <ArrowLeft size={24} />
            <span className="text-xs">Back</span>
          </button>
          <button onClick={() => navigate("/alarms")} className="flex flex-col items-center gap-1">
            <Home size={24} />
            <span className="text-xs">Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;
