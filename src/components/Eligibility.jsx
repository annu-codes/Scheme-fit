import { ArrowRight, Lightbulb, AlertTriangle, CheckCircle2, XCircle, Info } from 'lucide-react';
import { Badge, Button, Card, StatusIcon } from './ui';
import { alternativesFor } from '../lib/matching';

const PILL = {
  met: <Badge tone="green" className="font-semibold text-[10px]">Satisfied</Badge>,
  warn: <Badge tone="amber" className="font-semibold text-[10px]">Action Needed</Badge>,
  unmet: <Badge tone="red" className="font-semibold text-[10px]">Unmet</Badge>,
};

export function EligibilityTracker({ s }) {
  const rows = [
    ...s.criteria.map((c) => ({
      label: c.label,
      requirement: c.requirement,
      yours: c.yours,
      status: c.status,
      hard: c.hard,
    })),
    {
      label: 'Document Readiness',
      requirement: 'All mandatory statutory documents available',
      yours: s.missingDocs.length ? `${s.missingDocs.length} missing from profile` : 'All ready on file',
      status: s.missingDocs.length ? 'warn' : 'met',
      hard: false,
    },
  ];

  const ok = rows.filter((r) => r.status === 'met').length;
  const pct = Math.round((ok / rows.length) * 100);
  const bar = pct === 100 ? 'bg-emerald-500' : pct >= 60 ? 'bg-brand-600' : 'bg-amber-500';

  return (
    <Card className="overflow-hidden p-0 shadow-card border-slate-200/90">
      <div className="p-5 border-b border-slate-100 bg-slate-50/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Statutory Eligibility Breakdown</h3>
            <p className="text-xs text-slate-500">Cross-verified against official eligibility rules</p>
          </div>
          <span className="font-mono text-xs font-bold text-slate-700 bg-white border border-slate-200 px-2.5 py-1 rounded-lg">
            {ok} / {rows.length} Criteria Met ({pct}%)
          </span>
        </div>

        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-200/70">
          <div className={`h-full rounded-full transition-all duration-700 ${bar}`} style={{ width: `${pct}%` }} />
        </div>

        <div className="mt-3 flex flex-wrap gap-4 text-[11px] font-medium text-slate-600">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Satisfied ({rows.filter((r) => r.status === 'met').length})
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            Action Needed ({rows.filter((r) => r.status === 'warn').length})
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-rose-500" />
            Unmet ({rows.filter((r) => r.status === 'unmet').length})
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[500px] text-left text-xs">
          <thead className="bg-slate-100/70 text-[10px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200/80">
            <tr>
              <th className="px-5 py-3">Statutory Condition</th>
              <th className="px-4 py-3">Your Profile Credential</th>
              <th className="px-5 py-3 text-right">Evaluation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((r) => (
              <tr key={r.label} className="hover:bg-slate-50/70 transition-colors">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{r.label}</span>
                    {r.hard && (
                      <span className="rounded bg-slate-100 px-1 py-0.2 text-[9px] font-mono text-slate-500 font-semibold uppercase">
                        Mandatory
                      </span>
                    )}
                  </div>
                  <span className="block text-[11px] text-slate-500 mt-0.5">{r.requirement}</span>
                </td>
                <td className="px-4 py-3.5 font-medium text-slate-700">
                  {r.yours}
                </td>
                <td className="px-5 py-3.5 text-right">
                  <span className="inline-flex items-center justify-end gap-2">
                    {PILL[r.status]}
                    <StatusIcon status={r.status} size={15} />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export function MissingExplainer({ ctx, s }) {
  if (!s.missing.length) return null;

  const primary = s.missing.find((c) => c.progress) || s.missing[0];
  const rest = s.missing.filter((c) => c !== primary);
  const notEligible = s.status === 'almost' || s.status === 'not';
  const alt = alternativesFor(ctx.schemes, s.id)[0];
  const pct = primary.progress
    ? Math.min(100, Math.round((primary.progress.current / primary.progress.required) * 100))
    : 0;

  return (
    <Card className="p-5 space-y-4">
      <div>
        <h3 className="text-sm font-bold text-slate-900">
          {notEligible ? 'Eligibility Gap Diagnosis' : 'Statutory Considerations'}
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Detailed breakdown of criteria preventing 100% eligibility score
        </p>
      </div>

      {/* Comparison Grid */}
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Mandatory Condition
          </p>
          <p className="mt-1 text-xs font-semibold text-slate-900">{primary.requirement}</p>
        </div>
        <div className="rounded-xl border border-rose-200 bg-rose-50/70 p-3.5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-rose-700">
            Your Current Profile Status
          </p>
          <p className="mt-1 text-xs font-bold text-rose-900">{primary.yours}</p>
        </div>
      </div>

      {/* Visual Progress (e.g. registration months) */}
      {primary.progress && (
        <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4">
          <div className="mb-1.5 flex justify-between text-xs font-semibold text-amber-950">
            <span>Eligibility Maturity Progress</span>
            <span className="font-mono">
              {primary.progress.current} / {primary.progress.required} {primary.progress.unit} ({pct}%)
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-amber-100">
            <div
              className="h-full rounded-full bg-amber-600 transition-all duration-700"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="mt-2 text-[11px] text-amber-800">
            {primary.gap}
          </p>
        </div>
      )}

      {/* Other Gaps */}
      {rest.length > 0 && (
        <div className="pt-3 border-t border-slate-100">
          <p className="text-xs font-bold text-slate-700 mb-2">Additional Criteria Shortfalls:</p>
          <ul className="space-y-1.5 text-xs text-slate-600">
            {rest.map((c) => (
              <li key={c.label} className="flex items-center gap-2">
                <StatusIcon status="unmet" size={14} />
                <span className="font-semibold text-slate-900">{c.label}:</span>
                <span>{c.gap}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* What can you do actionable block */}
      <div className="rounded-xl border border-brand-200 bg-brand-50/60 p-4">
        <h4 className="flex items-center gap-2 text-xs font-bold text-brand-950">
          <Lightbulb size={16} className="text-brand-600" />
          Recommended Actionable Alternative
        </h4>
        {alt ? (
          <p className="mt-1 text-xs text-brand-900 leading-relaxed">
            Consider exploring <button className="font-bold underline text-brand-900 hover:text-black" onClick={() => ctx.openScheme(alt.id)}>{alt.short}</button> ({alt.score}% Match). {alt.fitNote}
          </p>
        ) : (
          <p className="mt-1 text-xs text-brand-900 leading-relaxed">
            Review alternative schemes tailored specifically to early-stage or micro enterprises in your state.
          </p>
        )}
        <div className="mt-3">
          <Button
            size="sm"
            onClick={() => ctx.go('alternatives', { from: s.id })}
            iconRight={ArrowRight}
          >
            Find Compatible Alternatives
          </Button>
        </div>
      </div>
    </Card>
  );
}
