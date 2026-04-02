"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ChevronRight, Zap, Target, Smartphone, Lock, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { MobileWrapper } from '@/components/shared/MobileWrapper';

const slides = [
  {
    type: 'dark',
    hero: "4.2",
    subHero: "Average disruption days per month",
    title: "Rain stops you. Income shouldn't.",
    body: "Every heavy rainfall costs you ₹500–₹1,200 in lost earnings. We bridge the gap instantly.",
    icon: Shield,
    accent: "bg-primary/20"
  },
  {
    type: 'light',
    title: "Zero claims. Zero paperwork.",
    body: "Our proprietary AI detects weather triggers automatically. Payouts reach your wallet in hours, not weeks.",
    steps: [
      { icon: Target, label: "AI Monitor" },
      { icon: Zap, label: "Trigger Met" },
      { icon: ShieldCheck, label: "Instant Payout" }
    ]
  },
  {
    type: 'value',
    price: "₹49",
    payout: "₹2,100 Protection",
    subText: "Less than ₹7/day for complete peace of mind.",
    badges: ["Guaranteed Solvency", "Instant Verification", "Partnered with Guidewire"]
  }
];

export default function Onboarding() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <div className="fixed inset-0 z-50 bg-[#0A0F1E] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
        
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 blur-[120px] rounded-full" />

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="relative mb-8"
        >
          <div className="w-24 h-24 rounded-[32px] bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center p-5 shadow-2xl relative overflow-hidden group">
             <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-50" />
             <Shield size={48} className="text-white relative z-10" />
             <Sparkles size={20} className="absolute top-4 right-4 text-primary animate-pulse" />
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center relative z-10"
        >
          <h1 className="text-display-l text-white tracking-[0.3em] uppercase mb-2 font-display">Earn Sage</h1>
          <p className="text-[10px] text-white/50 font-bold uppercase tracking-[0.2em]">Parametric Protection Layer</p>
        </motion.div>
        
        <div className="absolute bottom-16 left-16 right-16">
          <div className="h-[1px] w-full bg-white/10 overflow-hidden rounded-full">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="h-full bg-primary shadow-[0_0_10px_#FF6B2B]"
            />
          </div>
        </div>
      </div>
    );
  }

  const slide = slides[currentSlide];

  return (
    <MobileWrapper className="bg-[#0A0F1E] overflow-hidden flex flex-col min-h-screen relative p-0">
      {/* Background Image Accent */}
      <div className="absolute inset-0 opacity-40 mix-blend-overlay">
         <img 
           src="file:///c:/Users/KOUSHIL%20VARMA/.gemini/antigravity/brain/5ee9c304-03f6-4b1b-a31f-9443a2ad7ddc/sophisticated_insurance_hero_1775102956888.png" 
           alt="Backdrop" 
           className="w-full h-full object-cover grayscale brightness-50"
         />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1E]/80 via-[#0A0F1E] to-[#0A0F1E]" />

      <div className="relative z-10 flex-1 flex flex-col px-8 pt-16 pb-12">
        <header className="flex justify-between items-center mb-12">
           <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/20 backdrop-blur border border-primary/30 flex items-center justify-center">
                 <Shield size={16} className="text-primary" />
              </div>
              <span className="text-[10px] font-bold text-white tracking-[0.2em] uppercase">Earn Sage</span>
           </div>
           <button onClick={() => router.push('/dashboard')} className="text-[10px] font-bold text-white/40 uppercase tracking-widest hover:text-white transition-colors">
             Skip
           </button>
        </header>

        <div className="flex-1 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex-1 flex flex-col"
            >
              {slide.type === 'dark' ? (
                <div className="flex-1 flex flex-col justify-center space-y-8">
                  <div className="relative inline-block">
                    <motion.div 
                       initial={{ scale: 0.9, opacity: 0 }}
                       animate={{ scale: 1, opacity: 1 }}
                       transition={{ delay: 0.2 }}
                       className="text-[96px] font-display font-bold text-white leading-none tracking-tighter"
                    >
                      {slide.hero}
                    </motion.div>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      className="absolute -bottom-2 left-0 h-1 bg-primary rounded-full shadow-[0_0_15px_#FF6B2B]" 
                    />
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-mono-l text-[10px] text-primary uppercase font-bold tracking-[0.3em]">{slide.subHero}</h2>
                    <h3 className="text-display-l text-white text-3xl leading-tight">{slide.title}</h3>
                    <p className="text-[13px] text-white/50 leading-relaxed max-w-[280px]">{slide.body}</p>
                  </div>
                </div>
              ) : slide.type === 'light' ? (
                <div className="flex-1 flex flex-col justify-center space-y-12">
                   <div className="grid grid-cols-3 gap-4">
                      {slide.steps?.map((step, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.15 }}
                          className="flex flex-col items-center gap-3"
                        >
                           <div className="w-14 h-14 rounded-2xl bg-white/5 backdrop-blur border border-white/10 flex items-center justify-center relative group">
                              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors rounded-2xl" />
                              <step.icon size={24} className="text-white relative z-10" />
                           </div>
                           <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">{step.label}</span>
                        </motion.div>
                      ))}
                   </div>
                   <div className="space-y-4">
                      <h3 className="text-display-l text-white text-3xl leading-tight">{slide.title}</h3>
                      <p className="text-[13px] text-white/50 leading-relaxed max-w-[280px]">{slide.body}</p>
                   </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col justify-center space-y-10">
                   <div className="space-y-2">
                      <div className="text-[10px] font-bold text-primary uppercase tracking-[0.4em]">Subscription</div>
                      <div className="text-[64px] font-display font-bold text-white leading-none">{slide.price}<span className="text-xl text-white/30 ml-2">/ wk</span></div>
                   </div>
                   
                   <div className="p-6 rounded-[32px] bg-white/5 backdrop-blur border border-white/10 space-y-6 relative overflow-hidden">
                      <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 blur-[40px] rounded-full" />
                      <div className="relative z-10">
                         <div className="text-heading text-white text-lg mb-1">{slide.payout}</div>
                         <p className="text-[12px] text-white/40">{slide.subText}</p>
                      </div>
                      
                      <div className="space-y-3 relative z-10">
                         {slide.badges?.map((badge, i) => (
                           <div key={i} className="flex items-center gap-3">
                              <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                                 <CheckCircle2 size={12} className="text-primary" />
                              </div>
                              <span className="text-[11px] font-bold text-white/80 uppercase tracking-widest">{badge}</span>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 space-y-10">
            <div className="flex gap-2">
              {slides.map((_, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "h-[3px] rounded-full transition-all duration-500",
                    currentSlide === i ? "flex-1 bg-primary shadow-[0_0_10px_#FF6B2B]" : "w-4 bg-white/10"
                  )} 
                />
              ))}
            </div>

            <div className="space-y-6">
              <Button 
                variant="primary"
                className="w-full h-16 rounded-2xl text-xs tracking-[0.2em] uppercase font-bold bg-primary text-white border-none shadow-[0_8px_30px_rgba(255,107,43,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all"
                onClick={() => {
                  if (currentSlide < slides.length - 1) {
                    setCurrentSlide(currentSlide + 1);
                  } else {
                    router.push('/register');
                  }
                }}
              >
                {currentSlide === slides.length - 1 ? "Start Protection" : "Next Opportunity →"}
              </Button>
              <div className="text-center space-y-1">
                 <p className="text-[10px] text-white/30 uppercase tracking-[0.1em]">Already a protected partner?</p>
                 <button onClick={() => router.push('/login')} className="text-[11px] font-bold text-white underline underline-offset-8 decoration-white/20 hover:decoration-primary/50 transition-all uppercase tracking-widest">
                   Sign in to Dashboard
                 </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MobileWrapper>
  );
}
