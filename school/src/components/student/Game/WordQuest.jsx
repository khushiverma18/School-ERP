import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Volume2, Lightbulb, Trophy, Clock } from "lucide-react";

const wordLevels = [
  { id: 1, clue: "A large gray animal with a trunk", answer: "ELEPHANT", category: "Animals", hint: "E_______" },
  { id: 2, clue: "The star at the center of our solar system", answer: "SUN", category: "Science", hint: "S__" },
  { id: 3, clue: "A tall plant that grows in forests", answer: "TREE", category: "Nature", hint: "T___" },
  { id: 4, clue: "Water that falls from the sky", answer: "RAIN", category: "Weather", hint: "R___" },
  { id: 5, clue: "A red fruit often used in salads", answer: "TOMATO", category: "Food", hint: "T_____" }
];

export const WordQuestGame = ({ onBack }) => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [scrambledLetters, setScrambledLetters] = useState([]);
  const [guessedWord, setGuessedWord] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameStatus, setGameStatus] = useState("playing");
  const [showHint, setShowHint] = useState(false);

  const currentWord = wordLevels[currentLevel];

  const scrambleLetters = (word) => {
    const letters = word.split('');
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    return letters;
  };

  useEffect(() => {
    if (currentWord) {
      setScrambledLetters(scrambleLetters(currentWord.answer));
      setGuessedWord(new Array(currentWord.answer.length).fill(''));
      setShowHint(false);
    }
  }, [currentLevel]);

  useEffect(() => {
    if (gameStatus === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameStatus('lost');
    }
  }, [timeLeft, gameStatus]);

  const handleLetterClick = (letter, index) => {
    const emptyIndex = guessedWord.findIndex(slot => slot === '');
    if (emptyIndex !== -1) {
      const newGuessedWord = [...guessedWord];
      newGuessedWord[emptyIndex] = letter;
      setGuessedWord(newGuessedWord);

      const newScrambledLetters = [...scrambledLetters];
      newScrambledLetters[index] = '';
      setScrambledLetters(newScrambledLetters);
    }
  };

  const handleGuessedLetterClick = (index) => {
    const letter = guessedWord[index];
    if (letter) {
      const newGuessedWord = [...guessedWord];
      newGuessedWord[index] = '';
      setGuessedWord(newGuessedWord);

      const emptyIndex = scrambledLetters.findIndex(slot => slot === '');
      const newScrambledLetters = [...scrambledLetters];
      newScrambledLetters[emptyIndex] = letter;
      setScrambledLetters(newScrambledLetters);
    }
  };

  const checkAnswer = () => {
    const answer = guessedWord.join('');
    if (answer === currentWord.answer) {
      setScore(score + 100 + timeLeft);
      if (currentLevel < wordLevels.length - 1) {
        setCurrentLevel(currentLevel + 1);
        setTimeLeft(60);
      } else {
        setGameStatus('won');
      }
    }
  };

  const resetGame = () => {
    setCurrentLevel(0);
    setScore(0);
    setTimeLeft(60);
    setGameStatus('playing');
  };

  const speakClue = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentWord.clue);
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Button onClick={onBack} variant="outline" className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Games
        </Button>

        <Card className="mb-6">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-green-700">🌟 Word Quest</CardTitle>
            <CardDescription>
              Drag letters to form the correct word based on the clue!
            </CardDescription>
          </CardHeader>
        </Card>

        {gameStatus === 'playing' && (
          <>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{score}</div>
                  <div className="text-sm text-gray-600">Score</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600 flex items-center justify-center">
                    <Clock className="w-5 h-5 mr-1" />
                    {timeLeft}s
                  </div>
                  <div className="text-sm text-gray-600">Time Left</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">{currentLevel + 1}/{wordLevels.length}</div>
                  <div className="text-sm text-gray-600">Level</div>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Category: {currentWord.category}</CardTitle>
                  <div className="flex gap-2">
                    <Button onClick={speakClue} variant="outline" size="sm">
                      <Volume2 className="w-4 h-4" />
                    </Button>
                    <Button onClick={() => setShowHint(!showHint)} variant="outline" size="sm">
                      <Lightbulb className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-lg mb-4 text-center">{currentWord.clue}</p>
                {showHint && currentWord.hint && (
                  <p className="text-sm text-gray-600 text-center bg-yellow-50 p-2 rounded">
                    Hint: {currentWord.hint}
                  </p>
                )}
              </CardContent>
            </Card>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-center">Your Answer:</h3>
                <div className="flex justify-center gap-2 mb-4">
                  {guessedWord.map((letter, index) => (
                    <button
                      key={index}
                      onClick={() => handleGuessedLetterClick(index)}
                      className="w-12 h-12 border-2 border-gray-300 rounded-lg bg-white flex items-center justify-center text-xl font-bold hover:border-green-400 transition-colors"
                    >
                      {letter}
                    </button>
                  ))}
                </div>
                <div className="text-center">
                  <Button onClick={checkAnswer} className="bg-green-600 hover:bg-green-700">
                    Check Answer
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 text-center">Available Letters:</h3>
                <div className="flex justify-center gap-2 flex-wrap">
                  {scrambledLetters.map((letter, index) => (
                    <button
                      key={index}
                      onClick={() => letter && handleLetterClick(letter, index)}
                      disabled={!letter}
                      className={`w-12 h-12 border-2 rounded-lg flex items-center justify-center text-xl font-bold transition-colors ${
                        letter
                          ? 'border-blue-300 bg-blue-50 hover:border-blue-500 hover:bg-blue-100'
                          : 'border-gray-200 bg-gray-100 cursor-not-allowed'
                      }`}
                    >
                      {letter}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {gameStatus === 'won' && (
          <Card className="text-center">
            <CardContent className="p-8">
              <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-green-600 mb-2">Congratulations!</h2>
              <p className="text-lg mb-4">You completed all levels!</p>
              <p className="text-xl font-bold mb-6">Final Score: {score}</p>
              <Button onClick={resetGame} className="bg-green-600 hover:bg-green-700">
                Play Again
              </Button>
            </CardContent>
          </Card>
        )}

        {gameStatus === 'lost' && (
          <Card className="text-center">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-red-600 mb-2">Time's Up!</h2>
              <p className="text-lg mb-4">Better luck next time!</p>
              <p className="text-xl font-bold mb-6">Score: {score}</p>
              <Button onClick={resetGame} className="bg-green-600 hover:bg-green-700">
                Try Again
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
