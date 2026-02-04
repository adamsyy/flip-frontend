import { useState, useRef } from 'react';
import { SkillCard } from '../SkillCard/SkillCard';
import styles from './SwipeDemo.module.css';

const mockCards = [
      { id: 1, skills: ['Guitar', 'Music Production', 'Piano'], primarySkill: 'Guitar', avatar: 'https://scontent.fblr24-4.fna.fbcdn.net/v/t39.30808-6/481976898_1199594624869417_4853479793742535583_n.jpg?stp=dst-jpg_s590x590_tt6&_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_ohc=-1tSkuB85JAQ7kNvwGHgnB_&_nc_oc=AdlGlr6xKxfd9bZy44Htm-g7KmJZjOk169GRVy13KgWSqV7ENZA1cWv-cZ2zakA3VSpuW09UJUvFsfoAOLYRN-Wp&_nc_zt=23&_nc_ht=scontent.fblr24-4.fna&_nc_gid=IJkwiLwuz4kMr99WtounxA&oh=00_Afum2qut5zzVj7Fh_wE9dF27g7vJ1zEkW4-UBS5io70saA&oe=6988A472', name: 'Preety Mukundan', age: 27, bio: "Guitarist who moonlights in music production. Teach me pottery?" },
  { id: 2, skills: ['Skating', 'street art', 'Djing'], primarySkill: 'Skating', avatar: 'https://vefeast.com/wp-content/uploads/Riya-Shibu-Cute-Photo.jpg', name: 'Riya Shibu', age: 26, bio: "Seriously down for anyone who'll teach me baking instead of my stock-market rants." },
  { id: 3, skills: ['Photography', 'Web Design', 'Graphic Design'], primarySkill: 'Photography', avatar: 'https://clickinkerala.com/wp-content/uploads/2025/04/Naslen-K-Gafoor-3.jpg', name: 'Nasleen', age: 24, bio: "Coffee-fueled photographer; looking to learn DJing and actual talking skills." },

  { id: 4, skills: ['Yoga', 'Fitness', 'Meditation'], primarySkill: 'Yoga', avatar: 'https://www.gethucinema.com/wp-content/uploads/2022/12/HaniyaNafisa-153.jpg', name: 'Haniya', age: 29, bio: "Fitness coach who loves chai; wants to learn film photography." }
];

export const SwipeDemo: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [offset, setOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  const handleSwipe = (direction: 'left' | 'right') => {
    setOffset(direction === 'right' ? 500 : -500);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % mockCards.length);
      setOffset(0);
    }, 300);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const diff = e.clientX - startX;
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

  return (
    <section className={styles.swipeDemo}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.subheading}>Our Approach</p>
          <h2>Swap your <span className={styles.highlighted}>skill.</span></h2>
        </div>
{/* 
        <div className={styles.decorativeWrapper}>
          <div className={styles.decorativeArrow}>↗</div>
        </div> */}
        
        <div className={styles.leftContent}>
          <p className={styles.description}>
            Swipe to meet people in Bangalore who want to swap skills. You teach guitar, 
            they teach pottery. Simple, social, and actually useful—no awkward small talk required.
          </p>
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
            >
            {mockCards.map((card, index) => (
                <SkillCard
                  key={card.id}
                  id={card.id}
                  skills={card.skills}
                  primarySkill={card.primarySkill}
                  avatar={card.avatar}
                  name={card.name}
                  age={card.age}
                  bio={card.bio}
                  index={index}
                  isVisible={index === currentIndex || index === (currentIndex + 1) % mockCards.length}
                  offset={index === currentIndex ? offset : 0}
                />
              ))}
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
