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
    source_url: "",
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
        source_url: "",
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
            className="relative w-full max-w-2xl bg-white border border-black/5 rounded-[32px] shadow-2xl overflow-hidden"
          >
            <div className="p-8 border-b border-black/5 flex justify-between items-center bg-white">
              <div>
                <h3 className="text-2xl font-bold">Add New Asset</h3>
                <p className="text-sm text-black/40">Enter archival asset details for rights analysis</p>
              </div>
              <button onClick={onClose} className="p-3 hover:bg-black/5 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 bg-[#fcfdfe] space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-black/30 mb-2 block">Asset Name</label>
                <input 
                  required
                  type="text"
                  value={formData.asset_name}
                  onChange={e => setFormData(prev => ({ ...prev, asset_name: e.target.value }))}
                  className="w-full bg-white border border-black/5 rounded-xl p-4 text-sm focus:outline-none focus:border-cyan-500/50 transition-colors shadow-sm"
                  placeholder="e.g. Apollo 11 Launch Footage"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-black/30 mb-2 block">Type</label>
                  <select 
                    value={formData.asset_type}
                    onChange={e => setFormData(prev => ({ ...prev, asset_type: e.target.value as AssetType }))}
                    className="w-full bg-white border border-black/5 rounded-xl p-4 text-sm focus:outline-none focus:border-cyan-500/50 transition-colors shadow-sm appearance-none"
                  >
                    <option value="Video">Video</option>
                    <option value="Image">Image</option>
                    <option value="Audio">Audio</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-black/30 mb-2 block">Risk Level</label>
                  <select 
                    value={formData.risk_level}
                    onChange={e => setFormData(prev => ({ ...prev, risk_level: e.target.value as RiskLevel }))}
                    className="w-full bg-white border border-black/5 rounded-xl p-4 text-sm focus:outline-none focus:border-cyan-500/50 transition-colors shadow-sm appearance-none"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-black/30 mb-2 block">Source / Rights Holder</label>
                  <input 
                    required
                    type="text"
                    value={formData.detected_source}
                    onChange={e => setFormData(prev => ({ ...prev, detected_source: e.target.value }))}
                    className="w-full bg-white border border-black/5 rounded-xl p-4 text-sm focus:outline-none focus:border-cyan-500/50 transition-colors shadow-sm"
                    placeholder="e.g. NASA Archives"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-black/30 mb-2 block">Source URL / Link</label>
                  <input 
                    type="url"
                    value={formData.source_url}
                    onChange={e => setFormData(prev => ({ ...prev, source_url: e.target.value }))}
                    className="w-full bg-white border border-black/5 rounded-xl p-4 text-sm focus:outline-none focus:border-cyan-500/50 transition-colors shadow-sm"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-black/30 block">Copyright Status</label>
                    <div className="group relative">
                      <div className="w-4 h-4 rounded-full bg-black/5 flex items-center justify-center text-[10px] font-bold cursor-help">?</div>
                      <div className="absolute bottom-full mb-2 right-0 w-48 p-3 bg-black text-white text-[10px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 leading-relaxed">
                        <span className="font-bold block mb-1">Orphan Work:</span>
                        A copyrighted work for which the rightsholder is unknown or cannot be contacted.
                      </div>
                    </div>
                  </div>
                  <select 
                    value={formData.copyright_status}
                    onChange={e => setFormData(prev => ({ ...prev, copyright_status: e.target.value as CopyrightStatus }))}
                    className="w-full bg-white border border-black/5 rounded-xl p-4 text-sm focus:outline-none focus:border-cyan-500/50 transition-colors shadow-sm appearance-none"
                  >
                    <option value="Public Domain">Public Domain</option>
                    <option value="Creative Commons">Creative Commons</option>
                    <option value="Copyrighted">Copyrighted</option>
                    <option value="Orphan Work">Orphan Work</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-black/30 mb-2 block">Workflow Stage</label>
                  <select 
                    value={formData.workflow_stage}
                    onChange={e => setFormData(prev => ({ ...prev, workflow_stage: e.target.value as WorkflowStage }))}
                    className="w-full bg-white border border-black/5 rounded-xl p-4 text-sm focus:outline-none focus:border-cyan-500/50 transition-colors shadow-sm appearance-none"
                  >
                    <option value="Backlog">Backlog</option>
                    <option value="Searching">Searching</option>
                    <option value="Pending Response">Pending Response</option>
                    <option value="Cleared">Cleared</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>

              <div className="pt-10 flex gap-4">
                <Button type="button" variant="ghost" className="flex-1 text-black/40 font-bold hover:text-black" onClick={onClose}>Cancel</Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="flex-1 bg-black hover:bg-black/80 text-white h-12 px-10 rounded-xl shadow-xl shadow-black/10 font-bold"
                >
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
