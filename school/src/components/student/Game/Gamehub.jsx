import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Calculator, BookOpen, Star, Clock } from "lucide-react";

// Helper component for rendering stars
const StarRating = ({ rating }) => (
  <div className="flex items-center">
    {Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ))}
  </div>
);

export const GameHub = ({ onGameSelect }) => {
  const games = [
    {
      id: 'match-pairs',
      title: 'Match the Pairs',
      description: 'Help a smart little brain find the matching pictures behind the cards!',
      icon: Brain,
      color: 'from-pink-500 to-rose-500',
      glowColor: 'rgb(236 72 153 / 0.4)',
      // NEW IMAGE: A cute brain character pointing to two identical cards. Directly shows "matching".
      imageUrl: 'https://img.freepik.com/free-vector/memory-game-illustration-with-brain_23-2148979148.jpg?w=826',
      difficulty: 'Easy',
      stars: 4,
    },
    {
      id: 'math-maze',
      title: 'Math Maze',
      description: 'Help a clever robot fly through the number maze by solving the sums.',
      icon: Calculator,
      color: 'from-blue-500 to-cyan-500',
      glowColor: 'rgb(59 130 246 / 0.4)',
      // NEW IMAGE: A cute robot navigating a clear maze path with numbers. Directly shows "math" and "maze".
      imageUrl: 'https://img.freepik.com/free-vector/math-maze-game-with-robot_1308-100267.jpg?w=826',
      difficulty: 'Medium',
      stars: 5,
    },
    {
      id: 'word-quest',
      title: 'Word Quest',
      description: 'Join a friendly dragon on a quest to collect letters and build magical words.',
      icon: BookOpen,
      color: 'from-green-500 to-emerald-500',
      glowColor: 'rgb(34 197 94 / 0.4)',
      // NEW IMAGE: A cute dragon collecting letters. Directly shows a "quest" for "words/letters".
      imageUrl: 'https://img.freepik.com/free-vector/cute-dragon-with-alphabet-cubes-cartoon-vector-icon-illustration-animal-education-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3715.jpg?w=740',
      difficulty: 'Medium',
      stars: 4,
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div 
          className="text-center mb-16 animate-fade-in-up"
          style={{ animationFillMode: 'backwards' }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 mb-4 tracking-tight">
            <span className="inline-block animate-bounce mr-3">🎮</span>
            Educational Game Portal
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Jump into a world of fun and learning! Pick a game below to get started.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {games.map((game, index) => {
            const IconComponent = game.icon;
            return (
              <Card 
                key={game.id} 
                className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl 
                           transition-all duration-500 ease-out 
                           animate-fade-in-up border-transparent"
                style={{
                  '--glow-color': game.glowColor,
                  animationDelay: `${150 * index}ms`,
                  animationFillMode: 'backwards',
                }}
              >
                <div className="absolute inset-0 animate-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${game.color} 
                                 [background-size:200%] group-hover:animate-background-pan`} />
                
                <div className="relative transform-gpu transition-transform duration-500 ease-out group-hover:-translate-y-2">
                  <div className="overflow-hidden bg-gray-200">
                    <img 
                      src={game.imageUrl} 
                      alt={`${game.title} themed cartoon`}
                      className="w-full h-56 object-cover object-center transition-transform duration-500 ease-in-out group-hover:scale-110"
                    />
                  </div>

                  <CardContent className="p-6 bg-white flex flex-col h-full">
                    <div className="flex items-center mb-3">
                      <div className={`w-12 h-12 shrink-0 rounded-full bg-gradient-to-br ${game.color} flex items-center justify-center mr-4
                                       transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}>
                        <IconComponent className="w-7 h-7 text-white transition-transform duration-300 group-hover:rotate-12" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800">{game.title}</h3>
                    </div>

                    <p className="text-gray-600 text-base min-h-[72px] flex-grow">
                      {game.description}
                    </p>

                    <div className="mt-4 pt-4 border-t border-gray-200 space-y-3 text-sm">
                      <div className="flex justify-between items-center text-gray-500 font-medium">
                        <span className="flex items-center"><Clock className="w-4 h-4 mr-2" /> Difficulty</span>
                        <span className="font-bold text-gray-700">{game.difficulty}</span>
                      </div>
                      <div className="flex justify-between items-center text-gray-500 font-medium">
                        <span className="flex items-center"><Star className="w-4 h-4 mr-2" /> Rating</span>
                        <StarRating rating={game.stars} />
                      </div>
                    </div>
                    
                    <Button
                      onClick={() => onGameSelect(game.id)}
                      className={`w-full mt-6 bg-gradient-to-r ${game.color} text-lg font-bold
                                 hover:shadow-xl hover:brightness-110
                                 transition-all duration-300 transform group-hover:scale-105`}
                      size="lg"
                    >
                      Play Now
                    </Button>
                  </CardContent>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};