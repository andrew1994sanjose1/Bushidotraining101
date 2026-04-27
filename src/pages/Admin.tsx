import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Users, UserPlus, Shield, Calendar, Package, ShoppingCart, 
  Trash2, Edit, Save, Plus, Search, Filter, Check, X,
  BadgeAlert, TrendingUp, DollarSign, ArrowRight
} from 'lucide-react';
import { storage } from '../services/storage';
import { User, Product, Schedule, Event, OrderRequest } from '../types';
import { INITIAL_STAFF } from '../constants';
import { cn } from '../lib/utils';

export default function Admin() {
  const [activeTab, setActiveTab] = useState<'members' | 'staff' | 'products' | 'schedule' | 'sales'>('members');
  const [members, setMembers] = useState<User[]>(storage.getMembers());
  const [staff, setStaff] = useState<User[]>(storage.getStaff());
  const [products, setProducts] = useState<Product[]>(storage.getProducts());
  const [schedule, setSchedule] = useState<Schedule[]>(storage.getSchedule());
  const [orders, setOrders] = useState<OrderRequest[]>(storage.getOrders());
  
  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Stats
  const stats = [
    { label: 'Total Members', value: members.length, icon: <Users size={20} />, color: 'text-blue-400' },
    { label: 'Active Instructors', value: staff.filter(s => s.role === 'instructor').length, icon: <Shield size={20} />, color: 'text-purple-400' },
    { label: 'Product Requests', value: orders.filter(o => o.status === 'pending').length, icon: <ShoppingCart size={20} />, color: 'text-yellow-400' },
    { label: "Month's Revenue", value: '$' + (orders.filter(o => o.status !== 'pending').reduce((acc, o) => {
      const p = products.find(prod => prod.id === o.productId);
      return acc + (p?.price || 0);
    }, 0)), icon: <DollarSign size={20} />, color: 'text-green-400' },
  ];

  const handleCreateMember = () => {
    const newMember: User = {
      id: 'MEM-' + Math.random().toString(36).substr(2, 6).toUpperCase(),
      name: 'New Student',
      email: 'student@example.com',
      role: 'member',
      rank: 'White Belt',
      joinedDate: new Date().toISOString()
    };
    const updated = [...members, newMember];
    setMembers(updated);
    storage.saveMembers(updated);
  };

  const handleDeleteMember = (id: string) => {
    const updated = members.filter(m => m.id !== id);
    setMembers(updated);
    storage.saveMembers(updated);
  };

  return (
    <div className="section-padding pt-32">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">System <span className="text-sky-400">Overview</span></h1>
          <p className="text-slate-400 mt-1 text-sm">Managing Bushido Dojo Digital Ecosystem</p>
        </div>
        <div className="flex gap-4">
          <button className="px-4 py-2 glass text-[11px] uppercase tracking-widest font-bold">Quick Scan</button>
          <button onClick={() => setIsAdding(true)} className="btn-primary flex items-center gap-2 text-sm">+ Register Member</button>
        </div>
      </div>

      {/* Stats Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <div key={i} className="glass p-6 group hover:border-sky-500/30 transition-all">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
            <div className="flex items-end gap-3">
              <span className="text-4xl font-black">{stat.value}</span>
              <span className={cn("text-[10px] font-bold pb-1 uppercase tracking-tighter opacity-60", stat.color)}>Live Status</span>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-8 border-b border-white/5 scrollbar-hide">
        {[
          { id: 'members', label: 'Directory', icon: <Users size={14} /> },
          { id: 'staff', label: 'Training Team', icon: <Shield size={14} /> },
          { id: 'products', label: 'Pro Shop Inventory', icon: <Package size={14} /> },
          { id: 'schedule', label: 'Training Schedule', icon: <Calendar size={14} /> },
          { id: 'sales', label: 'Sales & Orders', icon: <ShoppingCart size={14} /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "flex items-center gap-2 px-5 py-2.5 rounded-lg text-[10px] uppercase tracking-[0.15em] font-black transition-all whitespace-nowrap",
              activeTab === tab.id ? "bg-sky-600 text-white shadow-lg shadow-sky-600/20" : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
            )}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="glass rounded-3xl overflow-hidden">
        {activeTab === 'members' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white/5 border-b border-white/5">
                <tr className="text-slate-500 text-[10px] uppercase tracking-widest font-black">
                  <th className="px-8 py-4">Student</th>
                  <th className="px-8 py-4">ID</th>
                  <th className="px-8 py-4">Rank</th>
                  <th className="px-8 py-4">Joined</th>
                  <th className="px-8 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {members.map((member) => (
                  <tr key={member.id} className="hover:bg-white/[0.02]">
                    <td className="px-8 py-4 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400 font-bold">
                        {member.name.charAt(0)}
                      </div>
                      <span className="font-bold">{member.name}</span>
                    </td>
                    <td className="px-8 py-4 font-mono text-xs text-slate-500">{member.id}</td>
                    <td className="px-8 py-4">
                      <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-xs font-bold border border-blue-500/20">
                        {member.rank}
                      </span>
                    </td>
                    <td className="px-8 py-4 text-slate-400 text-sm">
                      {new Date(member.joinedDate).toLocaleDateString()}
                    </td>
                    <td className="px-8 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors"><Edit size={16} /></button>
                        <button onClick={() => handleDeleteMember(member.id)} className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-red-400 transition-colors"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={5} className="px-8 py-4">
                    <button onClick={handleCreateMember} className="w-full border-2 border-dashed border-white/10 rounded-xl py-4 text-slate-500 hover:text-blue-400 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all text-sm font-bold flex items-center justify-center gap-2">
                      <UserPlus size={18} /> Register New Student
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'sales' && (
          <div className="p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-2xl flex items-center justify-center text-yellow-500">
                <ShoppingCart size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold">Pending Product Requests</h2>
                <p className="text-sm text-slate-400">Process student orders and send automated purchase links.</p>
              </div>
            </div>

            <div className="space-y-4">
              {orders.sort((a, b) => b.timestamp.localeCompare(a.timestamp)).map((order) => {
                const product = products.find(p => p.id === order.productId);
                const user = [...members, ...staff].find(u => u.id === order.userId);
                
                return (
                  <div key={order.id} className="glass p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6 group hover:border-blue-500/30 transition-all">
                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                      <img src={product?.image} alt={product?.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-lg">{product?.name}</span>
                        <span className="text-xs text-slate-500">• Requested by {user?.name}</span>
                      </div>
                      <p className="text-sm text-blue-400 font-bold">${product?.price}</p>
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                      <div className="flex flex-col items-end gap-1">
                        <span className={cn(
                          "text-[10px] uppercase font-black px-2 py-0.5 rounded",
                          order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'
                        )}>
                          {order.status}
                        </span>
                        <span className="text-[10px] text-slate-600 uppercase tracking-widest">{order.timestamp}</span>
                      </div>
                      <button 
                        onClick={() => {
                          storage.updateOrder(order.id, 'processed');
                          setOrders(storage.getOrders());
                        }}
                        disabled={order.status !== 'pending'}
                        className={cn(
                          "btn-primary py-2 px-6 text-sm flex items-center gap-2",
                          order.status !== 'pending' && "opacity-20 cursor-not-allowed"
                        )}
                      >
                        Send Purchase Link <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
              {orders.length === 0 && (
                <div className="text-center py-20 text-slate-500 flex flex-col items-center gap-4">
                  <BadgeAlert size={48} className="opacity-10" />
                  <p>No sales requests in the queue.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Other tabs can be implemented similarly - simplified for preview */}
        {['staff', 'products', 'schedule'].includes(activeTab) && (
          <div className="py-32 text-center text-slate-500 font-bold">
            <Shield size={48} className="mx-auto mb-4 opacity-10" />
            Full {activeTab.toUpperCase()} management UI active in PRO edition.
          </div>
        )}
      </div>
    </div>
  );
}
