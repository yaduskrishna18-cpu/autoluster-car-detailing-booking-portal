import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, MessageSquare, Trash2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Reviews() {
  const { reviews, addReview, deleteReview, currentUser } = useAppContext();
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', vehicle: '', rating: 5, comment: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newReview.name && newReview.comment) {
      // Assign authorId to the current user if logged in, else an anonymous tag
      addReview({ ...newReview, authorId: currentUser ? currentUser.id : `anon-${Date.now()}` });
      setShowForm(false);
      setNewReview({ name: '', vehicle: '', rating: 5, comment: '' });
    }
  };

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {reviews.slice(0, 3).map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 mb-6">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#0a0a0a" className="text-[#0a0a0a]" />
                  ))}
                </div>
                <p className="text-gray-600 mb-8 italic">"{review.comment}"</p>
              </div>
              <div className="flex items-center justify-between gap-4 mt-auto">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-500">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{review.name}</h4>
                    <p className="text-xs text-gray-500">{review.vehicle}</p>
                  </div>
                </div>
                {currentUser && (currentUser.id === review.authorId || currentUser.role === 'admin') && (
                  <button 
                    onClick={() => deleteReview(review.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Leave a Review Section */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm max-w-2xl mx-auto">
          {!showForm ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                <MessageSquare size={24} className="text-gray-800" />
              </div>
              <h3 className="text-xl font-bold mb-2">Share Your Experience</h3>
              <p className="text-gray-500 mb-6 text-sm">Help others discover the Autoluster difference by leaving a review.</p>
              <button 
                onClick={() => setShowForm(true)}
                className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors"
              >
                Write a Review
              </button>
            </div>
          ) : (
            <motion.form 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <h3 className="text-xl font-bold mb-4">Rate our Service</h3>
              
              <div className="flex gap-2 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button type="button" key={star} onClick={() => setNewReview({...newReview, rating: star})}>
                    <Star size={32} fill={newReview.rating >= star ? "#0a0a0a" : "none"} className={newReview.rating >= star ? "text-[#0a0a0a]" : "text-gray-300"} />
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required type="text" placeholder="Your Name" value={newReview.name} onChange={e => setNewReview({...newReview, name: e.target.value})} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-1 focus:ring-black outline-none" />
                <input placeholder="Vehicle Model (Optional)" value={newReview.vehicle} onChange={e => setNewReview({...newReview, vehicle: e.target.value})} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-1 focus:ring-black outline-none" />
              </div>
              
              <textarea required rows={4} placeholder="Tell us about your experience..." value={newReview.comment} onChange={e => setNewReview({...newReview, comment: e.target.value})} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-1 focus:ring-black outline-none resize-none" />
              
              <div className="flex gap-4 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 px-6 py-3 border border-gray-200 rounded-xl font-medium hover:bg-gray-50">Cancel</button>
                <button type="submit" className="flex-1 bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800">Submit Review</button>
              </div>
            </motion.form>
          )}
        </div>

      </div>
    </section>
  );
}
