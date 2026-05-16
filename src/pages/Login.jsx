import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, ChevronRight, Lock, CheckCircle2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import emailjs from '@emailjs/browser';

// --- EMAILJS CONFIGURATION ---
const EMAILJS_SERVICE_ID = 'service_fk5s0ls';
const EMAILJS_TEMPLATE_ID = 'template_9tjcmxn';
const EMAILJS_PUBLIC_KEY = 'qjirq4t6xyZmFv96_';

export default function Login() {
  const { login } = useAppContext();
  const [authMethod, setAuthMethod] = useState('email'); // 'email' or 'phone'
  const [step, setStep] = useState(1); // 1: input, 2: otp
  const [inputValue, setInputValue] = useState('');
  const [resendTimer, setResendTimer] = useState(30);
  const [showResendSuccess, setShowResendSuccess] = useState(false);
  
  // New States for OTP Flow
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpInputs, setOtpInputs] = useState(['', '', '', '']);
  const [isSending, setIsSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

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

  const sendOtpEmail = async (email, otpCode) => {
    try {
      const templateParams = {
        to_email: email,
        otp: otpCode,
      };

      // Check if keys are placeholders
      if (EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID_HERE') {
        console.warn("Using placeholder EmailJS keys. Simulating OTP send in console.");
        console.log(`[SIMULATED EMAIL] To: ${email} | OTP: ${otpCode}`);
        return true; 
      }

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
      return true;
    } catch (error) {
      console.error('FAILED to send email:', error);
      return false;
    }
  };

  const handleSendOTP = async () => {
    if (!inputValue) return;
    setIsSending(true);
    setErrorMsg('');

    // Generate a random 4-digit code
    const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(newOtp);

    if (authMethod === 'email') {
      const success = await sendOtpEmail(inputValue, newOtp);
      if (success) {
        setStep(2);
        setResendTimer(30);
        setShowResendSuccess(false);
      } else {
        setErrorMsg('Failed to send verification email. Please try again.');
      }
    } else {
      // For phone, we just simulate it since we don't have an SMS provider yet
      console.log(`[SIMULATED SMS] To: ${inputValue} | OTP: ${newOtp}`);
      setStep(2);
      setResendTimer(30);
      setShowResendSuccess(false);
    }
    
    setIsSending(false);
  };

  const handleResend = async () => {
    if (resendTimer === 0) {
      const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
      setGeneratedOtp(newOtp);
      
      if (authMethod === 'email') {
        await sendOtpEmail(inputValue, newOtp);
      } else {
        console.log(`[SIMULATED SMS] To: ${inputValue} | OTP: ${newOtp}`);
      }

      setResendTimer(30);
      setShowResendSuccess(true);
      setTimeout(() => setShowResendSuccess(false), 3000);
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtpInputs = [...otpInputs];
    newOtpInputs[index] = value;
    setOtpInputs(newOtpInputs);
    setErrorMsg('');

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpInputs[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleVerify = () => {
    const enteredOtp = otpInputs.join('');
    
    // Master bypass for testing (0000) or strict check
    if (enteredOtp !== generatedOtp && enteredOtp !== '0000') {
      setErrorMsg('Invalid Verification Code');
      return;
    }

    const email = inputValue.toLowerCase().trim();
    const extractedName = email.split('@')[0].replace(/[._0-9]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()).trim();

    if (authMethod === 'email' && email === 'yaduskrishna18@gmail.com') {
      login({ id: 'admin', role: 'admin', name: extractedName || 'Yadu Krishna', email });
      navigate('/admin');
    } else if (email.includes('employee')) {
      login({ id: `emp-${Date.now()}`, role: 'employee', name: extractedName || 'Staff Member', email });
      navigate('/employee');
    } else {
      login({ id: `user-${Date.now()}`, role: 'customer', name: extractedName || 'Customer', email });
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
                  disabled={!inputValue || isSending}
                  className="w-full bg-black text-white py-4 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSending ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>Send OTP <ChevronRight size={18} /></>
                  )}
                </button>

                {errorMsg && (
                  <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg flex items-center gap-2 text-sm">
                    <AlertCircle size={16} /> {errorMsg}
                  </div>
                )}

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
                  {/* Logo Placeholder */}
                  <div className="flex justify-center mb-6">
                    <img 
                      src="/logo.png" 
                      alt="Autoluster Logo" 
                      className="h-12 w-auto object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <span className="hidden text-2xl font-bold tracking-tighter">AL</span>
                  </div>

                  {/* Profile Picture using unavatar.io */}
                  <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 border border-gray-200 shadow-sm relative bg-gray-50 flex items-center justify-center">
                    {authMethod === 'email' ? (
                      <img 
                        src={`https://unavatar.io/${inputValue}?fallback=https://api.dicebear.com/7.x/initials/svg?seed=${inputValue}`} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Phone size={28} className="text-gray-400" />
                    )}
                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1.5 shadow-sm border border-gray-100">
                       <CheckCircle2 size={12} className="text-green-600" />
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-bold mb-2">Enter Verification Code</h2>
                  <p className="text-sm text-gray-500">
                    We've sent a 4-digit code to <br />
                    <span className="font-medium text-black">{inputValue}</span>
                  </p>
                </div>

                <div className="flex justify-center gap-3 mb-8">
                  {[0, 1, 2, 3].map((index) => (
                    <input
                      key={index}
                      ref={inputRefs[index]}
                      type="text"
                      maxLength={1}
                      value={otpInputs[index]}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className="w-14 h-14 text-center text-xl font-bold border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                    />
                  ))}
                </div>

                {errorMsg && (
                  <div className="mb-4 text-center text-red-600 text-sm flex items-center justify-center gap-2">
                    <AlertCircle size={16} /> {errorMsg}
                  </div>
                )}

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

