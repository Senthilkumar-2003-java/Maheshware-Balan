import React from 'react';
import Hero from '../components/Hero';
import Programs from '../components/Programs';
import Impact from '../components/Impact';
import OurStory from '../components/OurStory';
import Testimonials from '../components/Testimonials';
import DonationCTA from '../components/DonationCTA';

export default function Home({ onOpenDonate, onOpenVideo, onOpenVolunteer }) {
  return (
    <main>
      {/* SECTION 1: HERO */}
      <Hero onOpenDonate={onOpenDonate} onOpenVideo={onOpenVideo} />

      {/* SECTION 2: OUR PROGRAMS */}
      <Programs />

      {/* SECTION 3: IMPACT */}
      <Impact onOpenDonate={onOpenDonate} />

      {/* SECTION 4: OUR STORY */}
      <OurStory />

      {/* SECTION 5: TESTIMONIALS */}
      <Testimonials />

      {/* SECTION 6: DONATION CTA */}
      <DonationCTA onOpenDonate={onOpenDonate} onOpenVolunteer={onOpenVolunteer} />
    </main>
  );
}
