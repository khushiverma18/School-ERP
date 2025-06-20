import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, RotateCcw, Trophy } from "lucide-react";
import { toast } from "sonner";

export const MatchPairsGame = ({ onBack }) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [timer, setTimer] = useState(0);

  const categories = {
    animals: [
      { content: "Lion", emoji: "🦁" },
      { content: "Elephant", emoji: "🐘" },
      { content: "Tiger", emoji: "🐅" },
      { content: "Monkey", emoji: "🐵" },
      { content: "Zebra", emoji: "🦓" },
      { content: "Giraffe", emoji: "🦒" },
      { content: "Bear", emoji: "🐻" },
      { content: "Wolf", emoji: "🐺" },
    ],
  };

  const initializeGame = () => {
    const selectedCards = categories.animals.slice(0, 8);
    const gameCards = [...selectedCards, ...selectedCards].map((card, index) => ({
      id: index,
      content: card.content,
      emoji: card.emoji,
      isFlipped: false,
      isMatched: false,
    }));

    // Shuffle cards
    for (let i = gameCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [gameCards[i], gameCards[j]] = [gameCards[j], gameCards[i]];
    }

    setCards(gameCards);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setGameStarted(false);
    setGameCompleted(false);
    setTimer(0);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    let interval;
    if (gameStarted && !gameCompleted) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, gameCompleted]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      const firstCard = cards.find((card) => card.id === first);
      const secondCard = cards.find((card) => card.id === second);

      if (firstCard && secondCard && firstCard.content === secondCard.content) {
        // Match found
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === first || card.id === second ? { ...card, isMatched: true } : card
            )
          );
          setMatches((prev) => prev + 1);
          setFlippedCards([]);
          toast.success("Great match! 🎉");
        }, 1000);
      } else {
        // No match
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === first || card.id === second ? { ...card, isFlipped: false } : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards, cards]);

  useEffect(() => {
    if (matches === 8) {
      setGameCompleted(true);
      toast.success(`Congratulations! You completed the game in ${moves} moves and ${timer} seconds! 🏆`);
    }
  }, [matches, moves, timer]);

  const handleCardClick = (cardId) => {
    if (!gameStarted) setGameStarted(true);

    const card = cards.find((c) => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched || flippedCards.length >= 2) return;

    setCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, isFlipped: true } : c))
    );
    setFlippedCards((prev) => [...prev, cardId]);
    setMoves((prev) => prev + 1);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-3xl">🎯 Match the Pairs</CardTitle>
            <Button onClick={onBack} variant="outline">
              Back to Hub
            </Button>
          </div>

          <div className="flex gap-4 items-center justify-center">
            <Badge variant="secondary" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {formatTime(timer)}
            </Badge>
            <Badge variant="secondary">Moves: {moves}</Badge>
            <Badge variant="secondary">Matches: {matches}/8</Badge>
            <Button onClick={initializeGame} variant="outline" size="sm">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
            {cards.map((card) => (
              <div
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={`
                  aspect-square rounded-lg cursor-pointer transition-all duration-300 transform
                  ${
                    card.isFlipped || card.isMatched
                      ? "bg-white border-2 border-blue-300 shadow-lg"
                      : "bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:scale-105"
                  }
                  ${card.isMatched ? "ring-4 ring-green-300" : ""}
                `}
              >
                <div className="w-full h-full flex flex-col items-center justify-center p-2">
                  {card.isFlipped || card.isMatched ? (
                    <>
                      <div className="text-3xl mb-1">{card.emoji}</div>
                      <div className="text-xs font-medium text-center text-gray-700">
                        {card.content}
                      </div>
                    </>
                  ) : (
                    <div className="text-white text-2xl">?</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {gameCompleted && (
            <div className="text-center mt-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
              <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Congratulations! 🎉</h3>
              <p className="text-gray-600">
                You completed the game in <strong>{moves} moves</strong> and{" "}
                <strong>{formatTime(timer)}</strong>!
              </p>
              <Button onClick={initializeGame} className="mt-4">
                Play Again
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
