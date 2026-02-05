import axios from "axios";
import { API_KEY, BASE_URL } from "../config/apiConfig";
import { Movie } from "../types/Movie";
import { Media } from "../types/Media";
import { TVShow } from "../types/TVShow";

// =============================
// Types related
// =============================
type MovieResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

type TVShowResponse = {
  page: number;
  results: TVShow[];
  total_pages: number;
  total_results: number;
};

type MultiSearchResponse = {
  page: number;
  results: (Movie | TVShow)[];
  total_pages: number;
  total_results: number;
};

// =============================
// Movies related
// =============================

export async function getMovieById(movieId: number): Promise<Media | null> {
  const URL = `${BASE_URL}/movie/${movieId}`;

  try {
    const response = await axios.get<Movie>(URL, {
      params: {
        api_key: API_KEY,
        language: "en-US",
      },
    });

    return {
      ...response.data,
      media_type: "movie" as const,
    };
  } catch (error) {
    console.log("Error fetching Movie show by ID", error);
    return null;
  }
}

export async function getMoviesByCategory(category: string): Promise<Media[]> {
  const URL = `${BASE_URL}/movie/${category}`;

  try {
    const response = await axios.get<MovieResponse>(URL, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        page: 1,
      },
    });

    return response.data.results.map((movie) => ({
      ...movie,
      media_type: "movie" as const,
    }));
  } catch (error) {
    console.log("Error fetching movies", error);
  }
  return [];
}

// =============================
// TV Shows related
// =============================

export async function getTVShowById(tvId: number): Promise<Media | null> {
  const URL = `${BASE_URL}/tv/${tvId}`;

  try {
    const response = await axios.get<TVShow>(URL, {
      params: {
        api_key: API_KEY,
        language: "en-US",
      },
    });

    return {
      ...response.data,
      media_type: "tv" as const,
    };
  } catch (error) {
    console.log("Error fetching TV show by ID", error);
    return null;
  }
}

export async function getTVShowsByCategory(category: string): Promise<Media[]> {
  const URL = `${BASE_URL}/tv/${category}`;

  try {
    const response = await axios.get<TVShowResponse>(URL, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        page: 1,
      },
    });

    return response.data.results.map((tvShow) => ({
      ...tvShow,
      media_type: "tv" as const,
    }));
  } catch (error) {
    console.log("Error fetching TV shows", error);
  }
  return [];
}

// =============================
// Search related
// =============================

export async function searchMovies(query: string): Promise<Media[]> {
  const URL = `${BASE_URL}/search/movie`;

  try {
    const response = await axios.get<MovieResponse>(URL, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        query: query,
        page: 1,
      },
    });

    return response.data.results.map((movie) => ({
      ...movie,
      media_type: "movie" as const,
    }));
  } catch (error) {
    console.log("Error searching movies", error);
  }
  return [];
}

export async function searchTV(query: string): Promise<Media[]> {
  const URL = `${BASE_URL}/search/tv`;

  try {
    const response = await axios.get<TVShowResponse>(URL, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        query: query,
        page: 1,
      },
    });

    return response.data.results.map((tvShow) => ({
      ...tvShow,
      media_type: "tv" as const,
    }));
  } catch (error) {
    console.log("Error searching TV shows", error);
  }
  return [];
}

export async function searchMulti(query: string): Promise<Media[]> {
  const URL = `${BASE_URL}/search/multi`;

  try {
    const response = await axios.get<MultiSearchResponse>(URL, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        query: query,
        page: 1,
      },
    });

    // Filter to only movies and TV shows (exclude "person" results)
    return response.data.results
      .filter(
        (item: any) => item.media_type === "movie" || item.media_type === "tv",
      )
      .map((item: any) => item as Media);
  } catch (error) {
    console.log("Error searching multi", error);
  }
  return [];
}

// =============================
// Common
// =============================

export function getTMDBImageUrl(width: string, posterPath: string | null): string | null {
  if (!posterPath) {
    return null;
  }
  return `https://image.tmdb.org/t/p/${width}${posterPath}`;
}
