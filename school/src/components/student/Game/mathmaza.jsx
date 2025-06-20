import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, RotateCcw, Star, Target } from "lucide-react";
import { toast } from "sonner";

export const MathMazeGame = ({ onBack }) => {
  const [maze, setMaze] = useState([]);
  const [currentPosition, setCurrentPosition] = useState({ row: 0, col: 0 });
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [level, setLevel] = useState(1);

  const MAZE_SIZE = 4;

  const generateMathProblem = (difficulty) => {
    let question;
    let answer;

    switch (difficulty) {
      case 1:
        const num1 = Math.floor(Math.random() * 20) + 1;
        const num2 = Math.floor(Math.random() * 20) + 1;
        const isAddition = Math.random() > 0.5;
        if (isAddition) {
          question = `${num1} + ${num2}`;
          answer = num1 + num2;
        } else {
          const larger = Math.max(num1, num2);
          const smaller = Math.min(num1, num2);
          question = `${larger} - ${smaller}`;
          answer = larger - smaller;
        }
        break;

      case 2:
        const mult1 = Math.floor(Math.random() * 12) + 1;
        const mult2 = Math.floor(Math.random() * 12) + 1;
        const isMult = Math.random() > 0.5;
        if (isMult) {
          question = `${mult1} × ${mult2}`;
          answer = mult1 * mult2;
        } else {
          const product = mult1 * mult2;
          question = `${product} ÷ ${mult1}`;
          answer = mult2;
        }
        break;

      default:
        const a = Math.floor(Math.random() * 15) + 1;
        const b = Math.floor(Math.random() * 10) + 1;
        const operations = ['+', '-', '×'];
        const op = operations[Math.floor(Math.random() * operations.length)];
        switch (op) {
          case '+':
            question = `${a} + ${b}`;
            answer = a + b;
            break;
          case '-':
            question = `${Math.max(a, b)} - ${Math.min(a, b)}`;
            answer = Math.max(a, b) - Math.min(a, b);
            break;
          case '×':
            question = `${a} × ${b}`;
            answer = a * b;
            break;
          default:
            question = `${a} + ${b}`;
            answer = a + b;
        }
    }

    const options = [answer];
    while (options.length < 4) {
      const wrongAnswer = answer + (Math.floor(Math.random() * 10) - 5);
      if (wrongAnswer > 0 && !options.includes(wrongAnswer)) {
        options.push(wrongAnswer);
      }
    }

    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }

    return { question, answer, options };
  };

  const initializeMaze = () => {
    const newMaze = [];
    let id = 0;

    for (let row = 0; row < MAZE_SIZE; row++) {
      for (let col = 0; col < MAZE_SIZE; col++) {
        const { question, answer, options } = generateMathProblem(level);
        newMaze.push({
          id: id++,
          question,
          answer,
          options,
          isActive: row === 0 && col === 0,
          isCompleted: false,
          isBlocked: !(row === 0 && col === 0),
          row,
          col,
        });
      }
    }

    setMaze(newMaze);
    setCurrentPosition({ row: 0, col: 0 });
    setGameStarted(false);
    setTimer(0);
  };

  useEffect(() => {
    initializeMaze();
  }, [level]);

  useEffect(() => {
    let interval;
    if (gameStarted) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted]);

  const handleAnswerClick = (selectedAnswer, cellId) => {
    if (!gameStarted) setGameStarted(true);

    const cell = maze.find((c) => c.id === cellId);
    if (!cell || !cell.isActive) return;

    if (selectedAnswer === cell.answer) {
      setScore((prev) => prev + 10);
      toast.success("Correct! 🎉");

      setMaze((prev) =>
        prev.map((c) =>
          c.id === cellId ? { ...c, isCompleted: true, isActive: false } : c
        )
      );

      const { row, col } = cell;
      const nextMoves = [
        { row: row - 1, col },
        { row: row + 1, col },
        { row, col: col - 1 },
        { row, col: col + 1 },
      ].filter(
        (pos) =>
          pos.row >= 0 && pos.row < MAZE_SIZE && pos.col >= 0 && pos.col < MAZE_SIZE
      );

      setMaze((prev) =>
        prev.map((c) => {
          const isNextMove = nextMoves.some(
            (move) => move.row === c.row && move.col === c.col
          );
          if (isNextMove && !c.isCompleted) {
            return { ...c, isBlocked: false, isActive: true };
          }
          return c;
        })
      );

      if (row === MAZE_SIZE - 1 && col === MAZE_SIZE - 1) {
        toast.success(`Level ${level} completed! 🏆`);
        setTimeout(() => {
          if (level < 3) {
            setLevel((prev) => prev + 1);
          } else {
            toast.success("Congratulations! You've completed all levels! 🎊");
          }
        }, 1500);
      }
    } else {
      toast.error("Try again! 🤔");
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-3xl">🔢 Math Maze</CardTitle>
            <Button onClick={onBack} variant="outline">Back to Hub</Button>
          </div>

          <div className="flex gap-4 items-center justify-center">
            <Badge variant="secondary" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {formatTime(timer)}
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              Score: {score}
            </Badge>
            <Badge variant="secondary">
              Level: {level}
            </Badge>
            <Button onClick={initializeMaze} variant="outline" size="sm">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
            {maze.map((cell) => (
              <div
                key={cell.id}
                className={`
                  p-4 rounded-lg border-2 transition-all duration-300
                  ${cell.isCompleted 
                    ? 'bg-green-100 border-green-300' 
                    : cell.isActive
                    ? 'bg-blue-50 border-blue-300 shadow-lg'
                    : cell.isBlocked
                    ? 'bg-gray-100 border-gray-300 opacity-50'
                    : 'bg-white border-gray-200'
                  }
                `}
              >
                {cell.isCompleted ? (
                  <div className="text-center">
                    <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-sm font-medium text-green-700">Complete!</div>
                  </div>
                ) : cell.isActive ? (
                  <div className="space-y-3">
                    <div className="text-center font-bold text-lg text-blue-700">
                      {cell.question} = ?
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {cell.options.map((option, idx) => (
                        <Button
                          key={idx}
                          onClick={() => handleAnswerClick(option, cell.id)}
                          variant="outline"
                          size="sm"
                          className="text-xs"
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-8 h-8 bg-gray-300 rounded-full mx-auto mb-2" />
                    <div className="text-xs text-gray-500">Locked</div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <div className="text-sm text-gray-600 mb-4">
              <strong>Instructions:</strong> Solve math problems to unlock the path. 
              Reach the bottom-right corner to complete the level!
            </div>
            <div className="flex gap-2 justify-center">
              <Badge variant={level >= 1 ? "default" : "secondary"}>Easy (+-)</Badge>
              <Badge variant={level >= 2 ? "default" : "secondary"}>Medium (×÷)</Badge>
              <Badge variant={level >= 3 ? "default" : "secondary"}>Hard (Mixed)</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
