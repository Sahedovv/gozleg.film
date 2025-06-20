import { Link } from 'react-router-dom';
import styles from './MovieList.module.css';

const MovieList = ({ movies }) => {
    if (!movies || movies.length === 0) {
        return <p className={styles.noResults}>Film tapylmady</p>;
    }

    return (
        <div className={styles.grid}>
            {movies.map((movie) => (
                <Link to={`/movie/${movie.id}`} key={movie.id} className={styles.card}>
                    {movie.poster_path && (
                        <img
                            className={styles.poster}
                            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                            alt={movie.title}
                        />
                    )}
                    <h3 className={styles.title}>{movie.title}</h3>
                </Link>
            ))}
        </div>
    );
};

export default MovieList;