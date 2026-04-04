import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShieldCheck, Cloud, ArrowRight, X, Archive } from "lucide-react";
import { Button } from "../ui/Button";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: () => void;
}

export default function OnboardingModal({ isOpen, onClose, onConnect }: OnboardingModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={onClose}
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-[32px] shadow-2xl overflow-hidden border border-black/5"
          >
            <div className="p-10 text-center space-y-8">
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-cyan-500/10 rounded-3xl flex items-center justify-center relative">
                  <Archive className="w-10 h-10 text-cyan-600" />
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center border border-black/5">
                    <Cloud className="w-5 h-5 text-blue-500" />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-3xl font-bold text-black tracking-tight">Welcome to Archive IQ</h3>
                <p className="text-sm text-black/40 leading-relaxed max-w-xs mx-auto">
                  We've loaded a <span className="text-black font-bold">Sample Project</span> to show you how it works. Ready to start your own?
                </p>
              </div>

              <div className="bg-[#fcfdfe] border border-black/5 rounded-2xl p-6 text-left space-y-4">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                    <Cloud className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-black">Google Drive Storage</h4>
                    <p className="text-xs text-black/40 mt-1 leading-relaxed">
                      Connect your Google account to store archival assets and clearance documents directly in your own Drive.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button 
                  onClick={onConnect}
                  className="h-14 w-full bg-black text-white rounded-2xl font-bold hover:bg-black/80 shadow-xl shadow-black/10 flex items-center justify-center gap-2"
                >
                  Connect Google Account
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <button 
                  onClick={onClose}
                  className="text-xs font-bold text-black/30 hover:text-black transition-colors py-2"
                >
                  Explore Sample Project First
                </button>
              </div>
            </div>

            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 hover:bg-black/5 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-black/20" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
