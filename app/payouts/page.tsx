"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloudRain, Factory, Siren, CheckCircle2, Search, Download, Lock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MobileWrapper } from '@/components/shared/MobileWrapper';

const payoutData = [
  {
    id: 1,
    type: "weather",
    icon: <CloudRain size={20} className="text-blue-500" />,
    reason: "Rain Trigger (48mm/hr)",
    date: "Mar 12, 2024",
    amount: "300",
    status: "paid"
  },
  {
    id: 2,
    type: "pollution",
    icon: <Factory size={20} className="text-emerald-500" />,
    reason: "Severe AQI Alert (>300)",
    date: "Mar 08, 2024",
    amount: "450",
    status: "paid"
  },
  {
    id: 3,
    type: "weather",
    icon: <CloudRain size={20} className="text-blue-500" />,
    reason: "Heavy Rainfall Forecast",
    date: "Mar 02, 2024",
    amount: "300",
    status: "paid"
  },
  {
    id: 4,
    type: "curfew",
    icon: <Siren size={20} className="text-amber-500" />,
    reason: "Zone 4 Restrictions",
    date: "Feb 28, 2024",
    amount: "790",
    status: "processing"
  }
];

export default function PayoutsPage() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredPayouts = activeTab === "all" 
    ? payoutData 
    : payoutData.filter(p => {
        if (activeTab === "pending") return p.status !== "paid";
        return p.type === activeTab;
      });

  return (
    <MobileWrapper withNav>
      <div className="p-6 pb-32 space-y-8 flex flex-col min-h-screen">
        {/* Header */}
        <header className="space-y-6">
          <div className="flex items-center justify-between">
             <div className="space-y-1">
                <h1 className="text-4xl font-black text-secondary tracking-tighter italic">Payouts</h1>
                <p className="text-[10px] font-black text-text-dim uppercase tracking-[0.2em] opacity-40">Your Earnings Shield</p>
             </div>
             <button className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center border border-gray-100 active:scale-95 transition-transform">
                <Search size={20} className="text-secondary" />
             </button>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-accent p-7 rounded-[40px] shadow-2xl relative overflow-hidden group border-b-8 border-black/10"
          >
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
                <CheckCircle2 size={120} className="text-secondary" />
             </div>
             <div className="relative z-10">
                <p className="text-secondary/40 text-[10px] font-black uppercase tracking-[0.2em] mb-2 leading-none italic">Total Protection Payouts</p>
                <div className="flex items-baseline gap-2">
                   <span className="text-5xl font-black text-secondary italic tracking-tighter">₹1,840</span>
                   <span className="text-secondary/30 text-xs font-black uppercase tracking-widest italic">Success</span>
                </div>
             </div>
          </motion.div>
        </header>

        {/* Filters */}
        <div className="space-y-6">
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="bg-secondary/5 p-1.5 rounded-[20px] h-auto flex gap-1 overflow-x-auto no-scrollbar border border-secondary/5 mb-6">
              {["all", "weather", "curfew", "pollution", "pending"].map((tab) => (
                <TabsTrigger 
                  key={tab}
                  value={tab} 
                  className="rounded-xl px-5 py-3 text-[10px] font-black uppercase tracking-[0.15em] data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-lg transition-all"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="space-y-4">
              <AnimatePresence mode="popLayout" initial={false}>
                {filteredPayouts.map((p, i) => (
                  <motion.div 
                    key={p.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-50 relative group active:scale-[0.98] transition-all border-b-4 border-b-gray-100/50"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                          {p.icon}
                        </div>
                        <div>
                          <p className="text-[9px] font-black text-text-dim/40 uppercase tracking-[0.2em] mb-1.5 leading-none italic">{p.date}</p>
                          <h4 className="text-[14px] font-black text-secondary leading-tight tracking-tight">{p.reason}</h4>
                        </div>
                      </div>
                      <div className="text-right">
                         <p className="text-2xl font-black text-secondary italic tracking-tighter leading-none mb-1.5">₹{p.amount}</p>
                         <div className="flex items-center justify-end">
                            {p.status === 'paid' ? (
                               <Badge className="bg-accent/15 text-accent border-accent/20 text-[8px] font-black tracking-widest uppercase py-1 px-3 rounded-full">Paid ✓</Badge>
                            ) : (
                               <Badge className="bg-amber-500/15 text-amber-600 border-amber-500/20 text-[8px] font-black tracking-widest uppercase py-1 px-3 rounded-full italic animate-pulse">Processing...</Badge>
                            )}
                         </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {filteredPayouts.length === 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-24 flex flex-col items-center text-center px-10 gap-8"
                >
                    <div className="relative">
                      <div className="w-28 h-28 rounded-[40px] bg-gray-100 flex items-center justify-center opacity-30 rotate-12">
                         <Lock size={48} className="text-secondary" />
                      </div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white shadow-2xl flex items-center justify-center border border-gray-50">
                         <CloudRain size={28} className="text-primary" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-black text-secondary tracking-tight">Cloudless Operations</h3>
                      <p className="text-xs font-medium text-text-dim leading-relaxed">No disruptions detected in your zone yet. Stay protected and we'll handle the rest!</p>
                    </div>
                    <button className="bg-secondary/5 text-secondary text-[10px] font-black px-6 py-3 rounded-full uppercase tracking-widest border border-secondary/5 active:scale-95 transition-transform">Update Zone Risk</button>
                </motion.div>
              )}
            </div>
          </Tabs>
        </div>

        {/* Floating Action */}
        <div className="p-4 pt-10 text-center">
           <button className="bg-secondary text-white text-[11px] font-black px-10 py-5 rounded-full tracking-[0.25em] shadow-2xl border-b-4 border-black/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-4 mx-auto italic">
              <Download size={18} />
              GET STATEMENT AS PDF
           </button>
        </div>
      </div>
    </MobileWrapper>
  );
}
