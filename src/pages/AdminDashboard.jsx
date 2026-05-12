import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, FileText, IndianRupee, ShieldAlert, CheckCircle, TrendingUp, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const globalOrders = [
  { id: 'ORD-1092', customer: 'Rahul Sharma', service: 'Full Body Detailing', price: 4499, status: 'Assigned', employee: 'EMP-001' },
  { id: 'ORD-1093', customer: 'Anjali Verma', service: 'Normal Wash', price: 699, status: 'Completed', employee: 'EMP-002' },
  { id: 'ORD-1094', customer: 'Vikram Singh', service: 'Ceramic Coating', price: 9999, status: 'Pending', employee: 'Unassigned' },
];

const staffDetails = [
  { id: 'EMP-001', name: 'Ravi Kumar', today: 1800, week: 12400, month: 45000, status: 'Active' },
  { id: 'EMP-002', name: 'Arun Patel', today: 300, week: 8900, month: 38000, status: 'Active' },
  { id: 'EMP-003', name: 'Sanjay Gupta', today: 0, week: 4500, month: 22000, status: 'Off Duty' },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('orders'); // orders, staff, financials
  const navigate = useNavigate();

  // Basic security mockup
  const logout = () => {
    navigate('/login');
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <ShieldAlert className="text-red-600" /> Owner Dashboard
            </h1>
            <p className="text-gray-500 mt-1">Logged in as <span className="font-bold text-black">yaduskrishna18@gmail.com</span></p>
          </div>
          <button onClick={logout} className="text-sm font-medium border border-gray-300 px-4 py-2 rounded-full hover:bg-gray-100 transition-colors">
            Secure Logout
          </button>
        </div>

        {/* Global KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-[#111111] text-white p-6 rounded-3xl shadow-lg relative overflow-hidden">
            <TrendingUp size={100} className="absolute -right-6 -bottom-6 opacity-5 text-white" />
            <p className="text-gray-400 text-sm font-medium mb-1">Total Revenue (Month)</p>
            <h2 className="text-3xl font-bold text-[#d4af37]">₹1,42,500</h2>
            <p className="text-green-400 text-xs mt-2 font-medium">+12% from last month</p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm font-medium mb-1">Active Bookings</p>
            <h2 className="text-3xl font-bold text-black">24</h2>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-orange-500 text-xs font-bold bg-orange-50 px-2 py-0.5 rounded">8 Pending</span>
              <span className="text-green-600 text-xs font-bold bg-green-50 px-2 py-0.5 rounded">16 Assigned</span>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm font-medium mb-1">Online Staff</p>
            <h2 className="text-3xl font-bold text-black flex items-center gap-2">
              8 <span className="text-gray-400 text-lg font-normal">/ 12</span>
            </h2>
            <div className="flex items-center gap-2 mt-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span className="text-gray-500 text-xs font-medium">Currently active in field</span>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm font-medium mb-1">Customer Satisfaction</p>
            <h2 className="text-3xl font-bold text-black">4.9<span className="text-gray-400 text-lg font-normal">/5</span></h2>
            <p className="text-blue-600 text-xs mt-2 font-medium bg-blue-50 w-max px-2 py-0.5 rounded">Based on 500+ Reviews</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 bg-gray-100 p-1 rounded-xl w-max mb-8">
          <button 
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'orders' ? 'bg-white shadow text-black' : 'text-gray-500 hover:text-black'}`}
          >
            Confirmed Orders
          </button>
          <button 
            onClick={() => setActiveTab('staff')}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'staff' ? 'bg-white shadow text-black' : 'text-gray-500 hover:text-black'}`}
          >
            Staff & Earnings
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm min-h-[400px]">
          
          {activeTab === 'orders' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2"><FileText size={20}/> All Confirmed Orders</h2>
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input type="text" placeholder="Search orders..." className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-full focus:outline-none focus:border-black" />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-100 text-gray-500 text-sm">
                      <th className="py-3 font-medium">Order ID</th>
                      <th className="py-3 font-medium">Customer</th>
                      <th className="py-3 font-medium">Service & Amount</th>
                      <th className="py-3 font-medium">Status</th>
                      <th className="py-3 font-medium">Assigned To</th>
                      <th className="py-3 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {globalOrders.map(order => (
                      <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                        <td className="py-4 font-medium text-sm">{order.id}</td>
                        <td className="py-4 text-sm">{order.customer}</td>
                        <td className="py-4 text-sm">
                          <div>{order.service}</div>
                          <div className="font-bold text-gray-900">₹{order.price}</div>
                        </td>
                        <td className="py-4 text-sm">
                          <span className={`px-2 py-1 rounded-md text-xs font-bold uppercase ${
                            order.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                            order.status === 'Assigned' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-4 text-sm text-gray-600 font-medium">{order.employee}</td>
                        <td className="py-4 text-sm">
                          <button className="text-blue-600 hover:underline font-medium">Manage</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === 'staff' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2"><Users size={20}/> Employee Roster & Earnings</h2>
                <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                  + Add Employee
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {staffDetails.map(staff => (
                  <div key={staff.id} className="border border-gray-100 rounded-2xl p-5 hover:border-gray-300 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-lg">{staff.name}</h3>
                        <p className="text-xs text-gray-500 font-medium">ID: {staff.id}</p>
                      </div>
                      <span className={`w-3 h-3 rounded-full ${staff.status === 'Active' ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                    </div>
                    
                    <div className="space-y-2 text-sm bg-gray-50 p-3 rounded-xl">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Today's Payout:</span>
                        <span className="font-bold">₹{staff.today}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">This Week:</span>
                        <span className="font-bold">₹{staff.week}</span>
                      </div>
                      <div className="flex justify-between pt-2 mt-2 border-t border-gray-200">
                        <span className="text-gray-700 font-medium">Monthly Total:</span>
                        <span className="font-bold text-green-700">₹{staff.month}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

        </div>

      </div>
    </div>
  );
}
