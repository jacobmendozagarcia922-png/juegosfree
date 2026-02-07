
import React from 'react';
import { Game } from '../types.ts';

interface GameCardProps {
  game: Game;
  onSelect: (game: Game) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onSelect }) => {
  return (
    <div 
      className="group bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all cursor-pointer transform hover:-translate-y-1"
      onClick={() => onSelect(game)}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={game.thumbnail} 
          alt={game.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
        <div className="absolute top-3 right-3 bg-blue-600 text-xs font-bold px-2 py-1 rounded text-white shadow-lg">
          {game.category}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-slate-100 group-hover:text-blue-400 transition-colors mb-1">
          {game.title}
        </h3>
        <p className="text-sm text-slate-400 line-clamp-2">
          {game.description}
        </p>
      </div>
    </div>
  );
};

export default GameCard;
