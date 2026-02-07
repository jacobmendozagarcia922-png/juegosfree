
import React, { useState } from 'react';
import { Game } from '../types';

interface GamePlayerProps {
  game: Game;
  onClose: () => void;
}

const GamePlayer: React.FC<GamePlayerProps> = ({ game, onClose }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    const iframe = document.getElementById('game-frame');
    if (!iframe) return;

    if (!isFullscreen) {
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="fixed inset-0 z-[60] bg-slate-950 flex flex-col">
      <div className="bg-slate-900 px-4 py-3 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-3">
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-all"
          >
            <i className="fas fa-arrow-left"></i>
          </button>
          <div>
            <h2 className="text-lg font-bold text-white">{game.title}</h2>
            <span className="text-xs text-blue-400 font-mono uppercase tracking-widest">{game.category}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={toggleFullscreen}
            className="hidden sm:flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg text-sm transition-all"
          >
            <i className="fas fa-expand"></i> Fullscreen
          </button>
          <button 
            onClick={onClose}
            className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-4 py-2 rounded-lg text-sm transition-all"
          >
            Close Game
          </button>
        </div>
      </div>

      <div className="flex-grow bg-black relative">
        <iframe
          id="game-frame"
          src={game.iframeUrl}
          className="w-full h-full border-none"
          title={game.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div className="bg-slate-900 p-6 border-t border-slate-800">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-bold mb-2">How to play</h3>
          <p className="text-slate-400 leading-relaxed">
            {game.description} Use your keyboard and mouse to interact with the game. If the game doesn't load, try refreshing or checking your connection.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GamePlayer;
