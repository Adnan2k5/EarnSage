"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, CloudRain, Wind, AlertTriangle, ArrowRight, Info, Zap, ChevronRight, Loader2, Database, Radio, MapPin, Activity, Terminal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { MobileWrapper } from '@/components/shared/MobileWrapper';

const scanningSteps = [
  { text: "Ingesting Guidewire Cloud Stream...", node: "US-EAST-1" },
  { text: "Mapping Koramangala IoT Mesh...", node: "BGL-09" },
  { text: "Analyzing 10-year Precipitation delta...", node: "MET-IND" },
  { text: "Calculating Parametric Exposure...", node: "EARN-CORE" },
  { text: "Generating Risk Oracle Profile...", node: "AI-GEN" }
];

// Radar Chart Component (SVG)
const RadarChart = ({ data }: { data: Record<string, number> }) => {
  const points = Object.values(data);
  const labels = Object.keys(data);
  const size = 200;
  const center = size / 2;
  const radius = 80;

  const getCoordinates = (index: number, value: number) => {
    const angle = (Math.PI * 2 * index) / labels.length - Math.PI / 2;
    const r = (value / 100) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle)
    };
  };

  const polygonPoints = points.map((v, i) => {
    const { x, y } = getCoordinates(i, v);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size} className="overflow-visible">
        {/* Background Hexagons */}
        {[0.2, 0.4, 0.6, 0.8, 1].map((r) => (
          <polygon
            key={r}
            points={labels.map((_, i) => {
              const angle = (Math.PI * 2 * i) / labels.length - Math.PI / 2;
              const dist = radius * r;
              return `${center + dist * Math.cos(angle)},${center + dist * Math.sin(angle)}`;
            }).join(' ')}
            className="fill-none stroke-white/5"
            strokeWidth="1"
          />
        ))}
        
        {/* Web Lines */}
        {labels.map((_, i) => {
          const { x, y } = getCoordinates(i, 100);
          return <line key={i} x1={center} y1={center} x2={x} y2={y} className="stroke-white/5" strokeWidth="1" />;
        })}

        {/* Data Polygon */}
        <motion.polygon
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          points={polygonPoints}
          className="fill-primary/20 stroke-primary"
          strokeWidth="2"
        />

        {/* Labels */}
        {labels.map((label, i) => {
          const { x, y } = getCoordinates(i, 115);
          return (
            <text 
              key={i} x={x} y={y} 
              className="text-[7px] font-bold fill-white/40 uppercase text-center" 
              textAnchor="middle" dominantBaseline="middle"
            >
              {label}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

export default function RiskAnalysis() {
  const [loading, setLoading] = useState(true);
  const [stepIndex, setStepIndex] = useState(0);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (loading) {
      const stepTimer = setInterval(() => {
        setStepIndex(prev => (prev < scanningSteps.length - 1 ? prev + 1 : prev));
      }, 700);

      // Random Terminal Logs during loading
      const logInterval = setInterval(() => {
        const mockLogs = [
          `GET /api/v1/sensors/rainfall?node=${Math.floor(Math.random() * 100)}`,
          `INGESTING historical_delta_2023.parquet`,
          `AI_MODULE: weighting rainfall bias at 0.72`,
          `GUIDEWIRE: policy_sync_active=true`,
          `CALCULATING exposure_radius: 5.2km`
        ];
        setTerminalLogs(prev => [...prev, mockLogs[Math.floor(Math.random() * mockLogs.length)]].slice(-6));
      }, 300);

      const totalTimer = setTimeout(() => setLoading(false), 3500);
      return () => {
        clearInterval(stepTimer);
        clearInterval(logInterval);
        clearTimeout(totalTimer);
      };
    }
  }, [loading]);

  if (loading) {
    return (
      <MobileWrapper className="bg-[#0A0F1E] flex flex-col items-center justify-center p-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        
        {/* Radar Scan Animation */}
        <div className="relative mb-16">
          <div className="w-56 h-56 rounded-full border border-white/5 flex items-center justify-center relative overflow-hidden">
             {/* Sweeper */}
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
               className="absolute inset-0 bg-gradient-to-r from-primary/40 to-transparent origin-center rounded-full"
               style={{ clipPath: "polygon(50% 50%, 100% 0, 100% 100%)" }}
             />
             {/* Nodes */}
             <div className="absolute top-1/4 left-1/3 w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
             <div className="absolute bottom-1/3 right-1/4 w-1 h-1 rounded-full bg-primary/40" />
             <div className="absolute top-1/2 right-1/2 w-2 h-2 rounded-full border border-primary/40 animate-ping" />
             
             <div className="relative z-10 w-24 h-24 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center">
                <Database className="text-white/20 w-10 h-10" />
             </div>
          </div>
        </div>

        <div className="w-full space-y-8 relative z-10">
          <div className="text-center space-y-4">
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-[10px] font-bold text-white uppercase tracking-widest">
               <ShieldCheck size={14} className="text-primary" />
               Model AUC: 0.847 • Trained on 618,310 points
             </div>
             <p className="text-[11px] text-white/60 max-w-[280px] mx-auto leading-relaxed">
               Neural engines are analyzing multi-sensor telemetry for your specific sector.
             </p>
          </div>

          {/* Terminal Box */}
          <div className="bg-black/40 border border-white/5 p-4 rounded-xl font-mono text-[8px] text-primary/60 space-y-1 h-[100px] overflow-hidden">
             {terminalLogs.map((log, i) => (
                <div key={i} className="flex gap-2">
                  <span className="opacity-40">[{new Date().toLocaleTimeString()}]</span>
                  <span>{log}</span>
                </div>
             ))}
          </div>
        </div>
      </MobileWrapper>
    );
  }

  return (
    <MobileWrapper className="bg-[#0A0F1E] flex flex-col min-h-screen text-white px-6 pt-8 pb-32">
      <header className="flex justify-between items-center mb-8">
        <div>
          <div className="text-[9px] font-bold text-primary uppercase tracking-[0.3em] mb-2">Validated Oracle</div>
          <h1 className="text-display-l text-4xl leading-none">Risk Profile</h1>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
           <MapPin size={22} className="text-white/40" />
        </div>
      </header>

      <main className="space-y-8">
        {/* Saturn Gauge Card */}
        <Card className="p-8 bg-white/5 border-white/10 rounded-[40px] text-center relative overflow-hidden group">
           <div className="relative z-10">
              <div className="text-[10px] font-bold tracking-[0.3em] text-white/30 uppercase mb-8">Disruption Probability</div>
              
              <div className="relative w-56 h-56 mx-auto flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  {/* Outer Saturn Ring */}
                  <circle cx="50%" cy="50%" r="48%" className="stroke-white/5 fill-none" strokeWidth="1" strokeDasharray="4 4" />
                  
                  {/* Progress Gauge */}
                  <circle cx="50%" cy="50%" r="42%" className="stroke-white/5 fill-none" strokeWidth="12" />
                  <motion.circle
                    cx="50%" cy="50%" r="42%"
                    className="stroke-[#FF6B2B] fill-none"
                    strokeWidth="12"
                    strokeDasharray="264"
                    initial={{ strokeDashoffset: 264 }}
                    animate={{ strokeDashoffset: 264 - (264 * 0.64) }}
                    transition={{ duration: 2, delay: 0.5 }}
                    strokeLinecap="round"
                  />
                  
                  {/* Inner Orbit Circle */}
                  <circle cx="50%" cy="50%" r="30%" className="stroke-primary/20 fill-none" strokeWidth="1" />
                </svg>
                
                <div className="absolute flex flex-col items-center">
                  <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Score</div>
                  <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-mono-xl text-[64px] font-black leading-none"
                  >
                    64
                  </motion.div>
                  <div className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mt-2 bg-primary/10 px-2 py-0.5 rounded">High Confidence</div>
                </div>
              </div>
           </div>

           {/* Aura Effect */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 blur-[80px] rounded-full -z-0 opacity-40 group-hover:opacity-60 transition-opacity" />
        </Card>

        {/* Live Data Ingest Section */}
        <section className="space-y-4">
           <div className="flex justify-between items-center px-1">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40 flex items-center gap-2">
                 <Terminal size={14} className="text-primary" /> Live Ingest Feed
              </h3>
              <div className="text-[9px] font-mono text-emerald-400 flex items-center gap-1">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> LIVE STREAM
              </div>
           </div>
           <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-6 font-mono space-y-4">
              <div className="grid grid-cols-2 gap-y-4">
                 {[
                   { label: "Humidity", val: "84%", icon: Activity },
                   { label: "IoT Mesh", val: "99.2%", icon: Radio },
                   { label: "Wind Gust", val: "12km/h", icon: Wind },
                   { label: "Pollen", val: "Low", icon: ShieldCheck }
                 ].map((stat, i) => (
                   <div key={i} className="flex flex-col gap-1">
                      <div className="text-[8px] text-white/30 uppercase tracking-widest flex items-center gap-1.5">
                         <stat.icon size={10} className="text-primary" /> {stat.label}
                      </div>
                      <div className="text-xs text-white/80 font-bold">{stat.val}</div>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        {/* Risk Radar Chart */}
        <Card className="p-8 bg-white/5 border-white/10 rounded-[40px] space-y-6">
           <div className="text-center">
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-primary mb-1">Exposure Decomposition</h3>
              <p className="text-[10px] text-white/40">Multi-dimensional risk factor analysis</p>
           </div>
           <RadarChart data={{
             "Rain": 85,
             "Wind": 42,
             "AQI": 65,
             "Traffic": 50,
             "Civic": 30
           }} />
           <div className="pt-4 border-t border-white/5 text-[10px] text-white/60 leading-relaxed text-center font-medium">
             Highest vulnerability identified in **Precipitation Intensity**. <br />
             Historical delta: **+22.4%** vs. Koramangala Mean.
           </div>
        </Card>

        {/* Risk History Sparkline */}
        <section className="space-y-4">
           <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40 px-1">Risk Entropy (30D)</h3>
           <Card className="p-6 bg-slate-900/50 border-white/5 h-24 flex items-end gap-1 px-4">
              {[40, 45, 30, 25, 50, 70, 85, 60, 40, 55, 64].map((h, i) => (
                <motion.div 
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: i * 0.05 }}
                  className={cn(
                    "flex-1 rounded-t-sm",
                    i === 10 ? "bg-primary shadow-[0_0_10px_#FF6B2B]" : "bg-white/10"
                  )}
                />
              ))}
           </Card>
        </section>

        {/* CTA Section */}
        <Card className="p-8 bg-primary text-white border-none rounded-[40px] shadow-[0_20px_50px_rgba(255,107,43,0.3)] relative overflow-hidden group">
           <div className="relative z-10 space-y-6 text-center">
              <div>
                 <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60 mb-2">Recommendation</div>
                 <h3 className="text-display-m text-3xl">Standard Shield</h3>
                 <p className="text-xs text-white/80 mt-2">Optimal 85% coverage for your dynamic profile.</p>
              </div>
              <Button 
                onClick={() => router.push('/dashboard')}
                className="w-full h-14 bg-white text-ink-primary uppercase font-black tracking-[0.2em] text-[11px] rounded-2xl hover:bg-slate-100 transition-all shadow-xl"
              >
                Engage Protection <Zap size={16} className="ml-2 fill-primary" />
              </Button>
           </div>
           <ShieldCheck className="absolute right-[-20px] bottom-[-20px] w-48 h-48 text-white/5 -rotate-12 group-hover:scale-110 transition-transform" />
        </Card>

        <div className="text-center py-8">
           <div className="text-[9px] font-bold text-white/20 uppercase tracking-[0.4em]">Model Node: EARN-V7-OMEGA</div>
           <Button variant="ghost" onClick={() => router.push('/onboarding/profile')} className="text-white/40 mt-4 text-[10px] uppercase tracking-widest font-bold">
              Revise Zone Selection <ChevronRight size={14} className="ml-1" />
           </Button>
        </div>
      </main>

      {/* Floating Verification Badge */}
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-40 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full flex items-center gap-3">
         <Radio size={14} className="text-primary animate-pulse" />
         <span className="text-[9px] font-bold uppercase tracking-widest text-white/60">Guidewire Cloud Verified Result</span>
      </div>
    </MobileWrapper>
  );
}
