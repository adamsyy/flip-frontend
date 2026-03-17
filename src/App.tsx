import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';
import { HeroSection } from './components/HeroSection/HeroSection';
import { WaitlistForm } from './components/WaitlistForm/WaitlistForm';
import { SwipeDemo } from './components/SwipeDemo/SwipeDemo';
import { Footer } from './components/Footer/Footer';
import { CreatorsPage } from './components/CreatorsPage/CreatorsPage';
import { OnboardPage } from './pages/OnboardPage/OnboardPage';
import WhyFlip from './pages/WhyFlip/WhyFlip';
import { LegalPage } from './pages/LegalPage/LegalPage';
import { SEO } from './components/SEO/SEO';
import styles from './App.module.css';

function HomePage() {
  return (
    <main>
      <SEO 
        title="Find your people. Trade your craft."
        description="Connect with top creators in Bengaluru. Swap skills like design, coding, photography, and more. The professional networking app for high-intent creatives. Join the skill exchange revolution."
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
      </Routes>


      <Footer />
    </div>
  );
}

export default App;
