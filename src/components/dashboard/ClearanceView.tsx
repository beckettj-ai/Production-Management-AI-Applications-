import React from "react";
import { Asset } from "../../types";
import AssetTable from "./AssetTable";
import { ShieldAlert, Clock, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

export default function ClearanceView({ assets, isEmailConnected }: { assets: Asset[], isEmailConnected?: boolean }) {
  const pendingAssets = assets.filter(a => a.workflow_stage === "Pending Response" || a.workflow_stage === "Searching");
  const clearedAssets = assets.filter(a => a.workflow_stage === "Cleared");
  const rejectedAssets = assets.filter(a => a.workflow_stage === "Rejected");

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 rounded-2xl"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-yellow-400/20 rounded-xl">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="text-xs font-bold text-black/40 uppercase tracking-widest">Awaiting Clearance</h3>
          </div>
          <p className="text-5xl font-bold text-black">{pendingAssets.length}</p>
          <p className="text-xs text-black/40 mt-3 font-medium">Assets requiring outreach or follow-up</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-8 rounded-2xl"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-green-500/10 rounded-xl">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xs font-bold text-black/40 uppercase tracking-widest">Cleared</h3>
          </div>
          <p className="text-5xl font-bold text-black">{clearedAssets.length}</p>
          <p className="text-xs text-black/40 mt-3 font-medium">Ready for production use</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-8 rounded-2xl border-l-4 border-red-500"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-red-500/10 rounded-xl">
              <ShieldAlert className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-xs font-bold text-black/40 uppercase tracking-widest">Rejected / Denied</h3>
          </div>
          <p className="text-5xl font-bold text-black">{rejectedAssets.length}</p>
          <p className="text-xs text-black/40 mt-3 font-medium">Requires legal review or alternative sourcing</p>
        </motion.div>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="p-10 border-b border-black/5">
          <h2 className="text-3xl font-bold">Clearance Pipeline</h2>
          <p className="text-sm text-black/40 mt-1">Manage rights and permissions for all project assets</p>
        </div>
        <div className="p-10">
          <AssetTable assets={assets} isEmailConnected={isEmailConnected} />
        </div>
      </div>
    </div>
  );
}
