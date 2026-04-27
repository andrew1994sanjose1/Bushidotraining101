import { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Star, Package, ArrowRight, CheckCircle } from 'lucide-react';
import { storage } from '../services/storage';
import { Product } from '../types';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function Shop() {
  const products = storage.getProducts();
  const [requested, setRequested] = useState<string[]>([]);

  const handleRequest = (productId: string) => {
    if (requested.includes(productId)) return;
    
    setRequested([...requested, productId]);
    const user = storage.getCurrentUser();
    if (user) {
      storage.addOrder({
        id: 'ord-' + Math.random().toString(36).substr(2, 9),
        userId: user.id,
        productId: productId,
        status: 'pending',
        timestamp: new Date().toLocaleTimeString()
      });
    }
  };

  return (
    <div className="section-padding pt-32">
      <div className="text-center mb-16">
        <span className="text-blue-500 font-bold uppercase tracking-widest text-sm">Official Gear</span>
        <h1 className="text-5xl font-bold mt-2">The Bushido <span className="text-blue-400">Pro Shop</span></h1>
        <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-lg">
          Premium karate equipment and official dojo apparel. Custom fitted and instructor-approved.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <motion.div 
            key={product.id}
            whileHover={{ y: -10 }}
            className="glass rounded-3xl overflow-hidden flex flex-col group"
          >
            <div className="relative aspect-square overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-4 glass px-3 py-1 rounded-full text-xs font-bold text-white flex items-center gap-1">
                <Star size={12} className="text-yellow-500 fill-yellow-500" /> Premium
              </div>
            </div>
            
            <div className="p-8 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">{product.name}</h3>
                <span className="text-2xl font-black text-blue-400">${product.price}</span>
              </div>
              <p className="text-slate-400 text-sm mb-6 flex-1">{product.description}</p>
              
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Package size={14} /> {product.stock} in stock
                </div>
                <button 
                  onClick={() => handleRequest(product.id)}
                  className={cn(
                    "flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-bold transition-all",
                    requested.includes(product.id) 
                      ? "bg-green-500 text-white" 
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  )}
                >
                  {requested.includes(product.id) ? (
                    <><CheckCircle size={16} /> Requested</>
                  ) : (
                    <><ShoppingBag size={16} /> Request to Order</>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Info Notice */}
      <div className="mt-20 glass p-8 rounded-3xl md:flex items-center justify-between gap-8">
        <div className="flex items-center gap-6 mb-6 md:mb-0">
          <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center text-blue-400">
            <Package size={32} />
          </div>
          <div>
            <h3 className="text-xl font-bold">Pick-up Only</h3>
            <p className="text-slate-400">All orders are custom fitted at the Dojo. Request an order to reserve your size.</p>
          </div>
        </div>
        <Link to="/trials" className="btn-secondary flex items-center gap-2">
          Contact Staff <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}
