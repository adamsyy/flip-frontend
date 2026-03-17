import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const goToHomeSection = (id: string) => {
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => scrollToSection(id), 80);
      return;
    }

    scrollToSection(id);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <button className={styles.logo} onClick={() => navigate('/')}>
          <img src="/images/logo-1.png" alt="Flip Logo" className={styles.logoImg} />
        </button>
        
        <div className={styles.navLinks}>
          <button onClick={() => navigate('/creators')} className={styles.link}>
            Creators
          </button>
          <button onClick={() => goToHomeSection('waitlist')} className={styles.link}>
            Join Waitlist
          </button>
          <button onClick={() => navigate('/whyFlip')} className={styles.link}>
            Why Flip
          </button>
        </div>
      </div>
    </nav>
  );
};
