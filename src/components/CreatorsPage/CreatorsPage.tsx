import { useState, useEffect } from 'react';
import styles from './CreatorsPage.module.css';
import { SEO } from '../SEO/SEO';
import { CreatorSkeleton } from './CreatorSkeleton';
import { INITIAL_CREATORS, Creator } from '../../constants/initialCreators';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1323';

export const CreatorsPage = () => {
  const [creators, setCreators] = useState<Creator[]>(INITIAL_CREATORS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${API_URL}/creators`)
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          // Filter out initial creators from the fetched data to avoid duplicates if they are already in the database
          const initialIds = new Set(INITIAL_CREATORS.map(c => c.id));
          const filteredData = data.filter(c => !initialIds.has(c.id));
          setCreators([...INITIAL_CREATORS, ...filteredData]);
        }
        setLoading(false);
      })
      .catch(() => {
        // If we have initial creators, don't show a full error, just stop loading
        if (INITIAL_CREATORS.length > 0) {
          setLoading(false);
        } else {
          setError('Failed to load the Elite Circle.');
          setLoading(false);
        }
      });
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

  if (loading && creators.length === 0) return (
    <div className={styles.creatorsPage}>
      <div className={styles.header}>
        <h1 className={styles.title}>The Elite Circle</h1>
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
        title="The Elite Circle"
        description="Discover Bengaluru's creative community."
      />
      
      <div className={styles.header}>
        <h1 className={styles.title}>The Elite Circle</h1>
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
                    <span className={styles.statusBadge}>Elite</span>
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
