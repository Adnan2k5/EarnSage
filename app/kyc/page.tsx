"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Shield, CheckCircle2, ArrowRight, UserCheck, Smartphone, Landmark, FileText, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MobileWrapper } from '@/components/shared/MobileWrapper';

export default function KYCVerification() {
  const [status, setStatus] = useState<'idle' | 'processing' | 'verified'>('idle');
  const router = useRouter();

  const startVerification = () => {
    setStatus('processing');
    setTimeout(() => setStatus('verified'), 3000);
  };

  return (
    <MobileWrapper className="bg-surface-base flex flex-col min-h-screen px-6 pt-12 pb-12">
      <header className="flex justify-between items-center mb-12">
         <div className="flex items-center gap-4">
            <button onClick={() => router.push('/dashboard')} className="w-10 h-10 rounded-full bg-white border border-border-light flex items-center justify-center text-ink-primary shadow-sm hover:scale-105 transition-transform">
               <ChevronLeft size={20} />
            </button>
            <h1 className="text-display-l text-2xl font-black">KYC Verification</h1>
         </div>
         <div className={cn(
           "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border",
           status === 'verified' ? "bg-status-success/10 text-status-success border-status-success/20" : "bg-status-warning/10 text-status-warning border-status-warning/20"
         )}>
           {status === 'verified' ? "Verified" : "Pending"}
         </div>
      </header>

      <main className="flex-1 space-y-8">
         <Card className="p-10 border-2 border-dashed border-border-mid bg-white/50 rounded-[40px] text-center space-y-8">
            <div className="relative inline-block">
               <div className="w-24 h-24 rounded-full bg-surface-raised border border-border-light flex items-center justify-center text-ink-hint">
                  <AnimatePresence mode="wait">
                    {status === 'verified' ? (
                      <motion.div key="v" initial={{ scale: 0 }} animate={{ scale: 1 }}><Shield size={48} className="text-status-success" /></motion.div>
                    ) : (
                      <motion.div key="i" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><UserCheck size={48} /></motion.div>
                    )}
                  </AnimatePresence>
               </div>
               {status === 'verified' && (
                 <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-2 -right-2 w-8 h-8 bg-status-success text-white rounded-full flex items-center justify-center border-4 border-white">
                    <CheckCircle2 size={16} />
                 </motion.div>
               )}
            </div>

            <div className="space-y-3">
               <h2 className="text-heading text-xl">Verify Your Identity</h2>
               <p className="text-body text-ink-muted leading-relaxed px-4">
                 Aadhaar or PAN required for automated payouts and Tier-1 protection status.
               </p>
            </div>

            <Button 
              onClick={startVerification}
              disabled={status !== 'idle'}
              className="w-full h-16 bg-white border-2 border-ink-primary text-primary hover:bg-ink-primary hover:text-white transition-all uppercase tracking-[0.2em] font-black rounded-2xl group shadow-md"
            >
              {status === 'idle' ? (
                <>Start Verification <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" /></>
              ) : status === 'processing' ? (
                "Processing..."
              ) : (
                "Identity Verified"
              )}
            </Button>
         </Card>

         <div className="space-y-4">
            <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-ink-hint px-2">Verification Methods</h3>
            <div className="grid grid-cols-1 gap-3">
               {[
                 { title: "Instant Aadhaar (e-KYC)", icon: Smartphone, detail: "OTP based • Instant" },
                 { title: "PAN Card Upload", icon: FileText, detail: "Manual Review • 12 hrs" },
                 { title: "Bank Verification", icon: Landmark, detail: "Instant ₹1 penny drop" }
               ].map((m, i) => (
                 <div key={i} className="p-5 bg-white border border-border-light rounded-3xl flex items-center gap-5 hover:border-primary/40 transition-colors cursor-pointer group">
                    <div className="w-12 h-12 rounded-2xl bg-surface-raised flex items-center justify-center text-ink-hint group-hover:text-primary transition-colors">
                       <m.icon size={22} />
                    </div>
                    <div>
                       <div className="text-sm font-bold text-ink-primary">{m.title}</div>
                       <div className="text-[10px] text-ink-hint uppercase font-bold tracking-widest">{m.detail}</div>
                    </div>
                 </div>
               ))}
            </div>
         </div>
         
         <div className="p-6 bg-status-info/5 border border-status-info/10 rounded-3xl flex gap-4">
            <Info size={20} className="text-status-info shrink-0" />
            <p className="text-[11px] text-ink-muted leading-relaxed">
               All documents are stored in an encrypted vault and shared only with Guidewire's automated claim settlement node.
            </p>
         </div>
      </main>

      <footer className="mt-8">
         <Button 
           variant="ghost" 
           onClick={() => router.push('/dashboard')}
           className="w-full text-ink-hint uppercase tracking-widest text-[10px] font-bold"
         >
           Finish Later
         </Button>
      </footer>
    </MobileWrapper>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

function Info({ size, className }: { size: number, className?: string }) {
  return (
    <div className={cn("rounded-full border flex items-center justify-center p-0.5", className)}>
      <div className="w-1.5 h-1.5 bg-current rounded-full" />
    </div>
  )
}
