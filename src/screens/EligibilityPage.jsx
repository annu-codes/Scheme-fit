import { SearchCheck, CheckCircle2, ChevronRight, AlertTriangle } from 'lucide-react';
import { DemoBanner, PageHeader, TrafficStatus, Card, Badge } from '../components/ui';
import { EligibilityTracker, MissingExplainer } from '../components/Eligibility';
import { SchemePicker } from './Documents';

export default function EligibilityPage({ ctx }) {
  const s = ctx.active;

  const rows = ctx.schemes.map((x) => {
    const total = x.criteria.length + 1;
    const ok = x.criteria.filter((c) => c.status === 'met').length + (x.missingDocs.length ? 0 : 1);
    return { x, ok, total, pct: Math.round((ok / total) * 100) };
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Statutory Eligibility Evaluation"
        subtitle="Transparent criteria-by-criteria audit. See exactly where your business qualifies and where gaps exist."
      />

      <SchemePicker ctx={ctx} />

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Left: Active scheme detailed breakdown */}
        <div className="space-y-5 lg:col-span-3">
          <EligibilityTracker s={s} />
          <MissingExplainer ctx={ctx} s={s} />
        </div>

        {/* Right: Quick scheme selector list */}
        <div className="lg:col-span-2">
          <Card className="p-5 sticky top-20 shadow-card">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  All Evaluated Schemes
                </h2>
                <p className="text-[11px] text-slate-400">Click any scheme to audit</p>
              </div>
              <Badge tone="slate">{ctx.schemes.length} Total</Badge>
            </div>

            <ul className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
              {rows.map(({ x, ok, total, pct }) => {
                const isSelected = x.id === s.id;
                return (
                  <li key={x.id}>
                    <button
                      onClick={() => ctx.setSelectedId(x.id)}
                      className={`group w-full rounded-xl p-3 text-left transition-all border ${
                        isSelected
                          ? 'border-brand-600 bg-brand-50/60 ring-1 ring-brand-500 shadow-2xs'
                          : 'border-slate-200/80 bg-white hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-xs font-bold truncate ${isSelected ? 'text-brand-950' : 'text-slate-900'}`}>
                          {x.short}
                        </span>
                        <span className="font-mono text-[11px] font-bold text-slate-500">
                          {ok}/{total} Met
                        </span>
                      </div>

                      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            pct === 100
                              ? 'bg-emerald-500'
                              : pct >= 70
                              ? 'bg-brand-600'
                              : 'bg-amber-500'
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        <TrafficStatus status={x.status} />
                        <span className="text-[10px] font-mono text-slate-400">
                          {x.score}% score
                        </span>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </Card>
        </div>
      </div>

      <DemoBanner />
    </div>
  );
}
