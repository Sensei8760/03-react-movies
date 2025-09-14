import React, { FormEvent } from "react";
import toast from "react-hot-toast";
import styles from "./SearchBar.module.css";


interface SearchBarProps {
onSubmit: (query: string) => void;
}


export default function SearchBar({ onSubmit }: SearchBarProps) {
const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
e.preventDefault();
const form = e.currentTarget;
const input = form.elements.namedItem("query") as HTMLInputElement | null;
const value = input?.value.trim() ?? "";


if (!value) {
toast.error("Please enter your search query.");
return;
}


onSubmit(value);
// не обов'язково очищати інпут — але в демо очищали
form.reset();
};


return (
<header className={styles.header}>
<div className={styles.container}>
<a
className={styles.link}
href="https://www.themoviedb.org/"
target="_blank"
rel="noreferrer noopener"
>
Powered by TMDB
</a>
<form className={styles.form} onSubmit={handleSubmit}>
<input
className={styles.input}
type="text"
name="query"
autoComplete="off"
placeholder="Search movies..."
autoFocus
/>
<button className={styles.button} type="submit">
Search
</button>
</form>
</div>
</header>
);
}