import styles from "./styles.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer__container}>
      <a
        href="https://www.linkedin.com/in/valentinmenviellecandia/"
        title="Linkedin - Valentin Menvielle Candia"
        target="_blank"
        rel="noopener noreferrer"
      >
        Valentin Menvielle Candia
      </a>
      <span>Mercado Libre 💛 - Challenge | 2024</span>

      <div className={styles.footer_base}></div>
    </footer>
  );
};

export default Footer;
