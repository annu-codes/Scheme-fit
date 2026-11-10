import { X, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { AiTag, Button, ScoreRing, StatusIcon, TrafficStatus, Badge } from './ui';

export default function WhyMatch({ scheme: s, onClose, onView }) {
  const met = s.criteria.filter((c) => c.status === 'met');
  const missing = s.missing;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity" onClick={onClose} />
      <div className="relative max-h-[90vh] w-full max-w-md animate-fade-up overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl border border-slate-200">
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-2 mb-1 text-brand-600">
          <Sparkles size={16} />
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
            Deterministic Match Audit
          </span>
        </div>

        <h2 className="text-lg font-bold text-slate-900 leading-snug pr-6">
          Why This Scheme Matches You
        </h2>

        {/* Scheme card header snippet */}
        <div className="mt-3.5 flex items-center gap-3.5 rounded-xl border border-slate-200/90 bg-slate-50/70 p-3.5">
          <ScoreRing score={s.score} status={s.status} size={48} />
          <div className="min-w-0">
            <p className="text-xs font-bold text-slate-900 leading-snug truncate">{s.short}</p>
            <div className="mt-1 flex items-center gap-2">
              <TrafficStatus status={s.status} />
              <Badge tone="slate" className="text-[10px] py-0">{s.category}</Badge>
            </div>
          </div>
        </div>

        {/* Criteria matches breakdown */}
        <div className="mt-4 space-y-3">
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wider text-[10px]">
            Qualified Conditions ({met.length}):
          </p>
          <ul className="space-y-2 text-xs">
            {met.map((c) => (
              <li key={c.label} className="flex items-start gap-2 text-slate-700">
                <StatusIcon status="met" size={15} className="mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold text-slate-900">{c.label}: </span>
                  <span className="text-slate-600">Your profile ({c.yours}) meets requirement.</span>
                </div>
              </li>
            ))}
          </ul>

          {missing.length > 0 && (
            <div className="pt-2 border-t border-slate-100">
              <p className="text-xs font-bold text-amber-900 uppercase tracking-wider text-[10px] mb-2">
                Shortfalls / Action Required ({missing.length}):
              </p>
              <ul className="space-y-2 text-xs">
                {missing.map((c) => (
                  <li key={c.label} className="flex items-start gap-2 text-amber-900">
                    <StatusIcon status="warn" size={15} className="mt-0.5 shrink-0" />
                    <div>
                      <span className="font-semibold">{c.label}: </span>
                      <span className="text-slate-600">{c.gap}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {s.missingDocs.length > 0 && (
            <div className="flex items-center gap-2 text-xs text-amber-800 bg-amber-50 p-2.5 rounded-lg border border-amber-200/70">
              <StatusIcon status="warn" size={14} />
              <span>{s.missingDocs.length} required statutory document(s) still needed.</span>
            </div>
          )}
        </div>

        <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
          <AiTag />
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" onClick={onClose}>
              Dismiss
            </Button>
            <Button size="sm" onClick={onView} iconRight={ArrowRight}>
              Full Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
