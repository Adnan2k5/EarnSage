"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Check, ArrowRight, Share2, Sparkles, CheckCircle2, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { MobileWrapper } from '@/components/shared/MobileWrapper';

export default function ActivationSuccess() {
  const router = useRouter();
  const [confetti, setConfetti] = useState<any[]>([]);

  useEffect(() => {
    const colors = ['#0F172A', '#FF6B2B', '#E2E8F0', '#059669'];
    const newConfetti = [...Array(60)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -20,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      duration: Math.random() * 2 + 2,
      delay: Math.random() * 0.5
    }));
    setConfetti(newConfetti);
  }, []);

  return (
    <MobileWrapper className="bg-surface-base flex flex-col items-center justify-center min-h-screen px-6 py-12 text-center overflow-hidden">
      {/* Confetti */}
      {confetti.map((c) => (
        <motion.div
          key={c.id}
          initial={{ y: -20, x: `${c.x}%`, opacity: 1, rotate: 0 }}
          animate={{ y: 800, x: `${c.x + (Math.random() * 10 - 5)}%`, opacity: 0, rotate: c.rotation + 720 }}
          transition={{ duration: c.duration, delay: c.delay, ease: "linear" }}
          className="fixed pointer-events-none"
          style={{ 
            width: c.size, 
            height: c.size, 
            backgroundColor: c.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            zIndex: 100
          }}
        />
      ))}

      <div className="relative mb-12">
        <motion.div
           initial={{ scale: 0 }}
           animate={{ scale: 1 }}
           transition={{ type: "spring", stiffness: 260, damping: 20 }}
           className="w-24 h-24 rounded-3xl bg-white border-2 border-ink-primary flex items-center justify-center p-6 shadow-md"
        >
          <motion.svg 
            viewBox="0 0 24 24" 
            className="w-full h-full text-ink-primary fill-none stroke-[2.5]"
          >
             <motion.path 
               initial={{ pathLength: 0 }}
               animate={{ pathLength: 1 }}
               transition={{ duration: 1, delay: 0.5 }}
               d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" 
             />
             <motion.path 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 1.5 }}
                d="M9 12l2 2 4-4" 
                stroke="#059669"
                strokeWidth="3"
             />
          </motion.svg>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.3 }}
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-status-success text-white text-[9px] font-bold uppercase tracking-widest rounded-full flex items-center gap-1.5 shadow-sm"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          Active
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5 }}
        className="space-y-4"
      >
        <h1 className="text-display-xl">You're Protected!</h1>
        <p className="text-body text-ink-muted px-8">Your delivery zone is now under 24/7 AI-powered surveillance.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.8 }}
        className="w-full mt-12 mb-12"
      >
        <Card variant="dark" className="p-6 text-left relative overflow-hidden group">
          <div className="space-y-1 relative z-10">
            <h3 className="text-subheading text-white">Standard Shield</h3>
            <div className="text-mono-m text-white/50 tracking-wider font-bold">₹2,100 / week coverage</div>
            <div className="text-[11px] text-white/40 mt-1 uppercase tracking-widest">Renews Mar 25 · ₹49/week</div>
          </div>
          <Shield className="absolute right-[-10px] top-[-10px] w-24 h-24 text-white/5 rotate-12" />
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2 }}
        className="w-full space-y-6"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-4 text-left p-4 rounded-xl bg-surface-raised border border-border-light">
             <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-border-light shadow-sm">
               <Zap className="text-primary" size={18} />
             </div>
             <div>
               <div className="text-xs font-bold text-ink-primary italic">Next: Every rider's fund</div>
               <p className="text-[11px] text-ink-muted">AI monitors your zone. Disruption = Instant Payout.</p>
             </div>
          </div>
        </div>

        <div className="space-y-3">
          <Button className="w-full h-14 uppercase tracking-widest group" onClick={() => router.push('/dashboard')}>
            Go to Dashboard <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="ghost" className="w-full text-ink-muted">
            <Share2 size={16} className="mr-2" /> Share with colleagues
          </Button>
        </div>
      </motion.div>
    </MobileWrapper>
  );
}
