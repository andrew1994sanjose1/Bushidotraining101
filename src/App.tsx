import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, User as UserIcon, LogOut, LayoutDashboard, Shield, ShoppingBag, QrCode } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { storage } from './services/storage';
import { User } from './types';
import { cn } from './lib/utils';

// Page Imports
import Home from './pages/Home';
import Trials from './pages/Trials';
import Shop from './pages/Shop';
import Portal from './pages/Portal';
import Instructor from './pages/Instructor';
import Admin from './pages/Admin';
import Auth from './pages/Auth';

function ProtectedRoute({ children, role, user }: { children: React.ReactNode; role?: string; user: User | null }) {
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) {
    if (user.role === 'admin') return <Navigate to="/admin" replace />;
    if (user.role === 'instructor') return <Navigate to="/instructor" replace />;
    return <Navigate to="/portal" replace />;
  }
  return <>{children}</>;
}

function Navbar({ user, logout }: { user: User | null; logout: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Heritage', path: '/', hash: '#legacy' },
    { name: 'Senseis', path: '/', hash: '#senseis' },
    { name: 'Enrollment', path: '/trials' },
    { name: 'Pro Shop', path: '/shop' },
  ];

  const getDashboardLink = () => {
    if (!user) return null;
    if (user.role === 'admin') return { name: 'Admin Console', path: '/admin', icon: <Shield size={16} /> };
    if (user.role === 'instructor') return { name: 'Check-in Desk', path: '/instructor', icon: <QrCode size={16} /> };
    return { name: 'Member Portal', path: '/portal', icon: <UserIcon size={16} /> };
  };

  const dashboard = getDashboardLink();

  return (
    <nav className="fixed w-full z-50 px-6 py-6">
      <div className="max-w-7xl mx-auto glass rounded-xl px-6 py-3 flex items-center justify-between border-white/5">
        <Link to="/" className="text-xl font-black tracking-tighter flex items-center gap-3 group">
          <div className="w-9 h-9 bg-sky-600 rounded-lg flex items-center justify-center text-white text-lg font-bold italic transition-transform group-hover:scale-105">武</div>
          <div className="flex flex-col leading-none">
            <span className="text-white">BUSHIDO</span>
            <span className="text-[10px] text-slate-500 font-light tracking-widest">DOJO MANAGEMENT</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                "text-[11px] uppercase tracking-[0.2em] font-bold transition-all",
                location.pathname === link.path ? "text-sky-400" : "text-slate-400 hover:text-white"
              )}
            >
              {link.name}
            </Link>
          ))}
          
          {user ? (
            <div className="flex items-center gap-6 border-l border-white/10 pl-8">
              <Link to={dashboard?.path || '#'} className="bg-white/5 hover:bg-white/10 text-white flex items-center gap-3 px-4 py-2 rounded-lg text-[11px] uppercase font-bold tracking-widest transition-all border border-white/5">
                {dashboard?.icon}
                {dashboard?.name}
              </Link>
              <button 
                onClick={logout} 
                className="text-slate-500 hover:text-red-400 transition-colors p-1"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn-primary py-2 px-6 rounded-lg text-[11px] uppercase tracking-widest">
              Signin
            </Link>
          )}
        </div>

        {/* Mobile Menu Btn */}
        <button className="lg:hidden text-white w-10 h-10 glass rounded-xl flex items-center justify-center border-none" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="lg:hidden absolute top-32 left-6 right-6 glass-dark border border-white/5 rounded-3xl p-8 shadow-2xl z-50 backdrop-blur-3xl"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-lg font-bold py-2 border-b border-white/5 active:text-blue-400"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              {user && dashboard && (
                <Link 
                  to={dashboard.path} 
                  className="flex items-center gap-3 text-lg font-bold text-blue-400 py-2 border-b border-white/5"
                  onClick={() => setIsOpen(false)}
                >
                  {dashboard.icon} {dashboard.name}
                </Link>
              )}
              {user ? (
                <button 
                  onClick={() => { logout(); setIsOpen(false); }} 
                  className="flex items-center gap-3 text-lg font-bold text-red-400 py-2"
                >
                  <LogOut size={20} /> Sign Out
                </button>
              ) : (
                <Link to="/login" className="btn-primary text-center py-4 rounded-2xl" onClick={() => setIsOpen(false)}>
                  Member Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default function App() {
  const [user, setUser] = useState<User | null>(storage.getCurrentUser());

  const handleLogin = (u: User) => {
    setUser(u);
  };

  const handleLogout = () => {
    storage.logout();
    setUser(null);
  };

  return (
    <Router>
      <Navbar user={user} logout={handleLogout} />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trials" element={<Trials />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/login" element={<Auth onLogin={handleLogin} />} />
          
          <Route 
            path="/portal" 
            element={
              <ProtectedRoute user={user} role="member">
                <Portal user={user!} />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/instructor" 
            element={
              <ProtectedRoute user={user} role="instructor">
                <Instructor user={user!} />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute user={user} role="admin">
                <Admin />
              </ProtectedRoute>
            } 
          />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}
