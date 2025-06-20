import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar/SearchBar';
import MovieList from '../components/MovieList/MovieList';
import Pagination from '../components/Pagination/Pagination';
import LanguageSwitcher from '../components/LanguageSwitcher/LanguageSwitcher';
import styles from './Home.module.css';

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [status, setStatus] = useState('Ýüklenilýär...');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [query, setQuery] = useState('');
    const [language, setLanguage] = useState(localStorage.getItem('language') || 'ru-RU');

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                let url = `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=${language}&page=${currentPage}`;
                let results = [];
                let maxPages = 1;

                if (query) {
                    const ruResponse = await fetch(
                        `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=ru-RU&query=${encodeURIComponent(query)}&page=${currentPage}`
                    );
                    const ruData = await ruResponse.json();
                    results = ruData.results;

                    const enResponse = await fetch(
                        `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=${currentPage}`
                    );
                    const enData = await enResponse.json();
                    results = [...results, ...enData.results];

                    results = Array.from(new Map(results.map((movie) => [movie.id, movie])).values());
                    maxPages = Math.max(ruData.total_pages, enData.total_pages);
                } else {
                    const response = await fetch(url);
                    const data = await response.json();
                    results = data.results;
                    maxPages = data.total_pages || 1;
                }

                setMovies(results);
                setTotalPages(maxPages);
                setStatus('');
            } catch (error) {
                setStatus(`Error: ${error.message}`);
            }
        };

        fetchMovies();
    }, [currentPage, query, language]);

    const handleSearch = (searchQuery) => {
        setQuery(searchQuery);
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleLanguageChange = (lang) => {
        setLanguage(lang);
        setCurrentPage(1);
        localStorage.setItem('language', lang);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                {language === 'ru-RU' ? 'Найдите любимый фильм' : 'Find Your Favorite Movie'}
            </h1>
            <LanguageSwitcher onLanguageChange={handleLanguageChange} />
            <SearchBar onSearch={handleSearch} />
            {status && <div className={styles.status}>{status}</div>}
            <MovieList movies={movies} />
            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
};

export default Home;