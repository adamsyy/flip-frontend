import { useState, useRef, useEffect } from 'react';
import { SkillCard } from '../SkillCard/SkillCard';
import styles from './SwipeDemo.module.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1323';

interface Creator {
  id: number;
  name: string;
  avatar_url: string;
  skills: string[];
  primary_skill: string;
  bio: string;
  age?: number;
}


export const SwipeDemo: React.FC = () => {
  const [cards, setCards] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [offset, setOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const autoSwipeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/creators`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setCards(data);
          // Pre-fetch images to cache them in browser memory
          data.forEach(card => {
            const img = new Image();
            img.src = card.avatar_url;
          });
        }
      })
      .catch((err) => {
        console.error("Failed to load additional swipe demo cards:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const scrollToWaitlist = () => {
    const element = document.getElementById('waitlist');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const performSwipe = (direction: 'left' | 'right') => {
    if (cards.length === 0) return;
    setOffset(direction === 'right' ? 800 : -800);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
      setOffset(0);
    }, 400);
  };


  useEffect(() => {
    return () => {
      if (autoSwipeTimerRef.current) {
        clearInterval(autoSwipeTimerRef.current);
      }
    };
  }, []);

  const handleSwipe = (direction: 'left' | 'right') => {
    if (autoSwipeTimerRef.current) {
      clearInterval(autoSwipeTimerRef.current);
    }
    performSwipe(direction);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (autoSwipeTimerRef.current) {
      clearInterval(autoSwipeTimerRef.current);
    }
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (autoSwipeTimerRef.current) {
      clearInterval(autoSwipeTimerRef.current);
    }
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const diff = e.clientX - startX;
    setOffset(diff);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const diff = e.touches[0].clientX - startX;
    setOffset(diff);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    const diff = e.clientX - startX;

    if (Math.abs(diff) > 50) {
      handleSwipe(diff > 0 ? 'right' : 'left');
    } else {
      setOffset(0);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    const diff = e.changedTouches[0].clientX - startX;

    if (Math.abs(diff) > 50) {
      handleSwipe(diff > 0 ? 'right' : 'left');
    } else {
      setOffset(0);
    }
  };

  return (
    <section className={styles.swipeDemo}>
      <div className={styles.swipeContainer}>
        <div className={styles.header}>
          <h2>
            Find your people.<br />
            Swap your skills.
          </h2>
        </div>
        {/* 
        <div className={styles.decorativeWrapper}>
          <div className={styles.decorativeArrow}>↗</div>
        </div> */}

        <div className={styles.leftContent}>

          <p className={styles.description}>
            Trade a little Kannada for a killer Biryani recipe. No lectures, no "experts" just humans teaching humans what they know best.
          </p>
          <button className={styles.secondaryButton} onClick={scrollToWaitlist}>
            Get Early Access
          </button>

        </div>

        <div className={styles.content}>

          <div className={styles.rightColumn}>
            <div
              className={styles.cardsContainer}
              ref={containerRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={handleTouchEnd}
            >
              {loading ? (
                <div className={styles.skeletonCard}>
                  <div className={styles.skeletonImage} />
                  <div className={styles.skeletonContent}>
                    <div className={styles.skeletonTitle} />
                    <div className={styles.skeletonBadge} />
                    <div className={styles.skeletonText} />
                  </div>
                </div>
              ) : cards.length > 0 ? cards.map((card, index) => (
                <SkillCard
                  key={card.id}
                  id={card.id}
                  skills={card.skills}
                  primarySkill={card.primary_skill}
                  avatar={card.avatar_url}
                  name={card.name}
                  age={card.age}
                  bio={card.bio}
                  isTopCard={index === currentIndex}
                  isNextCard={index === (currentIndex + 1) % cards.length}
                  offset={index === currentIndex ? offset : 0}
                />
              )) : (
                <div style={{ color: '#999' }}>Members joining soon</div>
              )}
            </div>

            <div className={styles.controls}>
              <button
                className={styles.btnReject}
                onClick={() => handleSwipe('left')}
                title="Pass"
              >
                <span>✕</span>
              </button>
              <button
                className={styles.btnAccept}
                onClick={() => handleSwipe('right')}
                title="Connect"
              >
                <span>✓</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
