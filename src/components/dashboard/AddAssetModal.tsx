import React, { useState } from "react";
import { X, Plus, Loader2 } from "lucide-react";
import { Button } from "../ui/Button";
import { motion, AnimatePresence } from "motion/react";
import { Asset, AssetType, CopyrightStatus, RiskLevel, WorkflowStage } from "../../types";
import { toast } from "sonner";

interface AddAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (asset: Asset) => void;
}

export default function AddAssetModal({ isOpen, onClose, onAdd }: AddAssetModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    asset_name: "",
    asset_type: "Video" as AssetType,
    detected_source: "",
    copyright_status: "Copyrighted" as CopyrightStatus,
    risk_level: "Medium" as RiskLevel,
    workflow_stage: "Backlog" as WorkflowStage,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newAsset: Asset = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
        thumbnail_url: `https://picsum.photos/seed/${formData.asset_name}/400/225`,
        ai_confidence_score: 0.85 + Math.random() * 0.1,
        last_updated: new Date().toISOString(),
      };

      onAdd(newAsset);
      toast.success("Asset added to inventory");
      onClose();
      // Reset form
      setFormData({
        asset_name: "",
        asset_type: "Video",
        detected_source: "",
        copyright_status: "Copyrighted",
        risk_level: "Medium",
        workflow_stage: "Backlog",
      });
    } catch (error) {
      toast.error("Failed to add asset");
    } finally {
      setIsSubmitting(false);
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
            className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h3 className="text-xl font-medium">Add New Asset</h3>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-widest text-white/40">Asset Name</label>
                <input 
                  required
                  type="text"
                  value={formData.asset_name}
                  onChange={e => setFormData(prev => ({ ...prev, asset_name: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-cyan-500/50 transition-colors"
                  placeholder="e.g. Apollo 11 Launch Footage"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-white/40">Type</label>
                  <select 
                    value={formData.asset_type}
                    onChange={e => setFormData(prev => ({ ...prev, asset_type: e.target.value as AssetType }))}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-cyan-500/50 transition-colors"
                  >
                    <option value="Video">Video</option>
                    <option value="Image">Image</option>
                    <option value="Audio">Audio</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-white/40">Risk Level</label>
                  <select 
                    value={formData.risk_level}
                    onChange={e => setFormData(prev => ({ ...prev, risk_level: e.target.value as RiskLevel }))}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-cyan-500/50 transition-colors"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-widest text-white/40">Source / Rights Holder</label>
                <input 
                  required
                  type="text"
                  value={formData.detected_source}
                  onChange={e => setFormData(prev => ({ ...prev, detected_source: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-cyan-500/50 transition-colors"
                  placeholder="e.g. NASA Archives"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-white/40">Copyright Status</label>
                  <select 
                    value={formData.copyright_status}
                    onChange={e => setFormData(prev => ({ ...prev, copyright_status: e.target.value as CopyrightStatus }))}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-cyan-500/50 transition-colors"
                  >
                    <option value="Public Domain">Public Domain</option>
                    <option value="Creative Commons">Creative Commons</option>
                    <option value="Copyrighted">Copyrighted</option>
                    <option value="Orphan Work">Orphan Work</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-white/40">Workflow Stage</label>
                  <select 
                    value={formData.workflow_stage}
                    onChange={e => setFormData(prev => ({ ...prev, workflow_stage: e.target.value as WorkflowStage }))}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-cyan-500/50 transition-colors"
                  >
                    <option value="Backlog">Backlog</option>
                    <option value="Searching">Searching</option>
                    <option value="Pending Response">Pending Response</option>
                    <option value="Cleared">Cleared</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>

              <div className="pt-6 flex gap-3">
                <Button type="button" variant="ghost" className="flex-1" onClick={onClose}>Cancel</Button>
                <Button type="submit" disabled={isSubmitting} className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white">
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
                  Add Asset
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
