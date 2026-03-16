import { SEO } from '../../components/SEO/SEO';
import styles from './LegalPage.module.css';

export const LegalPage = ({ type }: { type: 'privacy' | 'terms' }) => {
  const content = type === 'privacy' ? {
    title: 'Privacy Policy',
    desc: 'How we handle your data.'
  } : {
    title: 'Terms of Service',
    desc: 'The rules of the Flip community.'
  };

  return (
    <main className={styles.container}>
      <SEO title={content.title} description={content.desc} />
      <div className={styles.content}>
        <h1>{content.title}</h1>
        <p className={styles.lastUpdated}>Last Updated: March 2026</p>
        
        <section>
          <h2>1. Introduction</h2>
          <p>Welcome to Flip. We are committed to protecting your privacy and providing a safe environment for skill swapping.</p>
        </section>

        <section>
          <h2>2. Data Collection</h2>
          <p>We collect information you provide directly to us when you join the waitlist or apply as a creator, including your name, email, and skill profiles.</p>
        </section>

        <section>
          <h2>3. Community Standards</h2>
          <p>Flip is built on trust and mutual respect. Any form of harassment or unprofessional behavior will result in immediate removal from the platform.</p>
        </section>

        <p className={styles.placeholderNote}>Note: This is a placeholder for legal purposes. Please consult with legal counsel before going live for a full policy.</p>
      </div>
    </main>
  );
};
