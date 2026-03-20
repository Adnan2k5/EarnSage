"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloudRain, Zap, Wallet, ChevronRight, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

const onboardingSteps = [
  {
    title: "Disruption Happens",
    description: "Unexpected rain or floods put your daily earnings at risk.",
    icon: CloudRain,
    color: "text-blue-500",
    bg: "bg-blue-50"
  },
  {
    title: "AI Detects Triggers",
    description: "Our AI monitors weather and zone activity in real-time.",
    icon: Zap,
    color: "text-alert",
    bg: "bg-amber-50"
  },
  {
    title: "You Get Paid Instantly",
    description: "Money sent directly into your wallet. No claims, no waiting.",
    icon: Wallet,
    color: "text-accent",
    bg: "bg-emerald-50"
  }
];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [showSplash, setShowSplash] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-secondary relative overflow-hidden">
        {/* Rain background animation */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="rain-drop" 
              style={{ 
                left: `${Math.random() * 100}%`, 
                animationDuration: `${0.5 + Math.random() * 0.5}s`,
                animationDelay: `${Math.random() * 2}s`
              }} 
            />
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="z-10 flex flex-col items-center"
        >
          <div className="w-20 h-20 bg-primary rounded-[24px] flex items-center justify-center shadow-[0_20px_50px_rgba(255,107,43,0.3)] mb-8">
            <Shield size={42} className="text-white" fill="white" />
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight sans italic">Earn Sage</h1>
          <div className="h-[2px] w-12 bg-primary/40 rounded-full mb-4" />
          <p className="text-white/40 font-bold tracking-[0.2em] uppercase text-[10px]">Protected Always</p>
        </motion.div>
      </div>
    );
  }

  const currentStep = onboardingSteps[step];
  const Icon = currentStep.icon;

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center pt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="flex flex-col items-center"
          >
            <div className={cn("w-36 h-36 rounded-full flex items-center justify-center mb-10 shadow-sm transition-colors duration-500", currentStep.bg)}>
              <Icon size={72} className={cn("transition-transform duration-500", currentStep.color)} />
            </div>
            <h2 className="text-3xl font-extrabold text-text-main mb-4 tracking-tight leading-tight">
              {currentStep.title}
            </h2>
            <p className="text-text-dim text-lg leading-relaxed max-w-[300px] font-medium">
              {currentStep.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="px-8 pb-12 space-y-10">
        <div className="flex justify-center gap-2.5">
          {onboardingSteps.map((_, i) => (
            <motion.div 
              key={i}
              initial={false}
              animate={{ 
                width: i === step ? 32 : 8,
                backgroundColor: i === step ? "#FF6B2B" : "#E5E7EB"
              }}
              className="h-2 rounded-full"
            />
          ))}
        </div>

        <div className="space-y-6">
          <Button 
            onClick={() => step < onboardingSteps.length - 1 ? setStep(s => s + 1) : router.push('/register')}
            className="w-full h-[60px] rounded-full text-lg font-bold bg-primary hover:bg-primary/95 text-white shadow-[0_15px_30px_rgba(255,107,43,0.25)] transition-all active:scale-[0.98]"
          >
            {step === onboardingSteps.length - 1 ? "Start Earning with Protection" : "Next Step"}
            {step < onboardingSteps.length - 1 && <ChevronRight className="ml-2" size={20} />}
          </Button>
          
          <div className="text-center pb-safe">
            <span className="text-text-dim font-medium">Already a partner? </span>
            <Link href="/login" className="text-primary font-bold hover:underline">Log in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
