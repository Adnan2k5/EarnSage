"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Check, Sparkles, Zap, Smartphone, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { MobileWrapper } from '@/components/shared/MobileWrapper';

const plans = [
  {
    id: "basic",
    name: "Basic Guard",
    price: "29",
    payout: "1,200",
    features: ["Rain Protection", "Flood Coverage", "SMS Alerts"],
    color: "bg-blue-50/50",
    borderColor: "border-blue-100",
    textColor: "text-blue-600"
  },
  {
    id: "standard",
    name: "Standard Shield",
    price: "49",
    payout: "2,100",
    recommended: true,
    features: ["All Basic features", "AQI/Pollution Shield", "Curfew Protection", "Priority Payouts"],
    color: "bg-primary/5",
    borderColor: "border-primary/20",
    textColor: "text-primary"
  },
  {
    id: "premium",
    name: "Premium Armor",
    price: "79",
    payout: "3,500",
    features: ["All Standard features", "Personal Accident Cover", "Medical Emergency Support", "24/7 Concierge"],
    color: "bg-secondary/5",
    borderColor: "border-secondary/10",
    textColor: "text-secondary"
  }
];

export default function PlansPage() {
  const [billing, setBilling] = useState<"weekly" | "monthly">("weekly");
  const [selectedPlan, setSelectedPlan] = useState("standard");

  return (
    <MobileWrapper withNav>
      <div className="p-6 pb-40 space-y-8">
        <header className="space-y-1">
          <h1 className="text-4xl font-black text-secondary tracking-tighter italic">Plans</h1>
          <p className="text-[10px] font-black text-text-dim uppercase tracking-[0.2em] opacity-40 italic">Upgrade Protection</p>
        </header>

        {/* Current Plan Highlight */}
        <div className="bg-secondary p-8 rounded-[40px] shadow-2xl relative overflow-hidden group border border-white/5">
           <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
              <Shield size={100} className="text-white" />
           </div>
           
           <div className="relative z-10 space-y-7">
              <div className="flex justify-between items-center">
                 <div className="bg-accent/20 text-accent font-black text-[9px] tracking-[0.2em] px-4 py-2 border border-accent/20 rounded-full flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_10px_rgba(0,212,170,1)]" />
                    ACTIVE PLAN
                 </div>
                 <Badge className="bg-white/10 text-white/50 border-white/10 text-[8px] font-black uppercase tracking-widest px-3 py-1">WEEKLY AUTO-RENEW</Badge>
              </div>

              <div>
                 <p className="text-white/40 text-[9px] font-black uppercase tracking-widest mb-1.5 leading-none italic">Subscription Type</p>
                 <h3 className="text-3xl font-black text-white italic tracking-tight">Standard Shield</h3>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/10">
                 <div>
                    <p className="text-white/30 text-[9px] font-black uppercase tracking-widest mb-2 italic leading-none">Protection Fee</p>
                    <p className="text-white text-xl font-black italic">₹49<span className="text-white/30 text-[10px] ml-1 uppercase not-italic">/wk</span></p>
                 </div>
                 <div className="text-right">
                    <p className="text-white/30 text-[9px] font-black uppercase tracking-widest mb-2 italic leading-none">Potential Payout</p>
                    <p className="text-accent text-xl font-black italic">₹2,100<span className="text-accent/30 text-[10px] ml-1 uppercase not-italic">/max</span></p>
                 </div>
              </div>
           </div>
        </div>

        {/* Plan Toggle */}
        <div className="flex justify-center pt-2">
           <div className="bg-secondary/5 p-1.5 rounded-[22px] flex gap-1 shadow-inner border border-secondary/5">
              {["weekly", "monthly"].map((b) => (
                <button
                  key={b}
                  onClick={() => setBilling(b as any)}
                  className={cn(
                    "px-10 py-3 rounded-[18px] text-[10px] font-black uppercase tracking-widest transition-all duration-300",
                    billing === b ? "bg-white text-secondary shadow-lg" : "text-text-dim/60 hover:text-secondary"
                  )}
                >
                  {b}
                </button>
              ))}
           </div>
        </div>

        {/* Plan Selection Cards */}
        <div className="space-y-5">
           {plans.map((plan, i) => (
             <motion.div 
               key={plan.id}
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: i * 0.1 }}
               onClick={() => setSelectedPlan(plan.id)}
               className={cn(
                 "p-7 rounded-[40px] border-4 transition-all duration-300 cursor-pointer relative overflow-hidden group active:scale-[0.98]",
                 selectedPlan === plan.id ? cn(plan.borderColor, plan.color, "shadow-2xl border-primary/20") : "bg-white border-transparent shadow-sm hover:border-gray-50"
               )}
             >
                {plan.recommended && (
                  <div className="absolute top-0 right-0 bg-primary text-white text-[9px] font-black px-5 py-2 rounded-bl-[20px] shadow-lg tracking-[0.15em] uppercase border-l border-b border-primary/20">RECOMMENDED</div>
                )}

                <div className="flex items-center justify-between mb-6">
                   <div className="space-y-1.5">
                      <h4 className={cn("text-xl font-black italic tracking-tight", plan.textColor)}>{plan.name}</h4>
                      <p className="text-[10px] font-black text-text-dim/40 uppercase tracking-[0.15em]">Gig-Armor Protection</p>
                   </div>
                   <div className="text-right">
                      <p className="text-2xl font-black text-secondary italic tracking-tighter leading-none mb-1.5">₹{plan.price}</p>
                      <p className="text-[9px] font-black text-text-dim/30 uppercase tracking-[0.2em] leading-none">PER WEEK</p>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-8 translate-x-1">
                   {plan.features.map((f, i) => (
                     <div key={i} className="flex items-center gap-2.5">
                        <div className={cn("w-5 h-5 rounded-lg flex items-center justify-center border transition-all duration-500", selectedPlan === plan.id ? "bg-accent/15 border-accent/20 rotate-12" : "bg-gray-50 border-gray-100")}>
                           <Check size={10} className={cn("text-accent", selectedPlan === plan.id ? "" : "opacity-0")} strokeWidth={4} />
                        </div>
                        <span className="text-[11px] font-black text-secondary/60 tracking-tight leading-none uppercase">{f}</span>
                     </div>
                   ))}
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-black/5">
                   <div>
                      <p className="text-[9px] font-black text-text-dim/30 uppercase tracking-[0.15em] mb-1.5 leading-none italic">Payout Limit</p>
                      <p className="text-base font-black text-secondary italic leading-none">₹{plan.payout} <span className="text-[10px] opacity-20 uppercase not-italic font-bold">Cap/WK</span></p>
                   </div>
                   <button className={cn(
                     "rounded-full px-8 h-12 font-black text-[10px] tracking-widest uppercase transition-all duration-300 border-b-4",
                     selectedPlan === plan.id ? "bg-primary text-white border-black/10 scale-105 shadow-xl" : "bg-gray-100 text-secondary border-gray-200 hover:bg-gray-200"
                   )}>
                      {selectedPlan === plan.id ? "PLAN SELECTED ✓" : "ACTIVATE"}
                   </button>
                </div>
             </motion.div>
           ))}
        </div>

        {/* FAQ Section */}
        <section className="space-y-6 pt-8">
           <div className="flex items-center gap-4 ml-2">
              <div className="w-12 h-12 rounded-[22px] bg-secondary/5 flex items-center justify-center border border-secondary/5">
                 <Sparkles size={24} className="text-primary" />
              </div>
              <div className="space-y-0.5">
                <h3 className="text-2xl font-black text-secondary tracking-tight italic">Help Support</h3>
                <p className="text-[9px] font-black text-text-dim uppercase tracking-[0.2em] opacity-40">Guidelines & Policies</p>
              </div>
           </div>
           
           <Accordion type="single" collapsible className="w-full space-y-4">
              {[
                { q: "How are triggers detected?", a: "We use hyper-local weather satellites and zone monitoring API to detect rain, pollution, and curfews in real-time." },
                { q: "When do I receive my payout?", a: "Payouts are triggered instantly once the disruption is confirmed. Money is sent to your UPI wallet within minutes." },
                { q: "Can I pause my plan?", a: "Yes, you can pause or cancel your plan anytime from the Profile section. No long-term commitment required." }
              ].map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-none bg-white rounded-[32px] px-8 py-3 shadow-sm border border-gray-50/50">
                  <AccordionTrigger className="font-extrabold text-[14px] leading-tight text-secondary hover:no-underline tracking-tight text-left py-4 hover:text-primary transition-colors">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-text-dim text-[13px] font-medium leading-relaxed pb-6 pt-2 border-t border-gray-50 mt-2 italic">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
           </Accordion>
        </section>

        {/* Promo Banner */}
        <div className="pt-10 space-y-4">
           <motion.div 
             whileHover={{ scale: 1.02 }}
             whileTap={{ scale: 0.98 }}
             className="bg-primary/5 p-7 rounded-[40px] border border-primary/10 flex items-center gap-5 relative overflow-hidden group cursor-pointer"
           >
              <div className="absolute inset-0 bg-primary/2 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="bg-primary text-white p-4 rounded-2xl shadow-2xl relative z-10 transition-transform group-hover:rotate-6">
                 <Zap size={28} fill="white" strokeWidth={0} />
              </div>
              <div className="relative z-10">
                 <p className="text-xs font-black text-secondary leading-tight italic uppercase tracking-tight">Refer a Partner?</p>
                 <p className="text-[10px] font-medium text-text-dim leading-none mt-1.5 opacity-60">Get 1 week free protection</p>
              </div>
              <button className="ml-auto w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg text-primary group-hover:bg-primary group-hover:text-white transition-all relative z-10">
                 <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </button>
           </motion.div>
           
           <div className="text-center pb-safe">
              <div className="flex justify-center gap-10 opacity-10 mb-6">
                 <Shield size={24} />
                 <Smartphone size={24} />
                 <Zap size={24} />
              </div>
              <p className="text-[9px] font-black text-text-dim uppercase tracking-[0.3em] italic mb-2">Earn Sage • Intelligence</p>
              <p className="text-[8px] font-bold text-text-dim/30 uppercase tracking-[0.1em]">Certified Parametric Shield v2.4.0</p>
           </div>
        </div>
      </div>
    </MobileWrapper>
  );
}
