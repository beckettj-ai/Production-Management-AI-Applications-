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
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-yellow-500/10 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-400" />
            </div>
            <h3 className="text-sm font-medium text-white/60 uppercase tracking-wider">Awaiting Clearance</h3>
          </div>
          <p className="text-3xl font-light">{pendingAssets.length}</p>
          <p className="text-xs text-white/40 mt-2">Assets requiring outreach or follow-up</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="text-sm font-medium text-white/60 uppercase tracking-wider">Cleared</h3>
          </div>
          <p className="text-3xl font-light">{clearedAssets.length}</p>
          <p className="text-xs text-white/40 mt-2">Ready for production use</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-500/10 rounded-lg">
              <ShieldAlert className="w-5 h-5 text-red-400" />
            </div>
            <h3 className="text-sm font-medium text-white/60 uppercase tracking-wider">Rejected / Denied</h3>
          </div>
          <p className="text-3xl font-light">{rejectedAssets.length}</p>
          <p className="text-xs text-white/40 mt-2">Requires legal review or alternative sourcing</p>
        </motion.div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-medium">Clearance Pipeline</h2>
          <p className="text-sm text-white/40 mt-1">Manage rights and permissions for all project assets</p>
        </div>
        <div className="p-6">
          <AssetTable assets={assets} isEmailConnected={isEmailConnected} />
        </div>
      </div>
    </div>
  );
}
