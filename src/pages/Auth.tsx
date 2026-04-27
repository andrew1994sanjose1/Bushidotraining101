import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Shield, User as UserIcon, Lock, Mail } from 'lucide-react';
import { storage } from '../services/storage';
import { INITIAL_STAFF } from '../constants';

export default function Auth({ onLogin }: { onLogin: (user: any) => void }) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'member' | 'staff'>('member');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate finding/creating user
    let user;
    if (role === 'staff') {
      user = INITIAL_STAFF.find(u => u.email === email) || INITIAL_STAFF[0];
    } else {
      user = {
        id: 'mem-' + Math.random().toString(36).substr(2, 9),
        name: email.split('@')[0],
        email: email,
        role: 'member',
        rank: 'White Belt',
        joinedDate: new Date().toISOString()
      };
    }

    storage.setCurrentUser(user as any);
    onLogin(user);
    
    if (user.role === 'admin') navigate('/admin');
    else if (user.role === 'instructor') navigate('/instructor');
    else navigate('/portal');
  };

  const loginAs = (type: 'member' | 'instructor' | 'admin') => {
    let mockUser;
    if (type === 'admin') mockUser = INITIAL_STAFF.find(s => s.role === 'admin');
    else if (type === 'instructor') mockUser = INITIAL_STAFF.find(s => s.role === 'instructor');
    else mockUser = { id: 'm1', name: 'Student Lee', email: 'student@bushido.com', role: 'member', rank: 'Blue Belt', joinedDate: '2023-01-01' };
    
    storage.setCurrentUser(mockUser as any);
    onLogin(mockUser);
    
    if (type === 'admin') navigate('/admin');
    else if (type === 'instructor') navigate('/instructor');
    else navigate('/portal');
  };

  return (
    <div className="min-h-screen flex items-center justify-center section-padding relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-8 md:p-12 rounded-2xl w-full max-w-md border-white/5"
      >
        <div className="text-center mb-10">
          <div className="w-14 h-14 bg-sky-600 rounded-xl flex items-center justify-center text-white text-3xl font-bold italic mx-auto mb-6 shadow-xl shadow-sky-600/20">武</div>
          <h2 className="text-2xl font-black tracking-tight uppercase">System <span className="text-sky-400">Authentication</span></h2>
          <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em] mt-2">Dojo Management Portal</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Terminal ID / Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
              <input 
                type="email" 
                required
                className="input-field pl-12 text-sm" 
                placeholder="admin@bushido.dojo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Security Passkey</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
              <input 
                type="password" 
                className="input-field pl-12 text-sm" 
                placeholder="••••••••"
              />
            </div>
          </div>

          <button type="submit" className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] font-black mt-4">
            Authorize Access <Shield size={16} />
          </button>
        </form>

        <div className="mt-10 pt-10 border-t border-white/5 space-y-3">
          <p className="text-[9px] text-slate-600 uppercase font-black text-center tracking-[0.4em] mb-4">Emulated Environments</p>
          <div className="grid grid-cols-1 gap-2">
            <button onClick={() => loginAs('member')} className="glass py-2.5 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white/5 transition-all text-slate-400 hover:text-white">
              <UserIcon size={14} className="text-sky-500" /> Member Portal
            </button>
            <button onClick={() => loginAs('instructor')} className="glass py-2.5 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white/5 transition-all text-slate-400 hover:text-white">
              <Shield size={14} className="text-sky-500" /> Sensei Console
            </button>
            <button onClick={() => loginAs('admin')} className="glass py-2.5 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white/5 transition-all text-slate-400 hover:text-white">
              <Lock size={14} className="text-sky-500" /> Office Staff
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
