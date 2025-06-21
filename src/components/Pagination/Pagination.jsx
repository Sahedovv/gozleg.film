import styles from './Pagination.module.css';
import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const maxPagesToShow = 3;
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    return (
        <div className={styles.pagination}>
            <button
                className={styles.button}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Yza
            </button>
            {pages.map((page) => (
                <button
                    key={page}
                    className={`${styles.button} ${currentPage === page ? styles.current : ''}`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}
            <button
                className={styles.button}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Öňe
            </button>
        </div>
    );
};

export default Pagination;