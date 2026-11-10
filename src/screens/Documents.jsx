import { ArrowRight, FileCheck2, FileText, Check, AlertTriangle, RotateCcw } from 'lucide-react';
import { Button, Card, DemoBanner, PageHeader, StatusIcon, Badge } from '../components/ui';
import { DOCUMENTS } from '../data/schemes';

export function SchemePicker({ ctx }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 rounded-xl border border-slate-200/90 bg-white p-3 shadow-2xs">
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-slate-700">Target Scheme:</span>
        <Badge tone="slate">{ctx.active.category}</Badge>
      </div>
      <select
        className="w-full sm:w-auto rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-800 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-200"
        value={ctx.active.id}
        onChange={(e) => ctx.setSelectedId(e.target.value)}
      >
        {ctx.schemes.map((s) => (
          <option key={s.id} value={s.id}>
            {s.short} ({s.score}% Match)
          </option>
        ))}
      </select>
    </div>
  );
}

export default function Documents({ ctx }) {
  const s = ctx.active;
  const ready = s.documents.filter((d) => ctx.docs[d]);
  const needed = s.documents.filter((d) => !ctx.docs[d]);
  const pct = Math.round((ready.length / s.documents.length) * 100);

  const Row = ({ d, done }) => (
    <li>
      <div
        className={`flex items-start justify-between gap-3 rounded-xl border p-3.5 transition-all ${
          done
            ? 'border-emerald-200 bg-emerald-50/40'
            : 'border-slate-200/90 bg-white hover:border-slate-300'
        }`}
      >
        <div className="flex items-start gap-3 min-w-0">
          <span className={`p-2 rounded-lg mt-0.5 ${done ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'}`}>
            <FileText size={16} />
          </span>
          <div className="min-w-0">
            <span className="block text-xs font-bold text-slate-900 leading-snug">{DOCUMENTS[d].label}</span>
            <span className="block text-[11px] text-slate-500 mt-0.5">{DOCUMENTS[d].hint}</span>
            <span className={`inline-flex items-center gap-1 text-[10px] font-semibold mt-1 ${done ? 'text-emerald-700' : 'text-amber-700'}`}>
              {done ? <><Check size={10} />Ready on file</> : <><AlertTriangle size={10} />Required before submission</>}
            </span>
          </div>
        </div>
        <button
          onClick={() => ctx.toggleDoc(d)}
          className={`text-xs font-semibold px-2.5 py-1 rounded-lg border transition-colors shrink-0 ${
            done
              ? 'border-slate-200 text-slate-500 hover:bg-slate-100'
              : 'border-brand-500 bg-brand-50 text-brand-700 hover:bg-brand-100'
          }`}
        >
          {done ? 'Mark Missing' : 'Mark Ready'}
        </button>
      </div>
    </li>
  );

  return (
    <div className="mx-auto max-w-2xl animate-fade-in space-y-6">
      <PageHeader
        title="Document Readiness Checklist"
        subtitle="Track and verify all statutory documentation needed for application submission."
      >
        <Button size="sm" onClick={() => ctx.go('guide')} iconRight={ArrowRight}>
          Filing Roadmap
        </Button>
      </PageHeader>

      <SchemePicker ctx={ctx} />

      {/* Progress Card */}
      <Card className="p-5">
        <div className="flex items-center justify-between text-xs font-bold text-slate-800">
          <span>Verification Progress</span>
          <span className="font-mono">{ready.length} of {s.documents.length} Completed ({pct}%)</span>
        </div>
        <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              pct === 100 ? 'bg-emerald-500' : 'bg-brand-600'
            }`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
          <span>All documents are stored locally for reuse.</span>
          {pct === 100 && (
            <span className="text-emerald-700 font-semibold flex items-center gap-1">
              <Check size={12} /> Ready for official portal filing
            </span>
          )}
        </div>
      </Card>

      {/* Split Lists: Ready vs Needed */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Verified & Ready ({ready.length})
            </h2>
          </div>
          {ready.length ? (
            <ul className="space-y-2.5">
              {ready.map((d) => (
                <Row key={d} d={d} done />
              ))}
            </ul>
          ) : (
            <Card className="text-center py-8 text-xs text-slate-500 border-dashed">
              No documents marked as ready yet.
            </Card>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Action Required ({needed.length})
            </h2>
          </div>
          {needed.length ? (
            <ul className="space-y-2.5">
              {needed.map((d) => (
                <Row key={d} d={d} done={false} />
              ))}
            </ul>
          ) : (
            <Card className="text-center py-8 text-xs text-emerald-700 font-medium border-emerald-200 bg-emerald-50/30">
              All statutory documents for this scheme are ready.
            </Card>
          )}
        </div>
      </div>

      <DemoBanner />
    </div>
  );
}
