import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import { fetchMovies } from "../../services/movieService";
import { Movie } from "../../types/movie";
import styles from "./App.module.css";


export default function App(): JSX.Element {
const [movies, setMovies] = useState<Movie[]>([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(false);
const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);


const handleSearch = async (query: string) => {
setLoading(true);
setError(false);
setMovies([]);


try {
const results = await fetchMovies(query);
if (results.length === 0) {
toast.error("No movies found for your request.");
}
setMovies(results);
} catch (err) {
console.error(err);
setError(true);
toast.error("There was an error fetching movies.");
} finally {
setLoading(false);
}
};


const handleSelect = (movie: Movie) => setSelectedMovie(movie);


return (
<div className={styles.app}>
<div className="app-container">
<SearchBar onSubmit={handleSearch} />


{loading && <Loader />}
{error && <ErrorMessage />}
{!loading && !error && movies.length > 0 && (
<MovieGrid movies={movies} onSelect={handleSelect} />
)}


{selectedMovie && (
<MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
)}
</div>


<Toaster position="top-center" />
</div>
);
}