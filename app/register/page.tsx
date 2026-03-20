"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, CheckCircle2, ArrowRight, ShieldCheck, Info } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { MobileWrapper } from '@/components/shared/MobileWrapper';

export default function Register() {
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState(['', '', '', '']);
  const router = useRouter();

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
    else router.push('/onboarding/profile');
  };

  return (
    <MobileWrapper className="bg-surface-base flex flex-col min-h-screen">
      <header className="px-6 pt-8 pb-4">
        <div className="flex justify-between items-center mb-6">
          <button onClick={() => step > 1 ? setStep(step - 1) : router.back()} className="w-10 h-10 rounded-full bg-surface-raised border border-border-light flex items-center justify-center text-ink-primary">
            <ChevronLeft size={20} />
          </button>
          <div className="text-right">
            <div className="text-display-l text-ink-primary">Create Account</div>
            <div className="text-caption font-bold text-primary">{step} of 3</div>
          </div>
        </div>
        <div className="h-1 w-full bg-surface-sunken rounded-full overflow-hidden">
          <motion.div 
            animate={{ width: `${(step / 3) * 100}%` }} 
            className="h-full bg-ink-primary"
          />
        </div>
      </header>

      <main className="flex-1 px-6 pt-8">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <div className="relative group">
                   <label className="text-[11px] font-bold uppercase tracking-widest text-ink-muted mb-2 block">Full Name</label>
                   <input 
                    type="text" 
                    placeholder="e.g. Ravi Kumar"
                    className="w-full h-14 bg-white border-1.5 border-border-light rounded-xl px-4 text-ink-primary font-body text-base placeholder:text-ink-hint focus:outline-none focus:border-ink-primary focus:ring-4 focus:ring-ink-primary/5 transition-all"
                  />
                </div>
                
                <div className="relative group">
                   <label className="text-[11px] font-bold uppercase tracking-widest text-ink-muted mb-2 block">Mobile Number</label>
                   <div className="flex gap-3">
                     <div className="w-20 h-14 bg-surface-raised border-1.5 border-border-light rounded-xl flex items-center justify-center font-body font-bold text-ink-primary">
                       +91
                     </div>
                     <input 
                      type="tel" 
                      placeholder="9428XXXXXX"
                      className="flex-1 h-14 bg-white border-1.5 border-border-light rounded-xl px-4 text-ink-primary font-body text-base placeholder:text-ink-hint focus:outline-none focus:border-ink-primary focus:ring-4 focus:ring-ink-primary/5 transition-all"
                    />
                   </div>
                </div>
              </div>

              <div className="bg-surface-sunken/50 border border-border-light p-4 rounded-xl flex gap-3">
                <Info size={18} className="text-ink-muted shrink-0 mt-0.5" />
                <p className="text-[11px] text-ink-secondary leading-normal">
                  We'll send a 4-digit verification code to this mobile number to secure your account.
                </p>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-10 text-center"
            >
              <div className="space-y-2">
                <h2 className="text-heading">Verify Mobile</h2>
                <p className="text-body text-ink-muted">Enter the code sent to +91 9428-XXXXXX</p>
              </div>

              <div className="flex justify-center gap-4">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    className="w-16 h-16 bg-white border-2 border-border-light rounded-2xl text-center text-mono-xl focus:outline-none focus:border-ink-primary focus:bg-surface-raised transition-all"
                    value={digit}
                    onChange={(e) => {
                      const newOtp = [...otp];
                      newOtp[i] = e.target.value;
                      setOtp(newOtp);
                    }}
                  />
                ))}
              </div>

              <div className="text-caption font-bold">
                Didn't receive it? <span className="text-ink-primary underline underline-offset-4">Resend OTP</span>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <div className="relative group">
                   <label className="text-[11px] font-bold uppercase tracking-widest text-ink-muted mb-2 block">Date of Birth</label>
                   <input 
                    type="date" 
                    className="w-full h-14 bg-white border-1.5 border-border-light rounded-xl px-4 text-ink-primary font-body text-base focus:outline-none focus:border-ink-primary transition-all"
                  />
                </div>
              </div>

              <Card variant="status" className="border-l-status-success bg-white p-6 shadow-card">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-status-success/10 rounded-full flex items-center justify-center">
                      <ShieldCheck className="text-status-success" size={24} />
                    </div>
                    <div>
                      <div className="text-sm font-bold">KYC Pre-verification</div>
                      <div className="text-caption">Instant approval available for Zomato/Zepto IDs.</div>
                    </div>
                 </div>
              </Card>

              <p className="text-micro text-ink-hint text-center px-8">
                By continuing you agree to Earn Sage's <span className="underline">Terms of Service</span> and <span className="underline">Privacy Policy</span>.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="p-6 pb-12">
        <Button 
          className="w-full h-14 uppercase tracking-widest group"
          onClick={nextStep}
        >
          {step === 3 ? "Complete Profile" : "Continue"} <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </footer>
    </MobileWrapper>
  );
}
