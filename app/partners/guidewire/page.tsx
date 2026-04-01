"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Database, Cloud, Share2, Activity, Code, Server, ShieldCheck, ArrowRight, Layers } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MobileWrapper } from '@/components/shared/MobileWrapper';

const syncLog = [
  { event: "Policy Issued", id: "POL-0248", status: "Synced to PolicyCenter", time: "2m ago" },
  { event: "Claim Triggered", id: "CLM-8219", status: "Notification to ClaimCenter", time: "14m ago" },
  { event: "Premium Collected", id: "TXN-901", status: "BillingCenter Ledger Entry", time: "1h ago" },
  { event: "Actuarial Sync", id: "ACT-552", status: "Predictive Analytics Export", time: "3h ago" },
];

export default function GuidewireIntegration() {
  const router = useRouter();

  return (
    <MobileWrapper className="bg-[#F8FAFC] px-6 pt-8 pb-24 min-h-screen">
      <header className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-800 shadow-sm">
          <ChevronLeft size={20} />
        </button>
        <div>
          <h1 className="text-xl font-bold text-slate-900">Guidewire Cloud</h1>
          <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Enterprise Integration Hub</div>
        </div>
      </header>

      <div className="space-y-6">
        {/* Tier-1 Connector Status */}
        <Card className="p-8 bg-slate-900 border-none text-white relative overflow-hidden">
           <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <Cloud className="text-primary" size={20} />
                 </div>
                 <div>
                    <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Primary Connector</div>
                    <div className="text-sm font-bold">EarnSage-GW-V1.4</div>
                 </div>
                 <div className="ml-auto px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-[8px] font-bold uppercase">
                   Connected
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                 <div className="space-y-1">
                    <div className="text-[9px] text-white/40 uppercase font-bold">Latency</div>
                    <div className="text-mono-l text-base">42ms</div>
                 </div>
                 <div className="space-y-1">
                    <div className="text-[9px] text-white/40 uppercase font-bold">Uptime</div>
                    <div className="text-mono-l text-base">99.998%</div>
                 </div>
              </div>
           </div>
           <Layers className="absolute right-[-20px] top-[-20px] w-40 h-40 text-white/5 -rotate-12" />
        </Card>

        {/* Guidewire Suite Integration */}
        <section className="space-y-4">
           <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 px-1">GW InsuranceSuite™ Sync</h3>
           <div className="grid grid-cols-3 gap-3">
              {[
                { name: "PolicyCenter", active: true },
                { name: "ClaimCenter", active: true },
                { name: "BillingCenter", active: true },
              ].map((pc, i) => (
                <div key={i} className="bg-white border border-slate-200 p-4 rounded-2xl text-center shadow-sm">
                   <Server size={18} className="mx-auto mb-3 text-slate-400" />
                   <div className="text-[8px] font-bold uppercase text-slate-800 leading-tight mb-2">{pc.name}</div>
                   <div className="h-1 w-full bg-emerald-500 rounded-full" />
                </div>
              ))}
           </div>
        </section>

        {/* Real-time Data Stream */}
        <section className="space-y-4">
           <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 px-1">Integration Log</h3>
           <div className="space-y-3">
              {syncLog.map((log, i) => (
                <div key={i} className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm space-y-2">
                   <div className="flex justify-between items-center text-[10px] font-bold">
                      <span className="text-slate-900">{log.event}</span>
                      <span className="text-primary font-mono">{log.id}</span>
                   </div>
                   <div className="flex justify-between items-center text-[9px] font-bold uppercase text-slate-400">
                      <div className="flex items-center gap-1.5">
                         <Activity size={10} className="text-emerald-500" /> {log.status}
                      </div>
                      <span>{log.time}</span>
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* Technical Architecture Note */}
        <section className="bg-slate-50 border border-slate-200 p-6 rounded-3xl space-y-4">
           <div className="flex items-center gap-3">
              <Code className="text-slate-600" size={20} />
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-900">Architecture Insight</h4>
           </div>
           <p className="text-[10px] text-slate-600 leading-relaxed">
             This implementation uses **Guidewire Cloud Data Access (CDA)** and **Advanced Product Designer (APD)** to map parametric weather triggers directly to Guidewire's core policy lifecycle.
           </p>
           <Button className="w-full bg-slate-900 text-white h-11 text-[9px] uppercase tracking-widest">
              Review API Documentation <Share2 size={14} className="ml-2" />
           </Button>
        </section>
      </div>
    </MobileWrapper>
  );
}
