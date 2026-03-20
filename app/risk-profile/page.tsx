"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CloudRain, Zap, Calendar, Shield, Check, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

const data = [
  { name: 'Risk', value: 64 },
  { name: 'Safe', value: 36 },
];
const COLORS = ['#FFD166', '#E5E7EB']; // Amber for moderate risk

export default function RiskProfilePage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F7FA] pb-10">
      {/* Header */}
      <header className="px-6 pt-8 pb-4 flex items-center gap-4">
        <button onClick={() => router.back()} className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm active:scale-90 transition-transform">
          <ArrowLeft size={20} className="text-secondary" />
        </button>
        <span className="text-[10px] font-bold text-secondary/40 uppercase tracking-[0.2em] pt-1">Profile Analysis</span>
      </header>

      <main className="flex-1 px-6">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-secondary tracking-tight">AI Risk Score</h1>
          <p className="text-text-dim text-sm font-medium mt-1">Zone: Koramangala, Bengaluru</p>
        </div>

        {/* Risk Meter */}
        <div className="relative w-64 h-64 mx-auto mb-10">
          {mounted && (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={75}
                  outerRadius={95}
                  startAngle={225}
                  endAngle={-45}
                  paddingAngle={0}
                  dataKey="value"
                  stroke="none"
                  animationBegin={200}
                  animationDuration={1500}
                >
                  <Cell fill={COLORS[0]} cornerRadius={10} />
                  <Cell fill={COLORS[1]} />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          )}
          
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center"
            >
              <p className="text-[10px] font-bold text-alert uppercase tracking-[0.2em] mb-1">Status</p>
              <h2 className="text-6xl font-black text-secondary leading-none">64</h2>
              <p className="text-sm font-bold text-secondary/60 mt-2">MODERATE</p>
            </motion.div>
          </div>

          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white px-5 py-2 rounded-2xl shadow-card border border-gray-50 flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-alert animate-pulse shadow-[0_0_10px_rgba(255,209,102,0.5)]" />
            <span className="text-[10px] font-black text-secondary uppercase tracking-[0.1em]">Medium Exposure</span>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-3 gap-3 mb-10">
          {[
            { icon: <CloudRain className="text-blue-500" size={18} />, label: "Weather", val: "High Wait" },
            { icon: <Zap className="text-alert" size={18} />, label: "Zone Load", val: "Medium" },
            { icon: <Calendar className="text-accent" size={18} />, label: "Disruptions", val: "4.2d/mo" },
          ].map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.1 }}
              className="bg-white p-4 pt-5 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center gap-3 text-center"
            >
              <div className="w-11 h-11 rounded-2xl bg-gray-50 flex items-center justify-center">
                {stat.icon}
              </div>
              <div className="space-y-1">
                <p className="text-[8px] font-bold text-text-dim uppercase tracking-widest leading-none">{stat.label}</p>
                <p className="text-[11px] font-black text-secondary leading-none">{stat.val}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* AI Insight banner */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="bg-secondary p-6 rounded-[32px] shadow-2xl relative overflow-hidden group mb-10 border border-white/5"
        >
          {/* Animated Glow Background */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-accent/20 blur-[60px] rounded-full group-hover:bg-accent/30 transition-colors duration-1000" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-lg bg-accent/20 flex items-center justify-center border border-accent/20">
                <Shield size={14} className="text-accent" fill="currentColor" fillOpacity={0.2} />
              </div>
              <p className="text-[10px] font-black text-accent uppercase tracking-[0.2em]">Personalized Shield</p>
            </div>
            
            <p className="text-white/90 text-[15px] font-medium leading-[1.6] mb-6">
              "Ravi, based on your zone — we recommend the <span className="text-accent font-extrabold underline underline-offset-4">Standard Shield</span>. It covers you for up to ₹2,100 weekly loss."
            </p>

            <div className="flex items-center justify-between bg-white/5 rounded-2xl p-4 border border-white/10">
              <div>
                <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest mb-1.5 leading-none">Protection Fee</p>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-black text-white italic">₹49</span>
                  <span className="text-white/30 text-[10px] font-black uppercase">/ week</span>
                </div>
              </div>
              <div className="bg-emerald-500/10 px-4 py-2.5 rounded-xl flex items-center gap-2 border border-emerald-500/20">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-[10px] font-black text-accent uppercase tracking-widest">Recommended</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sub-actions */}
        <div className="space-y-4">
          <Button 
            onClick={() => router.push('/dashboard')}
            className="w-full h-[64px] rounded-full text-lg font-black bg-primary hover:bg-primary/95 text-white shadow-[0_20px_40px_rgba(255,107,43,0.3)] transition-all active:scale-95 border-b-4 border-black/10"
          >
            Accept Protection
          </Button>
          <button 
            onClick={() => router.push('/plans')}
            className="w-full py-2 text-secondary/50 text-[11px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:text-secondary transition-colors"
          >
            Compare Other Plans
            <ChevronRight size={14} />
          </button>
        </div>
      </main>
    </div>
  );
}
