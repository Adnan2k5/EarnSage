"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ShieldCheck, Clock, MapPin, ExternalLink, Download, ArrowRight, Wallet, Info, CheckCircle2, CloudRain } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { MobileWrapper } from '@/components/shared/MobileWrapper';

export default function PayoutDetail() {
  const router = useRouter();
  const params = useParams();

  return (
    <MobileWrapper className="bg-surface-base flex flex-col min-h-screen">
      <header className="px-6 pt-8 pb-4">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => router.back()} className="w-10 h-10 rounded-full bg-surface-raised border border-border-light flex items-center justify-center text-ink-primary shadow-sm hover:border-border-mid">
            <ChevronLeft size={20} />
          </button>
          <h1 className="text-display-l">Payout Details</h1>
        </div>
      </header>

      <main className="flex-1 px-6 pb-24 space-y-8">
        {/* Status Banner */}
        <div className="bg-status-success/10 border border-status-success/20 p-6 rounded-2xl flex items-center gap-4 shadow-sm relative overflow-hidden">
          <div className="w-12 h-12 rounded-full bg-status-success/20 flex items-center justify-center text-status-success relative z-10">
            <CheckCircle2 size={24} />
          </div>
          <div className="relative z-10">
             <div className="text-heading text-status-success">Payout Successful</div>
             <div className="text-caption font-bold text-ink-muted uppercase tracking-widest mt-1">Processed in 1hr 42min</div>
          </div>
          <div className="absolute right-[-10px] top-[-10px] w-24 h-24 bg-status-success/5 rounded-full" />
        </div>

        {/* Amount Card */}
        <Card variant="dark" className="p-8 text-center relative group">
           <div className="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em] mb-4">Amount Credited</div>
           <div className="text-mono-xl text-[44px] text-white">₹300.00</div>
           <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-[9px] font-bold text-white uppercase tracking-widest">
              Ref ID: ES-2025-03-12-7821
           </div>
        </Card>

        {/* Details List */}
        <section className="space-y-4">
           <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink-muted px-2">Transaction Details</h3>
           <Card className="p-5 border-border-light space-y-4 shadow-card">
              <div className="flex justify-between items-center text-body">
                 <span className="text-ink-muted underline underline-offset-4 decoration-border-light">Payout Type</span>
                 <span className="font-bold text-ink-primary">Rainfall Protection</span>
              </div>
              <div className="flex justify-between items-center text-body">
                 <span className="text-ink-muted underline underline-offset-4 decoration-border-light">Your Zone</span>
                 <span className="font-bold text-ink-primary">Koramangala, BLR</span>
              </div>
              <div className="flex justify-between items-center text-body">
                 <span className="text-ink-muted underline underline-offset-4 decoration-border-light">Condition</span>
                 <span className="font-bold text-ink-primary italic">48.2mm/hr (Thresh: 50mm)</span>
              </div>
              <div className="flex justify-between items-center text-body">
                 <span className="text-ink-muted underline underline-offset-4 decoration-border-light">Source</span>
                 <span className="text-xs font-mono font-bold text-primary">IMD_STA_560034</span>
              </div>
           </Card>
        </section>

        {/* Timeline */}
        <section className="space-y-4">
           <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink-muted px-2">Process Timeline</h3>
           <div className="relative pl-8 space-y-8 before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-[2px] before:bg-surface-sunken">
              <div className="relative">
                 <div className="absolute left-[-29px] w-4 h-4 rounded-full bg-ink-primary border-4 border-white shadow-sm ring-4 ring-ink-primary/5" />
                 <div className="flex justify-between items-start">
                    <div>
                      <div className="text-xs font-bold text-ink-primary italic">Trigger Detected</div>
                      <div className="text-[11px] text-ink-muted">Rainfall threshold reached in Koramangala</div>
                    </div>
                    <div className="text-[10px] font-mono text-ink-hint">14:12</div>
                 </div>
              </div>
              <div className="relative">
                 <div className="absolute left-[-29px] w-4 h-4 rounded-full bg-ink-primary border-4 border-white shadow-sm ring-4 ring-ink-primary/5" />
                 <div className="flex justify-between items-start">
                    <div>
                      <div className="text-xs font-bold text-ink-primary italic">Verification Complete</div>
                      <div className="text-[11px] text-ink-muted">AI engine validated satellite + ground data</div>
                    </div>
                    <div className="text-[10px] font-mono text-ink-hint">14:28</div>
                 </div>
              </div>
              <div className="relative">
                 <div className="absolute left-[-29px] w-4 h-4 rounded-full bg-status-success border-4 border-white shadow-sm ring-4 ring-status-success/5" />
                 <div className="flex justify-between items-start">
                    <div>
                      <div className="text-xs font-bold text-status-success italic">Payout Dispatched</div>
                      <div className="text-[11px] text-ink-muted uppercase tracking-widest font-bold">UPI: ravi.kumar@okaxis</div>
                    </div>
                    <div className="text-[10px] font-mono text-ink-hint">15:54</div>
                 </div>
              </div>
           </div>
        </section>

        {/* Map Snapshot */}
        <section className="space-y-4 pb-0">
           <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink-muted px-2">Event Evidence</h3>
           <div className="relative aspect-video rounded-3xl overflow-hidden border border-border-light shadow-md bg-[#F1F3F4] group">
              <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v11/static/77.6412,12.9716,13/400x200?access_token=pk.mock')] bg-cover opacity-80" />
              <div className="absolute inset-0 bg-status-danger/10" />
              <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur rounded-full border border-border-light shadow-md">
                 <div className="w-2 h-2 rounded-full bg-status-danger animate-pulse" />
                 <span className="text-[9px] font-bold uppercase tracking-widest text-ink-primary">Koramangala Trigger Zone</span>
              </div>
           </div>
        </section>

        {/* Coverage Exclusions Section */}
        <section className="space-y-4">
           <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink-muted px-2">Coverage Exclusions</h3>
           <Card className="p-5 bg-surface-raised border-border-light space-y-3">
              <div className="text-[10px] text-ink-muted leading-relaxed">
                 Earn Sage income protection does NOT cover income loss due to:
              </div>
              <ul className="space-y-2">
                 {[
                    "Personal illness, injury, or medical emergency",
                    "Vehicle breakdown or mechanical failure",
                    "Rainfall < minimum threshold (50mm/hr)",
                    "GPS location inconsistent with declared zone"
                 ].map((exc, i) => (
                    <li key={i} className="flex items-start gap-2 text-[10px] text-ink-secondary">
                       <div className="w-1 h-1 rounded-full bg-ink-hint mt-1.5 shrink-0" />
                       <span>{exc}</span>
                    </li>
                 ))}
              </ul>
              <div className="pt-2 border-t border-border-light flex justify-between items-center text-[10px]">
                 <span className="text-ink-muted italic">Annual Aggregate Cap</span>
                 <span className="font-bold text-ink-primary">₹25,200</span>
              </div>
           </Card>
        </section>

        <section className="space-y-4 pb-12">
           <div className="flex gap-3">
              <Button variant="ghost" className="flex-1 h-12 uppercase tracking-[0.2em] text-[10px]">
                 <Download size={16} className="mr-2" /> Receipt
              </Button>
              <Button variant="ghost" className="flex-1 h-12 uppercase tracking-[0.2em] text-[10px]">
                 <Info size={16} className="mr-2" /> Dispute
              </Button>
           </div>
        </section>
      </main>
    </MobileWrapper>
  );
}
