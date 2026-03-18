import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LevelsPage.module.css';
import { SEO } from '../../components/SEO/SEO';

export const LevelsPage: React.FC = () => {
  const navigate = useNavigate();

  const handleApplyClick = () => {
    navigate('/');
    // Use a small delay to ensure the HomePage has rendered before trying to scroll
    setTimeout(() => {
      const element = document.getElementById('waitlist');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 120);
  };

  return (
    <main className={styles.container}>
      <SEO 
        title="Membership Tiers"
        description="The structure of exclusivity within the Flip Elite Circle."
      />
      
      <div className={styles.header}>
        <h1>Tiers of <br />The Circle</h1>
        <p>
          Flip is a structured ecosystem. Your level defines your league, your visibility, and the depth of your connections.
          Levels are determined by craft mastery, community impact, and peer recognition. Your story begins at Level 01.
        </p>
      </div>

      <div className={styles.tiersGrid}>
        {/* Level 1: The Member */}
        <div className={styles.tierCard}>
          <span className={styles.tierLevel}>Level 01</span>
          <h2 className={styles.tierName}>✧ The Member</h2>
          <div className={styles.tierStatus}>ACTIVE / OPEN</div>
          <p className={styles.tierDescription}>
            The foundation of our movement. Entry point for all vetted creative voices in the city. 
            Connect, swap, and build your reputation within the broader Flip ecosystem.
          </p>
          <button className={styles.ctaBtn} onClick={handleApplyClick}>Join the Waitlist</button>
        </div>

        {/* Level 2: The Signature */}
        <div className={`${styles.tierCard} ${styles.unrevealedCard}`}>
          <span className={styles.tierLevel}>Level 02</span>
          <h2 className={styles.tierName}>✧ The Signature</h2>
          <div className={styles.tierStatus}>REVEALING SOON</div>
          <p className={styles.tierDescription}>
            The professional standard for established masters within the creative guilds. 
            Access and visibility protocols for the Signature tier are restricted to verified members only.
          </p>
        </div>

        {/* Level 3: The Elite Circle */}
        <div className={styles.tierCard}>
          <span className={styles.tierLevel}>Level 03</span>
          <h2 className={styles.tierName}>
            ✧ The Elite Circle 
            <span className={styles.eliteBadge}>Invite Only</span>
          </h2>
          <div className={styles.tierStatus}>LIFETIME LEGACY</div>
          <p className={styles.tierDescription}>
            The pinnacle of the community. Strictly limited to the city's established creative leaders and pioneers. 
            Unrestricted access across all tiers and entry to private guilds.
          </p>
        </div>
      </div>

    </main>
  );
};
