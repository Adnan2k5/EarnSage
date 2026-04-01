"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, TrendingUp, Wallet, Shield, Clock, ArrowRight, BarChart2, PieChart, Info, HelpCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MobileWrapper } from '@/components/shared/MobileWrapper';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const roiData = [
  { month: 'Oct', paid: 196, saved: 1200 },
  { month: 'Nov', paid: 196, saved: 400 },
  { month: 'Dec', paid: 196, saved: 2100 },
  { month: 'Jan', paid: 196, saved: 850 },
  { month: 'Feb', paid: 196, saved: 0 },
  { month: 'Mar', paid: 196, saved: 1400 },
];

export default function RiderStats() {
  const router = useRouter();

  return (
    <MobileWrapper className="bg-surface-base px-6 pt-8 pb-32 min-h-screen">
      <header className="flex items-center gap-4 mb-10">
        <button onClick={() => router.back()} className="w-10 h-10 rounded-full bg-surface-raised border border-border-light flex items-center justify-center text-ink-primary">
          <ChevronLeft size={20} />
        </button>
        <div>
          <h1 className="text-display-l">My ROI</h1>
          <div className="text-[10px] font-bold text-ink-hint uppercase tracking-widest italic">Protection Efficiency</div>
        </div>
      </header>

      <div className="space-y-8">
        {/* Total Returns Card */}
        <Card className="p-8 bg-ink-primary text-white border-none relative overflow-hidden shadow-2xl">
           <div className="relative z-10 space-y-6">
              <div className="flex justify-between items-start">
                 <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                    <TrendingUp className="text-primary" size={24} />
                 </div>
                 <div className="text-right">
                    <div className="text-[9px] font-bold text-white/50 uppercase tracking-widest">Total Protected</div>
                    <div className="text-mono-xl text-3xl">₹5,950</div>
                 </div>
              </div>
              
              <div className="h-[1px] w-full bg-white/10" />
              
              <div className="flex justify-between items-end">
                 <div>
                    <div className="text-[9px] font-bold text-white/50 uppercase tracking-widest mb-1">Total Premiums</div>
                    <div className="text-mono-l text-xl">₹1,176</div>
                 </div>
                 <div className="text-right">
                    <div className="text-[9px] font-bold text-status-success uppercase tracking-[0.2em] mb-1">Net ROI</div>
                    <div className="text-2xl font-bold text-status-success leading-none">5.06x</div>
                 </div>
              </div>
           </div>
           <BarChart2 className="absolute right-[-20px] bottom-[-20px] w-40 h-40 text-white/5 -rotate-12" />
        </Card>

        {/* Comparison Chart */}
        <section className="space-y-4">
           <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink-muted px-1">Premiums vs. Payouts</h3>
           <Card className="p-6 h-64 border-border-light shadow-sm">
              <div className="h-48 w-full -ml-4">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={roiData}>
                       <defs>
                          <linearGradient id="colorSaved" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#FF6B2B" stopOpacity={0.2}/>
                             <stop offset="95%" stopColor="#FF6B2B" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <XAxis dataKey="month" stroke="#94a3b8" fontSize={9} tickLine={false} axisLine={false} />
                       <Area type="monotone" dataKey="saved" stroke="#FF6B2B" strokeWidth={3} fill="url(#colorSaved)" />
                       <Area type="monotone" dataKey="paid" stroke="#0F172A" strokeWidth={2} fill="transparent" strokeDasharray="5 5" />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-6 mt-2">
                 <div className="flex items-center gap-2 text-[9px] font-bold text-ink-hint uppercase">
                    <div className="w-2 h-2 rounded-full bg-primary" /> Payouts
                 </div>
                 <div className="flex items-center gap-2 text-[9px] font-bold text-ink-hint uppercase">
                    <div className="w-2 h-2 rounded-full border border-ink-primary border-dashed" /> Premiums
                 </div>
              </div>
           </Card>
        </section>

        {/* Life Stats */}
        <section className="grid grid-cols-2 gap-4">
           <Card className="p-5 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-surface-raised border border-border-light flex items-center justify-center text-ink-primary">
                 <Clock size={16} />
              </div>
              <div>
                 <div className="text-(9px) font-bold text-ink-hint uppercase tracking-widest">Rainy Hours</div>
                 <div className="text-xl font-bold">142h</div>
                 <div className="text-[9px] text-ink-muted italic">Protected from wet work</div>
              </div>
           </Card>
           <Card className="p-5 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-surface-raised border border-border-light flex items-center justify-center text-ink-primary">
                 <Shield size={16} />
              </div>
              <div>
                 <div className="text-[9px] font-bold text-ink-hint uppercase tracking-widest">Safety Streak</div>
                 <div className="text-xl font-bold">18w</div>
                 <div className="text-[9px] text-ink-muted italic">Consecutive protection</div>
              </div>
           </Card>
        </section>

        {/* ROI Explanation */}
        <section className="p-6 bg-surface-raised border border-border-light rounded-3xl space-y-4">
           <div className="flex items-center gap-3">
              <Info size={18} className="text-primary" />
              <h4 className="text-xs font-bold uppercase tracking-widest text-ink-primary">What is Net ROI?</h4>
           </div>
           <p className="text-[10px] text-ink-muted leading-relaxed">
             Net ROI is the ratio of **Total Protected Earnings** to **Total Premiums Paid**. A 5.06x ROI means you saved ₹5 for every ₹1 invested in your protection.
           </p>
        </section>

        <Button className="w-full h-14 bg-[#FF6B2B] hover:bg-[#E8571A] text-white border-none uppercase tracking-widest font-bold shadow-cta">
           Share My Safety Stats <ArrowRight size={18} className="ml-2" />
        </Button>
      </div>
    </MobileWrapper>
  );
}
