import { useState } from 'react';
import { Search, Filter, ArrowRight, ShieldCheck, CheckCircle2, ChevronRight } from 'lucide-react';
import { Badge, Button, Card, DemoBanner, PageHeader } from '../components/ui';
import { SCHEMES } from '../data/schemes';

export default function Explore({ go }) {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', ...new Set(SCHEMES.map((s) => s.category))];

  const filtered = SCHEMES.filter((s) => {
    const matchesQuery =
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.description.toLowerCase().includes(query.toLowerCase()) ||
      s.benefitSummary.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || s.category === selectedCategory;
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 animate-fade-in">
      <PageHeader
        title="Scheme Catalog"
        subtitle="Explore all verified central and state support schemes. Fill your business profile to evaluate personalized match scores."
      >
        <Button onClick={() => go('profile')} iconRight={ArrowRight}>
          Find My Schemes
        </Button>
      </PageHeader>

      <DemoBanner className="mb-6" />

      {/* Filter and Search Bar */}
      <div className="mb-6 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search schemes by name, keyword, or benefit..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200/90 bg-white pl-10 pr-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100 shadow-2xs"
          />
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition-all ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white border border-slate-200/90 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {cat === 'all' ? 'All Categories' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Schemes Grid */}
      {filtered.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-sm font-semibold text-slate-700">No schemes matched your search</p>
          <p className="mt-1 text-xs text-slate-500">Try clearing your search query or choosing another category.</p>
          <Button
            variant="secondary"
            size="sm"
            className="mt-4"
            onClick={() => {
              setQuery('');
              setSelectedCategory('all');
            }}
          >
            Clear Filters
          </Button>
        </Card>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {filtered.map((s) => (
            <Card key={s.id} hover className="flex flex-col justify-between p-5">
              <div>
                <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                  <div>
                    <Badge tone="slate" className="mb-2">
                      {s.category}
                    </Badge>
                    <h3 className="text-base font-bold text-slate-900 leading-snug">{s.name}</h3>
                  </div>
                  <Badge tone="amber">Demo</Badge>
                </div>

                <p className="mt-3 text-xs leading-relaxed text-slate-600">{s.description}</p>

                <div className="mt-3 rounded-lg bg-slate-50 border border-slate-100 p-2.5 text-xs text-slate-700">
                  <span className="font-semibold text-slate-900">Key Benefit: </span>
                  <span>{s.benefitSummary}</span>
                </div>

                <div className="mt-3 text-xs text-slate-500">
                  <span className="font-medium text-slate-700">Target Segment: </span>
                  <span>{s.fitNote}</span>
                </div>
              </div>

              <div className="mt-5 border-t border-slate-100 pt-3 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-mono">
                  {s.criteria.length} criteria • {s.documents.length} docs
                </span>
                <Button variant="secondary" size="sm" onClick={() => go('profile')} iconRight={ChevronRight}>
                  Check My Fit
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
