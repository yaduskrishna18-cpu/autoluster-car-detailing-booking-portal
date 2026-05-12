import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, Shield, Sparkles } from 'lucide-react';

const combos = [
  {
    id: 'shine',
    title: 'Shine Combo',
    price: '₹1,799',
    icon: <Sparkles size={24} className="text-[#a88132]" />,
    features: ['Normal Wash', 'Interior Cleaning', 'Tire Dressing'],
    popular: false,
  },
  {
    id: 'premium',
    title: 'Premium Protection Combo',
    price: '₹8,999',
    icon: <Shield size={24} className="text-[#a88132]" />,
    features: ['Full Body Detailing', 'Ceramic Wash', 'Paint Sealant'],
    popular: true,
  },
  {
    id: 'luxury',
    title: 'Complete Luxury Package',
    price: '₹11,999',
    icon: <Star size={24} className="text-[#a88132]" />,
    features: ['Interior & Exterior Detailing', 'Ceramic Protection', 'Engine Bay Cleaning'],
    popular: false,
  }
];

export default function ComboOffers() {
  return (
    <section id="packages" className="py-24 bg-black text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#a88132] opacity-5 blur-[150px] rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white opacity-5 blur-[150px] rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Luxury Combo Offers</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Get the best value with our curated detailing packages, designed for ultimate vehicle transformation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {combos.map((combo, index) => (
            <motion.div
              key={combo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative bg-[#111111] rounded-3xl p-8 border ${
                combo.popular ? 'border-[#a88132] shadow-[0_0_30px_rgba(168,129,50,0.15)] md:-translate-y-4' : 'border-white/10'
              }`}
            >
              {combo.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#a88132] text-black text-xs font-bold uppercase tracking-wider py-1 px-4 rounded-full">
                  Most Popular
                </div>
              )}
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-[#1a1a1a] flex items-center justify-center border border-white/5">
                  {combo.icon}
                </div>
                <h3 className="text-xl font-bold">{combo.title}</h3>
              </div>
              
              <div className="mb-8">
                <span className="text-4xl font-bold tracking-tight">{combo.price}</span>
              </div>
              
              <ul className="space-y-4 mb-8">
                {combo.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#a88132] mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Link
                to="/booking"
                className={`w-full py-4 rounded-full font-medium transition-all flex items-center justify-center ${
                  combo.popular 
                    ? 'bg-[#a88132] text-black hover:bg-[#bfa054]' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Select Package
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
