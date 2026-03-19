"use client";

import { useState, useEffect, useRef } from "react";
import {
  Shield,
  Activity,
  Wallet,
  User,
  MapPin,
  TrendingUp,
  Clock,
  ArrowUpRight,
  ChevronRight,
  Bell,
  Thermometer,
  Cloud,
  Wind,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Zap,
  Lock,
  Smartphone,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────
type Tab = "home" | "policy" | "claims" | "profile";

// ── Components ────────────────────────────────────────────────────────────────

function StatGroup({ label, value, subValue, trend }: { label: string; value: string; subValue?: string; trend?: "up" | "down" }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-[0.1em]">{label}</p>
      <div className="flex items-baseline gap-2">
        <h3 className="text-xl font-bold text-white tracking-tight">{value}</h3>
        {trend && (
          <span className={`text-[10px] font-bold ${trend === "up" ? "text-emerald-400" : "text-rose-400"}`}>
            {trend === "up" ? "↑" : "↓"}
          </span>
        )}
      </div>
      {subValue && <p className="text-[11px] text-slate-500 font-medium">{subValue}</p>}
    </div>
  );
}

function SectionHeader({ title, action }: { title: string; action?: string }) {
  return (
    <div className="flex items-center justify-between mb-4 px-1">
      <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.15em]">{title}</h2>
      {action && (
        <button className="text-[11px] font-semibold text-blue-400 hover:text-blue-300 transition-colors">
          {action}
        </button>
      )}
    </div>
  );
}

// ── Onboarding ────────────────────────────────────────────────────────────────

function Onboarding({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setLoading(true);
      setTimeout(onComplete, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex flex-col p-6 max-w-lg mx-auto animate-fade-in-up">
      <header className="py-12 flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center">
          <Shield className="w-6 h-6 text-blue-500" />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white tracking-tight mb-1">EarnSage</h1>
          <p className="text-sm text-slate-500 font-medium tracking-tight">Parametric Income Protection</p>
        </div>
      </header>

      <div className="flex-1 flex flex-col gap-8">
        <div className="space-y-2">
          <div className="flex gap-1">
            {[1, 2, 3].map((s) => (
              <div key={s} className={`h-1 flex-1 rounded-full ${step >= s ? "bg-blue-500" : "bg-slate-800"} transition-all duration-500`} />
            ))}
          </div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Step {step} of 3</p>
        </div>

        {step === 1 && (
          <div className="space-y-6 animate-scale-in">
            <div>
              <h2 className="text-xl font-bold text-white mb-2 tracking-tight">Enter your phone</h2>
              <p className="text-sm text-slate-500">We'll secure your account with a direct link.</p>
            </div>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-500">+91</span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.slice(0, 10))}
                placeholder="00000 00000"
                className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-4 pl-14 pr-4 text-white focus:border-blue-500/50 focus:ring-0 transition-all outline-none font-medium text-lg tracking-widest"
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-scale-in">
            <div>
              <h2 className="text-xl font-bold text-white mb-2 tracking-tight">Select your platform</h2>
              <p className="text-sm text-slate-500">Choose the primary gig service you work with.</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {["Zomato", "Swiggy", "Zepto", "Dunzo"].map((p) => (
                <button key={p} className="p-4 rounded-2xl border border-slate-800 bg-slate-900/30 text-left hover:border-blue-500/40 hover:bg-blue-500/5 transition-all group">
                  <p className="text-sm font-bold text-slate-300 group-hover:text-blue-400">{p}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && !loading && (
          <div className="space-y-6 animate-scale-in">
            <div>
              <h2 className="text-xl font-bold text-white mb-2 tracking-tight">Active Coverage Zone</h2>
              <p className="text-sm text-slate-500">Tell us where you predominantly operate.</p>
            </div>
            <select className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-4 px-4 text-white focus:border-blue-500/50 transition-all outline-none font-medium appearance-none">
              <option>Bangalore Central</option>
              <option>Mumbai South</option>
              <option>Delhi NCR</option>
              <option>Hyderabad Gachibowli</option>
            </select>
          </div>
        )}

        {loading && (step === 3) && (
          <div className="flex-1 flex flex-col items-center justify-center gap-6 animate-scale-in">
            <div className="w-16 h-16 rounded-full border-2 border-blue-500/20 border-t-blue-500 animate-spin" />
            <div className="text-center">
              <h3 className="font-bold text-white mb-1">Authenticating Profile</h3>
              <p className="text-xs text-slate-500">Mapping real-time triggers for your zone...</p>
            </div>
          </div>
        )}
      </div>

      {!loading && (
        <button
          onClick={handleNext}
          className="w-full py-4 rounded-2xl font-bold text-white btn-primary flex items-center justify-center gap-2 mb-8"
        >
          {step === 3 ? "Activate SafeGuard" : "Continue"}
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

// ── Dashboard ────────────────────────────────────────────────────────────────

export default function EarnSageV2() {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  if (!isOnboarded) return <Onboarding onComplete={() => setIsOnboarded(true)} />;

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex flex-col max-w-lg mx-auto relative font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 px-6 py-5 flex items-center justify-between glass-panel border-x-0 border-t-0 bg-[#020617]/70">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center">
            <Shield className="w-4.5 h-4.5 text-blue-500" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white tracking-tight">EarnSage</h1>
            <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Live • Protected</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center relative">
            <Bell className="w-4 h-4 text-slate-400" />
            <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-blue-500" />
          </button>
          <div className="w-9 h-9 rounded-full bg-slate-800 border border-white/5 flex items-center justify-center text-xs font-bold text-white overflow-hidden">
            RK
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-5 py-6 space-y-8 pb-40">
        {activeTab === "home" && (
          <div className="space-y-8 animate-fade-in-up">
            {/* Primary Metrics */}
            <div className="grid grid-cols-2 gap-px bg-slate-800 overflow-hidden rounded-3xl border border-slate-800 shadow-2xl">
              <div className="bg-[#0f172a] p-6 flex flex-col gap-6">
                <StatGroup label="Current Protection" value="₹2,500" subValue="Earnings Safeguard" />
                <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full w-[85%] bg-blue-500 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.3)]" />
                </div>
              </div>
              <div className="bg-[#0f172a] p-6 flex flex-col gap-6">
                <StatGroup label="Weekly Premium" value="₹99.00" subValue="Next: Mar 22" />
                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status: </span>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Settled</span>
                </div>
              </div>
            </div>

            {/* Live Environment Monitoring */}
            <section>
              <SectionHeader title="Live Monitoring" />
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Cloud, label: "Sky Condition", val: "Clear", color: "text-blue-400" },
                  { icon: Thermometer, label: "Ambient Temp", val: "28°C", color: "text-amber-400" },
                  { icon: Wind, label: "AQI Status", val: "145", color: "text-emerald-400" },
                ].map((item, i) => (
                  <div key={i} className="bg-slate-900/40 border border-slate-800 rounded-2xl p-4 flex flex-col items-center gap-3">
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                    <div className="text-center">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">{item.label}</p>
                      <p className="text-xs font-bold text-white">{item.val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Recent Settlement History */}
            <section>
              <SectionHeader title="Settlement History" action="View All" />
              <div className="space-y-2">
                {[
                  { reason: "Heavy Rain Payout", amount: "₹250", date: "Today, 14:30", type: "success" },
                  { reason: "Air Quality Alert", amount: "₹680", date: "Mar 12, 11:15", type: "success" },
                ].map((item, i) => (
                  <div key={i} className="bg-slate-900/30 border border-slate-800/50 rounded-2xl p-4 flex items-center justify-between card-hover cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center">
                        <ArrowUpRight className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white tracking-tight">{item.reason}</p>
                        <p className="text-xs text-slate-500 font-medium">{item.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-white">{item.amount}</p>
                      <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Instant</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Coverage Tip */}
            <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex gap-4 items-start">
              <Zap className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-slate-200 mb-1">Parametric Assurance Active</p>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">Your settlement triggers are fully automated. Payments are disbursed directly to your primary UPI ID upon disruption confirmation.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "policy" && (
          <div className="space-y-6 animate-fade-in-up">
            <SectionHeader title="Policy Details" />
            <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">ES-789-V2-ACTIVE</h3>
                  <p className="text-xs text-slate-500">Premium Comprehensive Coverage</p>
                </div>
                <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
                  <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Standard</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <StatGroup label="Policy Tenure" value="Weekly" subValue="Renewable" />
                <StatGroup label="Zone" value="Bangalore Central" subValue="Region 1" />
              </div>

              <div className="pt-6 border-t border-slate-800">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em] mb-4">Coverage Dimensions</p>
                <div className="space-y-3">
                  {["Rainfall > 15mm/hr", "AQI > 300 (PM2.5)", "Heatwave > 42°C", "Unplanned Curfews"].map((c) => (
                    <div key={c} className="flex items-center gap-3">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-xs font-medium text-slate-300">{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "claims" && (
          <div className="space-y-6 animate-fade-in-up">
            <SectionHeader title="Settlement Log" />
            <div className="bg-[#0f172a] rounded-3xl border border-slate-800 p-8 text-center flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center">
                <Activity className="w-8 h-8 text-slate-700" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Real-time Claims</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">Claims are auto-triggered by our parametric engine. No manual intervention required for settlements.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="space-y-8 animate-fade-in-up px-2">
             <div className="flex flex-col items-center gap-4 py-8">
               <div className="w-24 h-24 rounded-full bg-slate-800 border-4 border-slate-900 flex items-center justify-center text-2xl font-bold text-white">RK</div>
               <div className="text-center">
                 <h2 className="text-xl font-bold text-white">Ravi Kumar</h2>
                 <p className="text-sm text-slate-500">Member since Feb 2024</p>
               </div>
             </div>

             <div className="space-y-3">
               {[
                 { icon: Smartphone, label: "Account Settings", val: "Verified" },
                 { icon: Wallet, label: "Payout ID", val: "ravi.kumar@upi" },
                 { icon: Lock, label: "Privacy & Legal", val: "" },
               ].map((item, i) => (
                 <button key={i} className="w-full flex items-center justify-between p-5 bg-slate-900/20 border border-slate-800/60 rounded-2xl hover:bg-slate-900 transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-800/30 flex items-center justify-center">
                        <item.icon className="w-4.5 h-4.5 text-slate-500 group-hover:text-white transition-colors" />
                      </div>
                      <p className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">{item.label}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-600">{item.val}</span>
                      <ChevronRight className="w-4 h-4 text-slate-700" />
                    </div>
                 </button>
               ))}
             </div>

             <button 
               onClick={() => setIsOnboarded(false)}
               className="w-full py-4 text-sm font-bold text-slate-500 hover:text-rose-500 transition-colors"
             >
               Terminate Session
             </button>
          </div>
        )}
      </main>

      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto glass-panel border-x-0 border-b-0 pb-safe z-50">
        <div className="flex justify-around items-center px-4 py-4">
          {[
            { id: "home", icon: Shield, label: "Guard" },
            { id: "policy", icon: Activity, label: "Policy" },
            { id: "claims", icon: Wallet, label: "Settled" },
            { id: "profile", icon: User, label: "Profile" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as Tab)}
              className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${activeTab === item.id ? "text-blue-500 scale-105" : "text-slate-600 hover:text-slate-400"}`}
            >
              <item.icon className="w-5.5 h-5.5" strokeWidth={activeTab === item.id ? 2.5 : 2} />
              <span className={`text-[9px] font-bold uppercase tracking-[0.15em] ${activeTab === item.id ? "opacity-100" : "opacity-0"}`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
