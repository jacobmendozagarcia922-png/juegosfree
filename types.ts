
export const GameCategory = {
  ALL: 'All',
  ACTION: 'Action',
  PUZZLE: 'Puzzle',
  SPORTS: 'Sports',
  ARCADE: 'Arcade',
  STRATEGY: 'Strategy'
} as const;

export type GameCategoryType = typeof GameCategory[keyof typeof GameCategory];

export interface Game {
  id: string;
  title: string;
  description: string;
  category: GameCategoryType;
  thumbnail: string;
  iframeUrl: string;
  featured?: boolean;
}
