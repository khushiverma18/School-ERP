import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

import { MatchPairsGame } from "./Game/Matchpairs";
import { MathMazeGame } from "./Game/mathmaza";
import { WordQuestGame } from "./Game/WordQuest";
import { GameHub } from "./Game/Gamehub";

const Game = () => {
  const [currentView, setCurrentView] = useState("hub"); // 'hub' | 'match-pairs' | 'math-maze' | 'word-quest'

  const renderCurrentView = () => {
    switch (currentView) {
      case "match-pairs":
        return <MatchPairsGame onBack={() => setCurrentView("hub")} />;
      case "math-maze":
        return <MathMazeGame onBack={() => setCurrentView("hub")} />;
      case "word-quest":
        return <WordQuestGame onBack={() => setCurrentView("hub")} />;
      default:
        return <GameHub onGameSelect={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {currentView !== "hub" && (
        <div className="p-4">
          <Button
            onClick={() => setCurrentView("hub")}
            variant="outline"
            className="mb-4"
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Game Hub
          </Button>
        </div>
      )}
      {renderCurrentView()}
    </div>
  );
};

export default Game;
