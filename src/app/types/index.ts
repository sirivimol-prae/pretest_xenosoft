export interface Quote {
  id: number;
  text: string;
  author: string;
  votes: number;
  category: string;
}

export interface User {
  username: string;
  password: string;
}

export interface LoginForm {
  username: string;
  password: string;
}

export type SortBy = 'votes' | 'author' | 'text';

export interface VotingSystemProps {
  currentUser: string;
  onLogout: () => void;
}

export interface LoginPageProps {
  onLogin: (username: string) => void;
}

export interface QuoteCardProps {
  quote: Quote;
  onVote: (quoteId: number) => void;
  isVoted: boolean;
  isLoggedIn: boolean;
}