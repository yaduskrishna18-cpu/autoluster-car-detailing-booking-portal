import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const pricingPlans = [
  {
    category: 'Normal Wash',
    description: 'A quick, thorough exterior clean.',
    prices: {
      Hatchback: '₹499',
      Sedan: '₹699',
      SUV: '₹899',
    }
  },
  {
    category: 'Interior Detailing',
    description: 'Deep cleaning for a fresh cabin.',
    prices: {
      Hatchback: '₹1,499',
      Sedan: '₹1,999',
      SUV: '₹2,499',
    }
  },
  {
    category: 'Full Body Detailing',
    description: 'Complete restoration inside and out.',
    prices: {
      Hatchback: '₹3,499',
      Sedan: '₹4,499',
      SUV: '₹5,999',
    }
  },
  {
    category: 'Ceramic Coating',
    description: 'Ultimate long-lasting protection.',
    prices: {
      Hatchback: '₹5,999',
      Sedan: '₹7,999',
      SUV: '₹9,999',
    }
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Transparent Pricing</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Premium quality without the hidden costs. Select your vehicle type to see specific pricing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.category}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              <h3 className="text-xl font-bold mb-2">{plan.category}</h3>
              <p className="text-gray-500 text-sm mb-8">{plan.description}</p>
              
              <div className="space-y-4 mb-8 flex-grow">
                {Object.entries(plan.prices).map(([type, price]) => (
                  <div key={type} className="flex justify-between items-center border-b border-gray-50 pb-2">
                    <span className="text-gray-600 font-medium">{type}</span>
                    <span className="font-semibold text-lg">{price}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/booking"
                className="w-full py-3 rounded-full border border-black text-center font-medium hover:bg-black hover:text-white transition-colors"
              >
                Book Now
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
