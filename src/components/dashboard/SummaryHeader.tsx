import { Asset } from "../../types";
import { motion } from "motion/react";
import { Sparkles, ShieldCheck, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";

export default function SummaryHeader({ assets, onReviewOrphans, onDraftRequest }: { assets: Asset[], onReviewOrphans?: () => void, onDraftRequest?: () => void }) {
  const clearedCount = assets.filter(a => a.copyright_status === 'Cleared' || a.copyright_status === 'Public Domain').length;
  const totalCount = assets.length;
  const clearanceRate = totalCount > 0 ? Math.round((clearedCount / totalCount) * 100) : 0;

  return (
    <div className="flex flex-col lg:flex-row gap-6 mb-6">
      {/* Left Column: Clearance & Legal Status */}
      <div className="flex-1 space-y-6">
        {/* Main Productivity Card - Collapsed Size */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-8 rounded-2xl relative overflow-hidden min-h-[220px] flex flex-col justify-center"
        >
          <div>
            <h2 className="text-[80px] font-bold leading-none tracking-tighter text-black">
              {clearanceRate}%
            </h2>
            <p className="text-sm text-black/40 font-bold uppercase tracking-wider mt-1">Project clearance rate</p>
          </div>

          {/* Decorative Element */}
          <div className="absolute top-6 right-6 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg shadow-yellow-200">
            <div className="w-5 h-5 bg-black rounded-sm rotate-45" />
          </div>
        </motion.div>

        {/* Legal Status - Moved here */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <Card className="shadow-sm border-black/5 bg-white/40 backdrop-blur-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-black/40 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" /> Legal Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-8">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-black/40 uppercase tracking-wider">Pending</p>
                  <p className="text-2xl font-bold text-black">12</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-black/40 uppercase tracking-wider">Orphans</p>
                  <p className="text-2xl font-bold text-black">4</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-black/40 uppercase tracking-wider">Public Domain</p>
                  <p className="text-2xl font-bold text-black">28</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="p-4 rounded-xl bg-white/40 border border-black/5 flex gap-3">
            <Info className="w-4 h-4 text-black/20 shrink-0" />
            <p className="text-[10px] text-black/40 leading-normal font-medium">
              Archive IQ uses AI to estimate copyright status. This is not legal advice. Always consult with a production attorney before final distribution.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Secondary Info Cards (Right Column) */}
      <div className="w-full lg:w-[400px] space-y-6">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-8 rounded-2xl bg-cyan-500/5 border border-cyan-500/10"
        >
          <h3 className="font-bold mb-2">Insights</h3>
          <p className="text-xs text-black/60 leading-relaxed">
            3 assets identified as potential "Orphan Works". Legal review recommended for risk mitigation.
          </p>
          <button 
            onClick={onReviewOrphans}
            className="mt-4 text-xs font-bold text-cyan-600 hover:text-cyan-700"
          >
            Review Orphan Works →
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-gradient-to-br from-cyan-500/10 to-transparent border-cyan-500/20 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-cyan-600 flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Research
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-black/70 leading-relaxed">
                Archive IQ has identified 3 potential rights holders for "1994 NYC Street Scene". Confidence score: 82%.
              </p>
              <button 
                onClick={onDraftRequest}
                className="mt-4 p-4 bg-white/60 rounded-xl border border-black/5 text-left w-full hover:bg-white/80 transition-colors group"
              >
                <p className="text-[10px] text-black/40 font-bold uppercase tracking-wider mb-1 group-hover:text-cyan-600 transition-colors">Suggested Next Step</p>
                <p className="text-xs font-bold group-hover:text-cyan-600 transition-colors">Draft clearance request for Stephen Shore.</p>
              </button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
);
}
