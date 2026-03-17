import { useEffect, useRef } from 'react';
import styles from './WhyFlip.module.css';
import { SEO } from '../../components/SEO/SEO';

export default function WhyFlip() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(`.${styles.reveal}`);
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.page} ref={containerRef}>
      <SEO 
        title="The Philosophy | Stop Paying. Start Swapping."
        description="Decoding the future of creative exchange in Bengaluru. Why trading skills beats paying for expensive courses. Join the movement."
      />

      <div className={styles.container}>
        {/* Punchy Hero with Integrated Example */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <span className={styles.exclusiveBadge}>THE GAMEPLAN</span>
            <h1>Stop Paying. <br />Start Swapping.</h1>
            <p>
              Nasriya knows how to cook. Naslen knows how to bike. Instead of paying for a course, they just trade. Nasriya teaches her craft, Naslen teaches his. Zero cash. Real skill swap.
            </p>
            
            <div className={`${styles.miniExample} ${styles.reveal}`}>
              <div className={styles.miniExampleCard}>
                <span className={styles.matchLabel}>A TYPICAL MATCH</span>
                <div className={styles.exchangeRow}>
                  <div className={styles.person}>
                    <span className={styles.name}>Nasriya</span>
                    <span className={styles.skill}>Cooking</span>
                  </div>
                  <div className={styles.miniTradeIcon}>⇌</div>
                  <div className={styles.person}>
                    <span className={styles.name}>Naslen</span>
                    <span className={styles.skill}>Biking</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.heroImageWrapper}>
            <img 
              src="/images/why-flip/hero.png" 
              alt="Creators sharing a camera in Bengaluru" 
              className={styles.heroImage} 
            />
          </div>
        </section>

        {/* Action-First Content */}
        <section className={styles.philosophy}>
          <div className={styles.philosophyGrid}>
            <div className={`${styles.vignette} ${styles.reveal}`}>
              <span className={styles.vignetteNumber}>01</span>
              <h3>Skill is Currency.</h3>
              <p>
                We don&apos;t care about your clout. We care about your craft. 
                Your talent is your ticket to anyone else&apos;s expertise.
              </p>
            </div>
            <div className={`${styles.vignette} ${styles.reveal} ${styles.vignetteStaggered}`}>
              <span className={styles.vignetteNumber}>02</span>
              <h3>Fast & Direct.</h3>
              <p>
                Find a match. Offer a trade. Meet up. 
                Flip is for people who want results, not certificate badges.
              </p>
            </div>
          </div>

          {/* Gritty Process Row */}
          <div className={styles.featureRow}>
            <div className={`${styles.featureImage} ${styles.reveal}`}>
              <img src="/images/why-flip/craft.png" alt="An artist's gritty workspace" />
            </div>
            <div className={`${styles.featureText} ${styles.reveal}`}>
              <h3>Trade, <br />Don&apos;t Pay.</h3>
              <p>
                Cash doesn&apos;t buy mastery here. Your craft does. 
                Trade what you know for what you need. It&apos;s the ultimate fair swap.
              </p>
            </div>
          </div>

          {/* Community/Location Row */}
          <div className={`${styles.featureRow} ${styles.featureRowReverse}`}>
            <div className={`${styles.featureImage} ${styles.reveal}`}>
              <img src="/images/why-flip/community.png" alt="Friends laughing in a creative studio" />
            </div>
            <div className={`${styles.featureText} ${styles.reveal}`}>
              <h3>Namma <br />Bengaluru.</h3>
              <p>
                Meet photographers in Koramangala or designers in HSR. 
                Real local connections that actually mean something.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
