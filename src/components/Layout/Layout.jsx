import { useState } from 'react';
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import styles from './Layout.module.css';

const Layout = () => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.className = newTheme;
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.brand}>gözleg.film</div>
        <nav className={styles.nav}>
          <NavLink to="/" className={styles.link}>
            Esasy
          </NavLink>
          <NavLink to="/about" className={styles.link}>
            Biz barada
          </NavLink>
          <NavLink to="/contacts" className={styles.link}>
            Habarlaşmak
          </NavLink>
          <button className={styles.themeButton} onClick={toggleTheme}>
            {theme === 'light' ? 'Ýagty' : 'Garaňky'}
          </button>
        </nav>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;