import axios, { AxiosResponse } from "axios";
import { Movie } from "../types/movie";


const API_URL = "https://api.themoviedb.org/3/search/movie";


interface TMDBResponse {
page: number;
results: Movie[];
total_results: number;
total_pages: number;
}


export const fetchMovies = async (query: string): Promise<Movie[]> => {
const token = import.meta.env.VITE_TMDB_TOKEN as string | undefined;
if (!token) throw new Error("VITE_TMDB_TOKEN is not defined");


const response: AxiosResponse<TMDBResponse> = await axios.get(API_URL, {
params: { query, include_adult: false, language: "en-US", page: 1 },
headers: {
Authorization: `Bearer ${token}`,
},
});


return response.data.results;
};