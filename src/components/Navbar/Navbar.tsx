import styles from './Navbar.module.css';

export const Navbar: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <span className={styles.logoText}>Flip</span>
        </div>
        
        <div className={styles.navLinks}>
          <button onClick={() => scrollToSection('swipe')} className={styles.link}>
            Our Approach
          </button>
          <button onClick={() => scrollToSection('waitlist')} className={styles.link}>
            Join Waitlist
          </button>
          <button onClick={() => scrollToSection('about')} className={styles.link}>
            About
          </button>
        </div>
      </div>
    </nav>
  );
};
