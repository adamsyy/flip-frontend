import styles from './HeroSection.module.css';

export const HeroSection: React.FC = () => {
  const scrollToWaitlist = () => {
    const element = document.getElementById('waitlist');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.imageColumn}>
          <img 
            src="https://images.livemint.com/img/2023/06/14/original/Cubbon_reads5_1686726244642.jpg?w=600&h=800&fit=crop" 
            alt="Connection" 
            className={styles.heroImage} 
          />
        </div>
        
        <div className={styles.contentColumn}>
          <div className={styles.logo}>
            <img src="https://images.seeklogo.com/logo-png/5/2/flip-logo-png_seeklogo-55837.png" alt="Flip" />
          </div>
          
          <h1>Skills are the New Social Currency</h1>
          
          <p>
            Swipe to find people in Bangalore to exchange skills. 
            <br />I teach you something, you teach me something.
          </p>
          
          <button className={styles.ctaButton} onClick={scrollToWaitlist}>
            Join the Waitlist
          </button>
        </div>
      </div>
    </section>
  );
};
