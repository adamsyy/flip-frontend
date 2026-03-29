import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';
import { HeroSection } from './components/HeroSection/HeroSection';
import { WaitlistForm } from './components/WaitlistForm/WaitlistForm';
import { SwipeDemo } from './components/SwipeDemo/SwipeDemo';
import { Footer } from './components/Footer/Footer';
import { CreatorsPage } from './components/CreatorsPage/CreatorsPage';
import { OnboardPage } from './pages/OnboardPage/OnboardPage';
import WhyFlip from './pages/WhyFlip/WhyFlip';
import { LevelsPage } from './pages/LevelsPage/LevelsPage';
import { LegalPage } from './pages/LegalPage/LegalPage';
import { AdminPage } from './pages/AdminPage/AdminPage';
import { SEO } from './components/SEO/SEO';
import styles from './App.module.css';

function HomePage() {
  return (
    <main>
      <SEO
        title="The Elite Circle"
        description="The exclusive skill-swapping community in Bengaluru. Swap your craft, build your legacy."
      />
      <div id="swipe">
        <SwipeDemo />
      </div>

      <HeroSection />

      <div id="waitlist">
        <WaitlistForm />
      </div>
    </main>
  );
}

function App() {
  return (
    <div className={styles.app}>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/whyFlip" element={<WhyFlip />} />
        <Route path="/privacy" element={<LegalPage type="privacy" />} />
        <Route path="/terms" element={<LegalPage type="terms" />} />
        <Route path="/creators" element={<CreatorsPage />} />
        <Route path="/onboard" element={<OnboardPage />} />
        <Route path="/levels" element={<LevelsPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>


      <Footer />
    </div>
  );
}

export default App;
