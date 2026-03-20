"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Shield, CloudRain, Factory, Siren, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { MobileWrapper } from '@/components/shared/MobileWrapper';

const liveAlerts = [
  {
    icon: <CloudRain className="text-amber-500" size={24} />,
    title: "Rainfall",
    zone: "Bengaluru South",
    status: "ELEVATED · 48mm/hr",
    type: "amber"
  },
  {
    icon: <Factory className="text-emerald-500" size={24} />,
    title: "AQI Alert",
    zone: "Zone 4",
    status: "SAFE · AQI 87",
    type: "green"
  },
  {
    icon: <Siren className="text-emerald-500" size={24} />,
    title: "Curfew",
    zone: "City-wide",
    status: "No active alerts",
    type: "green"
  }
];

const payouts = [
  { amount: "₹300", date: "Mar 12", reason: "Rain Trigger" },
  { amount: "₹450", date: "Mar 08", reason: "Flood Risk" },
  { amount: "₹300", date: "Mar 02", reason: "Rain Trigger" },
];

export default function DashboardPage() {
  return (
    <MobileWrapper withNav>
      <div className="p-6 pb-20 space-y-8">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="w-12 h-12 border-2 border-white shadow-card ring-4 ring-primary/5">
              <AvatarImage src="https://i.pravatar.cc/150?u=ravi" />
              <AvatarFallback className="bg-secondary text-white font-black">RK</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-text-dim text-[9px] font-black uppercase tracking-[0.2em] leading-none mb-1.5 opacity-60 italic">Gig-Partner</p>
              <h2 className="text-xl font-black text-secondary leading-none tracking-tight italic">Hey, Ravi 👋</h2>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <button className="w-11 h-11 rounded-2xl bg-white shadow-sm flex items-center justify-center relative active:scale-95 transition-transform border border-gray-100 group">
              <Bell size={20} className="text-secondary group-hover:text-primary transition-colors" />
              <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-primary border-2 border-white rounded-full animate-bounce shadow-[0_0_8px_rgba(255,107,43,0.4)]" />
            </button>
            <button className="w-11 h-11 rounded-2xl bg-secondary shadow-xl flex items-center justify-center active:scale-95 transition-transform border border-white/10 group overflow-hidden">
               <motion.div
                 animate={{ rotate: [0, 15, -15, 0] }}
                 transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
               >
                <Shield size={20} className="text-accent" />
               </motion.div>
            </button>
          </div>
        </header>

        {/* Coverage Hero Card */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-gradient-to-br from-secondary via-secondary to-[#1e3a8a] p-8 rounded-[36px] shadow-2xl overflow-hidden group border border-white/5"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[50px] mix-blend-screen rounded-full" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/5 blur-[40px] mix-blend-screen rounded-full" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5" />
          
          <div className="relative z-10 space-y-7">
            <div className="flex justify-between items-center">
              <div className="bg-accent/15 backdrop-blur-md text-accent font-black text-[9px] tracking-[0.25em] px-4 py-2 border border-accent/20 rounded-full flex items-center gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_12px_rgba(0,212,170,1)]" />
                COVERAGE DASHBOARD
              </div>
              <p className="text-white/30 text-[9px] font-black tracking-[0.2em] uppercase pt-1">ID: 99421A</p>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.15em] leading-none mb-1 italic">Weekly Protected Amount</p>
                <h3 className="text-5xl font-black text-white italic tracking-tighter">₹2,100</h3>
              </div>
              <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center bg-white/5 backdrop-blur-sm self-end mb-1">
                 <Shield size={24} className="text-accent opacity-50" />
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-white/10 -mx-8 px-8 -mb-8 pb-8 bg-black/10">
               <div>
                  <p className="text-white/30 text-[9px] font-black uppercase tracking-widest mb-1.5 leading-none italic">Protection Fee</p>
                  <p className="text-white text-sm font-black italic">₹49 <span className="text-white/30 text-[10px] font-medium not-italic">PAID</span></p>
               </div>
               <div className="text-right">
                  <p className="text-white/30 text-[9px] font-black uppercase tracking-widest mb-1.5 leading-none italic">Next Renewal</p>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
                    <p className="text-amber-400 text-sm font-black italic">Mar 25</p>
                  </div>
               </div>
            </div>
          </div>
        </motion.div>

        {/* Live Disruption Alerts */}
        <section className="space-y-4 pt-2">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-[11px] font-black text-secondary uppercase tracking-[0.25em] leading-none flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Live Alerts
            </h3>
            <span className="text-[10px] font-bold text-text-dim/50 italic">Koramangala Zone</span>
          </div>
          
          <div className="space-y-3.5">
            {liveAlerts.map((alert, i) => (
              <motion.div 
                key={alert.title}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white p-5 rounded-[28px] shadow-sm border border-gray-100 flex items-center justify-between group cursor-pointer hover:shadow-md transition-all active:bg-gray-50"
              >
                 <div className="flex items-center gap-5">
                    <div className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner",
                      alert.type === 'amber' ? 'bg-amber-50/50' : 'bg-emerald-50/50'
                    )}>
                      {alert.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-secondary leading-none mb-2">{alert.title} <span className="text-[10px] font-medium text-text-dim opacity-50 ml-1 italic">Region B</span></h4>
                      <p className={cn(
                        "text-[10px] font-black uppercase tracking-[0.1em] leading-none",
                        alert.type === 'amber' ? 'text-amber-600' : 'text-emerald-600'
                      )}>
                        {alert.status}
                      </p>
                    </div>
                 </div>
                 <ChevronRight size={18} className="text-gray-300 group-hover:text-primary transition-colors" />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Payout History Strip */}
        <section className="space-y-5 pt-2 mb-10">
          <div className="flex items-center justify-between px-1">
            <div className="space-y-1">
               <h3 className="text-[11px] font-black text-secondary uppercase tracking-[0.25em] leading-none">Earnings Saved</h3>
               <p className="text-[10px] font-bold text-text-dim opacity-50">Total: ₹1,840</p>
            </div>
            <button className="bg-primary/10 text-primary text-[10px] font-black px-4 py-2 rounded-full tracking-widest shadow-sm active:scale-95 transition-transform">HISTORY</button>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 no-scrollbar snap-x">
            {payouts.map((p, i) => (
              <div 
                 key={i}
                 className="flex-shrink-0 w-[180px] bg-white p-5 rounded-[32px] border border-gray-100 shadow-sm snap-start active:scale-95 transition-all border-b-8 border-b-accent/5"
              >
                 <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center shadow-inner">
                       <CheckCircle2 size={18} className="text-accent" />
                    </div>
                    <span className="text-accent font-black text-xl italic font-mono leading-none tracking-tighter">{p.amount}</span>
                 </div>
                 <p className="text-[9px] font-bold text-text-dim/50 uppercase tracking-[0.15em] mb-1.5 leading-none">{p.date}</p>
                 <p className="text-xs font-black text-secondary leading-none tracking-tight">{p.reason} <span className="text-accent opacity-50 ml-0.5">✓</span></p>
              </div>
            ))}
            {/* Edge spacer */}
            <div className="flex-shrink-0 w-2" />
          </div>
        </section>
      </div>
    </MobileWrapper>
  );
}
