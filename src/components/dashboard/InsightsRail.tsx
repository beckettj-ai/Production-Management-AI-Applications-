import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Sparkles, ShieldCheck, Mail, Info, Check } from "lucide-react";

interface InsightsRailProps {
  isEmailConnected: boolean;
  onConnectEmail: () => void;
}

export default function InsightsRail({ isEmailConnected, onConnectEmail }: InsightsRailProps) {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-cyan-500/10 to-transparent border-cyan-500/20 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-xs font-bold uppercase tracking-wider text-cyan-600 flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> AI Research
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-black/70 leading-relaxed">
            Archive IQ has identified 3 potential rights holders for "1994 NYC Street Scene". Confidence score: 82%.
          </p>
          <div className="mt-4 p-4 bg-white/60 rounded-xl border border-black/5">
            <p className="text-[10px] text-black/40 font-bold uppercase tracking-wider mb-1">Suggested Next Step</p>
            <p className="text-xs font-bold">Draft clearance request for Stephen Shore.</p>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm border-black/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-xs font-bold uppercase tracking-wider text-black/40 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" /> Legal Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-black/40">Pending Outreach</span>
              <span className="text-xs font-bold">12</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-black/40">Orphan Works</span>
              <span className="text-xs font-bold">4</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-black/40">Public Domain</span>
              <span className="text-xs font-bold">28</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className={`border-dashed border-black/10 shadow-sm ${isEmailConnected ? 'border-green-500/20 bg-green-500/5' : 'bg-white/40'}`}>
        <CardContent className="pt-8">
          <div className="flex flex-col items-center text-center">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${isEmailConnected ? 'bg-green-500/20' : 'bg-cyan-500/10'}`}>
              {isEmailConnected ? <Check className="w-7 h-7 text-green-600" /> : <Mail className="w-7 h-7 text-cyan-500" />}
            </div>
            <h4 className="text-sm font-bold mb-2">{isEmailConnected ? 'Email Connected' : 'Automated Outreach'}</h4>
            <p className="text-xs text-black/40 mb-6 leading-relaxed">
              {isEmailConnected 
                ? 'Your professional email is connected. You can now send requests directly.' 
                : 'Connect your professional email to send clearance requests directly from Archive IQ.'}
            </p>
            {!isEmailConnected && (
              <button 
                onClick={onConnectEmail}
                className="w-full bg-black text-white py-3 rounded-xl text-xs font-bold hover:bg-black/80 transition-colors"
              >
                Connect Email
              </button>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="p-5 rounded-2xl bg-white/40 border border-black/5 flex gap-4">
        <Info className="w-5 h-5 text-black/20 shrink-0" />
        <p className="text-[10px] text-black/40 leading-normal font-medium">
          Archive IQ uses AI to estimate copyright status. This is not legal advice. Always consult with a production attorney before final distribution.
        </p>
      </div>
    </div>
  );
}
