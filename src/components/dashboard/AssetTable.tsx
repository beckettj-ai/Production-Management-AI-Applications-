import { Asset } from "../../types";
import { Badge } from "../ui/Badge";
import OutreachModal from "./OutreachModal";

export default function AssetTable({ assets, isEmailConnected }: { assets: Asset[], isEmailConnected?: boolean }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02]">
              <th className="p-4 text-xs font-mono text-white/40 uppercase">Asset</th>
              <th className="p-4 text-xs font-mono text-white/40 uppercase">Status</th>
              <th className="p-4 text-xs font-mono text-white/40 uppercase">Risk</th>
              <th className="p-4 text-xs font-mono text-white/40 uppercase">AI Confidence</th>
              <th className="p-4 text-xs font-mono text-white/40 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <tr key={asset.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                <td className="p-4">
                  <div className="flex items-center gap-4">
                    <img 
                      src={asset.thumbnail_url} 
                      alt={asset.asset_name} 
                      className="w-16 h-10 object-cover rounded-md border border-white/10"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <p className="text-sm font-medium text-white/90">{asset.asset_name}</p>
                      <p className="text-xs text-white/40">{asset.detected_source}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <StatusBadge status={asset.copyright_status} />
                </td>
                <td className="p-4">
                  <RiskBadge risk={asset.risk_level} />
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-1 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-cyan-500" 
                        style={{ width: `${asset.ai_confidence_score * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono text-white/60">{(asset.ai_confidence_score * 100).toFixed(0)}%</span>
                  </div>
                </td>
                <td className="p-4 text-right">
                  {asset.copyright_status === 'Copyrighted' ? (
                    <OutreachModal asset={asset} isEmailConnected={isEmailConnected} />
                  ) : (
                    <button className="text-xs text-white/40 hover:text-white transition-colors">View Details</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    'Public Domain': 'bg-green-500/10 text-green-400 border-green-500/20',
    'Cleared': 'bg-green-500/10 text-green-400 border-green-500/20',
    'Creative Commons': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    'Orphan Work': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    'Copyrighted': 'bg-red-500/10 text-red-400 border-red-500/20',
  };
  return <Badge variant="outline" className={`${colors[status] || ''} font-normal`}>{status}</Badge>;
}

function RiskBadge({ risk }: { risk: string }) {
  const colors: Record<string, string> = {
    'Low': 'text-green-400',
    'Medium': 'text-amber-400',
    'High': 'text-red-400',
  };
  return (
    <div className="flex items-center gap-1.5">
      <div className={`w-1.5 h-1.5 rounded-full bg-current ${colors[risk] || ''}`} />
      <span className={`text-xs ${colors[risk] || ''}`}>{risk}</span>
    </div>
  );
}
