"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Sparkles, HelpCircle, ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const INITIAL_MESSAGES = [
  { role: 'bot', text: "Namaste Ravi! I'm your Earn Sage assistant. How can I help you protect your earnings today?" }
];

interface ChatBotProps {
  mode?: 'embedded' | 'popup';
}

export function ChatBot({ mode = 'popup' }: ChatBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      let response = "I'm here to help! Ask me about payouts, rain triggers, or changing your theme.";
      const lower = input.toLowerCase();
      if (lower.includes("payout")) response = "Panda-speed payouts! Your last ₹400 is already in your wallet.";
      if (lower.includes("rain")) response = "I'm monitoring Koramangala. 60% chance of a trigger event in 2 hours.";
      if (lower.includes("hello")) response = "Hey Ravi! Safety first today. Anything on your mind?";
      if (lower.includes("theme")) response = "Go to Profile > Preferences to switch between Pure White, Dark Pro, and Vibrant Blue!";
      
      setMessages(prev => [...prev, { role: 'bot', text: response }]);
    }, 1000);
  };

  const ChatContent = (
    <div className={cn(
      "flex flex-col overflow-hidden transition-all duration-500",
      mode === 'embedded' ? "w-full h-full rounded-[32px] border border-border-light shadow-card bg-white" : "w-full h-full bg-white/95 backdrop-blur-xl"
    )}>
      {/* Header */}
      <div className="p-5 bg-ink-primary text-white flex justify-between items-center bg-gradient-to-r from-[#0A0F1E] to-[#1E293B]">
         <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center border border-white/10">
               <Sparkles size={16} className="text-primary" />
            </div>
            <div>
               <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/90">AI Assistant</div>
               <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[8px] text-white/40 font-bold uppercase tracking-widest">Active Now</span>
               </div>
            </div>
         </div>
         {mode === 'popup' && (
           <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
              <ChevronDown size={18} />
           </button>
         )}
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar bg-slate-50/30">
         {messages.map((m, i) => (
           <motion.div 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             key={i} 
             className={cn("flex w-full", m.role === 'user' ? "justify-end" : "justify-start")}
           >
              <div className={cn(
                "max-w-[85%] p-4 rounded-[20px] text-[12px] leading-relaxed shadow-sm",
                m.role === 'user' 
                  ? "bg-primary text-white rounded-tr-none" 
                  : "bg-white text-slate-800 border border-slate-200 rounded-tl-none"
              )}>
                 {m.text}
              </div>
           </motion.div>
         ))}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white/50 backdrop-blur-md border-t border-slate-100 flex gap-2 items-center">
         <input 
           value={input}
           onChange={(e) => setInput(e.target.value)}
           onKeyPress={(e) => e.key === 'Enter' && handleSend()}
           placeholder="Ask about payouts, rain, themes..."
           className="flex-1 h-11 bg-slate-100/50 border border-slate-200/50 rounded-xl px-4 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
         />
         <button 
           onClick={handleSend}
           className="w-11 h-11 bg-primary text-white rounded-xl flex items-center justify-center active:scale-90 transition-transform shadow-[0_4px_12px_rgba(255,107,43,0.3)]"
         >
            <Send size={16} />
         </button>
      </div>
    </div>
  );

  if (mode === 'embedded') return ChatContent;

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 left-6 px-4 h-12 bg-[#0A0F1E] text-white rounded-full shadow-2xl flex items-center gap-3 z-[100] border border-white/10 backdrop-blur-xl group"
      >
        <div className="w-6 h-6 rounded-lg bg-primary/20 flex items-center justify-center">
           <Sparkles size={14} className="text-primary" />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] pr-2">Ask Assistant</span>
        {isOpen ? <ChevronDown size={14} className="text-white/40" /> : <ChevronUp size={14} className="text-white/40" />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-[96px] left-6 w-[calc(100%-48px)] max-w-[340px] h-[480px] z-[100] rounded-[32px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.3)] border border-white/10"
          >
            {ChatContent}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
