import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  // --- Persistent State ---
  
  // Current logged in user (can be customer, employee, or owner)
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('al_currentUser');
    return saved ? JSON.parse(saved) : null;
  });

  // Reviews
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('al_reviews');
    return saved ? JSON.parse(saved) : [
      { id: 1, authorId: 'demo-1', name: 'Rahul Sharma', vehicle: 'BMW 5 Series', rating: 5, comment: 'Absolutely stunning work. The ceramic coating they applied to my BMW is flawless. Very professional and convenient service at my home.' },
      { id: 2, authorId: 'demo-2', name: 'Priya Patel', vehicle: 'Range Rover Velar', rating: 5, comment: 'Autoluster is the only service I trust with my SUV. The interior detailing removed all stains and left it smelling brand new.' },
      { id: 3, authorId: 'demo-3', name: 'Vikram Singh', vehicle: 'Porsche 911', rating: 5, comment: 'Punctual, meticulous, and premium. The full body detailing exceeded my expectations. Highly recommended for luxury vehicles.' }
    ];
  });

  // Gallery Works
  const [galleryWorks, setGalleryWorks] = useState(() => {
    const saved = localStorage.getItem('al_gallery');
    return saved ? JSON.parse(saved) : [
      { id: 1, authorId: 'demo-emp-1', beforeImg: 'https://images.unsplash.com/photo-1598555239922-26244ab9eb56?auto=format&fit=crop&q=80&w=800', afterImg: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=800', title: 'Ceramic Coating on Porsche 911' },
      { id: 2, authorId: 'demo-emp-2', beforeImg: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=800', afterImg: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800', title: 'Full Interior Detailing - Mercedes S-Class' },
    ];
  });

  // Employees
  const [employees, setEmployees] = useState(() => {
    const saved = localStorage.getItem('al_employees_v2');
    return saved ? JSON.parse(saved) : [];
  });

  // Bookings
  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('al_bookings_v2');
    return saved ? JSON.parse(saved) : [];
  });

  // --- Effects for Synchronization ---
  useEffect(() => { localStorage.setItem('al_currentUser', JSON.stringify(currentUser)); }, [currentUser]);
  useEffect(() => { localStorage.setItem('al_reviews', JSON.stringify(reviews)); }, [reviews]);
  useEffect(() => { localStorage.setItem('al_gallery', JSON.stringify(galleryWorks)); }, [galleryWorks]);
  useEffect(() => { localStorage.setItem('al_employees_v2', JSON.stringify(employees)); }, [employees]);
  useEffect(() => { localStorage.setItem('al_bookings_v2', JSON.stringify(bookings)); }, [bookings]);

  // Sync across tabs
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === 'al_employees_v2' && e.newValue) setEmployees(JSON.parse(e.newValue));
      if (e.key === 'al_bookings_v2' && e.newValue) setBookings(JSON.parse(e.newValue));
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // --- Helper Functions ---
  const login = (userObj) => setCurrentUser(userObj);
  const logout = () => setCurrentUser(null);

  const addReview = (review) => setReviews([{ ...review, id: Date.now() }, ...reviews]);
  const deleteReview = (id) => setReviews(reviews.filter(r => r.id !== id));

  const addGalleryWork = (work) => setGalleryWorks([{ ...work, id: Date.now() }, ...galleryWorks]);
  const deleteGalleryWork = (id) => setGalleryWorks(galleryWorks.filter(w => w.id !== id));

  const addEmployee = (employee) => {
    const newId = `autoluster${String(employees.length + 1).padStart(2, '0')}`;
    setEmployees([...employees, { ...employee, id: newId, status: employee.status || 'Pending', today: 0, week: 0, month: 0 }]);
    return newId;
  };

  const approveEmployee = (id) => {
    setEmployees(employees.map(emp => emp.id === id ? { ...emp, status: 'Active' } : emp));
  };

  const rejectEmployee = (id) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  const addBooking = (booking) => {
    // Basic assignment logic based on location match (case insensitive)
    let assignedEmp = 'Unassigned';
    let status = 'Pending';
    
    if (booking.location) {
      const availableStaff = employees.filter(emp => emp.status === 'Active');
      const matchedStaff = availableStaff.find(emp => 
        booking.location.toLowerCase().includes(emp.location.toLowerCase().split(',')[0])
      );
      if (matchedStaff) {
        assignedEmp = matchedStaff.id;
        status = 'Assigned';
      } else if (availableStaff.length > 0) {
        // Fallback to first available staff if location doesn't match
        assignedEmp = availableStaff[0].id;
        status = 'Assigned';
      }
    }

    const newBooking = { ...booking, id: `ORD-${Date.now().toString().slice(-4)}`, status, employee: assignedEmp };
    setBookings([newBooking, ...bookings]);
    return newBooking;
  };

  const completeBooking = (id, payoutAmount) => {
    setBookings(bookings.map(b => {
      if (b.id === id) {
        // Find employee to update earnings
        if (b.employee !== 'Unassigned') {
          setEmployees(emps => emps.map(e => e.id === b.employee ? { 
            ...e, 
            today: e.today + payoutAmount, 
            week: e.week + payoutAmount, 
            month: e.month + payoutAmount 
          } : e));
        }
        return { ...b, status: 'Completed' };
      }
      return b;
    }));
  };

  return (
    <AppContext.Provider value={{
      currentUser, login, logout,
      reviews, addReview, deleteReview,
      galleryWorks, addGalleryWork, deleteGalleryWork,
      employees, addEmployee, approveEmployee, rejectEmployee,
      bookings, addBooking, completeBooking
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
