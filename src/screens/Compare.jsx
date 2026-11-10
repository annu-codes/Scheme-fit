import { Check, ArrowLeftRight, AlertTriangle, ArrowRight, X } from 'lucide-react';
import {
  BackLink,
  Badge,
  Button,
  Card,
  DemoBanner,
  PageHeader,
  ScoreRing,
  StatusBadge,
  StatusIcon,
} from '../components/ui';
import { APPLICATION_STEPS, DOCUMENTS } from '../data/schemes';

export default function Compare({ ctx }) {
  const items = ctx.compare.map((id) => ctx.schemes.find((s) => s.id === id)).filter(Boolean);
  const cols = { gridTemplateColumns: `repeat(${items.length}, minmax(220px, 1fr))` };

  const Row = ({ label, render }) => (
    <div className="border-t border-slate-100 py-4">
      <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </p>
      <div className="grid gap-4" style={cols}>
        {items.map((s) => (
          <div key={s.id} className="text-xs text-slate-700">
            {render(s)}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <BackLink onClick={() => ctx.go('matches')}>Back to Matches</BackLink>

      <PageHeader
        title="Side-by-Side Scheme Comparison"
        subtitle="Compare statutory eligibility, financial subsidies, and document hurdles across up to 3 shortlisted schemes."
      >
        {items.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => ctx.clearCompare()}
            icon={X}
          >
            Clear Selection
          </Button>
        )}
      </PageHeader>

      {/* Pill Selector for Schemes */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-slate-700 mr-1">Select Schemes (2–3):</span>
        {ctx.schemes.map((s) => {
          const on = ctx.compare.includes(s.id);
          return (
            <button
              key={s.id}
              onClick={() => ctx.toggleCompare(s.id)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold border transition-all ${
                on
                  ? 'border-brand-600 bg-brand-50 text-brand-900 ring-1 ring-brand-500 shadow-2xs'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {on && <Check size={12} className="text-brand-600 stroke-[3]" />}
              <span>{s.short}</span>
              <span className="text-[10px] text-slate-400 font-mono">({s.score}%)</span>
            </button>
          );
        })}
      </div>

      {items.length < 2 ? (
        <Card className="flex flex-col items-center justify-center py-16 text-center border-dashed border-2 border-slate-200">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-600 mb-3">
            <ArrowLeftRight size={22} />
          </div>
          <h3 className="text-sm font-bold text-slate-900">Select at least 2 schemes to compare</h3>
          <p className="mt-1 text-xs text-slate-500 max-w-sm">
            Tap any of the scheme pills above or click the compare toggle button on any scheme card to benchmark them side by side.
          </p>
        </Card>
      ) : (
        <Card className="overflow-x-auto p-6 shadow-card">
          <div className="min-w-fit">
            {/* Top Scheme Headers */}
            <div className="grid gap-4 pb-4" style={cols}>
              {items.map((s) => (
                <div key={s.id} className="border-b border-slate-200/80 pb-3">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <Badge tone="slate">{s.category}</Badge>
                    <button
                      onClick={() => ctx.toggleCompare(s.id)}
                      className="text-slate-400 hover:text-rose-600 transition-colors"
                      title="Remove from comparison"
                    >
                      <X size={15} />
                    </button>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug">{s.short}</h3>
                </div>
              ))}
            </div>

            {/* Comparison Rows */}
            <Row
              label="Match Score & Qualification"
              render={(s) => (
                <div className="flex items-center gap-3">
                  <ScoreRing score={s.score} status={s.status} size={46} />
                  <div>
                    <span className="font-mono font-bold text-xs text-slate-900 block">{s.score}% Match</span>
                    <StatusBadge status={s.status} />
                  </div>
                </div>
              )}
            />

            <Row
              label="Primary Financial & Operational Benefits"
              render={(s) => (
                <ul className="space-y-1.5">
                  {s.benefits.map((b) => (
                    <li key={b.title} className="flex items-start gap-1.5 text-xs text-slate-700">
                      <StatusIcon status="met" size={14} className="mt-0.5" />
                      <div>
                        <span className="font-semibold">{b.title}: </span>
                        <span className="text-slate-500">{b.text}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            />

            <Row
              label="Statutory Document Requirements"
              render={(s) => (
                <ul className="space-y-1.5">
                  {s.documents.map((d) => {
                    const isReady = ctx.docs[d];
                    return (
                      <li key={d} className="flex items-center gap-1.5 text-xs">
                        <StatusIcon status={isReady ? 'met' : 'warn'} size={14} />
                        <span className={isReady ? 'text-slate-800' : 'text-amber-800 font-medium'}>
                          {DOCUMENTS[d].label}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
            />

            <Row
              label="Eligibility Conditions & Gaps"
              render={(s) =>
                s.missing.length ? (
                  <ul className="space-y-1.5">
                    {s.missing.map((c) => (
                      <li key={c.label} className="flex items-start gap-1.5 text-rose-700">
                        <StatusIcon status="unmet" size={14} className="mt-0.5" />
                        <span>{c.gap}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-emerald-700 font-semibold text-xs">
                    <StatusIcon status="met" size={15} /> All statutory criteria satisfied
                  </span>
                )
              }
            />

            <Row
              label="Application Roadmap & Action"
              render={(s) => (
                <div>
                  <p className="text-[11px] text-slate-500 mb-2 font-mono">
                    {APPLICATION_STEPS.length} procedural steps
                  </p>
                  <Button
                    size="sm"
                    className="w-full"
                    onClick={() => ctx.openScheme(s.id)}
                    iconRight={ArrowRight}
                  >
                    View Scheme
                  </Button>
                </div>
              )}
            />
          </div>
        </Card>
      )}

      <DemoBanner />
    </div>
  );
}
