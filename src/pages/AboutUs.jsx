
import styles from './Aboutus.module.css';

const AboutUs = () => {

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Biz barada
      </h1>
      <p className={styles.text}>
        Halaýan filmleriňizi gözlemek, treýlara tomaşa etmek we seslenme formasy arkaly biziň bilen habarlaşmak üçin amatly we owadan interfeýs hödürlemegi maksat edinýäris.
      </p>
      <div className={styles.teamSection}>
        <h2 className={styles.teamTitle}>
          Topar
        </h2>
        <p className={styles.teamName}>Maksat Sahedov</p>
        <p className={styles.teamRole}>Jnr.Web-Developer</p>
      </div>
    </div>
  );
};

export default AboutUs;