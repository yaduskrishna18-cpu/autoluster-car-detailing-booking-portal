import { motion } from 'framer-motion';
import { Calendar, CarFront, Crown, Star, Clock, MapPin, ChevronRight, Settings, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

const upcomingBookings = [
  {
    id: 'BK-1092',
    service: 'Full Body Detailing',
    vehicle: 'BMW 5 Series',
    date: 'Oct 15, 2023',
    time: '10:00 AM',
    status: 'Upcoming',
  }
];

const pastBookings = [
  {
    id: 'BK-0841',
    service: 'Normal Car Wash',
    vehicle: 'BMW 5 Series',
    date: 'Sep 28, 2023',
    status: 'Completed',
  }
];

const vehicles = [
  {
    model: 'BMW 5 Series',
    type: 'Sedan',
    color: 'Carbon Black',
    plate: 'MH 01 AB 1234'
  }
];

export default function Dashboard() {
  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm mb-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-xl font-bold">
                JD
              </div>
              <div>
                <h2 className="font-bold text-lg">John Doe</h2>
                <p className="text-gray-500 text-sm">+91 98765 43210</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-3 rounded-xl bg-gray-50 font-medium flex items-center justify-between">
                Dashboard Overview <ChevronRight size={16} className="text-gray-400" />
              </button>
              <button className="w-full text-left px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-between">
                My Bookings <ChevronRight size={16} className="text-gray-400" />
              </button>
              <button className="w-full text-left px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-between">
                Saved Vehicles <ChevronRight size={16} className="text-gray-400" />
              </button>
              <button className="w-full text-left px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-between">
                Membership <ChevronRight size={16} className="text-gray-400" />
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#111111] to-[#222222] rounded-3xl p-6 border border-gray-800 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#a88132] opacity-20 blur-[50px] rounded-full"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2 text-[#d4af37]">
                <Crown size={20} />
                <span className="font-bold tracking-widest uppercase text-xs">Gold Member</span>
              </div>
              <h3 className="text-xl font-bold mb-1">Active Plan</h3>
              <p className="text-gray-400 text-sm mb-6">Renews on Nov 1, 2023</p>
              
              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-400">Premium Washes</span>
                  <span className="font-bold">2/4 left</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Interior Cleaning</span>
                  <span className="font-bold">1/1 left</span>
                </div>
              </div>
              
              <button className="w-full py-2 border border-white/20 rounded-full text-sm font-medium hover:bg-white/10 transition-colors">
                Manage Plan
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link to="/booking" className="bg-black text-white p-6 rounded-3xl flex flex-col items-center justify-center text-center hover:bg-gray-900 transition-colors group">
              <Calendar size={32} className="mb-3 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Book New Service</span>
            </Link>
            <div className="bg-white border border-gray-100 p-6 rounded-3xl flex flex-col items-center justify-center text-center hover:border-gray-300 transition-colors cursor-pointer group shadow-sm">
              <CarFront size={32} className="mb-3 text-gray-800 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-gray-800">Add Vehicle</span>
            </div>
            <div className="bg-[#fafafa] border border-gray-200 p-6 rounded-3xl flex flex-col items-center justify-center text-center cursor-pointer group">
              <Star size={32} className="mb-3 text-[#a88132] group-hover:scale-110 transition-transform" />
              <span className="font-medium text-gray-800">1,250 Reward Points</span>
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div>
            <h3 className="text-xl font-bold mb-4">Upcoming Appointments</h3>
            {upcomingBookings.map(booking => (
              <div key={booking.id} className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center border border-gray-200 shrink-0">
                    <Clock size={20} className="text-black" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{booking.service}</h4>
                    <p className="text-gray-500 mb-2">{booking.vehicle}</p>
                    <div className="flex flex-wrap gap-4 text-sm font-medium text-gray-700">
                      <span className="flex items-center gap-1"><Calendar size={14} className="text-gray-400" /> {booking.date}</span>
                      <span className="flex items-center gap-1"><Clock size={14} className="text-gray-400" /> {booking.time}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-3">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {booking.status}
                  </span>
                  <button className="text-sm font-medium text-black border-b border-black pb-0.5 hover:text-gray-600 hover:border-gray-600 transition-colors">
                    Reschedule
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Saved Vehicles & Past Bookings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Saved Vehicles</h3>
              {vehicles.map((v, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center">
                      <CarFront size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold">{v.model}</h4>
                      <p className="text-xs text-gray-500">{v.plate} • {v.color}</p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-black transition-colors"><Settings size={18} /></button>
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Recent History</h3>
              {pastBookings.map((b, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm mb-3 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm">{b.service}</h4>
                    <p className="text-xs text-gray-500">{b.date}</p>
                  </div>
                  <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                    {b.status}
                  </span>
                </div>
              ))}
              <button className="text-sm font-medium text-gray-500 hover:text-black mt-2 transition-colors">
                View all history &rarr;
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

