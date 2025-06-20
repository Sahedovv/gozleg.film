import { useForm } from 'react-hook-form';
import styles from './SearchBar.module.css';

const SearchBar = ({ onSearch }) => {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        if (data.query.trim()) {
            onSearch(data.query);
        }
    };

    return (
        <form className={styles.searchForm} onSubmit={handleSubmit(onSubmit)}>
            <input
                className={styles.input}
                type="text"
                placeholder="film gözlemek..."
                {...register('query')}
            />
            <button className={styles.button} type="submit">
                Gözle
            </button>
        </form>
    );
};

export default SearchBar;