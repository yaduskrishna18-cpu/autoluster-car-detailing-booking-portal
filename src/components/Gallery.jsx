import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Maximize2, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Gallery() {
  const { galleryWorks, deleteGalleryWork, currentUser } = useAppContext();
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section id="gallery" className="py-24 bg-[#0a0a0a] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
          >
            Recent Works
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            A glimpse into the perfection we deliver. Hover over images to see the stunning "Before" and "After" transformations.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryWorks.map((work, index) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group h-[400px] rounded-3xl overflow-hidden bg-[#111]"
            >
              {/* Image Split logic (Hover to reveal After, default Before... Wait, actually standard is default After, hover to see Before, or vice versa. Let's do default After, hover for Before) */}
              <div className="absolute inset-0 w-full h-full">
                <img src={work.afterImg} alt={`${work.title} - After`} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0" />
                <img src={work.beforeImg} alt={`${work.title} - Before`} className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                
                {/* Labels */}
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded transition-opacity duration-500 group-hover:opacity-0">After</div>
                <div className="absolute top-4 left-4 bg-red-600/80 backdrop-blur-md text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded opacity-0 transition-opacity duration-500 group-hover:opacity-100">Before</div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <p className="text-white font-bold text-lg mb-2">{work.title}</p>
                <div className="flex items-center justify-between">
                  <button 
                    onClick={() => setSelectedImage(work)}
                    className="text-gray-300 hover:text-white flex items-center gap-2 text-sm"
                  >
                    <Maximize2 size={16} /> Full View
                  </button>
                  {currentUser && (currentUser.id === work.authorId || currentUser.role === 'admin') && (
                    <button 
                      onClick={() => deleteGalleryWork(work.id)}
                      className="text-red-500 hover:text-red-400 p-2 bg-red-500/10 rounded-full"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fullscreen Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          >
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white hover:text-gray-300 z-10 bg-black/50 p-2 rounded-full"
            >
              <X size={32} />
            </button>
            <div className="flex flex-col md:flex-row max-w-6xl w-full gap-4">
              <div className="flex-1">
                <p className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-2 text-center">Before</p>
                <img src={selectedImage.beforeImg} alt="Before" className="w-full h-auto max-h-[70vh] object-contain rounded-xl" />
              </div>
              <div className="flex-1">
                <p className="text-green-400 text-sm font-bold uppercase tracking-wider mb-2 text-center">After</p>
                <img src={selectedImage.afterImg} alt="After" className="w-full h-auto max-h-[70vh] object-contain rounded-xl" />
              </div>
            </div>
            <div className="absolute bottom-10 left-0 right-0 text-center">
              <h3 className="text-2xl font-bold">{selectedImage.title}</h3>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
