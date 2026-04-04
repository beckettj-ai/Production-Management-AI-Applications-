import React from "react";
import { motion } from "motion/react";
import { ShieldCheck, ArrowRight, Archive, Sparkles, Zap, Lock } from "lucide-react";
import { Button } from "../ui/Button";

interface LandingPageProps {
  onLogin: () => void;
}

export default function LandingPage({ onLogin }: LandingPageProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full text-center space-y-12 relative z-10"
      >
        {/* Logo & Title */}
        <div className="flex flex-col items-center space-y-6">
          <motion.div 
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="w-20 h-20 bg-white rounded-3xl shadow-2xl flex items-center justify-center border border-white/40 glass-card"
          >
            <ShieldCheck className="w-10 h-10 text-cyan-600" />
          </motion.div>
          <div className="space-y-2">
            <h1 className="text-6xl font-bold tracking-tighter text-black">
              Archive <span className="text-cyan-600">IQ</span>
            </h1>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-black/30">
              Archival Clearance Intelligence
            </p>
          </div>
        </div>

        {/* Purpose / Value Prop */}
        <div className="space-y-6 max-w-2xl mx-auto">
          <h2 className="text-3xl font-medium text-black/80 leading-tight">
            Streamline your archival clearance workflow with AI-powered insights and automated outreach.
          </h2>
          <p className="text-lg text-black/40 leading-relaxed">
            Archive IQ helps production teams manage rights, track clearances, and generate professional outreach in seconds. Built for the modern documentary and archival workflow.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {[
            { icon: Sparkles, title: "AI Insights", desc: "Automated risk assessment and orphan work detection." },
            { icon: Zap, title: "Fast Outreach", desc: "Generate professional clearance requests in seconds." },
            { icon: Lock, title: "Secure Tracking", desc: "Centralized dashboard for all your archival rights." }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="glass-card p-6 rounded-2xl space-y-3"
            >
              <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center">
                <feature.icon className="w-5 h-5 text-cyan-600" />
              </div>
              <h3 className="font-bold text-black">{feature.title}</h3>
              <p className="text-xs text-black/40 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Login Button */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="pt-8"
        >
          <Button 
            onClick={onLogin}
            className="h-16 px-12 rounded-2xl bg-black text-white text-lg font-bold hover:bg-black/80 shadow-2xl shadow-black/20 group transition-all"
          >
            Get Started
            <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <p className="mt-4 text-xs text-black/30 font-medium">
            Secure login with your production workspace
          </p>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <p className="text-[10px] font-bold uppercase tracking-widest text-black/20">
          © 2026 Archive IQ • Production Rights Management
        </p>
      </div>
    </div>
  );
}
