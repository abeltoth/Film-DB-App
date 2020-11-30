export interface FilmListResult {
  page: number;
  results: FilmListItem[];
  total_pages: number;
  total_results: number;
}

export interface FilmListItem {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
}

export interface FilmDetails extends FilmListItem {
  overview: string;
  popularity: number;
  credits: { cast: Cast[] };
  reviews: { page: number, results: Review[], total_pages: number, total_results: number };
}

export interface Review {
  author: string;
  author_details: ReviewAuthorDetails;
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

export interface ReviewAuthorDetails {
  username: string;
  avatar_path: string;
  rating: number;
}

export interface Cast {
  name: string;
  profile_path: string;
  character: string;
  order: number;
}
