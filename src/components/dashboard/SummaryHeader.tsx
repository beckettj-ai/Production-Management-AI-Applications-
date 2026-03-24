import { Asset } from "../../types";
import { motion } from "motion/react";

export default function SummaryHeader({ assets }: { assets: Asset[] }) {
  const clearedCount = assets.filter(a => a.copyright_status === 'Cleared' || a.copyright_status === 'Public Domain').length;
  const totalCount = assets.length;
  const clearanceRate = totalCount > 0 ? Math.round((clearedCount / totalCount) * 100) : 0;

  const stats = [
    { label: "Sync Calls", value: "26h", color: "text-black" },
    { label: "Workshops", value: "11h", color: "text-black" },
    { label: "Reviews", value: "6h", color: "text-black" },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6 mb-12">
      {/* Main Productivity Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex-1 glass-card p-10 rounded-2xl relative overflow-hidden min-h-[400px] flex flex-col justify-between"
      >
        <div>
          <h2 className="text-[120px] font-bold leading-none tracking-tighter text-black">
            {clearanceRate}%
          </h2>
          <p className="text-lg text-black/40 font-medium mt-2">Project clearance rate</p>
        </div>

        <div className="bg-white/40 backdrop-blur-md border border-white/60 p-6 rounded-2xl mt-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-bold text-black/60 uppercase tracking-wider">Project Activity</h3>
            <div className="pill-badge bg-white/80 text-black/60 border border-black/5">Statistic</div>
          </div>
          <div className="grid grid-cols-3 gap-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold text-black">{stat.value}</p>
                <p className="text-xs font-medium text-black/40 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative Element */}
        <div className="absolute top-10 right-10 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg shadow-yellow-200">
          <div className="w-6 h-6 bg-black rounded-sm rotate-45" />
        </div>
      </motion.div>

      {/* Secondary Info Cards */}
      <div className="w-full lg:w-[400px] space-y-6">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-8 rounded-2xl"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              Weekly Strategy Sync
            </h3>
            <div className="pill-badge bg-green-500/10 text-green-600">Meeting</div>
          </div>
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <p className="text-black/40 mb-1">When:</p>
              <p className="font-bold">Today, 10:00 AM</p>
            </div>
            <div>
              <p className="text-black/40 mb-1">Team:</p>
              <p className="font-bold">Legal & Production</p>
            </div>
          </div>
          <button className="w-full mt-8 bg-black/5 hover:bg-black/10 text-black font-bold py-3 rounded-xl transition-colors">
            Join a meeting
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-8 rounded-2xl border-l-4 border-red-500"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold">Rights Review</h3>
            <div className="flex gap-2">
              <div className="pill-badge bg-red-500 text-white">High Priority</div>
              <div className="pill-badge bg-yellow-400 text-black">Task</div>
            </div>
          </div>
          <p className="text-sm text-black/60 leading-relaxed">
            Check the clearance status of the main archival sequence for the opening scene.
          </p>
          <div className="mt-6 flex justify-between items-end">
            <div>
              <p className="text-xs text-black/40 mb-1">Deadline:</p>
              <p className="font-bold">Mar 24</p>
            </div>
            <button className="bg-black text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
              Ask AI to start
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
