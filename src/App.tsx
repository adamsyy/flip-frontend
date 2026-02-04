import { Navbar } from './components/Navbar/Navbar';
import { HeroSection } from './components/HeroSection/HeroSection';
import { WaitlistForm } from './components/WaitlistForm/WaitlistForm';
import { SwipeDemo } from './components/SwipeDemo/SwipeDemo';
import AboutSection from './components/AboutSection/AboutSection';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.app}>
      <Navbar />

      <div id="swipe">
        <SwipeDemo />
      </div>

      <HeroSection />

      <div id="waitlist">
        <WaitlistForm />
      </div>

      <div id="about">
        <AboutSection />
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <p>&copy; 2026 Flip. Skills are the new social currency.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
