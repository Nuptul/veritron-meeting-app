import React from 'react';
import VideoHero from '../components/VideoHero';
import Services from '../components/Services';
import ValuePropositions from '../components/ValuePropositions';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section id="hero">
        <VideoHero />
      </section>

      {/* Navigation Cards Section removed per request */}

      {/* Value Propositions Section */}
      <ValuePropositions />

      {/* Services Section - Now includes integrated contact form */}
      <section id="services" className="py-20">
        <Services />
      </section>
    </div>
  );
};

export default Home;