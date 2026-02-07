
export enum GameCategory {
  ALL = 'All',
  ACTION = 'Action',
  PUZZLE = 'Puzzle',
  SPORTS = 'Sports',
  ARCADE = 'Arcade',
  STRATEGY = 'Strategy'
}

export interface Game {
  id: string;
  title: string;
  description: string;
  category: GameCategory;
  thumbnail: string;
  iframeUrl: string;
  featured?: boolean;
}
