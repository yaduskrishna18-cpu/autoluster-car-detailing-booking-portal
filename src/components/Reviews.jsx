import { motion } from 'framer-motion';
import { Star, StarHalf } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'Rahul Sharma',
    vehicle: 'BMW 5 Series',
    rating: 5,
    comment: 'Absolutely stunning work. The ceramic coating they applied to my BMW is flawless. Very professional and convenient service at my home.',
  },
  {
    id: 2,
    name: 'Priya Patel',
    vehicle: 'Range Rover Velar',
    rating: 5,
    comment: 'Autoluster is the only service I trust with my SUV. The interior detailing removed all stains and left it smelling brand new.',
  },
  {
    id: 3,
    name: 'Vikram Singh',
    vehicle: 'Porsche 911',
    rating: 5,
    comment: 'Punctual, meticulous, and premium. The full body detailing exceeded my expectations. Highly recommended for luxury vehicles.',
  }
];

export default function Reviews() {
  return (
    <section id="reviews" className="py-24 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Client Testimonials</h2>
            <p className="text-gray-500 max-w-lg">
              Don't just take our word for it. See what owners of luxury vehicles have to say about the Autoluster experience.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <div className="flex gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={24} fill="#0a0a0a" className="text-[#0a0a0a]" />
              ))}
            </div>
            <p className="text-xl font-bold">4.9 / 5.0</p>
            <p className="text-sm text-gray-500">Based on 500+ reviews</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="#0a0a0a" className="text-[#0a0a0a]" />
                ))}
              </div>
              <p className="text-gray-600 mb-8 italic">"{review.comment}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-500">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-sm">{review.name}</h4>
                  <p className="text-xs text-gray-500">{review.vehicle}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
