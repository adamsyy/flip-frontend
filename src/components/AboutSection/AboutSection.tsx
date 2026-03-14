import styles from './AboutSection.module.css';

export default function AboutSection() {
  return (
    <section className={styles.about}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <h2>
            <span className={styles.headingAccent}>Why</span> Flip Exists.
          </h2>
          <p>
            The best way to learn a skill is from someone who actually practices it. Not from courses. But from real people, sharing what they know.
          </p>
          {/* <span className={styles.dot} /> */}
        </div>

        <div className={styles.exchange}>
          <div className={styles.profileCard}>
            <div className={styles.profileHeader}>
              <img
                className={styles.profileImage}
                src="https://scontent.fblr24-4.fna.fbcdn.net/v/t39.30808-6/481976898_1199594624869417_4853479793742535583_n.jpg?stp=dst-jpg_s590x590_tt6&_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_ohc=-1tSkuB85JAQ7kNvwGHgnB_&_nc_oc=AdlGlr6xKxfd9bZy44Htm-g7KmJZjOk169GRVy13KgWSqV7ENZA1cWv-cZ2zakA3VSpuW09UJUvFsfoAOLYRN-Wp&_nc_zt=23&_nc_ht=scontent.fblr24-4.fna&_nc_gid=IJkwiLwuz4kMr99WtounxA&oh=00_Afum2qut5zzVj7Fh_wE9dF27g7vJ1zEkW4-UBS5io70saA&oe=6988A472"
                alt="Preethi"
              />
              <div className={styles.profileHeaderText}>
                <span className={styles.profileLabel}>Skill Profile</span>
                <span className={styles.profileName}>Preethi</span>
                <span className={styles.profileLocation}>Koramangala, Bengaluru</span>
              </div>
            </div>
            <div className={styles.profileDivider} />
            <span className={styles.profileTag}>Teaches: 🎸 Guitar</span>
          </div>

          <div className={styles.exchangeCenter}>
            <div className={styles.exchangeLine} aria-hidden="true" />
            <div className={styles.exchangeBadge} aria-hidden="true">↺</div>
            <p className={styles.exchangeQuote}>
              Preethi trades Guitar for Naslin&apos;s Photography. That&apos;s Flip.
            </p>
          </div>

          <div className={styles.profileCard}>
            <div className={styles.profileHeader}>
              <img
                className={styles.profileImage}
                src="https://clickinkerala.com/wp-content/uploads/2025/04/Naslen-K-Gafoor-3.jpg"
                alt="Naslin"
              />
              <div className={styles.profileHeaderText}>
                <span className={styles.profileLabel}>Skill Profile</span>
                <span className={styles.profileName}>Naslin</span>
                <span className={styles.profileLocation}>HSR Layout, Bengaluru</span>
              </div>
            </div>
            <div className={styles.profileDivider} />
            <span className={styles.profileTag}>Teaches: 📷 Photography</span>
          </div>
        </div>


        <div className={styles.missionHero}>
          <p className={styles.flipToday}>The biiger picture</p>
          <div className={styles.missionText}>
            <h3>Build a world where</h3>
            <svg className={styles.missionArrow} viewBox="0 0 100 100" aria-hidden="true">
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <polygon points="0 0, 10 3, 0 6" fill="#d4364f" />
                </marker>
              </defs>
              <path d="M 20 10 Q 50 50 80 90" stroke="#d4364f" strokeWidth="2.5" fill="none" markerEnd="url(#arrowhead)" />
            </svg>
            <h3 className={styles.missionSubtext}> skills come first. Always.</h3>
          </div>
        </div>

        <div className={styles.valuesSection}>
          <div className={styles.valuesContent}>
            <p className={styles.valuesLabel}>Our Core Belief</p>
            <h3>Real learning happens between real people.</h3>
            <p>
   
Skill by skill, trust is built — not through metrics,
but through shared curiosity.

In a world obsessed with visibility,
we believe knowledge still matters.
And real connection matters more.

That’s why Flip exists.
            </p>
            <p>
              That's why Flip exists.
            </p>
          </div>
        </div>

        <div className={styles.values}>
          <div className={styles.valueCard}>
            <span className={styles.valuePill}>No Followers</span>
            <p>You're here to learn, not perform. We're peers, not an audience.</p>
          </div>
          <div className={styles.valueCard}>
            <span className={styles.valuePill}>No Flexing</span>
            <p>Curiosity beats clout. The craft matters way more than the credits.</p>
          </div>
          <div className={styles.valueCard}>
            <span className={styles.valuePill}>Real Talk</span>
            <p>Skip the weather. Talk about what you actually care about.</p>
          </div>
        </div>

        <div className={styles.bannerSection}>
          <div className={styles.bannerContent}>
            <h3>Made for Namma Bengaluru</h3>
            <p>Where creators trade skills, not followers. Ready to swap?</p>
            <button className={styles.bannerButton}>Join the Community</button>
          </div>
          <div className={styles.bannerImageWrapper}>
            <img
              className={styles.bannerImage}
              src="https://media.istockphoto.com/id/1382865466/photo/bangalore-or-bengaluru.jpg?s=612x612&w=0&k=20&c=4Vm2X10GG8fmNSUnKiUepxs7spvExtrFY7lLYKGHjEs="
              alt="Bengaluru"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

