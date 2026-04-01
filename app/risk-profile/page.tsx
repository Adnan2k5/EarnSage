"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, CloudRain, Wind, AlertTriangle, ArrowRight, Info, Zap, ChevronRight, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { MobileWrapper } from '@/components/shared/MobileWrapper';

const loadingSteps = [
  "Scanning your delivery zones...",
  "Checking historical weather data...",
  "Analyzing flood & AQI patterns...",
  "Calculating disruption frequency...",
  "Building your risk profile..."
];

export default function RiskAnalysis() {
  const [loading, setLoading] = useState(true);
  const [stepIndex, setStepIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (loading) {
      const stepTimer = setInterval(() => {
        setStepIndex(prev => (prev < loadingSteps.length - 1 ? prev + 1 : prev));
      }, 500);
      const totalTimer = setTimeout(() => setLoading(false), 3000);
      return () => {
        clearInterval(stepTimer);
        clearTimeout(totalTimer);
      };
    }
  }, [loading]);

  if (loading) {
    return (
      <MobileWrapper className="bg-surface-base flex flex-col items-center justify-center p-8">
        <div className="relative mb-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-surface-sunken border-t-ink-primary rounded-full"
          />
        </div>
        <div className="text-center space-y-2">
          <AnimatePresence mode="wait">
            <motion.p
              key={stepIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="font-mono text-sm text-ink-primary"
            >
              {loadingSteps[stepIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </MobileWrapper>
    );
  }

  return (
    <MobileWrapper className="bg-surface-base flex flex-col min-h-screen">
      <header className="px-6 pt-12 pb-6 flex justify-between items-center">
        <h1 className="text-display-l">Risk Profile</h1>
        <div className="bg-ink-primary text-white text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-full">AI Analysis</div>
      </header>

      <main className="flex-1 px-6 pb-24 space-y-6">
        {/* Score Card */}
        <Card className="p-8 border-border-light shadow-card rounded-[24px] text-center">
          <div className="text-[10px] font-bold tracking-widest text-ink-muted uppercase mb-8">Your Risk Score</div>
          
          <div className="relative w-full max-w-[240px] mx-auto aspect-square flex items-center justify-center mb-8">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="50%" cy="50%" r="45%"
                className="stroke-surface-sunken fill-none"
                strokeWidth="10"
              />
              <motion.circle
                cx="50%" cy="50%" r="45%"
                className="stroke-status-warning fill-none"
                strokeWidth="10"
                strokeDasharray="283"
                initial={{ strokeDashoffset: 283 }}
                animate={{ strokeDashoffset: 283 - (283 * 0.64) }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <div className="text-mono-xl text-[52px]">64</div>
              <div className="text-caption text-ink-hint">/ 100</div>
            </div>
          </div>
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-status-warning/10 text-status-warning border border-status-warning/20 text-xs font-bold uppercase mb-2">
            Moderate Risk
          </div>
          <div className="text-caption">Koramangala, Bengaluru</div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="p-4 bg-status-danger/5 border-status-danger/10 text-center">
             <div className="text-status-danger font-mono text-base font-bold">HIGH</div>
             <div className="text-[9px] font-bold uppercase tracking-wider">Rainfall</div>
          </Card>
          <Card className="p-4 bg-status-warning/5 border-status-warning/10 text-center">
             <div className="text-status-warning font-mono text-base font-bold">MED</div>
             <div className="text-[9px] font-bold uppercase tracking-wider">AQI</div>
          </Card>
          <Card className="p-4 bg-status-success/5 border-status-success/10 text-center">
             <div className="text-status-success font-mono text-base font-bold">LOW</div>
             <div className="text-[9px] font-bold uppercase tracking-wider">Civic</div>
          </Card>
        </div>

        {/* AI Insight */}
        <Card className="bg-white border-border-light border-l-4 border-l-ink-primary p-6">
           <div className="text-[10px] font-bold tracking-widest uppercase mb-2">AI Insight</div>
           <p className="text-body text-ink-secondary leading-relaxed">
             Rainfall in your zone is 22% higher than the city average. We recommend active protection for at least 3 weeks each month.
           </p>
        </Card>

        {/* Recommendation Card */}
        <Card variant="dark" className="p-6 relative overflow-hidden group">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-display-l text-white text-lg">Standard Shield</h3>
              <p className="text-white/50 text-[11px]">Recommended for your zone</p>
            </div>
            <div className="text-right">
              <div className="text-mono-xl text-white text-2xl">₹49</div>
              <div className="text-white/50 text-[11px]">/ week</div>
            </div>
          </div>

          {/* Model Explainability Section */}
          <div className="mb-8 space-y-4">
            <div className="text-[10px] font-bold tracking-widest text-white/40 uppercase">Why this score</div>
            <div className="space-y-2">
              {[
                { label: "High frequency of rain events (past 90d)", value: 85 },
                { label: "Active monsoon seasonal risk", value: 72 },
                { label: "Zone elevation & flood vulnerability", value: 45 }
              ].map((factor, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-[10px] text-white/70">
                    <span>{factor.label}</span>
                    <span>{factor.value}%</span>
                  </div>
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${factor.value}%` }}
                      transition={{ duration: 1, delay: 0.5 + (i * 0.2) }}
                      className="h-full bg-primary"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-4 text-[10px] text-primary font-bold">
              <Zap size={12} />
              <span>31% chance of payout trigger in next 7 days</span>
            </div>
          </div>
          
          <div className="flex gap-2 flex-wrap mb-8">
            {['Rain', 'Flood', 'AQI', 'Curfew'].map(t => (
              <div key={t} className="px-3 py-1 rounded-full bg-white/10 text-white text-[10px] font-bold uppercase tracking-widest">
                {t}
              </div>
            ))}
          </div>
          
          <Button variant="primary" className="w-full bg-[#FF6B2B] hover:bg-[#E8571A]" onClick={() => router.push('/plans')}>
            Activate This Plan
          </Button>
          
          {/* Background Decor */}
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl opacity-50 group-hover:scale-125 transition-transform duration-500" />
        </Card>

        <div className="text-center space-y-4">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-raised border border-border-light text-[9px] font-bold text-ink-muted uppercase">
             <ShieldCheck size={12} className="text-status-success" />
             Model AUC: 0.847 • Trained on 618,310 points
           </div>
           <br />
           <Button variant="ghost" className="text-ink-muted h-auto py-2" onClick={() => router.push('/plans')}>
             See All Plans <ChevronRight size={16} className="ml-1" />
           </Button>
        </div>
      </main>
    </MobileWrapper>
  );
}
