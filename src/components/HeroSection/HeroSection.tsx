import { useEffect, useRef } from 'react';
import styles from './HeroSection.module.css';

export const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.08 }
    );

    const els = sectionRef.current?.querySelectorAll(`.${styles.reveal}`);
    els?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToWaitlist = () => {
    const element = document.getElementById('waitlist');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={styles.hero} ref={sectionRef}>
      {/* Ambient background blobs */}
      <div className={styles.blob1} aria-hidden="true" />
      <div className={styles.blob2} aria-hidden="true" />

      <div className={styles.inner}>

        {/* Left — editorial text column */}
        <div className={`${styles.textCol} ${styles.reveal}`}>
          <span className={styles.eyebrow}>The concept</span>

          <h1 className={styles.headline}>
            Your skill<br />
            is the<br />
            <em>currency.</em>
          </h1>

          <p className={styles.subline}>
            Match on skills.<br />
            Meet in Bengaluru.<br />
            Leave knowing something new.
          </p>

          <button className={styles.cta} onClick={scrollToWaitlist}>
            Join the waitlist
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Right — the exchange card */}
        <div className={`${styles.cardCol} ${styles.reveal} ${styles.revealDelay}`}>
          <div className={styles.matchCard}>
            <span className={styles.matchLabel}>A real Flip match</span>

            <div className={styles.profiles}>
              {/* Person A */}
              <div className={styles.profile}>
                <div className={styles.avatarWrap}>
                  <img
                    className={styles.avatar}
                    src="https://preview.redd.it/can-she-succeed-in-the-long-run-in-frame-preity-mukundan-v0-7m4vtw5ajddf1.jpg?width=495&format=pjpg&auto=webp&s=f592957cab8971c98d9cc3962c153c68d4c678f7"
                    alt="Nasriya"
                  />
                  <span className={styles.locationDot} title="Koramangala" />
                </div>
                <div className={styles.profileInfo}>
                  <span className={styles.profileName}>Nasriya</span>
                  <span className={styles.profileLocation}>Koramangala</span>
                </div>
                <div className={styles.skillPill}>
                  <span className={styles.skillEmoji}>👩‍🍳</span>
                  Cooking
                </div>
              </div>

              {/* Exchange badge */}
              <div className={styles.swapCol}>
                <div className={styles.swapLine} />
                <div className={styles.swapBadge}>⇌</div>
                <div className={styles.swapLine} />
              </div>

              {/* Person B */}
              <div className={styles.profile}>
                <div className={styles.avatarWrap}>
                  <img
                    className={styles.avatar}
                    src="https://clickinkerala.com/wp-content/uploads/2025/04/Naslen-K-Gafoor-3.jpg"
                    alt="Naslen"
                  />
                  <span className={styles.locationDot} title="HSR Layout" />
                </div>
                <div className={styles.profileInfo}>
                  <span className={styles.profileName}>Naslen</span>
                  <span className={styles.profileLocation}>HSR Layout</span>
                </div>
                <div className={styles.skillPill}>
                  <span className={styles.skillEmoji}>🏍</span>
                  Biking
                </div>
              </div>
            </div>

            <div className={styles.matchFooter}>
              <span className={styles.matchResult}>
                Same city. Different skills. Perfect match.
              </span>
            </div>
          </div>

          {/* Floating stat chips */}
          <div className={`${styles.chip} ${styles.chipTop}`}>
            <span className={styles.chipDot} />
            Bengaluru only
          </div>
          <div className={`${styles.chip} ${styles.chipBottom}`}>
            <span className={styles.chipDot} />
            Real connections only
          </div>
        </div>

      </div>
    </section>
  );
};
