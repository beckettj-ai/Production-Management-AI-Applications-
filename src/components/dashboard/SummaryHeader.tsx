import { Asset } from "../../types";
import { motion } from "motion/react";

export default function SummaryHeader({ assets }: { assets: Asset[] }) {
  const stats = [
    { label: "Total Assets", value: assets.length, color: "text-white" },
    { label: "Cleared", value: assets.filter(a => a.copyright_status === 'Cleared' || a.copyright_status === 'Public Domain').length, color: "text-green-400" },
    { label: "Pending", value: assets.filter(a => a.workflow_stage === 'Searching' || a.workflow_stage === 'Pending Response').length, color: "text-cyan-400" },
    { label: "High Risk", value: assets.filter(a => a.risk_level === 'High').length, color: "text-red-400" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
          className="relative group overflow-hidden p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <p className="text-xs font-mono text-white/40 uppercase tracking-tighter mb-1">{stat.label}</p>
          <p className={`text-4xl font-light ${stat.color}`}>{stat.value}</p>
        </motion.div>
      ))}
    </div>
  );
}
