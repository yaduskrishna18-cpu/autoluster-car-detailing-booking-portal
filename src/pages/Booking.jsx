import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, CarFront, Check, ChevronRight, Navigation, CreditCard, ShieldCheck } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

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
  const { addBooking } = useAppContext();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: '',
    vehicleType: '',
    vehicleModel: '',
    date: '',
    time: '',
    location: '',
    notes: '',
    paymentMethod: 'card'
  });
  
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLocating, setIsLocating] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [assignedEmployeeId, setAssignedEmployeeId] = useState(null);

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

  const handleGetLocation = () => {
    setIsLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          updateForm('location', `GPS Coordinates: ${position.coords.latitude.toFixed(5)}, ${position.coords.longitude.toFixed(5)}\n[Live Location Fetched]`);
          setIsLocating(false);
        },
        (error) => {
          alert("Unable to retrieve your location. Please enter manually.");
          setIsLocating(false);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
      setIsLocating(false);
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const processPayment = async () => {
    setIsProcessingPayment(true);
    
    const res = await loadRazorpayScript();
      
    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      setIsProcessingPayment(false);
      return;
    }

    const options = {
      key: 'rzp_test_dummykey12345', // Demo Test Key
      amount: totalPrice * 100, // Amount is in currency subunits (paise)
      currency: 'INR',
      name: 'Autoluster Detailing',
      description: `${formData.service} for ${formData.vehicleType}`,
      image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=100',
      handler: function (response) {
        // Payment Success Handler
        const newBooking = addBooking({
          customer: 'Guest User', // Mock customer name
          service: formData.service,
          vehicle: formData.vehicleModel || formData.vehicleType,
          time: formData.time,
          location: formData.location,
          price: totalPrice,
          paymentId: response.razorpay_payment_id
        });
        setAssignedEmployeeId(newBooking.employee);
        setIsProcessingPayment(false);
        setStep(4); // Success step
      },
      prefill: {
        name: 'Guest User',
        email: 'guest@example.com',
        contact: '9946594585' // Requesting owner number
      },
      notes: {
        address: formData.location
      },
      theme: {
        color: '#000000'
      }
    };

    const paymentObject = new window.Razorpay(options);
    
    paymentObject.on('payment.failed', function (response){
      alert('Payment Failed: ' + response.error.description);
      setIsProcessingPayment(false);
    });
    
    // If the modal is closed without success or failure
    paymentObject.on('payment.modal.closed', function() {
        setIsProcessingPayment(false);
    });
    
    paymentObject.open();
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
          <div className="flex items-center gap-2 mb-10 text-sm font-medium">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${step >= 1 ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
            <div className={`h-1 flex-grow rounded-full ${step >= 2 ? 'bg-black' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${step >= 2 ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
            <div className={`h-1 flex-grow rounded-full ${step >= 3 ? 'bg-black' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${step >= 3 ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'}`}>3</div>
            <div className={`h-1 flex-grow rounded-full ${step >= 4 ? 'bg-black' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${step >= 4 ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'}`}>4</div>
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
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-medium text-gray-700">Service Location</label>
                        <button 
                          onClick={handleGetLocation}
                          disabled={isLocating}
                          className="text-xs font-medium bg-blue-50 text-blue-600 px-3 py-1.5 rounded-md flex items-center gap-1 hover:bg-blue-100 transition-colors"
                        >
                          <Navigation size={14} className={isLocating ? 'animate-spin' : ''} />
                          {isLocating ? 'Locating...' : 'Use Live Location'}
                        </button>
                      </div>
                      <div className="relative">
                        <textarea 
                          rows="3"
                          placeholder="Enter your complete address or use Live Location..."
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
                      Proceed to Payment <ChevronRight size={18} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Payment Portal */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-bold mb-2">Secure Payment Gateway</h2>
                  <p className="text-gray-500 text-sm mb-6">Payment will be directly credited to owner account (9946594585).</p>
                  
                  <div className="border border-gray-200 rounded-xl p-6 mb-8 bg-gray-50">
                    <div className="flex justify-between items-center mb-6">
                      <span className="font-medium text-gray-700">Total Amount Payable</span>
                      <span className="text-2xl font-bold">₹{totalPrice.toLocaleString()}</span>
                    </div>

                    <div className="space-y-4">
                      <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${formData.paymentMethod === 'card' ? 'border-black bg-white ring-1 ring-black' : 'border-gray-200 bg-white'}`}>
                        <input type="radio" name="payment" value="card" checked={formData.paymentMethod === 'card'} onChange={() => updateForm('paymentMethod', 'card')} className="sr-only" />
                        <CreditCard size={24} className="text-gray-600 mr-4" />
                        <div>
                          <p className="font-medium">Credit / Debit Card</p>
                          <p className="text-xs text-gray-500">Visa, Mastercard, RuPay</p>
                        </div>
                      </label>
                      <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${formData.paymentMethod === 'upi' ? 'border-black bg-white ring-1 ring-black' : 'border-gray-200 bg-white'}`}>
                        <input type="radio" name="payment" value="upi" checked={formData.paymentMethod === 'upi'} onChange={() => updateForm('paymentMethod', 'upi')} className="sr-only" />
                        <div className="w-6 h-6 bg-green-100 text-green-700 rounded-md flex items-center justify-center font-bold text-xs mr-4">UPI</div>
                        <div>
                          <p className="font-medium">UPI Payment</p>
                          <p className="text-xs text-gray-500">Google Pay, PhonePe, Paytm</p>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 justify-center">
                    <ShieldCheck size={16} className="text-green-600" />
                    <span>256-bit SSL Encrypted Secure Checkout</span>
                  </div>

                  <div className="mt-10 flex justify-between">
                    <button 
                      onClick={() => setStep(2)}
                      disabled={isProcessingPayment}
                      className="text-black px-6 py-3 rounded-full font-medium border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-50"
                    >
                      Back
                    </button>
                    <button 
                      onClick={processPayment}
                      disabled={isProcessingPayment}
                      className="bg-black text-white px-8 py-3 rounded-full font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors min-w-[160px] justify-center"
                    >
                      {isProcessingPayment ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        `Pay ₹${totalPrice.toLocaleString()}`
                      )}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: Success Confirmation */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center h-full pt-10"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <Check size={40} className="text-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold mb-2">Booking & Payment Confirmed!</h2>
                  <p className="text-gray-500 mb-8 max-w-md">
                    Thank you! Your payment of ₹{totalPrice.toLocaleString()} was successful (Txn ID: TXN{Math.floor(Math.random()*1000000)}). 
                    {assignedEmployeeId === 'Unassigned' ? (
                      <span className="block mt-2 text-orange-500 font-medium">Your order is currently pending assignment. We will notify you shortly.</span>
                    ) : (
                      <span className="block mt-2 text-green-600 font-medium">Your order has been routed directly to detailing expert <b>{assignedEmployeeId}</b>.</span>
                    )}
                  </p>
                  <button 
                    onClick={() => {
                      setStep(1);
                      setFormData({service:'', vehicleType:'', vehicleModel:'', date:'', time:'', location:'', notes:'', paymentMethod: 'card'});
                    }}
                    className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors"
                  >
                    Return Home
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
                <span className="text-gray-400">Total Payable</span>
              </div>
              <div className="text-4xl font-bold tracking-tight text-[#d4af37]">
                {totalPrice > 0 ? `₹${totalPrice.toLocaleString()}` : '₹0'}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

