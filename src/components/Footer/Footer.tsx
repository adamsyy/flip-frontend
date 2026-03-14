import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Left Section - Locations */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Community</h3>
            <div className={styles.locationInfo}>
              <a href="mailto:hello@flipyu.in" className={styles.link}>
                connect@flipyu.in
              </a>
              <p className={styles.text}>Namma Bengaluru</p>
              <Link to="/creators" className={styles.mapLink}>FIND CREATORS →</Link>
            </div>
          </div>

          {/* <div className={styles.section}>
            <h3 className={styles.sectionTitle}>COMMUNITY</h3>
            <div className={styles.locationInfo}>
              <a href="mailto:swap@flipyu.in" className={styles.link}>
                swap@flipyu.in
              </a>

            </div>
          </div> */}

          {/* Right Section - Newsletter & Social */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>JOIN THE FLIP MOVEMENT</h3>
            <p className={styles.subtitle}>Get early access to skill swaps, creator stories, and community events in Bengaluru.</p>
            
            <form className={styles.newsletter}>
              <input 
                type="email" 
                placeholder="Your email for early access" 
                className={styles.input}
                required
              />
              <button type="submit" className={styles.submitBtn}>Join Waitlist</button>
            </form>

            <div className={styles.social}>
              <p className={styles.followLabel}>FOLLOW OUR JOURNEY</p>
              <div className={styles.socialLinks}>
                <a href="https://instagram.com/flipyu" target="_blank" rel="noopener noreferrer" className={styles.socialLink} title="Instagram">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://twitter.com/flipyu" target="_blank" rel="noopener noreferrer" className={styles.socialLink} title="Twitter">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            &copy; 2026 Flip. Skills are the new social currency.
          </p>
          <div className={styles.links}>
            <a href="#" className={styles.footerLink}>Privacy</a>
            <a href="#" className={styles.footerLink}>Terms</a>
            <a href="#" className={styles.footerLink}>Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
