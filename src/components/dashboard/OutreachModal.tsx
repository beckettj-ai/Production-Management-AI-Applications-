import { useState } from "react";
import { Asset } from "../../types";
import { Button } from "../ui/Button";
import { motion, AnimatePresence } from "motion/react";
import { X, Copy, Check, Wand2, Loader2, Send } from "lucide-react";
import { MOCK_PROJECT } from "../../data/mock-data";
import { GoogleGenAI, Type } from "@google/genai";
import { toast } from "sonner";
import { db, OperationType, handleFirestoreError } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";

export default function OutreachModal({ asset, isEmailConnected }: { asset: Asset, isEmailConnected?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [draft, setDraft] = useState<{ subject: string; body: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateDraft = async () => {
    setIsGenerating(true);
    setDraft(null);
    setError(null);
    setIsSent(false);
    
    try {
      // Create a new instance right before use to ensure latest key from dialog
      const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
      
      if (!apiKey) {
        throw new Error("Gemini API key not found. Please configure it in Settings.");
      }

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `
        Draft a professional archival clearance request email for a documentary project.
        
        Project Title: ${MOCK_PROJECT.title}
        Project Synopsis: ${MOCK_PROJECT.synopsis}
        Intended Distribution: ${MOCK_PROJECT.intended_distribution}
        
        Asset Name: ${asset.asset_name}
        Rights Holder: ${asset.rights_holder?.name}
        Organization: ${asset.rights_holder?.organization}
        
        The tone should be professional, legally precise, yet respectful of the creator's rights. 
        Include placeholders for specific timecodes or usage details.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: { 
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              subject: { 
                type: Type.STRING,
                description: "The subject line of the email"
              },
              body: { 
                type: Type.STRING,
                description: "The full body of the email"
              },
            },
            required: ["subject", "body"],
          }
        }
      });

      const text = response.text;
      if (!text) {
        throw new Error("Empty response from AI");
      }
      
      setDraft(JSON.parse(text));
    } catch (err) {
      console.error("Failed to generate draft", err);
      const message = err instanceof Error ? err.message : "An unexpected error occurred";
      
      if (message.includes("Requested entity was not found")) {
        setError("Your custom API key might be invalid or expired. Please re-configure it in Settings.");
      } else {
        setError(message);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSend = async () => {
    if (!draft) return;
    
    if (!isEmailConnected) {
      toast.error("Email not connected", {
        description: "Please connect your professional email in the Dashboard sidebar first."
      });
      return;
    }

    setIsSending(true);
    
    try {
      // Simulate API call to send email
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update asset in Firestore
      const assetRef = doc(db, "assets", asset.id);
      await updateDoc(assetRef, {
        workflow_stage: "Pending Response",
        "rights_holder.contact_status": "Contacted",
        last_updated: new Date().toISOString()
      });

      toast.success("Email sent successfully!", {
        description: `Clearance request sent to ${asset.rights_holder?.name}`,
      });
      
      setIsSent(true);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `assets/${asset.id}`);
    } finally {
      setIsSending(false);
    }
  };

  const copyToClipboard = () => {
    if (!draft) return;
    navigator.clipboard.writeText(`Subject: ${draft.subject}\n\n${draft.body}`);
    setCopied(true);
    toast.info("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const closeModal = () => {
    setIsOpen(false);
    // Reset state if needed, or keep it for the next time
  };

  return (
    <>
      <Button 
        variant="outline" 
        size="sm" 
        className="text-xs text-cyan-400 border-cyan-500/20 hover:bg-cyan-500/10"
        onClick={() => setIsOpen(true)}
      >
        Clearance Request
      </Button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={closeModal}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white border border-black/5 rounded-[32px] shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-black/5 flex justify-between items-center bg-white">
                <div>
                  <h3 className="text-2xl font-bold">Clearance Outreach</h3>
                  <p className="text-sm text-black/40">Drafting request for {asset.rights_holder?.name}</p>
                </div>
                <button 
                  onClick={closeModal}
                  className="p-3 hover:bg-black/5 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-8 min-h-[400px] bg-[#fcfdfe]">
                {isSent ? (
                  <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-8"
                    >
                      <Check className="w-10 h-10 text-green-600" />
                    </motion.div>
                    <h4 className="text-2xl font-bold mb-3 text-black">Email Sent!</h4>
                    <p className="text-sm text-black/40 max-w-md mb-10 leading-relaxed">
                      Your clearance request has been successfully dispatched to {asset.rights_holder?.name}. 
                      We'll track the response in your inventory.
                    </p>
                    <Button onClick={closeModal} variant="outline" className="w-full max-w-xs h-12 rounded-xl border-black/5 bg-white shadow-sm">
                      Close Workspace
                    </Button>
                  </div>
                ) : !draft && !isGenerating ? (
                  <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                    <div className="w-20 h-20 rounded-[24px] bg-cyan-500/10 flex items-center justify-center mb-8">
                      <Wand2 className="w-10 h-10 text-cyan-600" />
                    </div>
                    <h4 className="text-2xl font-bold mb-3 text-black">Generate AI Draft</h4>
                    <p className="text-sm text-black/40 max-w-md mb-10 leading-relaxed">
                      Archive IQ will analyze the asset metadata and project details to craft a professional clearance request.
                    </p>
                    {error && (
                      <div className="mb-8 p-4 bg-red-500/5 border border-red-500/10 rounded-xl text-xs text-red-600 max-w-md font-medium">
                        {error}
                      </div>
                    )}
                    <Button onClick={generateDraft} className="w-full max-w-xs h-12 rounded-xl bg-black text-white hover:bg-black/80 shadow-xl shadow-black/10">
                      {error ? "Try Again" : "Generate Email"}
                    </Button>
                  </div>
                ) : isGenerating ? (
                  <div className="flex flex-col items-center justify-center h-full py-12">
                    <Loader2 className="w-12 h-12 text-cyan-500 animate-spin mb-6" />
                    <p className="text-sm text-black/40 font-bold animate-pulse">Analyzing rights holder data and drafting...</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-black/30 mb-2 block">Subject</label>
                      <div className="p-4 bg-white border border-black/5 rounded-xl text-sm font-bold text-black shadow-sm">
                        {draft?.subject}
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-black/30 mb-2 block">Message Body</label>
                      <div className="p-6 bg-white border border-black/5 rounded-xl text-sm h-72 overflow-y-auto leading-relaxed whitespace-pre-wrap text-black/70 shadow-sm scrollbar-hide">
                        {draft?.body}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-8 border-t border-black/5 bg-white flex justify-between items-center">
                <Button variant="ghost" onClick={closeModal} className="text-black/40 font-bold hover:text-black">Cancel</Button>
                <div className="flex gap-4">
                  {draft && !isSent && (
                    <>
                      <Button variant="outline" onClick={copyToClipboard} className="h-12 rounded-xl border-black/5 bg-white shadow-sm font-bold">
                        {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                        {copied ? "Copied" : "Copy Draft"}
                      </Button>
                      <Button 
                        onClick={handleSend} 
                        disabled={isSending}
                        className="bg-black hover:bg-black/80 text-white h-12 px-8 rounded-xl shadow-xl shadow-black/10 font-bold min-w-[140px]"
                      >
                        {isSending ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <Send className="w-4 h-4 mr-2" />
                        )}
                        {isSending ? "Sending..." : "Send Email"}
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
