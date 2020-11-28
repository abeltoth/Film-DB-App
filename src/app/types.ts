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
