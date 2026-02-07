
import React from 'react';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onLogoClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ searchQuery, setSearchQuery, onLogoClick }) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-4 py-3 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div 
          className="flex items-center gap-2 cursor-pointer group" 
          onClick={onLogoClick}
        >
          <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-500 transition-colors">
            <i className="fas fa-gamepad text-xl text-white"></i>
          </div>
          <h1 className="text-2xl font-orbitron font-bold tracking-tighter text-blue-500 group-hover:text-blue-400 transition-colors">
            NEXUS <span className="text-white">GAMES</span>
          </h1>
        </div>

        <div className="relative w-full md:w-96">
          <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
          <input
            type="text"
            placeholder="Search for games..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 text-slate-100 pl-12 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        <nav className="hidden lg:flex items-center gap-6 font-semibold text-slate-300">
          <a href="#" className="hover:text-blue-400 transition-colors">Trending</a>
          <a href="#" className="hover:text-blue-400 transition-colors">New Releases</a>
          <a href="#" className="hover:text-blue-400 transition-colors">Discord</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
