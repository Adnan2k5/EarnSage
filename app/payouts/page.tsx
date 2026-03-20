"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Filter, Download, CloudRain, Wind, AlertTriangle, Wallet, ArrowUpRight, Search, Clock, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { MobileWrapper } from '@/components/shared/MobileWrapper';

const payouts = [
  { id: '1', type: 'Rainfall', amount: '300.00', date: 'Mar 12, 2025', time: '1hr 42min', status: 'PAID', zone: 'Koramangala', icon: CloudRain },
  { id: '2', type: 'Flood', amount: '450.00', date: 'Mar 03, 2025', time: '2hr 11min', status: 'PAID', zone: 'Indiranagar', icon: AlertTriangle },
  { id: '3', type: 'AQI Level', amount: '300.00', date: 'Feb 22, 2025', time: '3hr 05min', status: 'PAID', zone: 'HSR Layout', icon: Wind },
  { id: '4', type: 'Rainfall', amount: '300.00', date: 'Feb 08, 2025', time: '0hr 58min', status: 'PAID', zone: 'Koramangala', icon: CloudRain },
];

export default function PayoutCenter() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <MobileWrapper withNav className="bg-surface-base px-6 pt-12 pb-24">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-display-l">Your Payouts</h1>
        <button className="w-10 h-10 rounded-xl bg-white border border-border-light flex items-center justify-center text-ink-primary shadow-sm hover:border-border-mid">
           <Download size={18} />
        </button>
      </header>

      <div className="space-y-8">
        {/* Summary Card */}
        <Card variant="dark" className="p-8 relative overflow-hidden group">
          <div className="space-y-1 mb-8 relative z-10">
            <div className="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em]">Total Protected Earnings</div>
            <div className="text-mono-xl text-[44px] text-white">₹2,040</div>
            <div className="text-caption text-white/50 mt-1 uppercase tracking-widest">7 payouts this quarter</div>
          </div>
          
          <div className="h-10 w-full relative z-10 flex items-end gap-1 px-1 opacity-50">
             {[30, 50, 40, 70, 60, 80, 50, 90, 40, 60].map((h, i) => (
                <div key={i} className="flex-1 bg-white/20 rounded-t-sm" style={{ height: `${h}%` }} />
             ))}
          </div>
          
          <Wallet className="absolute right-[-20px] bottom-[-20px] w-32 h-32 text-white/5 -rotate-12" />
          <div className="absolute top-0 right-0 p-6">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white backdrop-blur-sm">
              <ArrowUpRight size={20} />
            </div>
          </div>
        </Card>

        {/* Filter Tabs */}
        <div className="flex gap-2 p-1.5 bg-surface-raised border border-border-light rounded-full overflow-x-auto no-scrollbar">
           {['All', 'Alerts', 'Payouts', 'System'].map(f => (
             <button 
              key={f}
              onClick={() => setActiveFilter(f)}
              className={cn(
                "px-6 py-2 rounded-full text-[10px] font-extrabold uppercase tracking-widest transition-all whitespace-nowrap",
                activeFilter === f ? "bg-ink-primary text-white" : "text-ink-muted"
              )}
             >
               {f}
             </button>
           ))}
        </div>

        {/* Payout List */}
        <div className="space-y-3">
           {payouts.map((p) => (
             <Card 
              key={p.id} 
              className="p-5 border-border-light bg-white hover:border-border-mid transition-all group cursor-pointer"
              onClick={() => router.push(`/payouts/${p.id}`)}
             >
                <div className="flex justify-between items-start mb-4">
                   <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-full bg-surface-raised border border-border-light flex items-center justify-center">
                         <p.icon className="text-ink-primary group-hover:scale-110 transition-transform" size={20} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-ink-primary italic">{p.type} Protection</div>
                        <div className="text-[10px] text-ink-muted uppercase font-bold tracking-widest mt-1">{p.zone} · {p.date}</div>
                      </div>
                   </div>
                   <div className="text-right">
                     <div className="text-mono-l text-lg">₹{p.amount}</div>
                     <div className="flex items-center justify-end gap-1.5 mt-1 text-status-success">
                        <CheckCircle2 size={10} />
                        <span className="text-[9px] font-bold uppercase tracking-widest">Paid</span>
                     </div>
                   </div>
                </div>
                
                <div className="h-[1px] w-full bg-surface-sunken mb-4" />
                
                <div className="flex justify-between items-center text-[10px] text-ink-hint font-bold uppercase tracking-widest px-1">
                   <div className="flex items-center gap-1.5"><Clock size={12} /> {p.time} processing</div>
                   <div className="flex items-center gap-1 group-hover:text-primary transition-colors">Details <ChevronRight size={14} /></div>
                </div>
             </Card>
           ))}
        </div>

        <Button variant="ghost" className="w-full text-ink-muted uppercase tracking-[0.2em] text-[10px] h-12">
           Download Full Statement
        </Button>
      </div>
    </MobileWrapper>
  );
}
