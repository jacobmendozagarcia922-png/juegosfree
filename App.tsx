
import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import GameCard from './components/GameCard';
import GamePlayer from './components/GamePlayer';
import { Game, GameCategory } from './types';

const App: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<GameCategory>(GameCategory.ALL);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetching the JSON file instead of importing it as a module
    // to avoid cross-browser compatibility issues with JSON modules.
    const loadGames = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('./games.json');
        if (!response.ok) {
          throw new Error(`Failed to load games: ${response.statusText}`);
        }
        const data = await response.json();
        setGames(data as Game[]);
      } catch (error) {
        console.error("Error loading game database:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadGames();
  }, []);

  const filteredGames = useMemo(() => {
    return games.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === GameCategory.ALL || game.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [games, searchQuery, activeCategory]);

  const featuredGames = useMemo(() => {
    return games.filter(g => g.featured);
  }, [games]);

  const handleSelectGame = (game: Game) => {
    setSelectedGame(game);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseGame = () => {
    setSelectedGame(null);
  };

  const handleLogoClick = () => {
    setSelectedGame(null);
    setSearchQuery('');
    setActiveCategory(GameCategory.ALL);
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-blue-500 selection:text-white">
      <Header 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        onLogoClick={handleLogoClick}
      />

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-8 py-8">
        {/* Category Filter */}
        <div className="flex flex-wrap items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {Object.values(GameCategory).map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                activeCategory === category 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-slate-400 font-orbitron">Loading Nexus Library...</p>
          </div>
        ) : (
          <>
            {/* Featured Section (only shown on home/no search) */}
            {!searchQuery && activeCategory === GameCategory.ALL && featuredGames.length > 0 && (
              <section className="mb-12">
                <div className="flex items-center gap-2 mb-6">
                  <i className="fas fa-fire text-orange-500"></i>
                  <h2 className="text-2xl font-orbitron font-bold">FEATURED GAMES</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {featuredGames.map(game => (
                    <div 
                      key={`featured-${game.id}`}
                      className="relative group h-64 rounded-2xl overflow-hidden border-2 border-slate-800 hover:border-blue-500 transition-all cursor-pointer"
                      onClick={() => handleSelectGame(game)}
                    >
                      <img src={game.thumbnail} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-6">
                        <span className="bg-blue-600 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded mb-3 inline-block">Featured</span>
                        <h3 className="text-3xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{game.title}</h3>
                        <p className="text-slate-300 max-w-md line-clamp-1">{game.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* All Games Grid */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <i className="fas fa-th-large text-blue-500"></i>
                  <h2 className="text-2xl font-orbitron font-bold uppercase tracking-tight">
                    {searchQuery ? 'Search Results' : `${activeCategory} Games`}
                  </h2>
                </div>
                <span className="text-slate-500 text-sm">{filteredGames.length} games found</span>
              </div>

              {filteredGames.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredGames.map(game => (
                    <GameCard key={game.id} game={game} onSelect={handleSelectGame} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-slate-800/50 rounded-3xl border-2 border-dashed border-slate-700">
                  <i className="fas fa-ghost text-5xl text-slate-600 mb-4"></i>
                  <h3 className="text-xl font-bold text-slate-300">No games found</h3>
                  <p className="text-slate-500">Try adjusting your search or category filters.</p>
                  <button 
                    onClick={handleLogoClick}
                    className="mt-6 text-blue-500 hover:underline font-semibold"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </section>
          </>
        )}
      </main>

      <footer className="bg-slate-900 border-t border-slate-800 py-12 px-4 sm:px-8 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-xl font-orbitron font-bold text-blue-500 mb-2">NEXUS GAMES</h2>
            <p className="text-slate-500 text-sm max-w-sm">
              The ultimate destination for unblocked web games. Play directly in your browser without any restrictions.
            </p>
          </div>
          
          <div className="flex gap-8 text-slate-400 text-sm">
            <div className="flex flex-col gap-2">
              <span className="text-slate-100 font-bold mb-2">PLATFORM</span>
              <a href="#" className="hover:text-blue-400">Games</a>
              <a href="#" className="hover:text-blue-400">Categories</a>
              <a href="#" className="hover:text-blue-400">Request Game</a>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-slate-100 font-bold mb-2">SUPPORT</span>
              <a href="#" className="hover:text-blue-400">Contact</a>
              <a href="#" className="hover:text-blue-400">About Us</a>
              <a href="#" className="hover:text-blue-400">Terms</a>
            </div>
          </div>

          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 bg-slate-800 flex items-center justify-center rounded-full hover:bg-blue-600 transition-colors">
              <i className="fab fa-discord"></i>
            </a>
            <a href="#" className="w-10 h-10 bg-slate-800 flex items-center justify-center rounded-full hover:bg-blue-400 transition-colors">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="w-10 h-10 bg-slate-800 flex items-center justify-center rounded-full hover:bg-red-600 transition-colors">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-slate-800 mt-8 pt-8 text-center text-slate-600 text-xs">
          © {new Date().getFullYear()} Nexus Unblocked Games. All game copyrights belong to their respective owners.
        </div>
      </footer>

      {/* Game Player Modal */}
      {selectedGame && (
        <GamePlayer game={selectedGame} onClose={handleCloseGame} />
      )}
    </div>
  );
};

export default App;
