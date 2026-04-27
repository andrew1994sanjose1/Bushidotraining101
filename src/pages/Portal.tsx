import { motion } from 'motion/react';
import { User } from '../types';
import { storage } from '../services/storage';
import { QrCode, Calendar, History, Trophy, TrendingUp, Info } from 'lucide-react';
import QRGenerator from '../components/QRGenerator';
import { INITIAL_SCHEDULE } from '../constants';
import { cn } from '../lib/utils';

export default function Portal({ user }: { user: User }) {
  const attendance = storage.getAttendance().filter(a => a.userId === user.id);
  
  return (
    <div className="section-padding pt-32">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid lg:grid-cols-[1fr_380px] gap-8"
      >
        <div className="space-y-8">
          {/* Welcome Header */}
          <div className="glass p-8 rounded-3xl flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-2xl bg-blue-600 flex items-center justify-center text-3xl font-bold text-white shadow-lg shadow-blue-500/20">
              {user.name.charAt(0)}
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold">Osu, {user.name}!</h1>
              <p className="text-slate-400 mt-1">Current Rank: <span className="text-blue-400 font-bold">{user.rank || 'Student'}</span></p>
              <div className="flex gap-4 mt-4">
                <div className="flex items-center gap-2 text-xs bg-white/5 rounded-full px-3 py-1 border border-white/10">
                  <Calendar size={14} className="text-blue-400" /> Member since {new Date(user.joinedDate).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2 text-xs bg-white/5 rounded-full px-3 py-1 border border-white/10">
                  <TrendingUp size={14} className="text-green-400" /> {attendance.length} Classes Attended
                </div>
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div className="glass p-8 rounded-3xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Calendar className="text-blue-400" /> Weekly Schedule
              </h2>
            </div>
            <div className="space-y-4">
              {INITIAL_SCHEDULE.map((session) => (
                <div key={session.id} className="bg-white/5 border border-white/5 p-4 rounded-2xl flex items-center justify-between hover:bg-white/10 transition-colors">
                  <div>
                    <h3 className="font-bold">{session.title}</h3>
                    <p className="text-sm text-slate-400">{session.day} • {session.startTime} - {session.endTime}</p>
                  </div>
                  <span className={cn(
                    "text-[10px] uppercase font-black px-2 py-1 rounded",
                    session.level === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                    session.level === 'Advanced' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'
                  )}>
                    {session.level}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="glass p-8 rounded-3xl">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
              <History className="text-blue-400" /> Recent Attendance
            </h2>
            {attendance.length === 0 ? (
              <div className="text-center py-12 text-slate-500 flex flex-col items-center gap-3">
                <Info size={40} className="opacity-20" />
                <p>No attendance records found yet. Scan your code to check in!</p>
              </div>
            ) : (
              <div className="space-y-2">
                {attendance.reverse().slice(0, 5).map((record) => (
                  <div key={record.id} className="flex items-center justify-between py-3 border-b border-white/5">
                    <span className="text-sm">{new Date(record.date).toLocaleDateString()}</span>
                    <span className="text-xs text-slate-400">{record.timestamp}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar QR */}
        <div className="space-y-8">
          <div className="glass p-8 rounded-3xl text-center sticky top-32">
            <h2 className="text-xl font-bold mb-6 flex items-center justify-center gap-2">
              <QrCode className="text-blue-400" /> Digital Check-in
            </h2>
            <QRGenerator value={user.id} />
            <p className="text-sm text-slate-400 mt-6 max-w-[200px] mx-auto">
              Present this QR code to your Sensei upon entering the dojo.
            </p>
          </div>

          <div className="glass p-8 rounded-3xl bg-blue-600/10">
            <div className="flex items-center gap-3 mb-4">
              <Trophy className="text-blue-400" />
              <h3 className="font-bold">Pro Tip</h3>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Consistent attendance is the key to mastering your Kihon. Aim for at least 3 classes per week to maintain progress toward your next grading!
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
