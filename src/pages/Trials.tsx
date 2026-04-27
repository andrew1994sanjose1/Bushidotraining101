import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, User, Mail, Phone, ArrowRight, CheckCircle } from 'lucide-react';
import { INITIAL_SCHEDULE } from '../constants';

export default function Trials() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="section-padding pt-32">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold">Join a <span className="text-blue-400">Trial Class</span></h1>
        <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-lg">
          Take your first step into a larger world. Our trial sessions are designed for absolute beginners to find their focus.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_450px] gap-12 items-start">
        {/* Schedule Table */}
        <div className="glass p-8 rounded-3xl">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <Calendar className="text-blue-400" /> Trial availability
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-y-4">
              <thead>
                <tr className="text-slate-500 text-xs uppercase tracking-widest font-bold">
                  <th className="px-4 pb-2">Class Type</th>
                  <th className="px-4 pb-2">Day</th>
                  <th className="px-4 pb-2">Time</th>
                  <th className="px-4 pb-2">Level</th>
                </tr>
              </thead>
              <tbody>
                {INITIAL_SCHEDULE.filter(s => s.level === 'Beginner').map((session) => (
                  <tr key={session.id} className="group cursor-default">
                    <td className="px-4 py-6 bg-white/5 rounded-l-2xl border-y border-l border-white/5 group-hover:bg-white/10 transition-colors">
                      <span className="font-bold text-white">{session.title}</span>
                    </td>
                    <td className="px-4 py-6 bg-white/5 border-y border-white/5 group-hover:bg-white/10 transition-colors text-slate-300">
                      {session.day}
                    </td>
                    <td className="px-4 py-6 bg-white/5 border-y border-white/5 group-hover:bg-white/10 transition-colors text-slate-300">
                      {session.startTime} - {session.endTime}
                    </td>
                    <td className="px-4 py-6 bg-white/5 rounded-r-2xl border-y border-r border-white/5 group-hover:bg-white/10 transition-colors">
                      <span className="bg-green-500/10 text-green-400 text-[10px] px-2 py-1 rounded-full border border-green-500/20 uppercase font-black tracking-widest">
                        {session.level}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 p-6 glass-dark rounded-2xl border border-blue-500/10 flex items-start gap-4">
            <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-400 shrink-0">
              <CheckCircle size={20} />
            </div>
            <p className="text-sm text-slate-400 leading-relaxed italic">
              "My first trial at Bushido changed my perspective on fitness and focus. The environment is welcoming and the instructors are incredibly patient." 
              <span className="block text-white font-bold mt-2">— Mark R., White Belt</span>
            </p>
          </div>
        </div>

        {/* Registration Form */}
        <div className="glass p-8 md:p-10 rounded-3xl sticky top-32">
          {submitted ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 mx-auto mb-6">
                <CheckCircle size={40} />
              </div>
              <h2 className="text-2xl font-bold mb-4">Registration Successful!</h2>
              <p className="text-slate-400 mb-8">A Sensei will contact you via email within 24 hours to confirm your spot.</p>
              <button onClick={() => setSubmitted(false)} className="btn-secondary w-full">Register Another</button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-2">Book Your Session</h2>
              <p className="text-slate-400 text-sm mb-8">Fill in your details and select your preferred class time.</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input type="text" required className="input-field pl-12" placeholder="John Doe" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                      <input type="email" required className="input-field pl-12" placeholder="john@example.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                      <input type="tel" required className="input-field pl-12" placeholder="(555) 000-0000" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Preferred Time</label>
                  <select className="input-field appearance-none bg-slate-900">
                    {INITIAL_SCHEDULE.filter(s => s.level === 'Beginner').map(s => (
                      <option key={s.id} value={s.id}>{s.title} ({s.day} @ {s.startTime})</option>
                    ))}
                  </select>
                </div>

                <button type="submit" className="btn-primary w-full py-4 flex items-center justify-center gap-2 font-bold text-lg">
                  Submit Reservation <ArrowRight size={20} />
                </button>
                <p className="text-[10px] text-center text-slate-500 uppercase tracking-widest">No credit card required for trial classes</p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
