import React from "react";
import type { Movie } from "../../types/movie";
import styles from "./MovieGrid.module.css";


interface MovieGridProps {
movies: Movie[];
onSelect: (movie: Movie) => void;
}


export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
return (
<ul className={styles.grid}>
{movies.map((movie) => (
<li key={movie.id} className={styles.item}>
<div className={styles.card} onClick={() => onSelect(movie)}>
<img
className={styles.image}
src={
movie.poster_path
? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
: "https://via.placeholder.com/300x450?text=No+Image"
}
alt={movie.title}
loading="lazy"
/>
<h2 className={styles.title}>{movie.title}</h2>
</div>
</li>
))}
</ul>
);
}