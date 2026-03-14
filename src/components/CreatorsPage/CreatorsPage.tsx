import { useState } from 'react';
import styles from './CreatorsPage.module.css';

interface Creator {
  id: number;
  name: string;
  avatar: string;
  skills: string[];
  primarySkill: string;
  bio: string;
  age?: number;
  highlights: string[];
}

const creators: Creator[] = [
  { id: 1, skills: ['Guitar', 'Music Production', 'Piano'], primarySkill: 'Guitar', avatar: 'https://scontent.fblr24-4.fna.fbcdn.net/v/t39.30808-6/481976898_1199594624869417_4853479793742535583_n.jpg?stp=dst-jpg_s590x590_tt6&_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_ohc=-1tSkuB85JAQ7kNvwGHgnB_&_nc_oc=AdlGlr6xKxfd9bZy44Htm-g7KmJZjOk169GRVy13KgWSqV7ENZA1cWv-cZ2zakA3VSpuW09UJUvFsfoAOLYRN-Wp&_nc_zt=23&_nc_ht=scontent.fblr24-4.fna&_nc_gid=IJkwiLwuz4kMr99WtounxA&oh=00_Afum2qut5zzVj7Fh_wE9dF27g7vJ1zEkW4-UBS5io70saA&oe=6988A472', name: 'Preety Mukundan', age: 27, bio: "Guitarist who moonlights in music production. Teach me pottery?", highlights: ['500K+ Instagram followers', 'Music producer & performer', 'Featured in Rolling Stone India'] },
  { id: 2, skills: ['Skating', 'street art', 'Djing'], primarySkill: 'Skating', avatar: 'https://vefeast.com/wp-content/uploads/Riya-Shibu-Cute-Photo.jpg', name: 'Riya Shibu', age: 26, bio: "Seriously down for anyone who'll teach me baking instead of my stock-market rants.", highlights: ['Professional skateboarder', 'Street art exhibitions in 3 cities', 'DJ at top Bengaluru clubs'] },
  { id: 3, skills: ['Photography', 'Web Design', 'Graphic Design'], primarySkill: 'Photography', avatar: 'https://clickinkerala.com/wp-content/uploads/2025/04/Naslen-K-Gafoor-3.jpg', name: 'Nasleen', age: 24, bio: "Coffee-fueled photographer; looking to learn DJing and actual talking skills.", highlights: ['10M+ Instagram followers', 'Content creator award winner 2026', 'Brand photographer for 20+ companies'] },
  { id: 4, skills: ['Yoga', 'Fitness', 'Meditation'], primarySkill: 'Yoga', avatar: 'https://www.gethucinema.com/wp-content/uploads/2022/12/HaniyaNafisa-153.jpg', name: 'Haniya', age: 29, bio: "Fitness coach who loves chai; wants to learn film photography.", highlights: ['Certified yoga instructor', '1M+ YouTube subscribers', 'Founded wellness studio in Koramangala'] }
];

export const CreatorsPage = () => {
  const [likedCreators, setLikedCreators] = useState<number[]>([]);

  const handleLike = (id: number) => {
    if (!likedCreators.includes(id)) {
      setLikedCreators([...likedCreators, id]);
    }
  };

  return (
    <div className={styles.creatorsPage}>
      <div className={styles.header}>
        <h1 className={styles.title}>Meet Our Creators</h1>
        <p className={styles.subtitle}>Connect with talented individuals in Bengaluru's skill-sharing community</p>
      </div>

      <div className={styles.creatorsGrid}>
        {creators.map((creator, index) => {
          const isEven = index % 2 === 0;
          const isLiked = likedCreators.includes(creator.id);
          
          return (
            <div key={creator.id} className={`${styles.creatorRow} ${isEven ? styles.cardLeft : styles.cardRight}`}>
              {/* Card */}
              <div className={styles.cardContainer}>
                <div className={styles.card}>
                  <div className={styles.imageContainer}>
                    <img src={creator.avatar} alt={creator.name} className={styles.profileImage} />
                    <span className={styles.statusBadge}>Verified Creator</span>
                    <div className={styles.overlay}></div>
                  </div>
                  
                  <div className={styles.cardContent}>
                    <div className={styles.headerRow}>
                      <h3 className={styles.name}>{creator.name}</h3>
                    </div>

                    <div className={styles.skillsContainer}>
                      <div className={styles.primarySkill}>
                        <span className={styles.skillIcon}>⭐</span>
                        <span>{creator.primarySkill}</span>
                      </div>
                      <div className={styles.skillTags}>
                        {creator.skills.slice(0, 2).map((skill, idx) => (
                          <span key={idx} className={styles.skillTag}>{skill}</span>
                        ))}
                      </div>
                    </div>

                    <button 
                      className={`${styles.likeButton} ${isLiked ? styles.liked : ''}`}
                      onClick={() => handleLike(creator.id)}
                    >
                      {isLiked ? '❤️ Liked' : '🤍 Connect'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className={styles.descriptionContainer}>
                <div className={styles.description}>
                  <h2 className={styles.descTitle}>{creator.name}{creator.age && <span className={styles.age}>, {creator.age}</span>}</h2>
                  <p className={styles.descText}>{creator.bio}</p>
                  
                  <div className={styles.highlightsList}>
                    {creator.highlights.map((highlight, idx) => (
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
    </div>
  );
};
