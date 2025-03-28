export interface BaseParam {
  language?: string;
  region?: string;
}

export interface BaseParamWithPage extends BaseParam {
  page?: number;
}

export interface Response<T> {
  id: number;
  results: T;
}

export interface ResponseWithPage<T> extends Omit<Response<T>, "id"> {
  page: number;
  total_pages: number;
  total_results: number;
}

export interface UpcomingResponse<T> extends ResponseWithPage<T> {
  dates: {
    maximum: string;
    minimum: string;
  };
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieList {
  genres: Genre[];
}

export type TimeWindow = "day" | "week";

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Video {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export interface Production_company {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface Production_country {
  iso_3166_1: string;
  name: string;
}

export interface Spoken_language {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface MovieDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection?: any;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Production_company[];
  production_countries: Production_country[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Spoken_language[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface TV {
  adult: boolean;
  backdrop_path: string;
  first_air_date: string;
  id: number;
  media_type: "movie" | "tv";
  name: string;
  original_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export interface TrendingAllResult extends Movie, TV {}

export interface TrendingAll {
  page: number;
  results: TrendingAllResult[];
  total_pages: number;
  total_results: number;
}
