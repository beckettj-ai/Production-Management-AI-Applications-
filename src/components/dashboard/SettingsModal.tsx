import { useState, useEffect } from "react";
import { Button } from "../ui/Button";
import { motion, AnimatePresence } from "motion/react";
import { X, Key, ExternalLink, ShieldCheck, AlertCircle, Mail, Check } from "lucide-react";

declare global {
  interface Window {
    aistudio: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

export default function SettingsModal({ 
  isOpen, 
  onClose, 
  isEmailConnected, 
  onConnectEmail 
}: { 
  isOpen: boolean; 
  onClose: () => void;
  isEmailConnected: boolean;
  onConnectEmail: () => void;
}) {
  const [hasKey, setHasKey] = useState(false);

  useEffect(() => {
    if (isOpen) {
      checkKey();
    }
  }, [isOpen]);

  const checkKey = async () => {
    try {
      const selected = await window.aistudio.hasSelectedApiKey();
      setHasKey(selected);
    } catch (err) {
      console.error("Failed to check API key status", err);
    }
  };

  const handleSelectKey = async () => {
    try {
      await window.aistudio.openSelectKey();
      // Assume success and update UI
      setHasKey(true);
    } catch (err) {
      console.error("Failed to open key selection", err);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/5 rounded-lg">
                  <Key className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="text-xl font-medium">Settings</h3>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-8 overflow-y-auto max-h-[70vh] scrollbar-hide">
              <section>
                <h4 className="text-sm font-medium text-white/80 mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-green-400" />
                  API Configuration
                </h4>
                
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-white/90">Google Gemini API Key</p>
                      <p className="text-xs text-white/40 mt-1">
                        {hasKey 
                          ? "A custom API key is currently active." 
                          : "Using the default environment API key."}
                      </p>
                    </div>
                    <div className={`px-2 py-1 rounded text-[10px] font-mono uppercase tracking-wider ${hasKey ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                      {hasKey ? 'Custom' : 'Default'}
                    </div>
                  </div>

                  <Button 
                    onClick={handleSelectKey}
                    className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white"
                  >
                    {hasKey ? "Change API Key" : "Configure Custom Key"}
                  </Button>

                  <div className="pt-2 flex flex-col gap-2">
                    <a 
                      href="https://aistudio.google.com/app/apikey" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
                    >
                      Get your Gemini API Key <ExternalLink className="w-3 h-3" />
                    </a>
                    <a 
                      href="https://ai.google.dev/gemini-api/docs/billing" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-white/40 hover:text-white/60 flex items-center gap-1 transition-colors"
                    >
                      Learn about API Billing <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </section>

              <section>
                <h4 className="text-sm font-medium text-white/80 mb-4 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-cyan-400" />
                  Email Integration
                </h4>
                
                <div className={`bg-white/5 border border-white/10 rounded-xl p-4 space-y-4 ${isEmailConnected ? 'border-green-500/20' : ''}`}>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-white/90">Google Workspace</p>
                      <p className="text-xs text-white/40 mt-1">
                        {isEmailConnected 
                          ? "Connected to searching4banjo@gmail.com" 
                          : "Not connected."}
                      </p>
                    </div>
                    {isEmailConnected && (
                      <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                        <Check className="w-4 h-4 text-green-400" />
                      </div>
                    )}
                  </div>

                  {!isEmailConnected ? (
                    <Button 
                      onClick={onConnectEmail}
                      className="w-full bg-white text-black hover:bg-white/90"
                    >
                      Connect Gmail
                    </Button>
                  ) : (
                    <Button 
                      variant="outline"
                      className="w-full border-white/10 text-white/40 hover:text-white/60"
                      disabled
                    >
                      Disconnect (Coming Soon)
                    </Button>
                  )}
                </div>
              </section>

              <div className="p-3 bg-cyan-500/5 border border-cyan-500/10 rounded-lg flex gap-3">
                <AlertCircle className="w-5 h-5 text-cyan-400 shrink-0" />
                <p className="text-[11px] text-cyan-400/80 leading-relaxed">
                  Archive IQ uses the Gemini API to generate professional clearance requests. 
                  Providing your own key ensures your project remains live and independent of shared quotas.
                </p>
              </div>
            </div>

            <div className="p-6 border-t border-white/10 bg-white/[0.02] flex justify-end">
              <Button onClick={onClose}>Done</Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
