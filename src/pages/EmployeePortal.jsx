import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, Briefcase, IndianRupee, Clock, MapPin, CheckCircle2, ChevronRight, User, Mail, Phone } from 'lucide-react';

const mockOrders = [
  { id: 'ORD-1092', service: 'Full Body Detailing', vehicle: 'BMW 5 Series', time: '10:00 AM', location: 'GPS: 12.9716, 77.5946', payout: 1500, status: 'Pending' },
  { id: 'ORD-1093', service: 'Normal Wash', vehicle: 'Honda City', time: '02:00 PM', location: 'Koramangala, Bangalore', payout: 300, status: 'Pending' },
];

export default function EmployeePortal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login', 'register', 'pending'
  const [empId, setEmpId] = useState('');
  
  // Registration Form State
  const [regData, setRegData] = useState({ name: '', email: '', phone: '', location: '' });
  
  const [orders, setOrders] = useState(mockOrders);

  const handleLogin = () => {
    if (empId) setIsLoggedIn(true);
  };

  const handleRegister = () => {
    if (regData.name && regData.phone && regData.location) {
      setAuthMode('pending');
    }
  };

  const completeOrder = (id) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: 'Completed' } : o));
  };

  if (!isLoggedIn) {
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
                  placeholder="Enter Employee ID (e.g. EMP-001)"
                  value={empId}
                  onChange={(e) => setEmpId(e.target.value)}
                  className="w-full p-4 border border-gray-200 rounded-xl mb-4 focus:ring-1 focus:ring-black focus:outline-none"
                />
                <button 
                  onClick={handleLogin}
                  disabled={!empId}
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
                  disabled={!regData.name || !regData.phone || !regData.location}
                  className="w-full bg-black text-white py-4 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors disabled:opacity-50"
                >
                  Send Request to Owner <ChevronRight size={18} />
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
                <h1 className="text-2xl font-bold mb-4">Request Submitted!</h1>
                <p className="text-gray-500 text-sm leading-relaxed mb-8">
                  Your application has been sent directly to the owner for review. 
                  <br/><br/>
                  After acceptance, you will receive your permanent <b>Employee ID</b> via WhatsApp or Email.
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

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm mb-6">
            <h2 className="font-bold text-lg mb-1">Employee Profile</h2>
            <p className="text-gray-500 text-sm mb-4">ID: {empId.toUpperCase()}</p>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase">
              <span className="w-2 h-2 rounded-full bg-green-500"></span> Active & Ready
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#111111] to-[#222222] rounded-3xl p-6 text-white shadow-xl">
            <h3 className="text-gray-400 text-sm mb-4">Earnings Dashboard</h3>
            <div className="space-y-4">
              <div>
                <span className="text-xs text-gray-500 uppercase tracking-wider">Today</span>
                <div className="text-2xl font-bold text-[#d4af37]">₹1,800</div>
              </div>
              <div className="h-px bg-white/10"></div>
              <div>
                <span className="text-xs text-gray-500 uppercase tracking-wider">This Week</span>
                <div className="text-xl font-bold">₹12,400</div>
              </div>
              <div className="h-px bg-white/10"></div>
              <div>
                <span className="text-xs text-gray-500 uppercase tracking-wider">This Month</span>
                <div className="text-xl font-bold">₹45,000</div>
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
            {orders.map(order => (
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
                    <IndianRupee size={18} /> {order.payout} <span className="text-xs text-gray-500 font-normal">payout</span>
                  </div>
                  {order.status !== 'Completed' ? (
                    <button 
                      onClick={() => completeOrder(order.id)}
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
        </div>

      </div>
    </div>
  );
}
