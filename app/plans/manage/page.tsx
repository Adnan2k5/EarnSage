"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Wind, CloudRain, AlertTriangle, ArrowRight, Settings, Plus, ChevronRight, ShieldCheck, MapPin, Wallet } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { MobileWrapper } from '@/components/shared/MobileWrapper';

const zones = [
  { id: 1, name: 'Koramangala (Primary)', risk: 'Moderate', active: true },
  { id: 2, name: 'Indiranagar', risk: 'High', active: true },
  { id: 3, name: 'HSR Layout', risk: 'Low', active: false },
];

export default function PlanManagement() {
  const router = useRouter();

  return (
    <MobileWrapper withNav className="bg-surface-base px-6 pt-12 pb-24">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-display-l">Your Plan</h1>
        <button className="w-10 h-10 rounded-xl bg-white border border-border-light flex items-center justify-center text-ink-primary shadow-sm">
           <Settings size={18} />
        </button>
      </header>

      <div className="space-y-8">
        {/* Active Plan Card */}
        <Card variant="dark" className="p-8 relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-8">
             <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
                <ShieldCheck size={24} />
             </div>
             <div>
               <h3 className="text-heading text-white">Standard Shield</h3>
               <div className="px-2 py-0.5 bg-status-success text-white text-[8px] font-bold uppercase tracking-widest rounded-full inline-block">Active</div>
             </div>
          </div>
          
          <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-8">
             <div className="space-y-1">
                <div className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Weekly Premium</div>
                <div className="text-mono-l text-white text-xl">₹49.00</div>
             </div>
             <div className="space-y-1">
                <div className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Max Payout</div>
                <div className="text-mono-l text-white text-xl">₹2,100</div>
             </div>
             <div className="space-y-1">
                <div className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Next Renewal</div>
                <div className="text-mono-l text-white text-xl">Mar 25</div>
             </div>
             <div className="space-y-1">
                <div className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Payouts (MTD)</div>
                <div className="text-mono-l text-white text-xl">₹1,050</div>
             </div>
          </div>

          <div className="flex gap-2 mb-8">
            {['Rain', 'Flood', 'AQI'].map(t => (
              <div key={t} className="px-3 py-1 bg-white/10 text-white text-[9px] font-bold uppercase tracking-widest rounded-full">
                {t}
              </div>
            ))}
          </div>

          <Button variant="primary" className="w-full h-12 bg-primary hover:bg-primary/90 border-none uppercase tracking-widest text-xs">
             Upgrade Plan <ArrowRight size={14} className="ml-2" />
          </Button>

          <Shield className="absolute right-[-20px] top-[-20px] w-32 h-32 text-white/5 rotate-12" />
        </Card>

        {/* Zone Management */}
        <section className="space-y-4">
           <div className="flex justify-between items-center px-1">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink-muted">Active Coverage Zones</h3>
              <button className="text-primary text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                <Plus size={14} /> Add Zone
              </button>
           </div>
           
           <div className="space-y-3">
              {zones.map(zone => (
                <Card key={zone.id} className="p-4 bg-white border-border-light flex items-center justify-between group">
                   <div className="flex items-center gap-4">
                      <div className="w-9 h-9 rounded-lg bg-surface-raised border border-border-light flex items-center justify-center">
                        <MapPin size={18} className="text-ink-primary" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-ink-primary">{zone.name}</div>
                        <div className="flex items-center gap-2 mt-0.5">
                           <div className={cn(
                             "w-1.5 h-1.5 rounded-full animate-pulse",
                             zone.risk === 'High' ? "bg-status-danger" : zone.risk === 'Moderate' ? "bg-status-warning" : "bg-status-success"
                           )} />
                           <span className="text-[9px] font-bold uppercase tracking-widest text-ink-hint">{zone.risk} Risk</span>
                        </div>
                      </div>
                   </div>
                   <div className={cn(
                     "w-10 h-6 rounded-full relative transition-all cursor-pointer",
                     zone.active ? "bg-ink-primary" : "bg-surface-sunken"
                   )}>
                      <div className={cn(
                        "absolute top-1 w-4 h-4 bg-white rounded-full transition-all",
                        zone.active ? "right-1" : "left-1"
                      )} />
                   </div>
                </Card>
              ))}
           </div>
        </section>

        {/* Payment Settings */}
        <section className="space-y-4">
           <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink-muted px-1">Payment & Billing</h3>
           <Card className="p-5 border-border-light bg-white space-y-5">
              <div className="flex justify-between items-center">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-surface-raised border border-border-light flex items-center justify-center">
                       <Wallet size={18} className="text-ink-primary" />
                    </div>
                    <div>
                       <div className="text-xs font-bold">UPI Auto-pay</div>
                       <div className="text-[10px] text-ink-muted font-mono">ravi.kumar@okaxis</div>
                    </div>
                 </div>
                 <button className="text-[10px] font-bold text-primary uppercase tracking-widest underline underline-offset-4 decoration-primary/20">Change</button>
              </div>
              <div className="h-[1px] w-full bg-surface-sunken" />
              <button className="w-full flex justify-between items-center text-xs font-bold group">
                 <span className="text-ink-primary">View Billing History</span>
                 <ChevronRight size={16} className="text-ink-hint group-hover:translate-x-1 transition-transform" />
              </button>
           </Card>
        </section>

        <div className="pt-4 pb-12 flex flex-col items-center gap-4">
           <Button variant="ghost" className="text-status-danger hover:text-white hover:bg-status-danger/90 border-status-danger/20 w-full uppercase tracking-widest text-[10px] h-12">
              Pause Coverage
           </Button>
           <p className="text-[10px] text-ink-hint uppercase font-bold tracking-[0.2em]">Partner since January 2025</p>
        </div>
      </div>
    </MobileWrapper>
  );
}
