"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, HelpCircle, MessageSquare, Shield, Bell, Info, ArrowUpRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { MobileWrapper } from '@/components/shared/MobileWrapper';
import { ChatBot } from '@/components/shared/ChatBot';
import { Card } from '@/components/ui/card';

export default function SupportPage() {
  const router = useRouter();

  const quickHelp = [
    { title: "Payouts", desc: "When will I get paid for rain?", icon: Shield },
    { title: "Risk Map", desc: "How to read the risk levels?", icon: Info },
    { title: "Themes", desc: "How to enable Dark Mode?", icon: Bell },
  ];

  return (
    <MobileWrapper withNav className="bg-surface-base px-6 pt-8 pb-32">
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
           <button onClick={() => router.push('/dashboard')} className="w-10 h-10 rounded-full bg-white border border-border-light flex items-center justify-center text-ink-primary shadow-sm">
              <ChevronRight size={20} className="rotate-180" />
           </button>
           <h1 className="text-display-l">Support Center</h1>
        </div>
        <HelpCircle className="text-ink-muted" size={24} />
      </header>

      <div className="space-y-8">
        {/* Quick Help Items */}
        <section className="space-y-4">
           <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink-muted px-1">Common Questions</h3>
           <div className="grid grid-cols-1 gap-3">
              {quickHelp.map((item, i) => (
                <Card key={i} className="p-4 flex items-center justify-between group cursor-pointer hover:border-primary/30 transition-all">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-surface-raised flex items-center justify-center text-ink-primary group-hover:bg-primary group-hover:text-white transition-all">
                         <item.icon size={18} />
                      </div>
                      <div>
                         <div className="text-xs font-bold text-ink-primary">{item.title}</div>
                         <div className="text-[10px] text-ink-hint mt-0.5">{item.desc}</div>
                      </div>
                   </div>
                   <ArrowUpRight size={14} className="text-ink-hint group-hover:text-primary" />
                </Card>
              ))}
           </div>
        </section>

        {/* Embedded Chatbot */}
        <section className="space-y-4 flex-1">
           <div className="flex justify-between items-center px-1">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink-muted">AI Assistant</h3>
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-[9px] font-bold text-ink-hint uppercase tracking-widest italic">Instant Responses</span>
              </div>
           </div>
           
           <div className="h-[450px]">
              <ChatBot embedded={true} />
           </div>
        </section>

        {/* Support Footer */}
        <div className="p-6 bg-white border border-border-light rounded-3xl text-center space-y-2">
           <div className="text-xs font-bold text-ink-primary">Still need help?</div>
           <p className="text-[10px] text-ink-muted">Our rider safety team is available 24/7 on WhatsApp.</p>
           <button className="text-[10px] font-bold text-primary uppercase tracking-widest underline underline-offset-4 pt-2">
              Contact Safety Team
           </button>
        </div>
      </div>
    </MobileWrapper>
  );
}
