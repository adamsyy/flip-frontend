import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';
import { HeroSection } from './components/HeroSection/HeroSection';
import { WaitlistForm } from './components/WaitlistForm/WaitlistForm';
import { SwipeDemo } from './components/SwipeDemo/SwipeDemo';
import { Footer } from './components/Footer/Footer';
import { CreatorsPage } from './components/CreatorsPage/CreatorsPage';
import WhyFlip from './pages/WhyFlip/WhyFlip';
import styles from './App.module.css';

function HomePage() {
  return (
    <>
      <div id="swipe">
        <SwipeDemo />
      </div>

      <HeroSection />

      <div id="waitlist">
        <WaitlistForm />
      </div>
    </>
  );
}

function App() {
  return (
    <div className={styles.app}>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/whyFlip" element={<WhyFlip />} />
        <Route path="/creators" element={<CreatorsPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
