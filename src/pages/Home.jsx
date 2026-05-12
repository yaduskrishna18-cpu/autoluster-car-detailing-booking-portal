import Hero from '../components/Hero';
import Services from '../components/Services';
import Pricing from '../components/Pricing';
import ComboOffers from '../components/ComboOffers';
import Subscriptions from '../components/Subscriptions';
import Reviews from '../components/Reviews';

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <Services />
      <Pricing />
      <ComboOffers />
      <Subscriptions />
      <Reviews />
    </div>
  );
}

