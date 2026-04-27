import { motion } from 'motion/react';
import { Shield, Target, Trophy, Users, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { INITIAL_STAFF } from '../constants';

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1555597157-50fe48763881?auto=format&fit=crop&q=80&w=2000" 
            alt="Dojo Background" 
            className="w-full h-full object-cover opacity-30 scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sky-500 font-black tracking-[0.4em] uppercase text-xs mb-6 block">Legacy of the Empty Hand</span>
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter">
              BUSHIDO <br />
              <span className="text-sky-500 opacity-90 italic">KARATE-DO</span>
            </h1>
            <p className="text-lg text-slate-400 mb-12 max-w-xl mx-auto leading-relaxed font-medium">
              Discipline, Respect, and Excellence. Join the region's elite martial arts academy and forge your path to mastery.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/trials" className="btn-primary py-4 px-10 text-xs uppercase tracking-[0.2em] w-full sm:w-auto flex items-center justify-center gap-3">
                Begin Journey <ArrowRight size={16} />
              </Link>
              <Link to="/trials" className="btn-secondary py-4 px-10 text-xs uppercase tracking-[0.2em] w-full sm:w-auto">
                Schedule
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating Icons Background */}
        <div className="absolute hidden lg:block inset-0 pointer-events-none opacity-10">
          <motion.div 
            animate={{ y: [0, -20, 0], rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute top-1/4 left-1/4 text-blue-500"
          >
            <Shield size={120} />
          </motion.div>
          <motion.div 
            animate={{ y: [-20, 0, -20], rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity }}
            className="absolute bottom-1/4 right-1/4 text-blue-400"
          >
            <Target size={150} />
          </motion.div>
        </div>
      </section>

      {/* Legacy Section */}
      <section id="legacy" className="section-padding">
        <div className="grid md:grid-template-columns-[1fr_1.2fr] gap-12 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-blue-600/20 rounded-3xl blur-2xl group-hover:bg-blue-600/30 transition-all duration-500" />
            <img 
              src="https://images.unsplash.com/photo-1552072092-b5cd2915079a?auto=format&fit=crop&q=80&w=800" 
              alt="Legacy" 
              className="relative rounded-2xl w-full aspect-square object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-6 left-6 glass p-6 rounded-xl max-w-xs">
              <p className="text-sm font-medium italic text-slate-300">"Karate begins and ends with respect."</p>
            </div>
          </div>
          <div>
            <span className="text-blue-500 font-bold tracking-widest uppercase mb-4 block">Our Heritage</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Built on Generations of <span className="text-blue-400">Excellence</span></h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              Founded in 1982, Bushido Karate Dojo has been a cornerstone of the community for over four decades. Our lineage traces back to the traditional masters of Okinawa, blending ancient wisdom with modern physical training.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="glass p-6 rounded-2xl">
                <h3 className="text-3xl font-bold text-white mb-2">42+</h3>
                <p className="text-sm text-slate-400 uppercase tracking-wider">Years of Teaching</p>
              </div>
              <div className="glass p-6 rounded-2xl">
                <h3 className="text-3xl font-bold text-white mb-2">500+</h3>
                <p className="text-sm text-slate-400 uppercase tracking-wider">Black Belts Forged</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Senseis Section */}
      <section id="senseis" className="bg-slate-900/50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">The <span className="text-blue-400">Masters</span></h2>
            <p className="text-slate-400">Learn from the world's most dedicated instructors.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {INITIAL_STAFF.filter(s => s.role === 'instructor').map((sensei) => (
              <motion.div 
                key={sensei.id}
                whileHover={{ y: -10 }}
                className="glass rounded-3xl p-8 flex flex-col items-center text-center group"
              >
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
                  <img 
                    src={sensei.avatar} 
                    alt={sensei.name} 
                    className="w-32 h-32 rounded-full border-4 border-white/10 relative z-10" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-1">{sensei.name}</h3>
                <span className="text-blue-400 font-medium text-sm mb-4">{sensei.rank}</span>
                <p className="text-slate-400 leading-relaxed">{sensei.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section id="milestones" className="section-padding">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Victories & <span className="text-blue-400">Milestones</span></h2>
          <p className="text-slate-400">Celebrating our competitive spirit and community growth.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <Trophy className="text-yellow-500" />, title: 'Grand Champion 2023', desc: 'Sensei Tanaka took the gold at the International Kumite Open.' },
            { icon: <Users className="text-blue-500" />, title: '500 Members Strong', desc: 'Welcomed our 500th active student this year.' },
            { icon: <Star className="text-purple-500" />, title: 'Dojo of the Year', desc: 'Voted best marital arts school in the region for the 10th year.' },
          ].map((milestone, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass p-8 rounded-3xl"
            >
              <div className="w-12 h-12 glass rounded-xl flex items-center justify-center mb-6">
                {milestone.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{milestone.title}</h3>
              <p className="text-slate-400">{milestone.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div>
            <Link to="/" className="text-2xl font-bold flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white">武</div>
              BUSHIDO
            </Link>
            <p className="text-slate-500 text-sm max-w-xs">
              Forging character through the dedicated practice of Japanese Karate-Do since 1982.
            </p>
          </div>
          <div className="flex gap-12">
            <div className="flex flex-col gap-2">
              <span className="text-white font-bold uppercase text-xs tracking-widest mb-2">Connect</span>
              <a href="#" className="text-slate-400 hover:text-white text-sm">Instagram</a>
              <a href="#" className="text-slate-400 hover:text-white text-sm">Facebook</a>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-white font-bold uppercase text-xs tracking-widest mb-2">Contact</span>
              <span className="text-slate-400 text-sm">info@bushidokarate.com</span>
              <span className="text-slate-400 text-sm">+1 (555) 987-6543</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
