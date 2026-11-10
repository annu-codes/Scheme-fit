import { useState } from 'react';
import {
  BarChart3,
  SearchCheck,
  BookOpenCheck,
  Link2,
  Sparkles,
  Bookmark,
  FileCheck2,
  LayoutDashboard,
  ListChecks,
  Menu,
  RotateCcw,
  Route,
  UserRound,
  X,
  ShieldCheck,
  ChevronRight,
  Building2,
  SlidersHorizontal,
  ExternalLink,
} from 'lucide-react';
import { Badge } from './ui';

export const NAV_SECTIONS = [
  {
    title: 'Overview',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'profile', label: 'Business Profile', icon: UserRound },
      { id: 'matches', label: 'Scheme Matches', icon: ListChecks },
    ],
  },
  {
    title: 'Evaluation & Tools',
    items: [
      { id: 'eligibility', label: 'Eligibility Tracker', icon: SearchCheck },
      { id: 'compatibility', label: 'Compatibility Rules', icon: Link2 },
      { id: 'compare', label: 'Compare Schemes', icon: BarChart3 },
      { id: 'simplifier', label: 'Term Simplifier', icon: Sparkles },
    ],
  },
  {
    title: 'Application Readiness',
    items: [
      { id: 'documents', label: 'Document Checklist', icon: FileCheck2 },
      { id: 'guide', label: 'Application Roadmap', icon: Route },
      { id: 'saved', label: 'Saved Schemes', icon: Bookmark },
    ],
  },
];

export const NAV = NAV_SECTIONS.flatMap((s) => s.items);

const ACTIVE_MAP = {
  details: 'matches',
  noteligible: 'matches',
  alternatives: 'matches',
};

export function Logo({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="group flex items-center gap-3 text-left transition-opacity hover:opacity-90 focus:outline-none"
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white shadow-xs ring-1 ring-white/10 group-hover:bg-slate-800 transition-colors">
        <BookOpenCheck size={19} className="text-brand-400" />
      </div>
      <div>
        <div className="flex items-center gap-1.5">
          <span className="text-base font-bold tracking-tight text-slate-900">
            Scheme<span className="text-brand-600">Fit</span>
          </span>
          <span className="rounded bg-slate-100 px-1.5 py-0.2 text-[9px] font-semibold text-slate-600 uppercase tracking-wider">
            GovTech
          </span>
        </div>
        <p className="text-[11px] font-medium text-slate-400 leading-tight">
          National Scheme Matcher
        </p>
      </div>
    </button>
  );
}

export function GovTopBanner() {
  return (
    <div className="border-b border-slate-200/80 bg-slate-900 text-white text-[11px] py-1.5 px-4 font-medium tracking-tight">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-200">
            Hackathon Showcase • Citizen & MSME Government Scheme Discovery Engine
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-slate-400">
          <span>Rule-Based Matching</span>
          <span>•</span>
          <span>Zero Server Uploads</span>
        </div>
      </div>
    </div>
  );
}

export function PublicHeader({ go, onReset, showReset }) {
  return (
    <>
      <GovTopBanner />
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Logo onClick={() => go('landing')} />
          <div className="flex items-center gap-3">
            <button
              onClick={() => go('explore')}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-2 py-1 rounded transition-colors hidden sm:inline-block"
            >
              Explore Schemes
            </button>
            <Badge tone="amber" className="hidden sm:inline-flex">
              Prototype • Demo Data
            </Badge>
            {showReset && (
              <button
                onClick={onReset}
                title="Reset local prototype data"
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
              >
                <RotateCcw size={13} />
                <span className="hidden sm:inline">Reset Demo</span>
              </button>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

export function AppShell({ screen, go, onReset, savedCount, children }) {
  const [open, setOpen] = useState(false);
  const active = ACTIVE_MAP[screen] || screen;

  const navContent = (
    <div className="flex h-full flex-col justify-between">
      <div className="space-y-6">
        <div className="px-2 pt-1 pb-2 border-b border-slate-100">
          <Logo onClick={() => go('dashboard')} />
        </div>

        <nav className="space-y-5 px-1">
          {NAV_SECTIONS.map((section) => (
            <div key={section.title}>
              <p className="px-2.5 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {section.title}
              </p>
              <div className="space-y-0.5">
                {section.items.map(({ id, label, icon: Icon }) => {
                  const isActive = active === id;
                  return (
                    <button
                      key={id}
                      onClick={() => {
                        go(id);
                        setOpen(false);
                      }}
                      className={`group flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-xs font-semibold transition-all duration-150 ${
                        isActive
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      <Icon
                        size={16}
                        className={`shrink-0 transition-colors ${
                          isActive ? 'text-brand-400' : 'text-slate-400 group-hover:text-slate-700'
                        }`}
                      />
                      <span className="flex-1 text-left truncate">{label}</span>
                      {id === 'saved' && savedCount > 0 && (
                        <span
                          className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono font-bold leading-tight ${
                            isActive ? 'bg-brand-500 text-white' : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {savedCount}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Sidebar Footer */}
      <div className="pt-4 border-t border-slate-200/80 px-1 space-y-2.5">
        <div className="rounded-lg bg-slate-50 border border-slate-200/70 p-2.5 text-xs">
          <div className="flex items-center justify-between text-slate-700 font-medium">
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-emerald-600" />
              Demo Sandbox
            </span>
            <span className="text-[10px] text-slate-400 uppercase font-mono">v1.0</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500 leading-snug">
            All data stored locally in your browser.
          </p>
        </div>

        <button
          onClick={onReset}
          className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-slate-200/90 bg-white px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 shadow-2xs transition-colors"
        >
          <RotateCcw size={13} className="text-slate-400" />
          <span>Reset Demo Data</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50/70 flex flex-col lg:flex-row">
      {/* Desktop Fixed Sidebar */}
      <aside className="fixed inset-y-0 hidden w-64 border-r border-slate-200/80 bg-white p-4 lg:block z-20 overflow-y-auto">
        {navContent}
      </aside>

      {/* Mobile Top Header */}
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200/80 bg-white/95 px-4 py-3 backdrop-blur-md lg:hidden">
        <Logo onClick={() => go('dashboard')} />
        <div className="flex items-center gap-2">
          {savedCount > 0 && (
            <button
              onClick={() => go('saved')}
              className="flex items-center gap-1 rounded-lg bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700"
            >
              <Bookmark size={13} className="text-amber-600" />
              <span>{savedCount}</span>
            </button>
          )}
          <button
            onClick={() => setOpen(true)}
            aria-label="Open navigation menu"
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Off-canvas Drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-72 bg-white p-4 shadow-xl flex flex-col animate-fade-in">
            <button
              onClick={() => setOpen(false)}
              aria-label="Close navigation menu"
              className="absolute right-3 top-3 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
            >
              <X size={18} />
            </button>
            {navContent}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="w-full lg:ml-64 flex-1 flex flex-col">
        <div className="hidden lg:block">
          <GovTopBanner />
        </div>
        <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:py-8 flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}
