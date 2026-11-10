import { useState } from 'react';
import {
  ArrowLeftRight,
  Filter,
  Search,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  HelpCircle,
  ArrowRight,
  Layers,
} from 'lucide-react';
import { Button, DemoBanner, PageHeader, SchemeCard, Badge } from '../components/ui';
import { STATUS } from '../lib/matching';

const GROUPS = [
  { key: 'best', title: 'Best Matches', blurb: 'Highest qualification score with zero unmet statutory requirements.' },
  { key: 'eligible', title: 'Fully Eligible', blurb: 'Satisfies all core eligibility conditions.' },
  { key: 'almost', title: 'Almost Eligible', blurb: 'Single minor criterion shortfall (e.g. registration months or documentation).' },
  { key: 'not', title: 'Not Eligible Currently', blurb: 'Significant eligibility gaps or differing industry focus.' },
];

export function SchemeGrid({ items, ctx, variant }) {
  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center bg-white">
        <p className="text-sm font-semibold text-slate-700">No schemes found in this segment</p>
        <p className="mt-1 text-xs text-slate-500">Try adjusting your filter or check other qualification categories.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {items.map((s) => (
        <SchemeCard
          key={s.id}
          scheme={s}
          variant={variant}
          onView={() => ctx.openScheme(s.id)}
          onWhy={() => ctx.setWhyId(s.id)}
          saved={ctx.saved.includes(s.id)}
          onSave={() => ctx.toggleSave(s.id)}
          compared={ctx.compare.includes(s.id)}
          onCompare={() => ctx.toggleCompare(s.id)}
        />
      ))}
    </div>
  );
}

export function CompareBar({ ctx }) {
  if (!ctx.compare.length) return null;

  const compareItems = ctx.compare.map((id) => ctx.schemes.find((s) => s.id === id)).filter(Boolean);

  return (
    <div className="sticky bottom-4 z-30 mt-8 animate-fade-up">
      <div className="mx-auto max-w-2xl flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-900 bg-slate-900 text-white p-3.5 shadow-xl">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500/20 text-brand-300 font-mono text-xs font-bold">
            {ctx.compare.length}/3
          </span>
          <div>
            <p className="text-xs font-bold text-white">Compare Queue Active</p>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
              <span className="truncate max-w-[200px] sm:max-w-xs">
                {compareItems.map((c) => c.short).join(' vs ')}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => ctx.clearCompare()}
            className="text-slate-300 hover:text-white hover:bg-slate-800 text-xs"
          >
            Clear
          </Button>
          <Button
            variant="brand"
            size="sm"
            icon={ArrowLeftRight}
            disabled={ctx.compare.length < 2}
            onClick={() => ctx.go('compare')}
            className="text-xs font-semibold"
          >
            Compare ({ctx.compare.length})
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function Matches({ ctx }) {
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');

  const counts = Object.fromEntries(
    GROUPS.map((g) => [g.key, ctx.schemes.filter((s) => s.status === g.key).length]),
  );

  const filterMatches = (items) => {
    if (!query.trim()) return items;
    return items.filter(
      (s) =>
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.description.toLowerCase().includes(query.toLowerCase()) ||
        s.category.toLowerCase().includes(query.toLowerCase()),
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Evaluated Scheme Matches"
        subtitle={
          ctx.profile.name
            ? `Personalized qualification results computed for ${ctx.profile.name}.`
            : 'Personalized qualification results computed for your business profile.'
        }
      >
        <Button
          variant="secondary"
          size="sm"
          onClick={() => ctx.go('alternatives', { from: null })}
          iconRight={ArrowRight}
        >
          Alternative Fits
        </Button>
      </PageHeader>

      <DemoBanner />

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Status Pill Tabs */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100/80 rounded-xl border border-slate-200/80">
          {[
            { key: 'all', title: 'All Schemes', n: ctx.schemes.length },
            ...GROUPS.map((g) => ({ ...g, n: counts[g.key] })),
          ].map((g) => {
            const isCurr = filter === g.key;
            return (
              <button
                key={g.key}
                onClick={() => setFilter(g.key)}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  isCurr
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <span>{g.title}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono font-bold ${
                    isCurr ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {g.n}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search input */}
        <div className="relative min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search schemes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200/90 bg-white pl-8 pr-3 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-200 shadow-2xs"
          />
        </div>
      </div>

      {/* Scheme Groups */}
      <div className="space-y-8">
        {GROUPS.filter((g) => (filter === 'all' || filter === g.key) && counts[g.key] > 0).map((g) => {
          const groupItems = filterMatches(ctx.schemes.filter((s) => s.status === g.key));
          if (groupItems.length === 0) return null;

          return (
            <section key={g.key} className="space-y-3">
              <div className="border-b border-slate-200/80 pb-2.5 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold text-slate-900">{g.title}</h2>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-mono font-semibold text-slate-600">
                      {groupItems.length} schemes
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-slate-500">{g.blurb}</p>
                </div>
              </div>

              <SchemeGrid items={groupItems} ctx={ctx} />
            </section>
          );
        })}
      </div>

      <CompareBar ctx={ctx} />
    </div>
  );
}

export { STATUS };
