import { CSSProperties } from 'react';
import styles from './SkillCard.module.css';

interface SkillCardProps {
  id: number;
  skills: string[];
  primarySkill: string;
  avatar: string;
  name: string;
  age?: number;
  bio?: string;
  isTopCard: boolean;
  isNextCard: boolean;
  offset: number;
}

export const SkillCard: React.FC<SkillCardProps> = ({ 
  skills,
  primarySkill,
  avatar, 
  name, 
  age,
  bio,
  isTopCard,
  isNextCard,
  offset 
}) => {
  if (!isTopCard && !isNextCard) return null;

  let cardStyle: CSSProperties = {};

  if (isTopCard) {
    const rotation = offset * 0.05;
    cardStyle = {
      transform: `translateX(${offset}px) translateY(${Math.abs(offset) * 0.05}px) rotate(${rotation}deg)`,
      opacity: 1,
      zIndex: 100,
      transition: offset === 0 ? 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none',
    };
  } else if (isNextCard) {
    const scale =  0.94 + (Math.abs(offset) / 500) * 0.06; 
    const clampedScale = Math.min(scale, 1);
    
    cardStyle = {
      transform: `scale(${clampedScale})`,
      opacity: clampedScale,
      zIndex: 90,
      transition: offset === 0 ? 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none',
      pointerEvents: 'none',
    };
  }

  return (
    <div className={styles.cardWrapper} style={cardStyle}>
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <img src={avatar} alt={name} className={styles.profileImage} />
          <span className={styles.statusBadge}>Verified</span>
          <div className={styles.overlay}></div>
        </div>
        
        <div className={styles.content}>
          <div className={styles.headerRow}>
            <h3 className={styles.name}>{name}{age && <span className={styles.age}>, {age}</span>}</h3>
          </div>

          <div className={styles.skillsContainer}>
            <div className={styles.primarySkillBadge}>
              <span className={styles.skillIcon}>✦</span>
              <span>{primarySkill}</span>
            </div>
            
            <div className={styles.secondarySkills}>
              {skills
                .filter(s => s !== primarySkill)
                .slice(0, 2)
                .map((skill) => (
                  <div key={skill} className={styles.skillBadge}>
                    {skill}
                  </div>
              ))}
            </div>
          </div>

          {bio && <p className={styles.bio}>“{bio}”</p>}
        </div>
      </div>
    </div>
  );
};
