import { useState, useEffect } from 'react';
import styles from './CreatorsPage.module.css';
import { SEO } from '../SEO/SEO';
import { CreatorSkeleton } from './CreatorSkeleton';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1323';

interface Creator {
  id: number;
  name: string;
  avatar_url: string;
  skills: string[];
  primary_skill: string;
  bio: string;
  age?: number;
  highlights: string[];
  insta_link?: string;
}

export const CreatorsPage = () => {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${API_URL}/creators`)
      .then(r => r.json())
      .then(data => { setCreators(data); setLoading(false); })
      .catch(() => { setError('Failed to load creators.'); setLoading(false); });
  }, []);

  useEffect(() => {
    if (loading) return;
    
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
  }, [loading]);

  if (loading) return (
    <div className={styles.creatorsPage}>
      <div className={styles.header}>
        <h1 className={styles.title}>Meet Our Creators</h1>
        <p className={styles.subtitle}>Connecting Bengaluru's creative elite...</p>
      </div>
      <div className={styles.creatorsGrid}>
        <CreatorSkeleton />
      </div>
    </div>
  );
  if (error) return <div className={styles.creatorsPage}><div className={styles.header}><p>{error}</p></div></div>;

  return (
    <main className={styles.creatorsPage}>
      <SEO 
        title="The Collective | Bengaluru's Creative Elite"
        description="Discover talented individuals in Bengaluru's creative community. Connect with verified designers, developers, photographers, and artists for exclusive skill-swapping."
        image="https://flipyu.in/images/social/og-creators.png"
      />
      
      <div className={styles.header}>
        <h1 className={styles.title}>Meet Our Creators</h1>
        <p className={styles.subtitle}>Discover the individuals building the future of skill exchange in Bengaluru.</p>
      </div>

      <div className={styles.creatorsGrid}>
        {creators.map((creator, index) => {
          const isEven = index % 2 === 0;

          return (
            <div key={creator.id} className={`${styles.creatorRow} ${isEven ? styles.cardLeft : styles.cardRight} ${styles.reveal}`}>
              {/* Card */}
              <div className={styles.cardContainer}>
                <div className={styles.card}>
                  <div className={styles.imageContainer}>
                    <img src={creator.avatar_url} alt={creator.name} className={styles.profileImage} />
                    <span className={styles.statusBadge}>Verified</span>
                    <div className={styles.overlay}></div>
                  </div>

                  <div className={styles.cardContent}>
                    <div className={styles.headerRow}>
                      <h3 className={styles.name}>{creator.name}{creator.age && <span className={styles.age}>, {creator.age}</span>}</h3>
                    </div>

                    <div className={styles.skillsContainer}>
                      <div className={styles.primarySkill}>
                        <span className={styles.skillIcon}>✦</span>
                        <span>{creator.primary_skill}</span>
                      </div>
                      <div className={styles.skillTags}>
                        {(creator.skills || []).slice(0, 2).map((skill, idx) => (
                          <span key={idx} className={styles.skillTag}>{skill}</span>
                        ))}
                      </div>
                    </div>

                    {creator.bio && <p className={styles.cardBio}>{creator.bio}</p>}

                    {creator.insta_link ? (
                      <a
                        href={creator.insta_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.likeButton}
                      >
                        Connect
                      </a>
                    ) : (
                      <button className={styles.likeButton} disabled>
                        Connect
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className={styles.descriptionContainer}>
                <div className={styles.description}>
                  <h2 className={styles.descTitle}>{creator.name}{creator.age && <span className={styles.age}>, {creator.age}</span>}</h2>
                  <p className={styles.descText}>“{creator.bio}”</p>

                  <div className={styles.highlightsList}>
                    {(creator.highlights || []).map((highlight, idx) => (
                      <div key={idx} className={styles.highlightItem}>
                        <span className={styles.bullet}></span>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};
