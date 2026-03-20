"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ChevronRight, Zap, Target, Smartphone, Lock, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { MobileWrapper } from '@/components/shared/MobileWrapper';

const slides = [
  {
    type: 'dark',
    hero: "4.2",
    subHero: "disruption days per month",
    title: "Rain stops you. Income shouldn't.",
    body: "Every heavy rainfall costs you ₹500–₹1,200 in lost earnings. We fix that.",
    icon: Shield,
  },
  {
    type: 'light',
    title: "Zero claims. Zero paperwork.",
    body: "Our AI detects disruptions automatically. If it rains, the money reaches you in hours.",
    steps: [
      { icon: Target, label: "AI Detects" },
      { icon: Zap, label: "Trigger Met" },
      { icon: Smartphone, label: "Payout Sent" }
    ]
  },
  {
    type: 'value',
    price: "₹49 / week",
    payout: "Up to ₹2,100 protection",
    subText: "Less than ₹7 a day.",
    badges: ["Secure Payments", "Instant Payout", "100% Digital"]
  }
];

export default function Onboarding() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <div className="fixed inset-0 z-50 bg-surface-base flex flex-col items-center justify-center overflow-hidden">
        {/* Rain Particles */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -20 }}
              animate={{ y: 800 }}
              transition={{ 
                duration: 1.5 + Math.random(), 
                repeat: Infinity, 
                delay: Math.random() * 2,
                ease: "linear" 
              }}
              className="absolute w-[1px] h-12 bg-ink-hint"
              style={{ left: `${Math.random() * 100}%` }}
            />
          ))}
        </div>

        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.3 }}
          className="relative mb-8"
        >
          <div className="w-20 h-20 rounded-[24px] bg-white border-2 border-ink-primary flex items-center justify-center p-4">
             <Shield size={48} className="text-ink-primary stroke-[2.5px]" />
             <Zap size={24} className="absolute text-primary fill-primary" />
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <h1 className="text-display-l tracking-[0.2em] uppercase mb-2">Earn Sage</h1>
          <p className="text-caption">Earn Every Day. Protected Always.</p>
        </motion.div>
        
        <div className="absolute bottom-12 left-12 right-12">
          <div className="h-[2px] w-full bg-surface-sunken overflow-hidden rounded-full">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.5, ease: "linear" }}
              className="h-full bg-ink-primary"
            />
          </div>
        </div>
      </div>
    );
  }

  const slide = slides[currentSlide];

  return (
    <MobileWrapper className="bg-surface-base px-6 pt-12 pb-8 flex flex-col min-h-screen">
      <div className="flex justify-end mb-8 text-caption font-bold" onClick={() => router.push('/dashboard')}>
        SKIP
      </div>

      <div className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.26 }}
            className="flex-1 flex flex-col"
          >
            {slide.type === 'dark' ? (
              <Card variant="dark" className="p-8 mb-8 flex-1 flex flex-col justify-center">
                <div className="text-center mb-8">
                  <div className="text-mono-xl text-primary text-[72px] leading-none mb-2">{slide.hero}</div>
                  <div className="text-[13px] font-body text-white/60">{slide.subHero}</div>
                </div>
                <h2 className="text-display-l text-white mb-4">{slide.title}</h2>
                <p className="text-body text-white/60 mb-8">{slide.body}</p>
              </Card>
            ) : slide.type === 'light' ? (
              <div className="flex-1 flex flex-col">
                <Card className="p-8 border-[#E2E8F0] mb-8 bg-white shadow-card flex-1 flex flex-col justify-center items-center text-center">
                  <div className="flex items-center gap-4 mb-12">
                    {slide.steps?.map((step, i) => (
                      <React.Fragment key={i}>
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-12 h-12 rounded-full bg-surface-raised border border-border-light flex items-center justify-center">
                            <step.icon size={20} className="text-ink-primary" />
                          </div>
                          <span className="text-[12px] font-semibold">{step.label}</span>
                        </div>
                        {i < 2 && <div className="w-8 h-[1px] bg-surface-sunken mt-[-20px]" />}
                      </React.Fragment>
                    ))}
                  </div>
                  <h2 className="text-display-l mb-4">{slide.title}</h2>
                  <p className="text-body text-ink-muted">{slide.body}</p>
                </Card>
              </div>
            ) : (
              <div className="flex-1 flex flex-col justify-center items-center text-center p-4">
                <div className="text-mono-xl text-[44px] mb-2">{slide.price}</div>
                <h2 className="text-display-l text-ink-secondary mb-2">{slide.payout}</h2>
                <p className="text-body text-ink-muted mb-8">{slide.subText}</p>
                <div className="space-y-3 w-full max-w-[280px]">
                  {slide.badges?.map((badge, i) => (
                    <div key={i} className="flex items-center gap-2 px-4 py-3 bg-surface-raised border border-border-light rounded-xl">
                      <CheckCircle2 size={16} className="text-status-success" />
                      <span className="text-xs font-semibold">{badge}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-auto space-y-8">
          <div className="flex justify-center gap-2">
            {slides.map((_, i) => (
              <div 
                key={i} 
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  currentSlide === i ? "w-6 bg-ink-primary" : "bg-surface-sunken"
                )} 
              />
            ))}
          </div>

          <div className="space-y-4 pb-4">
            <Button 
              className="w-full text-sm tracking-wider uppercase"
              onClick={() => {
                if (currentSlide < slides.length - 1) {
                  setCurrentSlide(currentSlide + 1);
                } else {
                  router.push('/register');
                }
              }}
            >
              {currentSlide === slides.length - 1 ? "Get Protected Now" : "Next Opportunity →"}
            </Button>
            <p className="text-center text-caption font-semibold">
              Already a partner? <span className="text-ink-primary underline underline-offset-4">Sign in</span>
            </p>
          </div>
        </div>
      </div>
    </MobileWrapper>
  );
}
