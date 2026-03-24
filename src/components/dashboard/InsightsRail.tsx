import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Sparkles, ShieldCheck, Mail, Info, Check } from "lucide-react";

interface InsightsRailProps {
  isEmailConnected: boolean;
  onConnectEmail: () => void;
}

export default function InsightsRail({ isEmailConnected, onConnectEmail }: InsightsRailProps) {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-cyan-500/10 to-transparent border-cyan-500/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> AI Research
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-white/70 leading-relaxed">
            Archive IQ has identified 3 potential rights holders for "1994 NYC Street Scene". Confidence score: 82%.
          </p>
          <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/10">
            <p className="text-xs text-white/40 mb-1">Suggested Next Step</p>
            <p className="text-xs font-medium">Draft clearance request for Stephen Shore.</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-mono uppercase tracking-wider text-white/60 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" /> Legal Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-white/40">Pending Outreach</span>
              <span className="text-xs font-mono">12</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-white/40">Orphan Works</span>
              <span className="text-xs font-mono">4</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-white/40">Public Domain</span>
              <span className="text-xs font-mono">28</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className={`bg-white/5 border-dashed border-white/10 ${isEmailConnected ? 'border-green-500/20 bg-green-500/5' : ''}`}>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${isEmailConnected ? 'bg-green-500/20' : 'bg-cyan-500/20'}`}>
              {isEmailConnected ? <Check className="w-6 h-6 text-green-400" /> : <Mail className="w-6 h-6 text-cyan-400" />}
            </div>
            <h4 className="text-sm font-medium mb-1">{isEmailConnected ? 'Email Connected' : 'Automated Outreach'}</h4>
            <p className="text-xs text-white/40 mb-4">
              {isEmailConnected 
                ? 'Your professional email is connected. You can now send requests directly.' 
                : 'Connect your professional email to send clearance requests directly from Archive IQ.'}
            </p>
            {!isEmailConnected && (
              <button 
                onClick={onConnectEmail}
                className="text-xs text-cyan-400 font-medium hover:underline"
              >
                Connect Email
              </button>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex gap-3">
        <Info className="w-5 h-5 text-white/40 shrink-0" />
        <p className="text-[10px] text-white/40 leading-normal">
          Archive IQ uses AI to estimate copyright status. This is not legal advice. Always consult with a production attorney before final distribution.
        </p>
      </div>
    </div>
  );
}
