"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft, MapPin, Info, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

const platforms = ["Zomato", "Swiggy", "Zepto", "Blinkit", "Dunzo"];

export default function RegistrationPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    platform: 'Zomato',
    city: 'Bengaluru',
    radius: 5
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F7FA]">
      {/* Progress Bar */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] h-1.5 bg-gray-200 z-50">
        <motion.div 
          initial={{ width: "33%" }}
          animate={{ width: "66%" }}
          className="h-full bg-primary"
        />
      </div>

      {/* Header */}
      <header className="px-6 pt-8 pb-4 flex items-center gap-4">
        <button onClick={() => router.back()} className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm active:scale-90 transition-transform">
          <ArrowLeft size={20} className="text-secondary" />
        </button>
        <span className="text-[10px] font-bold text-secondary/40 uppercase tracking-[0.2em] pt-1">Step 2 of 3</span>
      </header>

      <main className="flex-1 px-6 pb-32">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-secondary tracking-tight">Your Profile</h1>
          <p className="text-text-dim text-sm font-medium mt-1">Help AI calculate your weather risk</p>
        </div>
        
        <div className="space-y-8">
          {/* Full Name */}
          <div className="space-y-3">
            <Label className="text-text-dim text-[10px] font-bold uppercase tracking-[0.15em] ml-1">Full Name</Label>
            <Input 
              placeholder="e.g. Ravi Kumar" 
              className="h-[56px] rounded-2xl border-gray-200 bg-white text-base px-5 focus:ring-primary/10 focus:border-primary shadow-sm font-medium"
            />
          </div>

          {/* Mobile Number */}
          <div className="space-y-3">
            <Label className="text-text-dim text-[10px] font-bold uppercase tracking-[0.15em] ml-1">Mobile Number</Label>
            <div className="relative group">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 font-bold text-secondary pr-3 border-r border-gray-100">+91</span>
              <Input 
                placeholder="00000 00000" 
                type="tel"
                className="h-[56px] rounded-2xl border-gray-200 bg-white text-base pl-[68px] pr-5 focus:ring-primary/10 focus:border-primary shadow-sm font-medium tracking-wide"
              />
            </div>
          </div>

          {/* Platform Selector */}
          <div className="space-y-4">
            <Label className="text-text-dim text-[10px] font-bold uppercase tracking-[0.15em] ml-1">Work Platform</Label>
            <div className="flex flex-wrap gap-2.5">
              {platforms.map((p) => (
                <button
                  key={p}
                  onClick={() => setFormData({...formData, platform: p})}
                  className={cn(
                    "px-6 py-3.5 rounded-2xl font-bold text-sm transition-all duration-300",
                    formData.platform === p 
                      ? "bg-secondary text-white shadow-xl shadow-secondary/20 scale-[1.02]" 
                      : "bg-white text-secondary border border-gray-200 hover:border-primary/50"
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Delivery Zone - Map Placeholder */}
          <div className="space-y-4">
            <div className="flex items-center justify-between ml-1">
              <Label className="text-text-dim text-[10px] font-bold uppercase tracking-[0.15em]">Delivery Zone</Label>
              <div className="flex items-center gap-1.5 text-[9px] bg-secondary/5 px-2.5 py-1 rounded-full text-secondary font-bold uppercase tracking-wider">
                <Info size={10} className="text-primary" />
                Smart Trigger Accuracy
              </div>
            </div>
            
            <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-card aspect-[4/3] bg-gray-100 group cursor-pointer">
              {/* Fake Map Background */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800')" }}
              />
              <div className="absolute inset-0 bg-secondary/10" />
              
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div 
                  initial={{ y: -15, opacity: 0 }} 
                  animate={{ y: 0, opacity: 1 }} 
                  transition={{ type: "spring", damping: 12, stiffness: 200 }}
                  className="z-10 relative"
                >
                  <MapPin size={48} className="text-primary fill-primary/20" />
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1.5 bg-black/20 rounded-full blur-[2px]" />
                </motion.div>
                <div className="w-24 h-24 rounded-full border-2 border-primary/30 bg-primary/10 animate-ping absolute duration-1000" />
              </div>

              <div className="absolute top-4 left-4 right-4 glass rounded-[20px] px-5 py-4 flex items-center justify-between shadow-lg border border-white/40">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
                    <MapPin size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-text-dim uppercase tracking-[0.1em] mb-1 opacity-70">Detecting Zone</p>
                    <p className="text-sm font-extrabold text-secondary leading-none">Koramangala, Bengaluru</p>
                  </div>
                </div>
                <ChevronDown size={20} className="text-text-dim opacity-50" />
              </div>

              <div className="absolute bottom-4 left-4 right-4 bg-secondary/90 backdrop-blur-md rounded-xl p-3 text-center">
                <p className="text-white text-[10px] font-bold uppercase tracking-widest">Tap to refine location</p>
              </div>
            </div>
          </div>

          {/* Radius Slider */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <Label className="text-secondary text-[11px] font-extrabold uppercase tracking-widest block mb-1">Protection Radius</Label>
                <p className="text-text-dim text-[10px] font-medium leading-none">Radius for weather triggers</p>
              </div>
              <div className="bg-primary/10 px-3 py-1.5 rounded-xl">
                 <span className="text-primary font-black text-lg font-mono leading-none">{formData.radius}km</span>
              </div>
            </div>
            <Slider 
              defaultValue={[5]} 
              max={10} 
              min={1} 
              step={1} 
              onValueChange={([v]) => setFormData({...formData, radius: v})}
              className="py-2"
            />
          </div>
        </div>
      </main>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] p-6 pt-2 bg-gradient-to-t from-[#F5F7FA] via-[#F5F7FA]/90 to-transparent z-40">
        <Button 
          onClick={() => router.push('/risk-profile')}
          className="w-full h-[64px] rounded-full text-lg font-extrabold bg-primary hover:bg-primary/95 text-white shadow-[0_20px_40px_rgba(255,107,43,0.3)] group transition-all active:scale-95 flex items-center justify-center gap-3"
        >
          Analyze My Risk
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-1">
            <ChevronRight size={18} />
          </div>
        </Button>
      </div>
    </div>
  );
}
