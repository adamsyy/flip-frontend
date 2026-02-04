import styles from './AboutSection.module.css';

export default function AboutSection() {
  return (
    <section className={styles.about}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2>Skills are better when shared.</h2>
          <p>
            Meet people in Bangalore who want to swap skills. You teach something, they teach something. 
            Real connections, real learning, zero awkwardness.
          </p>
        </div>
      </div>
    </section>
  );
}

