import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QrCode, Users, CheckCircle, Search, Clock, Shield, AlertCircle, Scan } from 'lucide-react';
import { storage } from '../services/storage';
import { User, Schedule, AttendanceRecord } from '../types';
import { INITIAL_STAFF } from '../constants';
import { cn } from '../lib/utils';

export default function Instructor({ user }: { user: User }) {
  const [scanId, setScanId] = useState('');
  const [lastScanned, setLastScanned] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [members, setMembers] = useState<User[]>(storage.getMembers());
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(storage.getAttendance());
  const [search, setSearch] = useState('');

  const handleScan = (id: string) => {
    const member = members.find(m => m.id === id);
    if (!member) {
      setError('Member ID not found');
      setTimeout(() => setError(null), 3000);
      return;
    }

    const record: AttendanceRecord = {
      id: 'att-' + Date.now(),
      userId: member.id,
      scheduleId: 'manual', // or current session link
      date: new Date().toISOString().split('T')[0],
      timestamp: new Date().toLocaleTimeString()
    };

    storage.addAttendance(record);
    setAttendance(storage.getAttendance());
    setLastScanned(member);
    setScanId('');
    setTimeout(() => setLastScanned(null), 5000);
  };

  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(search.toLowerCase()) || 
    m.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="section-padding pt-32">
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-blue-500 font-bold uppercase tracking-[0.2em] text-sm">Instructor Portal</span>
          <h1 className="text-4xl font-bold mt-2">Attendance <span className="text-blue-400">Scanner</span></h1>
        </div>
        <div className="flex items-center gap-4 text-slate-400 bg-white/5 border border-white/10 px-4 py-2 rounded-xl">
          <Clock size={18} className="text-blue-400" />
          <span className="font-mono text-sm">{new Date().toDateString()}</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_400px] gap-8">
        {/* Main Scanner Sim */}
        <div className="space-y-8">
          <div className="glass p-8 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl -z-10" />
            
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Scan className="text-blue-400" /> Scanner Simulation
              </h2>
              <span className="flex items-center gap-2 text-xs text-green-400 animate-pulse">
                <div className="w-2 h-2 bg-green-400 rounded-full" /> System Active
              </span>
            </div>

            <div className="max-w-md mx-auto">
              <div className="relative mb-6">
                <QrCode className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                <input 
                  type="text" 
                  className="input-field pl-12 py-4 text-xl tracking-[0.5em] font-mono"
                  placeholder="SCAN MEMBER ID"
                  value={scanId}
                  onChange={(e) => setScanId(e.target.value.toUpperCase())}
                  onKeyDown={(e) => e.key === 'Enter' && handleScan(scanId)}
                />
              </div>
              <button 
                onClick={() => handleScan(scanId)}
                className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-2"
              >
                Log Attendance <CheckCircle size={20} />
              </button>
            </div>

            <AnimatePresence>
              {lastScanned && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="mt-8 p-6 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center gap-6"
                >
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                    {lastScanned.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-xl">{lastScanned.name}</h3>
                      <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded uppercase font-bold">Checked In</span>
                    </div>
                    <p className="text-slate-400 text-sm">{lastScanned.rank} • {new Date().toLocaleTimeString()}</p>
                  </div>
                </motion.div>
              )}

              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400"
                >
                  <AlertCircle size={20} />
                  <span className="font-medium">{error}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="glass p-8 rounded-3xl">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Users className="text-blue-400" /> Member Quick List
              </h2>
              <div className="relative w-48">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                <input 
                  type="text" 
                  className="input-field pl-9 py-1.5 text-xs" 
                  placeholder="Search name/ID"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {filteredMembers.length === 0 ? (
                <div className="col-span-full py-8 text-center text-slate-500 text-sm">
                  {members.length === 0 ? 'No members registered yet.' : 'No matches found.'}
                </div>
              ) : (
                filteredMembers.map(member => (
                  <button 
                    key={member.id}
                    onClick={() => setScanId(member.id)}
                    className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-colors text-left"
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400 font-bold shrink-0">
                      {member.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold truncate text-sm">{member.name}</p>
                      <p className="text-[10px] text-slate-500 font-mono">{member.id}</p>
                    </div>
                    <Shield size={14} className={cn("shrink-0", member.role === 'admin' ? 'text-blue-400' : 'text-slate-600')} />
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Session Stats / Today Log */}
        <div className="space-y-8">
          <div className="glass p-8 rounded-3xl">
            <h2 className="text-xl font-bold mb-6">Today's Class</h2>
            <div className="space-y-4">
              <div className="p-4 bg-blue-600/10 rounded-2xl border border-blue-500/20">
                <p className="text-xs text-blue-400 uppercase font-black tracking-widest mb-1">Active Session</p>
                <h3 className="text-lg font-bold">Advanced Kumite</h3>
                <p className="text-xs text-slate-400">18:30 - 20:00 • Sensei Tanaka</p>
              </div>
            </div>
          </div>

          <div className="glass p-8 rounded-3xl h-[400px] flex flex-col">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Clock className="text-blue-400" /> Live Feed
            </h2>
            <div className="flex-1 overflow-y-auto pr-2 space-y-4">
              {attendance.filter(a => a.date === new Date().toISOString().split('T')[0]).reverse().map(record => {
                const member = [...members, ...INITIAL_STAFF].find(m => m.id === record.userId);
                return (
                  <div key={record.id} className="flex items-center gap-3 text-sm animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center text-green-400 shrink-0">
                      <CheckCircle size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="font-bold text-white block truncate">{member?.name || 'Unknown'}</span>
                      <span className="text-[10px] text-slate-500 tracking-wider">Scanned via Digital ID</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-1 rounded shrink-0">{record.timestamp}</span>
                  </div>
                );
              })}
              {attendance.filter(a => a.date === new Date().toISOString().split('T')[0]).length === 0 && (
                <div className="text-center py-12 text-slate-500 text-xs italic">
                  Waiting for first check-in...
                </div>
              )}
            </div>
          </div>

          <div className="glass p-6 rounded-3xl border-l-4 border-blue-500">
            <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
              <Shield size={16} /> Security Note
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Always verify the member's rank and name displayed on the scanner against their uniform/gi to prevent ID sharing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
