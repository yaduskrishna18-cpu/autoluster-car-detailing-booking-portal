import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, Briefcase, IndianRupee, Clock, MapPin, CheckCircle2, ChevronRight, User, Mail, Phone, ImagePlus } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = 'service_fk5s0ls';
const EMAILJS_TEMPLATE_ID = 'template_mwkrf0n';
const EMAILJS_PUBLIC_KEY = 'qjirq4t6xyZmFv96_';

export default function EmployeePortal() {
  const { employees, bookings, completeBooking, addGalleryWork, currentUser, login, addEmployee } = useAppContext();
  
  const [authMode, setAuthMode] = useState('login'); // 'login', 'register', 'pending'
  const [empId, setEmpId] = useState('');
  const [password, setPassword] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [regData, setRegData] = useState({ name: '', email: '', phone: '', location: '' });
  
  // Upload State
  const [uploadTitle, setUploadTitle] = useState('');
  const [beforeImg, setBeforeImg] = useState(null);
  const [afterImg, setAfterImg] = useState(null);
  const beforeInputRef = useRef(null);
  const afterInputRef = useRef(null);

  const handleFileChange = (e, setImage) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleLogin = () => {
    if (password !== 'autoluster2025') {
      alert("Invalid Password. Please enter autoluster2025");
      return;
    }
    const emp = employees.find(e => e.id.toLowerCase() === empId.trim().toLowerCase() && e.status === 'Active');
    if (emp) {
      login({ ...emp, role: 'employee' });
    } else {
      alert("Invalid or Inactive Employee ID");
    }
  };

  const handleRegister = async () => {
    if (regData.name && regData.phone && regData.location && regData.email) {
      setIsSending(true);
      
      const newId = addEmployee({
        name: regData.name,
        email: regData.email,
        phone: regData.phone,
        location: regData.location,
        status: 'Pending'
      });

      try {
        const templateParams = {
          to_name: regData.name,
          from_name: 'Autoluster',
          to_email: regData.email,
          owner_email: 'yaduskrishna18@gmail.com',
          admin_email: 'yaduskrishna18@gmail.com',
          cc_to: 'yaduskrishna18@gmail.com',
          message: `Welcome to the team! Your Login ID is: ${newId}. Your temporary password is: autoluster2025. Please keep this information secure.`,
          otp: `Your Login ID is: ${newId} (Password: autoluster2025)`
        };

        if (EMAILJS_SERVICE_ID !== 'YOUR_SERVICE_ID_HERE') {
          // Send to Employee
          const response = await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            templateParams,
            EMAILJS_PUBLIC_KEY
          );
          console.log('EmailJS Success (Employee):', response.status, response.text);

          // Send notification to Owner
          const ownerParams = {
            ...templateParams,
            to_email: 'yaduskrishna18@gmail.com',
            to_name: 'Owner',
            message: `New Employee Request! Name: ${regData.name}, Email: ${regData.email}, Phone: ${regData.phone}, Location: ${regData.location}. Generated ID: ${newId}`
          };
          
          const ownerResponse = await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            ownerParams,
            EMAILJS_PUBLIC_KEY
          );
          console.log('EmailJS Success (Owner):', ownerResponse.status, ownerResponse.text);
        }
      } catch (error) {
        console.error('FAILED to send email:', error);
        alert('EmailJS Error: ' + (error.text || error.message || JSON.stringify(error)));
      }

      setIsSending(false);
      setAuthMode('pending');
    }
  };

  const submitGalleryWork = () => {
    if (beforeImg && afterImg && uploadTitle && currentUser) {
      addGalleryWork({
        title: uploadTitle,
        beforeImg,
        afterImg,
        authorId: currentUser.id
      });
      setBeforeImg(null);
      setAfterImg(null);
      setUploadTitle('');
      alert("Transformation submitted to the public gallery successfully!");
    }
  };

  // If not logged in as employee
  if (!currentUser || currentUser.role !== 'employee') {
    return (
      <div className="pt-24 pb-20 min-h-screen bg-[#fafafa] flex items-center justify-center">
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl w-full max-w-md overflow-hidden relative">
          
          <AnimatePresence mode="wait">
            {authMode === 'login' && (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <Briefcase size={24} />
                  </div>
                  <h1 className="text-2xl font-bold">Employee Login</h1>
                  <p className="text-gray-500 text-sm mt-2">Enter your Employee ID to access your dashboard.</p>
                </div>
                
                <input 
                  type="text" 
                  placeholder="Enter Employee ID (e.g. autoluster01)"
                  value={empId}
                  onChange={(e) => setEmpId(e.target.value)}
                  className="w-full p-4 border border-gray-200 rounded-xl mb-4 focus:ring-1 focus:ring-black focus:outline-none"
                />
                <AnimatePresence>
                  {empId.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-4 overflow-hidden"
                    >
                      <input 
                        type="password" 
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-4 border border-gray-200 rounded-xl focus:ring-1 focus:ring-black focus:outline-none"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
                <button 
                  onClick={handleLogin}
                  disabled={!empId.trim()}
                  className="w-full bg-black text-white py-4 rounded-xl font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
                >
                  Access Portal
                </button>

                <div className="mt-6 text-center text-sm">
                  <span className="text-gray-500">Want to join our team? </span>
                  <button onClick={() => setAuthMode('register')} className="text-black font-medium underline">Register Here</button>
                </div>
              </motion.div>
            )}

            {authMode === 'register' && (
              <motion.div
                key="register"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                    <UserPlus size={24} className="text-gray-800" />
                  </div>
                  <h1 className="text-2xl font-bold">Join Autoluster</h1>
                  <p className="text-gray-500 text-sm mt-2">Apply to become a detailing specialist.</p>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="relative">
                    <input type="text" placeholder="Full Name" value={regData.name} onChange={e => setRegData({...regData, name: e.target.value})} className="w-full p-4 pl-11 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-black text-sm" />
                    <User size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                  <div className="relative">
                    <input type="email" placeholder="Email Address" value={regData.email} onChange={e => setRegData({...regData, email: e.target.value})} className="w-full p-4 pl-11 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-black text-sm" />
                    <Mail size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                  <div className="relative">
                    <input type="tel" placeholder="Phone Number" value={regData.phone} onChange={e => setRegData({...regData, phone: e.target.value})} className="w-full p-4 pl-11 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-black text-sm" />
                    <Phone size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                  <div className="relative">
                    <input type="text" placeholder="City / Operating Location" value={regData.location} onChange={e => setRegData({...regData, location: e.target.value})} className="w-full p-4 pl-11 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-black text-sm" />
                    <MapPin size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                <button 
                  onClick={handleRegister}
                  disabled={!regData.name || !regData.phone || !regData.location || !regData.email || isSending}
                  className="w-full bg-black text-white py-4 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors disabled:opacity-50"
                >
                  {isSending ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>Register & Send ID <ChevronRight size={18} /></>
                  )}
                </button>

                <div className="mt-6 text-center text-sm">
                  <span className="text-gray-500">Already have an ID? </span>
                  <button onClick={() => setAuthMode('login')} className="text-black font-medium underline">Login</button>
                </div>
              </motion.div>
            )}

            {authMode === 'pending' && (
              <motion.div
                key="pending"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6"
              >
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} className="text-blue-600" />
                </div>
                <h1 className="text-2xl font-bold mb-4">Registration Complete!</h1>
                <p className="text-gray-500 text-sm leading-relaxed mb-8">
                  Your employee account request has been created successfully. 
                  <br/><br/>
                  We have sent your permanent <b>Employee ID</b> to your email. Once the owner approves your request, you can use it along with the password to log in.
                </p>
                <button 
                  onClick={() => {
                    setAuthMode('login');
                    setRegData({ name: '', email: '', phone: '', location: '' });
                  }}
                  className="w-full text-black py-4 rounded-xl font-medium border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  Return to Login
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    );
  }

  // Find the latest employee state from context to show real-time earnings updates
  const currentEmployee = employees.find(e => e.id === currentUser.id) || currentUser;
  const assignedOrders = bookings.filter(b => b.employee === currentEmployee.id);

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm mb-6">
            <h2 className="font-bold text-lg mb-1">{currentEmployee.name}</h2>
            <p className="text-gray-500 text-sm mb-4">ID: {currentEmployee.id}</p>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase">
              <span className="w-2 h-2 rounded-full bg-green-500"></span> Active & Ready
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#111111] to-[#222222] rounded-3xl p-6 text-white shadow-xl">
            <h3 className="text-gray-400 text-sm mb-4">Earnings Dashboard</h3>
            <div className="space-y-4">
              <div>
                <span className="text-xs text-gray-500 uppercase tracking-wider">Today</span>
                <div className="text-2xl font-bold text-[#d4af37]">₹{currentEmployee.today || 0}</div>
              </div>
              <div className="h-px bg-white/10"></div>
              <div>
                <span className="text-xs text-gray-500 uppercase tracking-wider">This Week</span>
                <div className="text-xl font-bold">₹{currentEmployee.week || 0}</div>
              </div>
              <div className="h-px bg-white/10"></div>
              <div>
                <span className="text-xs text-gray-500 uppercase tracking-wider">This Month</span>
                <div className="text-xl font-bold">₹{currentEmployee.month || 0}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Briefcase size={24} /> Assigned Orders
          </h2>
          
          <div className="grid gap-4">
            {assignedOrders.length === 0 && (
              <p className="text-gray-500">No active orders assigned at this time.</p>
            )}
            {assignedOrders.map(order => (
              <div key={order.id} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-lg">{order.service}</h3>
                    <span className={`px-2 py-1 rounded-md text-xs font-bold uppercase ${order.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{order.vehicle} • ID: {order.id}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm font-medium text-gray-700">
                    <span className="flex items-center gap-1"><Clock size={16} className="text-gray-400"/> {order.time}</span>
                    <span className="flex items-center gap-1"><MapPin size={16} className="text-gray-400"/> {order.location}</span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3 w-full md:w-auto">
                  <div className="flex items-center gap-1 text-lg font-bold text-green-600">
                    <IndianRupee size={18} /> {(order.price * 0.3).toFixed(0)} <span className="text-xs text-gray-500 font-normal">payout</span>
                  </div>
                  {order.status !== 'Completed' ? (
                    <button 
                      onClick={() => completeBooking(order.id, parseInt((order.price * 0.3).toFixed(0)))}
                      className="w-full md:w-auto bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors"
                    >
                      Mark Completed
                    </button>
                  ) : (
                    <div className="flex items-center gap-1 text-gray-400 text-sm font-medium">
                      <CheckCircle2 size={16} /> Job Done
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Upload Finished Work Section */}
          <div className="mt-8 bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Upload Before & After Transformation</h2>
            <p className="text-gray-500 text-sm mb-6">Upload photos to showcase the premium detailing transformation in the public gallery.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Before Upload */}
              <input type="file" accept="image/*" ref={beforeInputRef} onChange={e => handleFileChange(e, setBeforeImg)} className="hidden" />
              <div 
                onClick={() => beforeInputRef.current.click()}
                className="relative overflow-hidden border-2 border-dashed border-gray-200 rounded-2xl text-center hover:bg-gray-50 transition-colors cursor-pointer flex flex-col items-center justify-center min-h-[160px]"
              >
                {beforeImg ? (
                  <img src={beforeImg} alt="Before" className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <div className="p-6">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3 mx-auto">
                      <ImagePlus size={20} className="text-gray-600" />
                    </div>
                    <p className="font-medium text-black mb-1">Upload "Before" Photo</p>
                    <p className="text-xs text-gray-500">Condition before service</p>
                  </div>
                )}
              </div>

              {/* After Upload */}
              <input type="file" accept="image/*" ref={afterInputRef} onChange={e => handleFileChange(e, setAfterImg)} className="hidden" />
              <div 
                onClick={() => afterInputRef.current.click()}
                className="relative overflow-hidden border-2 border-dashed border-gray-200 rounded-2xl text-center hover:bg-gray-50 transition-colors cursor-pointer flex flex-col items-center justify-center min-h-[160px]"
              >
                {afterImg ? (
                  <img src={afterImg} alt="After" className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <div className="p-6">
                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-3 mx-auto">
                      <ImagePlus size={20} className="text-blue-600" />
                    </div>
                    <p className="font-medium text-black mb-1">Upload "After" Photo</p>
                    <p className="text-xs text-gray-500">Final glossy finish</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4">
              <input 
                type="text" 
                value={uploadTitle}
                onChange={e => setUploadTitle(e.target.value)}
                placeholder="Vehicle Model & Service (e.g. BMW 5 Series - Ceramic Coating)" 
                className="flex-1 p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-black text-sm" 
              />
              <button 
                onClick={submitGalleryWork}
                disabled={!beforeImg || !afterImg || !uploadTitle}
                className="bg-black text-white px-8 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors whitespace-nowrap disabled:opacity-50"
              >
                Submit Transformation
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
