"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Bell, Wallet, ShieldCheck, AlertTriangle, CloudRain, Wind, MoreVertical, CheckCircle2, Search, Settings, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { MobileWrapper } from '@/components/shared/MobileWrapper';

const notifications = [
  { 
    id: 1, 
    type: 'trigger', 
    title: 'Rainfall Alert', 
    body: 'Moderate rainfall (48mm/hr) detected in Koramangala. Trigger monitoring active.', 
    time: '2 mins ago', 
    read: false, 
    icon: CloudRain, 
    color: '#D97706' 
  },
  { 
    id: 2, 
    type: 'payout', 
    title: 'Payout Received', 
    body: '₹300.00 has been credited to your UPI ID for the rainfall event on Mar 12.', 
    time: '2 hrs ago', 
    read: false, 
    icon: CheckCircle2, 
    color: '#059669' 
  },
  { 
    id: 3, 
    type: 'system', 
    title: 'Plan Renewed', 
    body: 'Your Standard Shield plan has been renewed for next week. Premium: ₹49.00.', 
    time: '1 day ago', 
    read: true, 
    icon: ShieldCheck, 
    color: '#0F172A' 
  },
  { 
    id: 4, 
    type: 'alert', 
    title: 'HSR Zone Offline', 
    body: 'Monitoring is temporarily offline for HSR Layout due to sensor maintenance.', 
    time: '2 days ago', 
    read: true, 
    icon: AlertTriangle, 
    color: '#0284C7' 
  },
];

export default function Notifications() {
  const router = useRouter();
  const [filter, setFilter] = useState('All');

  return (
    <MobileWrapper className="bg-surface-base flex flex-col min-h-screen">
      <header className="px-6 pt-12 pb-6">
        <div className="flex justify-between items-center mb-8">
           <h1 className="text-display-l">Notifications</h1>
           <div className="flex gap-2">
              <button className="w-10 h-10 rounded-xl bg-white border border-border-light flex items-center justify-center text-ink-primary shadow-sm group">
                 <Settings size={18} className="group-hover:rotate-45 transition-transform" />
              </button>
           </div>
        </div>

        <div className="flex justify-between items-center mb-6">
           <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
             {['All', 'Alerts', 'Payouts', 'System'].map(f => (
               <button 
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-6 py-2 rounded-full text-[10px] font-extrabold uppercase tracking-widest transition-all",
                  filter === f ? "bg-ink-primary text-white" : "bg-white border border-border-light text-ink-muted"
                )}
               >
                 {f}
               </button>
             ))}
           </div>
           <button className="text-[10px] font-bold text-primary uppercase tracking-widest ml-4 whitespace-nowrap">Mark all read</button>
        </div>
      </header>

      <main className="flex-1 px-6 pb-24 space-y-4">
        {notifications.map((n) => (
          <Card 
            key={n.id} 
            className={cn(
              "p-5 border-border-light shadow-card group transition-all",
              !n.read ? "bg-[#F8FAFC] border-l-4 border-l-ink-primary shadow-md" : "bg-white opacity-70"
            )}
          >
             <div className="flex gap-4">
                <div className={cn(
                  "w-11 h-11 rounded-full flex items-center justify-center shrink-0 border",
                  !n.read ? "bg-white border-ink-primary/10" : "bg-surface-raised border-border-light"
                )}>
                   <n.icon size={20} className={!n.read ? "text-ink-primary" : "text-ink-muted"} />
                </div>
                <div className="flex-1 space-y-1.5 pt-0.5">
                   <div className="flex justify-between items-start">
                      <h4 className={cn("text-subheading underline underline-offset-4 decoration-primary/10", !n.read ? "text-ink-primary" : "text-ink-muted")}>{n.title}</h4>
                      <span className="text-[9px] font-bold text-ink-hint uppercase tracking-[0.1em]">{n.time}</span>
                   </div>
                   <p className={cn("text-body leading-relaxed", !n.read ? "text-ink-secondary" : "text-ink-hint")}>
                      {n.body}
                   </p>
                   {!n.read && n.type === 'payout' && (
                     <button className="mt-2 text-primary text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
                       View Payout <ArrowRight size={14} />
                     </button>
                   )}
                </div>
             </div>
          </Card>
        ))}

        <div className="py-8 flex flex-col items-center gap-4">
           <div className="w-12 h-12 rounded-full bg-surface-raised border border-border-light flex items-center justify-center text-ink-hint opacity-50">
              <CheckCircle2 size={24} />
           </div>
           <p className="text-[10px] text-ink-hint uppercase font-bold tracking-[0.2em]">No more notifications</p>
        </div>
      </main>
    </MobileWrapper>
  );
}
