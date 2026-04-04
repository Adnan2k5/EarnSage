"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, BarChart3, LineChart, PieChart, Info, ChevronLeft, ArrowUpRight, Landmark, FileText, Activity, Database, CheckCircle2, Globe, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LineChart as ReLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { MobileWrapper } from '@/components/shared/MobileWrapper';
import { cn } from '@/lib/utils';

const lossRatioData = [
  { month: 'Oct', ratio: 62 },
  { month: 'Nov', ratio: 58 },
  { month: 'Dec', ratio: 74 },
  { month: 'Jan', ratio: 65 },
  { month: 'Feb', ratio: 69 },
  { month: 'Mar', ratio: 61 },
];

const treaties = [
  { 
    title: "Quota Share (QS)", 
    partner: "Munich Re", 
    coverage: "30% Risk Transfer",
    details: "Earn Sage retains 70% of premiums; 30% ceded to Munich Re for global pool stability.",
    status: "Active"
  },
  { 
    title: "Excess of Loss (XOL)", 
    partner: "Swiss Re", 
    coverage: "₹100 Cr Aggregate",
    details: "Protection against catastrophic monsoon events exceeding ₹50 Cr in aggregate claims.",
    status: "Active"
  },
  { 
    title: "Stop Loss", 
    partner: "Hannover Re", 
    coverage: "L/R > 85%",
    details: "Captures tail risk if the net loss ratio exceeds 85% in a single financial year.",
    status: "Pending Sync"
  }
];

export default function ReinsuranceDashboard() {
  const router = useRouter();
  const [expandedTreaty, setExpandedTreaty] = useState<number | null>(null);

  return (
    <MobileWrapper className="bg-surface-base px-6 pt-8 pb-32 min-h-screen">
      <header className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="w-10 h-10 rounded-full bg-surface-raised border border-border-light flex items-center justify-center text-ink-primary">
          <ChevronLeft size={20} />
        </button>
        <div>
          <h1 className="text-display-l">Reinsurance</h1>
          <div className="text-[10px] font-bold text-ink-hint uppercase tracking-widest italic flex items-center gap-2">
            <Lock size={10} className="text-status-success" /> Institutional Transparency
          </div>
        </div>
      </header>

      <div className="space-y-6">
        {/* Solvency Gauge Card */}
        <Card variant="dark" className="p-8 relative overflow-hidden bg-ink-primary border-none text-white shadow-2xl">
           <div className="relative z-10 grid grid-cols-5 gap-6 items-center">
              <div className="col-span-3 space-y-4">
                 <div className="flex items-center gap-2">
                    <Shield className="text-primary" size={18} />
                    <span className="text-[9px] font-bold text-white/50 uppercase tracking-[0.2em]">Solvency II Oracle</span>
                 </div>
                 <div>
                    <div className="text-mono-xl text-4xl leading-none">210.4%</div>
                    <div className="text-[10px] text-status-success font-bold mt-2 flex items-center gap-1">
                       <CheckCircle2 size={12} /> Capital Adequate
                    </div>
                 </div>
                 <div className="text-[10px] text-white/40 leading-relaxed italic max-w-[180px]">
                   Maintaining 1.4x the statutory minimum for rider protection.
                 </div>
              </div>
              
              <div className="col-span-2 flex justify-center relative">
                 {/* Gauge Simulation */}
                 <div className="w-24 h-24 rounded-full border-4 border-white/5 flex items-center justify-center relative">
                    <svg className="w-full h-full -rotate-90">
                       <circle cx="48" cy="48" r="40" fill="transparent" stroke="rgba(255,107,43,0.1)" strokeWidth="8" />
                       <motion.circle 
                         cx="48" cy="48" r="40" fill="transparent" stroke="#FF6B2B" strokeWidth="8" 
                         strokeDasharray="251.2"
                         initial={{ strokeDashoffset: 251.2 }}
                         animate={{ strokeDashoffset: 251.2 * (1 - 0.85) }}
                         transition={{ duration: 2, delay: 0.5 }}
                         strokeLinecap="round"
                       />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                       <div className="text-center">
                          <div className="text-[8px] font-bold text-white/40 uppercase">Ratio</div>
                          <div className="text-xs font-mono font-bold text-white">2.1x</div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
           {/* Decorative Grid */}
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,107,43,0.1),transparent_70%)] pointer-events-none" />
           <Landmark className="absolute right-[-20px] top-[-20px] w-40 h-40 text-white/5 -rotate-12" />
        </Card>

        {/* Global Financial Metrics */}
        <div className="grid grid-cols-2 gap-4">
           <Card className="p-5 flex flex-col justify-between h-32 border-border-light shadow-sm">
              <div className="text-[9px] font-bold text-ink-muted uppercase tracking-widest flex items-center gap-2">
                <Activity size={12} /> Net Loss Ratio
              </div>
              <div>
                 <div className="text-mono-l text-xl">64.2%</div>
                 <div className="text-[9px] text-status-success font-bold mt-1">▼ 2.1% Below Projection</div>
              </div>
           </Card>
           <Card className="p-5 flex flex-col justify-between h-32 border-border-light shadow-sm">
              <div className="text-[9px] font-bold text-ink-muted uppercase tracking-widest flex items-center gap-2">
                <Globe size={12} /> Claims Paid (YT)
              </div>
              <div>
                 <div className="text-mono-l text-xl">₹4.2 Cr</div>
                 <div className="text-[9px] text-ink-hint font-bold mt-1">Parametric Settlement Hub</div>
              </div>
           </Card>
        </div>

        {/* Guidewire Pulse */}
        <section className="space-y-4">
           <div className="flex justify-between items-center px-1">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink-muted">Integration Status</h3>
              <div 
                onClick={() => router.push('/partners/guidewire')}
                className="text-[9px] text-primary font-bold uppercase tracking-widest cursor-pointer hover:underline flex items-center gap-1"
              >
                Enter Dev Portal <ArrowUpRight size={12} />
              </div>
           </div>
           <Card className="p-4 bg-slate-900 border-none text-white overflow-hidden relative group">
              <div className="relative z-10 flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                       <Database size={20} />
                    </div>
                    <div>
                       <div className="text-[10px] font-bold uppercase tracking-widest">Guidewire Cloud</div>
                       <motion.div 
                         initial={{ opacity: 0.5 }}
                         animate={{ opacity: [0.5, 1, 0.5] }}
                         transition={{ repeat: Infinity, duration: 2 }}
                         className="text-[8px] text-emerald-400 font-bold uppercase tracking-widest flex items-center gap-1.5 mt-1"
                       >
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                          Live Parametric Syncing
                       </motion.div>
                    </div>
                 </div>
                 <div className="text-right">
                    <div className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Uptime</div>
                    <div className="text-xs font-mono font-bold text-emerald-400">99.98%</div>
                 </div>
              </div>
              <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-primary/10 to-transparent pointer-events-none" />
           </Card>
        </section>

        {/* Performance Trend Chart */}
        <section className="space-y-4">
           <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink-muted px-1">Loss Performance Trend</h3>
           <Card className="p-6 h-64 border-border-light shadow-sm bg-white">
              <div className="flex justify-between items-center mb-6">
                 <div className="text-[10px] font-bold text-ink-primary uppercase tracking-widest">Monthly GWP Allocation (%)</div>
                 <div className="flex gap-4">
                    <div className="flex items-center gap-1.5 text-[9px] font-bold text-ink-hint">
                       <div className="w-2 h-2 rounded-full bg-primary" /> Target
                    </div>
                    <div className="flex items-center gap-1.5 text-[9px] font-bold text-ink-hint">
                       <div className="w-2 h-2 rounded-full bg-ink-primary" /> Actual
                    </div>
                 </div>
              </div>
              <div className="h-40 w-full -ml-4">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={lossRatioData}>
                       <defs>
                          <linearGradient id="colorRatio" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#FF6B2B" stopOpacity={0.1}/>
                             <stop offset="95%" stopColor="#FF6B2B" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <XAxis dataKey="month" stroke="#94a3b8" fontSize={9} tickLine={false} axisLine={false} />
                       <Area type="monotone" dataKey="ratio" stroke="#0F172A" strokeWidth={2} fill="url(#colorRatio)" />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
           </Card>
        </section>

        {/* Treaty Explorer (Enhanced) */}
        <section className="space-y-4">
           <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink-muted px-1">Institutional Treaty Explorer</h3>
           <div className="space-y-3">
              {treaties.map((treaty, i) => (
                <div key={i} className="bg-white border border-border-light rounded-3xl overflow-hidden shadow-sm transition-all duration-300">
                   <button 
                     onClick={() => setExpandedTreaty(expandedTreaty === i ? null : i)}
                     className="w-full flex items-center justify-between p-5 hover:bg-surface-raised transition-colors"
                   >
                      <div className="flex items-center gap-4 text-left">
                         <div className="w-10 h-10 rounded-2xl bg-surface-raised border border-border-light flex items-center justify-center text-ink-primary">
                            {i === 0 ? <PieChart size={18} /> : i === 1 ? <Shield size={18} /> : <BarChart3 size={18} />}
                         </div>
                         <div>
                            <div className="text-xs font-bold text-ink-primary">{treaty.title}</div>
                            <div className="text-[9px] font-bold text-ink-hint uppercase tracking-widest">{treaty.partner}</div>
                         </div>
                      </div>
                      <div className="text-right">
                         <div className="text-[9px] font-bold text-primary uppercase tracking-widest">{treaty.coverage}</div>
                         <div className={cn(
                           "text-[8px] font-bold px-2 py-0.5 rounded-full uppercase mt-1 inline-block",
                           treaty.status === "Active" ? "bg-status-success/10 text-status-success border border-status-success/20" : "bg-status-warning/10 text-status-warning border border-status-warning/20"
                         )}>
                            {treaty.status}
                         </div>
                      </div>
                   </button>
                   
                   <AnimatePresence>
                      {expandedTreaty === i && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-5 pb-5 pt-1 border-t border-border-light"
                        >
                           <p className="text-[10px] text-ink-muted leading-relaxed mt-2 p-3 bg-surface-raised rounded-xl">
                             {treaty.details}
                           </p>
                           <Button variant="ghost" className="w-full mt-4 h-10 text-[9px] uppercase tracking-[0.2em] hover:bg-primary/5 hover:text-primary">
                             View Complete Treaty Docs <ArrowUpRight size={14} className="ml-1" />
                           </Button>
                        </motion.div>
                      )}
                   </AnimatePresence>
                </div>
              ))}
           </div>
        </section>

        {/* Global Protection Solvency Note */}
        <section className="bg-surface-raised border border-border-light p-6 rounded-[32px] space-y-4">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                 <Shield size={20} />
              </div>
              <h4 className="text-subheading text-xs">Actuarial Pool Health</h4>
           </div>
           <p className="text-[10px] text-ink-muted leading-relaxed">
             Data presented here reflects the aggregate performance of the Earn Sage risk pool. Solvency ratios are calculated based on IRDAI parametric sandbox guidelines and verified by regional actuarial partners.
           </p>
           <div className="pt-2">
              <Button className="w-full text-[9px] uppercase tracking-widest h-12 bg-white text-ink-primary border border-border-light shadow-sm hover:bg-surface-raised font-bold">
                 Download Actuarial Pool Report <FileText size={14} className="ml-2" />
              </Button>
           </div>
        </section>
      </div>
    </MobileWrapper>
  );
}
