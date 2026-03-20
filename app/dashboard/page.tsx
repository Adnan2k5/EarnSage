"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, Wind, CloudRain, AlertTriangle, ArrowRight, Bell, ChevronRight, Wallet, Map as MapIcon, Info, HelpCircle, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { MobileWrapper } from '@/components/shared/MobileWrapper';
import { cn } from '@/lib/utils';

const chartData = [
  { day: 'Mon', risk: 20 },
  { day: 'Tue', risk: 45 },
  { day: 'Wed', risk: 30 },
  { day: 'Thu', risk: 80 },
  { day: 'Fri', risk: 65 },
  { day: 'Sat', risk: 40 },
  { day: 'Sun', risk: 25 },
];

export default function Dashboard() {
  const router = useRouter();
  const [hasAlert, setHasAlert] = useState(true);

  return (
    <MobileWrapper withNav className="bg-surface-base px-6 pt-8 pb-24">
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-ink-primary text-white flex items-center justify-center font-display font-bold">
            RK
          </div>
          <div>
            <h1 className="text-subheading uppercase tracking-widest text-[10px] text-ink-muted">Welcome back</h1>
            <div className="text-heading">Hey, Ravi</div>
          </div>
        </div>
        <button className="relative w-11 h-11 rounded-full bg-surface-raised border border-border-light flex items-center justify-center group">
          <Bell className="w-5 h-5 text-ink-primary group-hover:scale-110 transition-transform" />
          <div className="absolute top-2.5 right-2.5 w-4 h-4 bg-status-danger rounded-full border-2 border-white flex items-center justify-center text-[8px] font-mono font-bold text-white">
            2
          </div>
        </button>
      </header>

      <div className="space-y-6">
        {/* Hero Coverage Card */}
        <Card variant="dark" className="p-6 relative overflow-hidden">
          <div className="flex justify-between items-start mb-6">
            <div className="space-y-1">
              <div className="text-[9px] font-bold text-white/50 uppercase tracking-[0.2em]">Your Coverage</div>
              <div className="text-mono-xl text-3xl text-white">₹2,100 <span className="text-[10px] font-body font-normal text-white/50 tracking-normal uppercase">/ week</span></div>
            </div>
            <div className="px-3 py-1 bg-status-success/20 text-status-success border border-status-success/30 rounded-full text-[9px] font-bold uppercase tracking-widest flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-status-success animate-pulse" />
              Active
            </div>
          </div>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-[10px] font-bold text-white/50 uppercase tracking-widest">
              <span>5 of 7 days</span>
              <span className="text-white">71%</span>
            </div>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: '71%' }} className="h-full bg-white" />
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="text-[10px] text-white/40 font-mono">RENEWS MAR 25 · ₹49</div>
            <button className="text-primary text-[11px] font-bold uppercase tracking-widest flex items-center gap-1">
              Manage <ChevronRight size={14} />
            </button>
          </div>
          
          <Shield className="absolute right-[-20px] bottom-[-20px] w-32 h-32 text-white/5 -rotate-12" />
        </Card>

        {/* Dynamic Weather Banner */}
        <AnimatePresence mode="wait">
          {hasAlert ? (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-status-warning/10 border border-status-warning/20 p-4 rounded-xl flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-lg bg-status-warning/20 flex items-center justify-center text-status-warning">
                <CloudRain size={20} />
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold text-ink-primary">Moderate rain detected</div>
                <div className="text-[11px] text-ink-muted">Koramangala · Trigger monitoring active</div>
              </div>
              <button onClick={() => router.push('/triggers')} className="text-[10px] font-bold uppercase tracking-widest text-ink-primary underline underline-offset-4">
                View
              </button>
            </motion.div>
          ) : (
            <div className="bg-status-success/10 border border-status-success/20 p-4 rounded-xl flex items-center gap-4">
               <ShieldCheck className="text-status-success" size={20} />
               <span className="text-xs font-bold text-ink-primary">Clear skies · Bengaluru East · Safe to ride</span>
            </div>
          )}
        </AnimatePresence>

        {/* Risk Telemetry Chart */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-ink-muted">Risk Telemetry</h3>
            <div className="text-[10px] text-status-success font-bold uppercase tracking-widest flex items-center gap-1">
              <Zap size={10} className="fill-status-success" /> Live Updated
            </div>
          </div>
          <Card className="p-6 bg-white shadow-card border-border-light relative overflow-hidden">
            <div className="flex justify-between items-end mb-8">
               <div className="space-y-1">
                 <div className="text-caption">Today's Risk Level</div>
                 <div className="text-mono-xl">4.2 <span className="text-xs text-ink-hint font-normal">/ 10</span></div>
               </div>
               <div className="text-right">
                  <div className="text-[10px] font-bold text-primary uppercase tracking-widest">Earnings Under Care</div>
                  <div className="text-mono-l">₹1,600</div>
               </div>
            </div>

            <div className="h-40 w-full -mx-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorRiskV3" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0F172A" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#0F172A" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="day" stroke="#94a3b8" fontSize={9} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} />
                  <Area type="monotone" dataKey="risk" stroke="#0F172A" fill="url(#colorRiskV3)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </section>

        {/* Live Triggers */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-ink-muted">Trigger Monitor</h3>
            <button onClick={() => router.push('/triggers')} className="text-[11px] font-bold text-ink-primary flex items-center gap-1">
              View Map <ChevronRight size={14} />
            </button>
          </div>
          <div className="space-y-3">
             <Card className="flex items-center justify-between p-4 border-[#E2E8F0] bg-white group hover:border-border-mid transition-all">
               <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-xl bg-surface-raised border border-border-light flex items-center justify-center">
                   <CloudRain className="text-ink-primary" size={18} />
                 </div>
                 <div>
                   <div className="text-xs font-bold text-ink-primary">Rainfall · Koramangala</div>
                   <div className="text-[10px] text-ink-muted uppercase font-bold tracking-widest mt-1">48mm/hr · Critical</div>
                 </div>
               </div>
               <div className="px-3 py-1 bg-status-warning/10 text-status-warning border border-status-warning/20 rounded-full text-[9px] font-bold uppercase">
                 Elevated
               </div>
             </Card>
             <Card className="flex items-center justify-between p-4 border-[#E2E8F0] bg-white opacity-60">
               <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-xl bg-surface-raised border border-border-light flex items-center justify-center">
                   <Wind className="text-ink-primary" size={18} />
                 </div>
                 <div>
                   <div className="text-xs font-bold text-ink-primary">AQI · Bengaluru South</div>
                   <div className="text-[10px] text-ink-muted uppercase font-bold tracking-widest mt-1">142 · Moderate</div>
                 </div>
               </div>
               <div className="px-3 py-1 bg-status-success/10 text-status-success border border-status-success/20 rounded-full text-[9px] font-bold uppercase">
                 Clear
               </div>
             </Card>
          </div>
        </section>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
           <Button variant="secondary" className="gap-3 h-14 uppercase tracking-[0.15em] text-[10px]">
             <Wallet size={16} /> My Payouts
           </Button>
           <Button variant="secondary" className="gap-3 h-14 uppercase tracking-[0.15em] text-[10px]">
             <MapIcon size={16} /> Risk Map
           </Button>
        </div>
      </div>
    </MobileWrapper>
  );
}
