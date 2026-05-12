import { motion } from 'framer-motion';
import { Droplets, Sparkles, CarFront, ShieldCheck } from 'lucide-react';

const services = [
  {
    id: 1,
    title: 'Normal Car Wash',
    icon: <Droplets size={32} className="text-gray-800" />,
    features: ['Exterior wash', 'Foam wash', 'Tire cleaning', 'Quick dry'],
  },
  {
    id: 2,
    title: 'Full Body Detailing',
    icon: <CarFront size={32} className="text-gray-800" />,
    features: ['Paint enhancement', 'Premium polishing', 'Surface protection', 'Exterior restoration'],
  },
  {
    id: 3,
    title: 'Interior Detailing',
    icon: <Sparkles size={32} className="text-gray-800" />,
    features: ['Seat deep cleaning', 'Dashboard restoration', 'Vacuum cleaning', 'Odor removal'],
  },
  {
    id: 4,
    title: 'Ceramic Coating',
    icon: <ShieldCheck size={32} className="text-gray-800" />,
    features: ['Long-lasting shine', 'Paint protection', 'Hydrophobic coating', 'Premium finish'],
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Our Premium Services</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Meticulous attention to detail for every inch of your vehicle. We use only the finest products and techniques.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-gray-50 rounded-2xl p-8 hover:bg-black transition-colors duration-500 cursor-default"
            >
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4 group-hover:text-white transition-colors duration-500">
                {service.title}
              </h3>
              <ul className="space-y-3">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-600 group-hover:text-gray-300 transition-colors duration-500 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-white/30 mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
