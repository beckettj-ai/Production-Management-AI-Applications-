/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MOCK_ASSETS, MOCK_PROJECT } from "./data/mock-data";
import SummaryHeader from "./components/dashboard/SummaryHeader";
import AssetTable from "./components/dashboard/AssetTable";
import InsightsRail from "./components/dashboard/InsightsRail";
import LandingPage from "./components/landing/LandingPage";
import OnboardingModal from "./components/dashboard/OnboardingModal";
import { Button } from "./components/ui/Button";
import { Plus, Search, Filter, Download, Archive, Settings, LayoutDashboard, List, ShieldCheck, Loader2 } from "lucide-react";
import { Toaster, toast } from "sonner";
import SettingsModal from "./components/dashboard/SettingsModal";
import ClearanceView from "./components/dashboard/ClearanceView";
import AddAssetModal from "./components/dashboard/AddAssetModal";
import { Asset } from "./types";

type View = "Dashboard" | "Inventory" | "Clearance";

export default function App() {
  const [assets, setAssets] = useState<Asset[]>(MOCK_ASSETS);
  const [projectTitle, setProjectTitle] = useState(MOCK_PROJECT.title);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAddAssetOpen, setIsAddAssetOpen] = useState(false);
  const [isProjectSwitcherOpen, setIsProjectSwitcherOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [currentView, setCurrentView] = useState<View>("Dashboard");
  const [isEmailConnected, setIsEmailConnected] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  const handleConnectEmail = async () => {
    // Simulate OAuth flow
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    
    const popup = window.open(
      "about:blank",
      "oauth_popup",
      `width=${width},height=${height},left=${left},top=${top}`
    );

    if (popup) {
      popup.document.write(`
        <html>
          <head>
            <title>Connect Google Workspace</title>
            <script src="https://cdn.tailwindcss.com"></script>
          </head>
          <body class="bg-[#050505] text-white font-sans flex items-center justify-center h-screen p-8 text-center">
            <div class="space-y-6">
              <div class="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto">
                <svg class="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              </div>
              <h1 class="text-xl font-medium">Connect Archive IQ to Google</h1>
              <p class="text-sm text-white/40">Archive IQ will be able to send emails and store project files in your Google Drive.</p>
              <button id="connect" class="w-full bg-white text-black py-3 rounded-lg font-medium hover:bg-white/90 transition-colors">
                Allow Access
              </button>
            </div>
            <script>
              document.getElementById('connect').onclick = () => {
                window.opener.postMessage({ type: 'EMAIL_CONNECTED' }, '*');
                window.close();
              };
            </script>
          </body>
        </html>
      `);
    }
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'EMAIL_CONNECTED') {
        setIsEmailConnected(true);
        toast.success("Email connected successfully", {
          description: "You can now send clearance requests directly."
        });
      }
    };

    const handleOpenAddAsset = () => setIsAddAssetOpen(true);

    window.addEventListener('message', handleMessage);
    window.addEventListener('open-add-asset', handleOpenAddAsset);
    
    return () => {
      window.removeEventListener('message', handleMessage);
      window.removeEventListener('open-add-asset', handleOpenAddAsset);
    };
  }, []);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      // Simulate export processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const headers = ["ID", "Name", "Type", "Source", "Status", "Risk", "Last Updated"];
      const rows = assets.map(a => [
        a.id,
        a.asset_name,
        a.asset_type,
        a.detected_source,
        a.workflow_stage,
        a.risk_level,
        a.last_updated
      ]);

      const csvContent = [
        headers.join(","),
        ...rows.map(r => r.map(cell => `"${cell}"`).join(","))
      ].join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `archive-iq-report-${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success("Report exported successfully", {
        description: `${assets.length} assets included in CSV`
      });
    } catch (error) {
      toast.error("Failed to export report");
    } finally {
      setIsExporting(false);
    }
  };

  const handleAddAsset = (newAsset: Asset) => {
    setAssets(prev => [newAsset, ...prev]);
  };

  const handleUpdateAsset = (updatedAsset: Asset) => {
    setAssets(prev => prev.map(a => a.id === updatedAsset.id ? updatedAsset : a));
  };

  const renderContent = () => {
    switch (currentView) {
      case "Dashboard":
        const filteredDashboardAssets = assets.filter(a => 
          a.asset_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.copyright_status.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.workflow_stage.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.rights_holder?.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        return (
          <>
            {/* Summary Hero */}
            <SummaryHeader 
              assets={assets} 
              onReviewOrphans={() => setSearchQuery("Orphan Work")} 
              onDraftRequest={() => setSearchQuery("Stephen Shore")}
            />

            {/* Main Content Grid */}
            <div className="grid grid-cols-12 gap-8 mt-6">
              {/* Full Width: Asset List */}
              <div className="col-span-12">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <h2 className="text-xl font-bold uppercase tracking-wider text-cyan-600">Archival Inventory</h2>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:flex-none">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                      <input 
                        type="text" 
                        placeholder="Search assets..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-cyan-500/50 transition-colors w-full sm:w-64"
                      />
                      {searchQuery && (
                        <button 
                          onClick={() => setSearchQuery("")}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                        >
                          <Plus className="w-4 h-4 rotate-45" />
                        </button>
                      )}
                    </div>
                    <Button variant="outline" size="icon" className="rounded-full border-white/10">
                      <Filter className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="min-h-[800px]">
                  <AssetTable assets={filteredDashboardAssets} onUpdateAsset={handleUpdateAsset} />
                </div>
              </div>
            </div>
          </>
        );
      case "Inventory":
        const filteredInventoryAssets = assets.filter(a => 
          a.asset_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.copyright_status.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.workflow_stage.toLowerCase().includes(searchQuery.toLowerCase())
        );
        return (
          <div className="glass-card rounded-2xl p-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
              <div>
                <h2 className="text-3xl font-bold">Full Inventory</h2>
                <p className="text-sm text-black/40 mt-1">Browse and manage all archival assets in the project</p>
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-none">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
                  <input 
                    type="text" 
                    placeholder="Search assets..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-black/5 border border-black/5 rounded-full py-3 pl-12 pr-10 text-sm focus:outline-none focus:border-cyan-500/50 transition-colors w-full sm:w-72"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery("")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-black/20 hover:text-black"
                    >
                      <Plus className="w-4 h-4 rotate-45" />
                    </button>
                  )}
                </div>
                <Button variant="outline" size="icon" className="rounded-full border-black/5 bg-white shadow-sm">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <AssetTable assets={filteredInventoryAssets} isEmailConnected={isEmailConnected} onUpdateAsset={handleUpdateAsset} />
          </div>
        );
      case "Clearance":
        return <ClearanceView assets={assets} isEmailConnected={isEmailConnected} onUpdateAsset={handleUpdateAsset} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen text-[#1a1a1a] font-sans selection:bg-cyan-500/30">
      <Toaster position="top-right" theme="light" richColors />
      
      {!isLoggedIn ? (
        <LandingPage onLogin={() => {
          setIsLoggedIn(true);
          setIsOnboardingOpen(true);
        }} />
      ) : (
        <>
          <OnboardingModal 
            isOpen={isOnboardingOpen} 
            onClose={() => setIsOnboardingOpen(false)} 
            onConnect={() => {
              handleConnectEmail();
              setIsOnboardingOpen(false);
            }}
          />
          <SettingsModal 
            isOpen={isSettingsOpen} 
            onClose={() => setIsSettingsOpen(false)} 
            isEmailConnected={isEmailConnected}
            onConnectEmail={handleConnectEmail}
          />
          <AddAssetModal 
            isOpen={isAddAssetOpen} 
            onClose={() => setIsAddAssetOpen(false)} 
            onAdd={handleAddAsset} 
          />
          
          {/* Atmospheric Background */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-200/20 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-200/20 blur-[120px] rounded-full" />
          </div>

          {/* Navigation Bar */}
          <nav className="relative z-20 border-b border-black/5 bg-white/40 backdrop-blur-xl">
            <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
              <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView("Dashboard")}>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-200">
                  <Archive className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold tracking-tight text-black">
                  Archive IQ
                </span>
              </div>
              
              <div className="hidden md:flex items-center gap-10 text-sm font-semibold text-black/40">
                <button 
                  onClick={() => setCurrentView("Dashboard")}
                  className={`${currentView === "Dashboard" ? "text-black" : "hover:text-black"} transition-colors flex items-center gap-2`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </button>
                <button 
                  onClick={() => setCurrentView("Inventory")}
                  className={`${currentView === "Inventory" ? "text-black" : "hover:text-black"} transition-colors flex items-center gap-2`}
                >
                  <List className="w-4 h-4" />
                  Inventory
                </button>
                <button 
                  onClick={() => setCurrentView("Clearance")}
                  className={`${currentView === "Clearance" ? "text-black" : "hover:text-black"} transition-colors flex items-center gap-2`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  Clearance
                </button>
                <button 
                  onClick={() => setIsSettingsOpen(true)}
                  className="hover:text-black transition-colors flex items-center gap-2"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
              </div>

              <div className="flex items-center gap-4">
                <div 
                  className="w-10 h-10 rounded-full bg-white border border-black/5 shadow-sm flex items-center justify-center text-xs font-bold text-black/60 cursor-help group relative"
                  title="Jane Doe (Lead Producer)"
                >
                  JD
                  <div className="absolute top-full mt-2 right-0 bg-black text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                    Jane Doe (Lead Producer)
                  </div>
                </div>
              </div>
            </div>
          </nav>

          <main className="relative z-10 max-w-[1600px] mx-auto px-6 py-12">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                key={currentView}
              >
                <p className="text-cyan-600 text-xs font-bold font-mono tracking-widest uppercase mb-3">
                  {currentView === "Dashboard" ? "Project Workspace" : currentView}
                </p>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-black">
                  {currentView === "Dashboard" ? projectTitle : `Manage ${currentView}`}
                </h1>
              </motion.div>
              
              <div className="flex gap-4 items-end">
                {currentView === "Dashboard" && (
                  <div className="relative">
                    <Button 
                      variant="outline" 
                      className={`bg-white border-black/5 hover:bg-black/5 text-black h-12 px-6 rounded-xl shadow-sm font-bold transition-all ${isProjectSwitcherOpen ? 'ring-2 ring-cyan-500/20 border-cyan-500/50' : ''}`}
                      onClick={() => setIsProjectSwitcherOpen(!isProjectSwitcherOpen)}
                    >
                      <Archive className="w-4 h-4 mr-2 text-cyan-600" />
                      Switch Project
                    </Button>

                    <AnimatePresence>
                      {isProjectSwitcherOpen && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={() => setIsProjectSwitcherOpen(false)} />
                          <motion.div 
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute top-full right-0 mt-4 w-72 bg-white border border-black/5 rounded-2xl shadow-2xl z-50 p-2 overflow-hidden"
                          >
                            <div className="p-3 text-xs font-bold text-black/30 uppercase tracking-widest border-b border-black/5 mb-2">Your Workspaces</div>
                            <div className="space-y-1">
                              <button 
                                onClick={() => {
                                  setProjectTitle(MOCK_PROJECT.title);
                                  setIsProjectSwitcherOpen(false);
                                }}
                                className={`w-full text-left p-3 rounded-xl font-bold text-sm flex items-center justify-between transition-colors ${projectTitle === MOCK_PROJECT.title ? 'bg-black/5 text-black' : 'hover:bg-black/5 text-black/40 hover:text-black'}`}
                              >
                                {MOCK_PROJECT.title}
                                {projectTitle === MOCK_PROJECT.title && <div className="w-2 h-2 bg-cyan-500 rounded-full" />}
                              </button>
                              <button 
                                onClick={() => {
                                  setProjectTitle("The Great Unknown (Doc)");
                                  setIsProjectSwitcherOpen(false);
                                  toast.success("Switched to 'The Great Unknown'");
                                }}
                                className={`w-full text-left p-3 rounded-xl font-bold text-sm flex items-center justify-between transition-colors ${projectTitle === "The Great Unknown (Doc)" ? 'bg-black/5 text-black' : 'hover:bg-black/5 text-black/40 hover:text-black'}`}
                              >
                                The Great Unknown (Doc)
                                {projectTitle === "The Great Unknown (Doc)" && <div className="w-2 h-2 bg-cyan-500 rounded-full" />}
                              </button>
                              <button 
                                onClick={() => {
                                  setProjectTitle("Urban Legends S2");
                                  setIsProjectSwitcherOpen(false);
                                  toast.success("Switched to 'Urban Legends S2'");
                                }}
                                className={`w-full text-left p-3 rounded-xl font-bold text-sm flex items-center justify-between transition-colors ${projectTitle === "Urban Legends S2" ? 'bg-black/5 text-black' : 'hover:bg-black/5 text-black/40 hover:text-black'}`}
                              >
                                Urban Legends S2
                                {projectTitle === "Urban Legends S2" && <div className="w-2 h-2 bg-cyan-500 rounded-full" />}
                              </button>
                            </div>
                            <div className="p-3 border-t border-black/5 mt-2">
                              <button 
                                onClick={() => {
                                  const name = window.prompt("Enter new workspace name:");
                                  if (name) {
                                    setProjectTitle(name);
                                    setAssets([]); // Clear assets for new project
                                    toast.success(`Created new workspace: ${name}`);
                                  }
                                  setIsProjectSwitcherOpen(false);
                                }}
                                className="text-cyan-600 text-xs font-bold flex items-center gap-2 hover:text-cyan-700 transition-colors w-full"
                              >
                                <Plus className="w-3 h-3" /> Create New Workspace
                              </button>
                            </div>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>
                )}
                <Button 
                  variant="outline" 
                  className="bg-white border-black/5 hover:bg-black/5 text-black h-12 px-6 rounded-xl shadow-sm"
                  onClick={handleExport}
                  disabled={isExporting}
                >
                  {isExporting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
                  {isExporting ? "Exporting..." : "Export Report"}
                </Button>
                <Button 
                  className="bg-black hover:bg-black/80 text-white h-12 px-6 rounded-xl shadow-xl shadow-black/10"
                  onClick={() => setIsAddAssetOpen(true)}
                >
                  <Plus className="w-4 h-4 mr-2" /> Add Asset
                </Button>
              </div>
            </div>

            <motion.div
              key={currentView}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              {renderContent()}
            </motion.div>
          </main>
        </>
      )}
    </div>
  );
}
