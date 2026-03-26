import { Asset } from "../../types";
import { Badge } from "../ui/Badge";
import OutreachModal from "./OutreachModal";

export default function AssetTable({ assets, isEmailConnected }: { assets: Asset[], isEmailConnected?: boolean }) {
  return (
    <div className="bg-white/40 border border-black/5 rounded-2xl overflow-hidden backdrop-blur-md">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-black/5 bg-black/[0.02]">
              <th className="p-5 text-xs font-bold text-black/40 uppercase tracking-wider">Asset</th>
              <th className="p-5 text-xs font-bold text-black/40 uppercase tracking-wider">Status</th>
              <th className="p-5 text-xs font-bold text-black/40 uppercase tracking-wider">Risk</th>
              <th className="p-5 text-xs font-bold text-black/40 uppercase tracking-wider">AI Confidence</th>
              <th className="p-5 text-xs font-bold text-black/40 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <tr key={asset.id} className="border-b border-black/5 hover:bg-black/[0.01] transition-colors group">
                <td className="p-5">
                  <div className="flex items-center gap-4">
                    <img 
                      src={asset.thumbnail_url} 
                      alt={asset.asset_name} 
                      className="w-20 h-12 object-cover rounded-lg border border-black/5 shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <p className="text-sm font-bold text-black">{asset.asset_name}</p>
                      <p className="text-xs text-black/40">{asset.detected_source}</p>
                    </div>
                  </div>
                </td>
                <td className="p-5">
                  <StatusBadge status={asset.copyright_status} />
                </td>
                <td className="p-5">
                  <RiskBadge risk={asset.risk_level} />
                </td>
                <td className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-1.5 bg-black/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-cyan-500" 
                        style={{ width: `${asset.ai_confidence_score * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-black/60">{(asset.ai_confidence_score * 100).toFixed(0)}%</span>
                  </div>
                </td>
                <td className="p-5 text-right">
                  {asset.copyright_status === 'Copyrighted' ? (
                    <OutreachModal asset={asset} isEmailConnected={isEmailConnected} />
                  ) : (
                    <button className="text-xs font-bold text-black/40 hover:text-black transition-colors">View Details</button>
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
    'Public Domain': 'bg-green-100 text-green-700 border-green-200',
    'Cleared': 'bg-green-100 text-green-700 border-green-200',
    'Creative Commons': 'bg-cyan-100 text-cyan-700 border-cyan-200',
    'Orphan Work': 'bg-amber-100 text-amber-700 border-amber-200',
    'Copyrighted': 'bg-red-100 text-red-700 border-red-200',
  };
  return <Badge variant="outline" className={`${colors[status] || ''} pill-badge border font-bold`}>{status}</Badge>;
}

function RiskBadge({ risk }: { risk: string }) {
  const colors: Record<string, string> = {
    'Low': 'text-green-600',
    'Medium': 'text-amber-600',
    'High': 'text-red-600',
  };
  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full bg-current ${colors[risk] || ''}`} />
      <span className={`text-xs font-bold ${colors[risk] || ''}`}>{risk}</span>
    </div>
  );
}
