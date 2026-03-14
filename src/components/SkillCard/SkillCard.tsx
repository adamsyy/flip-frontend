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
  index: number;
  isVisible: boolean;
  offset: number;
}

export const SkillCard: React.FC<SkillCardProps> = ({ 
  skills,
  primarySkill,
  avatar, 
  name, 
  age,
  bio,
  index,
  isVisible,
  offset 
}) => {
  const baseRotation = -4;
  const cardStyle: CSSProperties = {
    transform: `translateX(${offset}px) scale(${1 - Math.abs(offset) * 0.001}) rotate(${baseRotation}deg)`,
    opacity: isVisible ? 1 : 0,
    zIndex: 100 - index,
  };

  return (
    <div className={styles.cardWrapper} style={cardStyle}>
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <img src={avatar} alt={name} className={styles.profileImage} />
          <span className={styles.statusBadge}>Verified Creator</span>
          <div className={styles.overlay}></div>
        </div>
        
        <div className={styles.content}>
          <div className={styles.headerRow}>
            <h3 className={styles.name}>{name}</h3>
            {age && <span className={styles.age}>{age}</span>}
          </div>

          {bio && <p className={styles.bio}>{bio}</p>}

          <div className={styles.divider} />

          <div className={styles.skillsContainer}>
            {skills.map((skill) => (
              <div
                key={skill}
                className={`${styles.skillBadge} ${
                  skill === primarySkill ? styles.primarySkillBadge : ''
                }`}
              >
                {skill}
             
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
