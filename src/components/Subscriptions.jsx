import { motion } from 'framer-motion';
import { Crown, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: 'Silver Plan',
    price: '₹2,499',
    period: '/month',
    features: ['4 Normal Washes', 'Standard Priority', 'Basic Support'],
  },
  {
    name: 'Gold Plan',
    price: '₹4,999',
    period: '/month',
    features: ['4 Premium Washes', '1 Interior Cleaning', 'High Priority Booking', 'Premium Support'],
    highlighted: true,
  },
  {
    name: 'Platinum Plan',
    price: '₹8,999',
    period: '/month',
    features: ['Complete monthly detailing', 'Ceramic maintenance', 'Highest Priority Booking', 'Dedicated Manager'],
  }
];

export default function Subscriptions() {
  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <Crown className="text-black" size={24} />
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Premium Memberships</h2>
            </div>
            <p className="text-gray-500">
              Join the Autoluster club for regular, hassle-free car care. Maintain that showroom shine year-round.
            </p>
          </div>
          <Link to="/login" className="text-black font-medium border-b border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition-colors whitespace-nowrap">
            View Member Benefits
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`rounded-3xl p-8 border ${
                plan.highlighted ? 'bg-black text-white border-black' : 'bg-gray-50 border-gray-100'
              }`}
            >
              <h3 className={`text-xl font-bold mb-2 ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                {plan.name}
              </h3>
              <div className="mb-8">
                <span className={`text-4xl font-bold ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                  {plan.price}
                </span>
                <span className={plan.highlighted ? 'text-gray-400' : 'text-gray-500'}>
                  {plan.period}
                </span>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check size={18} className={plan.highlighted ? 'text-white' : 'text-black'} />
                    <span className={plan.highlighted ? 'text-gray-300' : 'text-gray-600'}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                to="/login"
                className={`w-full py-3 rounded-full font-medium text-center block transition-colors ${
                  plan.highlighted 
                    ? 'bg-white text-black hover:bg-gray-100' 
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                Subscribe Now
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
