import { useEffect, useState } from 'react';
import { Preloader, Nav } from './components/Chrome';
import {
  Hero,
  Counters,
  Results,
  Categories,
  FortyFive,
  Wedding,
  FatToFit,
  System,
  Personalization,
  WhatsAppCoaching,
  About,
  Testimonials,
  Instagram,
  Programs,
  FinalCta,
  Footer,
  FloatingCtas,
} from './components/Sections';
import { Quiz, ApplyForm, Faq } from './components/Interactive';
import { useReveal } from './hooks/useReveal';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useReveal();

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1700);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className="relative overflow-x-hidden bg-bg">
      <Preloader done={loaded} />
      <Nav scrolled={scrolled} />
      <Hero />
      <Counters />
      <Results />
      <Categories />
      <FortyFive />
      <Wedding />
      <FatToFit />
      <System />
      <Personalization />
      <WhatsAppCoaching />
      <About />
      <Testimonials />
      <Instagram />
      <Programs />
      <Quiz />
      <ApplyForm />
      <Faq />
      <FinalCta />
      <Footer />
      <FloatingCtas />
    </div>
  );
}
