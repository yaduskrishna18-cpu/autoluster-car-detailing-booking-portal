import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, CarFront, Check, ChevronRight } from 'lucide-react';

const pricingData = {
  'Normal Wash': { Hatchback: 499, Sedan: 699, SUV: 899, 'Luxury Vehicle': 1299 },
  'Interior Detailing': { Hatchback: 1499, Sedan: 1999, SUV: 2499, 'Luxury Vehicle': 3499 },
  'Full Body Detailing': { Hatchback: 3499, Sedan: 4499, SUV: 5999, 'Luxury Vehicle': 7999 },
  'Ceramic Coating': { Hatchback: 5999, Sedan: 7999, SUV: 9999, 'Luxury Vehicle': 12999 },
  'Shine Combo': { Hatchback: 1799, Sedan: 1799, SUV: 1799, 'Luxury Vehicle': 1799 },
  'Premium Protection Combo': { Hatchback: 8999, Sedan: 8999, SUV: 8999, 'Luxury Vehicle': 8999 },
  'Complete Luxury Package': { Hatchback: 11999, Sedan: 11999, SUV: 11999, 'Luxury Vehicle': 11999 },
};

const serviceTypes = Object.keys(pricingData);
const vehicleTypes = ['Hatchback', 'Sedan', 'SUV', 'Luxury Vehicle'];

export default function Booking() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: '',
    vehicleType: '',
    vehicleModel: '',
    date: '',
    time: '',
    location: '',
    notes: ''
  });
  
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (formData.service && formData.vehicleType) {
      setTotalPrice(pricingData[formData.service][formData.vehicleType] || 0);
    } else {
      setTotalPrice(0);
    }
  }, [formData.service, formData.vehicleType]);

  const updateForm = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isStep1Valid = formData.service && formData.vehicleType;
  const isStep2Valid = formData.date && formData.time && formData.location;

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#fafafa] flex justify-center">
      <div className="max-w-6xl w-full mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Main Form Area */}
        <div className="lg:col-span-2">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Book Your Detailing</h1>
            <p className="text-gray-500">Premium service at your convenience. Fill out the details below.</p>
          </div>

          {/* Stepper */}
          <div className="flex items-center gap-4 mb-10">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold transition-colors ${step >= 1 ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
            <div className={`h-1 flex-grow rounded-full ${step >= 2 ? 'bg-black' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold transition-colors ${step >= 2 ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
            <div className={`h-1 flex-grow rounded-full ${step >= 3 ? 'bg-black' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold transition-colors ${step >= 3 ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'}`}>3</div>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative overflow-hidden min-h-[500px]">
            <AnimatePresence mode="wait">
              {/* STEP 1: Service & Vehicle */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-bold mb-6">Select Service & Vehicle</h2>
                  
                  <div className="space-y-8">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Service Type</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {serviceTypes.map(service => (
                          <button
                            key={service}
                            onClick={() => updateForm('service', service)}
                            className={`p-4 text-left border rounded-xl transition-all ${
                              formData.service === service 
                                ? 'border-black bg-gray-50 ring-1 ring-black' 
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <span className="font-medium">{service}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Vehicle Type</label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {vehicleTypes.map(type => (
                          <button
                            key={type}
                            onClick={() => updateForm('vehicleType', type)}
                            className={`p-4 text-center border rounded-xl flex flex-col items-center gap-2 transition-all ${
                              formData.vehicleType === type 
                                ? 'border-black bg-gray-50 ring-1 ring-black' 
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <CarFront size={24} className={formData.vehicleType === type ? 'text-black' : 'text-gray-400'} />
                            <span className="text-sm font-medium">{type}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Model (Optional)</label>
                      <input 
                        type="text" 
                        placeholder="e.g. BMW 5 Series, Mercedes C-Class"
                        value={formData.vehicleModel}
                        onChange={(e) => updateForm('vehicleModel', e.target.value)}
                        className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                      />
                    </div>
                  </div>

                  <div className="mt-10 flex justify-end">
                    <button 
                      onClick={() => setStep(2)}
                      disabled={!isStep1Valid}
                      className="bg-black text-white px-8 py-3 rounded-full font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors"
                    >
                      Next Step <ChevronRight size={18} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Date & Location */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-bold mb-6">Schedule & Location</h2>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date</label>
                        <div className="relative">
                          <input 
                            type="date" 
                            value={formData.date}
                            onChange={(e) => updateForm('date', e.target.value)}
                            className="w-full p-4 pl-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-black focus:border-black appearance-none bg-white"
                          />
                          <Calendar size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time</label>
                        <div className="relative">
                          <select 
                            value={formData.time}
                            onChange={(e) => updateForm('time', e.target.value)}
                            className="w-full p-4 pl-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-black focus:border-black appearance-none bg-white"
                          >
                            <option value="" disabled>Select time slot</option>
                            <option value="09:00 AM">09:00 AM - 11:00 AM</option>
                            <option value="11:00 AM">11:00 AM - 01:00 PM</option>
                            <option value="02:00 PM">02:00 PM - 04:00 PM</option>
                            <option value="04:00 PM">04:00 PM - 06:00 PM</option>
                          </select>
                          <Clock size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Service Location (Full Address)</label>
                      <div className="relative">
                        <textarea 
                          rows="3"
                          placeholder="Enter your complete address..."
                          value={formData.location}
                          onChange={(e) => updateForm('location', e.target.value)}
                          className="w-full p-4 pl-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-black focus:border-black resize-none"
                        ></textarea>
                        <MapPin size={20} className="absolute left-4 top-5 text-gray-400" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Additional Requests (Optional)</label>
                      <textarea 
                        rows="2"
                        placeholder="Any specific stains, concerns, or instructions?"
                        value={formData.notes}
                        onChange={(e) => updateForm('notes', e.target.value)}
                        className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-black focus:border-black resize-none"
                      ></textarea>
                    </div>
                  </div>

                  <div className="mt-10 flex justify-between">
                    <button 
                      onClick={() => setStep(1)}
                      className="text-black px-6 py-3 rounded-full font-medium border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                    <button 
                      onClick={() => setStep(3)}
                      disabled={!isStep2Valid}
                      className="bg-black text-white px-8 py-3 rounded-full font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors"
                    >
                      Review & Confirm <ChevronRight size={18} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Success Confirmation (Mocked) */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center h-full pt-10"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <Check size={40} className="text-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4">Booking Confirmed!</h2>
                  <p className="text-gray-500 mb-8 max-w-md">
                    Thank you for choosing Autoluster. Your premium detailing service has been scheduled for {formData.date} at {formData.time}. We will send a confirmation via SMS shortly.
                  </p>
                  <button 
                    onClick={() => {
                      setStep(1);
                      setFormData({service:'', vehicleType:'', vehicleModel:'', date:'', time:'', location:'', notes:''});
                    }}
                    className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors"
                  >
                    Book Another Service
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-[#111111] text-white rounded-3xl p-8 sticky top-32 border border-white/10 shadow-xl">
            <h3 className="text-xl font-bold mb-6 pb-6 border-b border-white/10">Order Summary</h3>
            
            <div className="space-y-4 mb-8 text-sm">
              <div className="flex justify-between items-start">
                <span className="text-gray-400">Service:</span>
                <span className="font-medium text-right max-w-[150px]">{formData.service || 'Not selected'}</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-gray-400">Vehicle:</span>
                <span className="font-medium text-right">{formData.vehicleType || 'Not selected'}</span>
              </div>
              {formData.date && (
                <div className="flex justify-between items-start pt-4 border-t border-white/5">
                  <span className="text-gray-400">Date:</span>
                  <span className="font-medium text-right">{formData.date}</span>
                </div>
              )}
              {formData.time && (
                <div className="flex justify-between items-start">
                  <span className="text-gray-400">Time:</span>
                  <span className="font-medium text-right">{formData.time}</span>
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-white/10 mt-auto">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">Estimated Total</span>
              </div>
              <div className="text-4xl font-bold tracking-tight">
                {totalPrice > 0 ? `₹${totalPrice.toLocaleString()}` : '₹0'}
              </div>
              <p className="text-xs text-gray-500 mt-4">Taxes and additional charges may apply based on vehicle condition upon inspection.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

