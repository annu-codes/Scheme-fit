import { useState } from 'react';
import { Info, Link2, ArrowLeftRight, CheckCircle2, AlertTriangle, XCircle, Sparkles } from 'lucide-react';
import { Badge, Button, Card, PageHeader } from '../components/ui';
import { COMPAT_DISCLAIMER, RESULTS, checkCompatibility } from '../data/compatibility';

const BOX = {
  green: 'border-emerald-300 bg-emerald-50/80 text-emerald-950',
  red: 'border-rose-300 bg-rose-50/80 text-rose-950',
  amber: 'border-amber-300 bg-amber-50/80 text-amber-950',
};

const DOT = {
  green: 'bg-emerald-500',
  red: 'bg-rose-500',
  amber: 'bg-amber-500',
};

function Picker({ label, value, onChange, schemes }) {
  return (
    <label className="block flex-1 text-xs font-semibold text-slate-700">
      <span className="block mb-1.5 uppercase tracking-wider text-[11px] text-slate-500">{label}</span>
      <select
        className="w-full rounded-xl border border-slate-200/90 bg-white px-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100 shadow-2xs"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select a scheme…</option>
        {schemes.map((s) => (
          <option key={s.id} value={s.id}>
            {s.short} ({s.category})
          </option>
        ))}
      </select>
    </label>
  );
}

export default function Compatibility({ ctx }) {
  const [a, setA] = useState(ctx.compatA || '');
  const [b, setB] = useState('');
  const [res, setRes] = useState(null);
  const same = a && a === b;

  const run = () => {
    const sa = ctx.schemes.find((s) => s.id === a);
    const sb = ctx.schemes.find((s) => s.id === b);
    setRes({ a: sa, b: sb, ...checkCompatibility(sa, sb) });
    ctx.countCompat();
  };

  const change = (set) => (v) => {
    set(v);
    setRes(null);
  };

  const meta = res && RESULTS[res.result];

  const presets = [
    { a: 'women-entrepreneur', b: 'skill-mentorship', label: 'Funding + Training (Compatible)' },
    { a: 'udyam-growth', b: 'micro-finance', label: 'Credit + Credit (Potential Conflict)' },
    { a: 'women-entrepreneur', b: 'startup-seed', label: 'Dual Seed Grant (Conditional)' },
  ];

  return (
    <div className="mx-auto max-w-2xl animate-fade-in space-y-6">
      <PageHeader
        title="Multi-Scheme Compatibility Rules"
        subtitle="Evaluate statutory co-benefit rules to verify if applying for one scheme impacts your eligibility or subsidy limits for another."
      />

      {/* Preset quick test pills */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="font-semibold text-slate-500 text-[11px] uppercase tracking-wider">
          Quick Preset Tests:
        </span>
        {presets.map((p) => (
          <button
            key={p.label}
            onClick={() => {
              setA(p.a);
              setB(p.b);
              setRes(null);
            }}
            className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-700 hover:bg-slate-50 hover:border-slate-300 font-medium transition-colors"
          >
            {p.label}
          </button>
        ))}
      </div>

      <Card className="p-6">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <Picker label="First Scheme (Scheme A)" value={a} onChange={change(setA)} schemes={ctx.schemes} />
          <div className="flex items-center justify-center pt-2 sm:pt-6">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 font-bold text-xs">
              +
            </span>
          </div>
          <Picker label="Second Scheme (Scheme B)" value={b} onChange={change(setB)} schemes={ctx.schemes} />
        </div>

        {same && (
          <p className="mt-3 text-xs font-semibold text-rose-600">
            Please pick two distinct schemes to evaluate compatibility rules.
          </p>
        )}

        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            Evaluated against central MSME guidelines
          </span>
          <Button
            size="md"
            disabled={!a || !b || same}
            onClick={run}
            icon={ArrowLeftRight}
          >
            Evaluate Compatibility
          </Button>
        </div>
      </Card>

      {/* Result Card */}
      {res && meta && (
        <div className={`animate-fade-up rounded-2xl border p-6 shadow-md ${BOX[meta.tone]}`}>
          <div className="flex items-center justify-between pb-3 border-b border-current/20">
            <h2 className="flex items-center gap-2 text-base font-bold">
              <span className={`h-2.5 w-2.5 rounded-full ${DOT[meta.tone]}`} />
              {meta.label}
            </h2>
            <span className="text-xs font-mono font-semibold opacity-80 uppercase">
              {res.a.short} + {res.b.short}
            </span>
          </div>

          <p className="mt-3 text-xs font-semibold leading-relaxed">
            {meta.message}
          </p>

          <div className="mt-4 pt-3 border-t border-current/20">
            <h3 className="text-xs font-bold uppercase tracking-wider opacity-75">
              Statutory Basis & Rationale
            </h3>
            <p className="mt-1 text-xs leading-relaxed opacity-95">
              {res.why}
            </p>
          </div>
        </div>
      )}

      {/* Official Disclaimer */}
      <div className="flex items-start gap-2.5 rounded-xl border border-amber-200/90 bg-amber-50/70 p-3.5 text-xs text-amber-900 shadow-2xs">
        <Info size={16} className="mt-0.5 shrink-0 text-amber-700" />
        <span className="leading-relaxed">{COMPAT_DISCLAIMER}</span>
      </div>
    </div>
  );
}
