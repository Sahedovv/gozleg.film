import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './MovieDetails.module.css';

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [status, setStatus] = useState('Ýüklenilýär...');
    const [showTrailer, setShowTrailer] = useState(false);
    const language = localStorage.getItem('language') || 'ru-RU';

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=${language}`
                );
                const data = await response.json();
                setMovie(data);
                setStatus('');
            } catch (error) {
                setStatus(`Error: ${error.message}`);
            }
        };

        const fetchTrailer = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=${language}`
                );
                const data = await response.json();
                const trailerVideo = data.results.find(
                    (video) => video.type === 'Trailer' && video.site === 'YouTube'
                );
                if (trailerVideo) {
                    setTrailer(`https://www.youtube.com/embed/${trailerVideo.key}`);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchMovie();
        fetchTrailer();
    }, [id, language]);

    if (status) {
        return <div className={styles.status}>{status}</div>;
    }

    if (!movie) {
        return null;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{movie.title}</h1>
            {movie.poster_path && (
                <img
                    className={styles.poster}
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                />
            )}
            <p className={styles.overview}>{movie.overview}</p>
            <p className={styles.rating}>
                Reýting: {movie.vote_average}/10
            </p>
            <p className={styles.release}>
                Çykan wagty: {movie.release_date}
            </p>
            <div className={styles.trailerContainer}>
                {trailer ? (
                    <>
                        <button
                            className={styles.trailerButton}
                            onClick={() => setShowTrailer(!showTrailer)}
                        >
                            {showTrailer ?'Treýlar aýyr' : 'Treýlar görkez'}
                        </button>
                        {showTrailer && (
                            <div className={styles.videoWrapper}>
                                <iframe
                                    className={styles.video}
                                    src={trailer}
                                    title={`${movie.title} Trailer`}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    loading="lazy"
                                ></iframe>
                            </div>
                        )}
                    </>
                ) : (
                    <p className={styles.noTrailer}>
                        Treýlar tapylmady!
                    </p>
                )}
            </div>
        </div>
    );
};

export default MovieDetails;