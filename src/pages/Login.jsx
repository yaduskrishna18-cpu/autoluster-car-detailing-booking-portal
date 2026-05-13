import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, ChevronRight, Lock, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function Login() {
  const { login } = useAppContext();
  const [authMethod, setAuthMethod] = useState('email'); // 'email' or 'phone'
  const [step, setStep] = useState(1); // 1: input, 2: otp
  const [inputValue, setInputValue] = useState('');
  const [resendTimer, setResendTimer] = useState(30);
  const [showResendSuccess, setShowResendSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (step === 2 && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, resendTimer]);

  const handleSendOTP = () => {
    // Simulate sending OTP
    setStep(2);
    setResendTimer(30);
    setShowResendSuccess(false);
  };

  const handleResend = () => {
    if (resendTimer === 0) {
      // Simulate resending
      setResendTimer(30);
      setShowResendSuccess(true);
      setTimeout(() => setShowResendSuccess(false), 3000);
    }
  };

  const handleVerify = () => {
    // Mock login routing
    if (authMethod === 'email' && inputValue.toLowerCase() === 'yaduskrishna18@gmail.com') {
      login({ id: 'admin', role: 'admin', name: 'Yadu Krishna' });
      navigate('/admin');
    } else if (inputValue.toLowerCase().includes('employee')) {
      navigate('/employee');
    } else {
      login({ id: `user-${Date.now()}`, role: 'customer', name: 'Customer User' });
      navigate('/dashboard');
    }
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#fafafa] flex items-center justify-center">
      <div className="w-full max-w-md px-6">
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome Back</h1>
          <p className="text-gray-500">Log in to manage your bookings and memberships.</p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl relative overflow-hidden">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Tabs */}
                <div className="flex bg-gray-50 p-1 rounded-full mb-8">
                  <button
                    onClick={() => setAuthMethod('email')}
                    className={`flex-1 py-2 text-sm font-medium rounded-full transition-all ${
                      authMethod === 'email' ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-black'
                    }`}
                  >
                    Email
                  </button>
                  <button
                    onClick={() => setAuthMethod('phone')}
                    className={`flex-1 py-2 text-sm font-medium rounded-full transition-all ${
                      authMethod === 'phone' ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-black'
                    }`}
                  >
                    Phone
                  </button>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {authMethod === 'email' ? 'Email Address' : 'Phone Number'}
                  </label>
                  <div className="relative">
                    <input
                      type={authMethod === 'email' ? 'email' : 'tel'}
                      placeholder={authMethod === 'email' ? 'name@example.com' : '+91 98765 43210'}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="w-full p-4 pl-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                    />
                    {authMethod === 'email' ? (
                      <Mail size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    ) : (
                      <Phone size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    )}
                  </div>
                </div>

                <button
                  onClick={handleSendOTP}
                  disabled={!inputValue}
                  className="w-full bg-black text-white py-4 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send OTP <ChevronRight size={18} />
                </button>

                <div className="mt-8 text-center text-sm text-gray-500">
                  By logging in, you agree to our <a href="#" className="text-black underline">Terms of Service</a> and <a href="#" className="text-black underline">Privacy Policy</a>.
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                    <Lock size={24} className="text-gray-800" />
                  </div>
                  <h2 className="text-xl font-bold mb-2">Enter Verification Code</h2>
                  <p className="text-sm text-gray-500">
                    We've sent a 4-digit code to <br />
                    <span className="font-medium text-black">{inputValue}</span>
                  </p>
                </div>

                <div className="flex justify-center gap-3 mb-8">
                  {[1, 2, 3, 4].map((i) => (
                    <input
                      key={i}
                      type="text"
                      maxLength={1}
                      className="w-14 h-14 text-center text-xl font-bold border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                    />
                  ))}
                </div>

                <button
                  onClick={handleVerify}
                  className="w-full bg-black text-white py-4 rounded-xl font-medium flex items-center justify-center hover:bg-gray-800 transition-colors mb-6"
                >
                  Verify & Login
                </button>

                <div className="text-center text-sm">
                  {showResendSuccess ? (
                    <div className="flex justify-center items-center gap-2 text-green-600 font-medium">
                      <CheckCircle2 size={16} /> Code resent successfully
                    </div>
                  ) : (
                    <>
                      <span className="text-gray-500">Didn't receive the code? </span>
                      <button 
                        onClick={handleResend}
                        disabled={resendTimer > 0}
                        className={`font-medium underline transition-colors ${resendTimer > 0 ? 'text-gray-300 cursor-not-allowed' : 'text-black'}`}
                      >
                        Resend {resendTimer > 0 ? `(${resendTimer}s)` : ''}
                      </button>
                    </>
                  )}
                </div>
                
                <button 
                  onClick={() => setStep(1)}
                  className="mt-6 w-full text-center text-sm text-gray-500 hover:text-black transition-colors"
                >
                  Change {authMethod === 'email' ? 'email address' : 'phone number'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Are you an employee? <button onClick={() => navigate('/employee')} className="text-black font-medium underline">Employee Portal</button>
          </p>
        </div>

      </div>
    </div>
  );
}

