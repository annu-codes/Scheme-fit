import {
  ArrowRight,
  Database,
  FileCheck2,
  ListChecks,
  Route,
  Sparkles,
  Target,
  AlertTriangle,
  Link2,
  FileText,
  UserCheck,
  Building2,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react';
import { AiTag, Button, Card, DemoBanner, PageHeader, SchemeCard, StatusBadge } from '../components/ui';
import { STATUS, labelOf } from '../lib/matching';

export default function Dashboard({ ctx }) {
  const { schemes, profile } = ctx;
  const count = (k) => schemes.filter((s) => s.status === k).length;
  const top = schemes.filter((s) => s.status === 'best' || s.status === 'eligible').slice(0, 4);
  const docKeys = [...new Set(schemes.flatMap((s) => s.documents))];
  const readyN = docKeys.filter((k) => ctx.docs[k]).length;
  const bestScheme = schemes.find((s) => s.status === 'best') || schemes[0];

  const firstName = profile.name ? profile.name.trim().split(' ')[0] : 'Entrepreneur';

  const STAT_CARDS = [
    {
      title: 'Strong Fits',
      value: count('best'),
      sub: 'Eligible for immediate filing',
      icon: Target,
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200/80',
    },
    {
      title: 'Qualified Schemes',
      value: count('best') + count('eligible'),
      sub: 'Meet core hard criteria',
      icon: CheckCircle2,
      color: 'text-brand-700 bg-brand-50 border-brand-200/80',
    },
    {
      title: 'Ready Documents',
      value: `${readyN}/${docKeys.length}`,
      sub: 'Reusable proofs on file',
      icon: FileCheck2,
      color: 'text-indigo-700 bg-indigo-50 border-indigo-200/80',
    },
    {
      title: 'Compatibility Checks',
      value: ctx.compatChecks,
      sub: 'Pairing tests evaluated',
      icon: Link2,
      color: 'text-amber-700 bg-amber-50 border-amber-200/80',
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <PageHeader
        title="Your Smart Scheme Matches"
        subtitle="Personalized recommendations based on your business profile"
      >
        title="Your Smart Scheme Matches"
        subtitle="Real-time summary of qualified government schemes, document readiness, and compliance roadmap."
      >
        <Button variant="secondary" size="sm" onClick={() => ctx.go('profile')}>
          Edit Profile
        </Button>
        <Button size="sm" onClick={() => ctx.go('matches')} iconRight={ArrowRight}>
          View All Matches
        </Button>
      </PageHeader>
      {/* Prototype Insights */}
      <div className="flex flex-wrap gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-600">
        <span className="flex items-center gap-1"><span role="img" aria-label="target">🎯</span> 3 Strong Matches</span>
        <span className="flex items-center gap-1"><span role="img" aria-label="warning">⚠️</span> 2 Missing Criteria</span>
        <span className="flex items-center gap-1"><span role="img" aria-label="link">🔗</span> 2 Compatibility Checks</span>
        <span className="flex items-center gap-1"><span role="img" aria-label="document">📄</span> 4 Reusable Documents</span>
      </div>

      <DemoBanner />

      {/* Top Stat Cards */}
      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-4">
        {STAT_CARDS.map(({ title, value, sub, icon: Icon, color }) => (
          <Card key={title} className="p-4 border-slate-200/80">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                {title}
              </span>
              <span className={`flex h-7 w-7 items-center justify-center rounded-lg border ${color}`}>
                <Icon size={15} />
              </span>
            </div>
            <p className="mt-2 text-2xl font-bold font-mono text-slate-900 tracking-tight">
              {value}
            </p>
            <p className="mt-1 text-[11px] text-slate-500 truncate">{sub}</p>
          </Card>
        ))}
      </div>

      {/* Recommended Spotlight Scheme */}
      {bestScheme && (
        <div className="rounded-2xl border border-slate-900 bg-slate-900 text-white p-5 sm:p-6 shadow-md relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-500/20 border border-brand-400/30 px-2.5 py-0.5 text-[11px] font-semibold text-brand-300">
                  <Sparkles size={11} /> Top Recommendation
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {bestScheme.score}% Deterministic Match
                </span>
              </div>
              <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                {bestScheme.name}
              </h2>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                {bestScheme.description}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-300">
                <span className="rounded bg-white/10 px-2 py-0.5 font-medium">
                  Benefit: {bestScheme.benefitSummary}
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-emerald-400 font-medium">
                  {bestScheme.missing.length === 0 ? 'All criteria met' : `${bestScheme.missing.length} minor gap`}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <Button
                variant="brand"
                size="md"
                className="font-semibold text-xs"
                onClick={() => ctx.openScheme(bestScheme.id)}
                iconRight={ArrowRight}
              >
                Inspect Scheme Details
              </Button>
              <Button
                variant="secondary"
                size="md"
                className="text-xs border-slate-700 bg-slate-800 text-white hover:bg-slate-700"
                onClick={() => ctx.setWhyId(bestScheme.id)}
              >
                Why Match?
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Top 3 Smart Matches Grid */}
      <section>
        <div className="mb-3.5 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Top Ranked Schemes For Your Business
            </h2>
            <p className="text-xs text-slate-500">
              Ranked by compatibility with your state, sector, turnover, and support requirements
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => ctx.go('matches')} iconRight={ArrowRight}>
            View All ({schemes.length})
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {schemes.slice(0, 3).map((s) => (
            <SchemeCard
              key={s.id}
              scheme={s}
              onView={() => ctx.openScheme(s.id)}
              onWhy={() => ctx.setWhyId(s.id)}
              saved={ctx.saved.includes(s.id)}
              onSave={() => ctx.toggleSave(s.id)}
              compared={ctx.compare.includes(s.id)}
              onCompare={() => ctx.toggleCompare(s.id)}
            />
          ))}
        </div>
      </section>

      {/* 2-Column Split: Top recommendations table + Profile Card */}
      <div className="grid gap-5 lg:grid-cols-3">
        {/* Left: Scheme Status Breakdown Table */}
        <Card className="lg:col-span-2 p-5">
          <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Eligibility Breakdown Pipeline</h3>
              <p className="text-xs text-slate-500">Fast status across high-priority schemes</p>
            </div>
            <button
              onClick={() => ctx.go('eligibility')}
              className="text-xs font-semibold text-brand-700 hover:text-brand-900"
            >
              Full Breakdown →
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {top.map((s) => (
              <div key={s.id} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-xs font-bold text-slate-900">{s.short}</p>
                    <StatusBadge status={s.status} />
                  </div>
                  <p className="mt-1 text-[11px] text-slate-500 truncate">{s.benefitSummary}</p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-mono text-xs font-bold text-slate-700">{s.score}%</span>
                  <Button variant="secondary" size="sm" onClick={() => ctx.openScheme(s.id)}>
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Right: Active Business Profile Summary */}
        <Card className="p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Your Business Profile</h3>
              <span className="text-[10px] font-mono font-semibold uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Active
              </span>
            </div>

            <dl className="mt-3.5 space-y-2 text-xs">
              {[
                ['Entrepreneur', profile.name || 'Priya Sharma'],
                ['State / Jurisdiction', profile.state || 'Karnataka'],
                ['Category', labelOf('category', profile.category) || 'Woman entrepreneur'],
                ['Business Type', labelOf('businessType', profile.businessType) || 'Micro Business'],
                ['Industry Sector', labelOf('industry', profile.industry) || 'Food Processing'],
                ['Annual Turnover', labelOf('turnover', profile.turnover) || '₹5 – 25 lakh'],
                ['Registration Age', profile.registered === 'yes' ? `${profile.registrationMonths || 8} months` : 'Not registered'],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-2 py-0.5">
                  <dt className="text-slate-500 font-medium">{k}</dt>
                  <dd className="font-semibold text-slate-900 text-right truncate max-w-[150px]">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <Button
            variant="secondary"
            size="sm"
            className="mt-4 w-full"
            onClick={() => ctx.go('profile')}
          >
            Update Business Details
          </Button>
        </Card>
      </div>

      {/* Quick Action Navigation Grid */}
      <div className="grid gap-3.5 sm:grid-cols-3">
        {[
          {
            icon: ListChecks,
            title: 'Scheme Catalog & Filtering',
            desc: 'Filter by fully eligible, almost eligible, or category.',
            to: 'matches',
          },
          {
            icon: FileCheck2,
            title: 'Document Checklist',
            desc: `${readyN} of ${docKeys.length} verified documents on file.`,
            to: 'documents',
          },
          {
            icon: Route,
            title: 'Official Application Steps',
            desc: '5-step procedural guide to filing and tracking.',
            to: 'guide',
          },
        ].map(({ icon: Icon, title, desc, to }) => (
          <button
            key={title}
            onClick={() => ctx.go(to)}
            className="group flex flex-col justify-between rounded-xl border border-slate-200/80 bg-white p-4 text-left shadow-card hover:shadow-card-hover hover:border-slate-300 transition-all duration-200"
          >
            <div>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-700 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                <Icon size={16} />
              </div>
              <h4 className="mt-3 text-xs font-bold text-slate-900 group-hover:text-brand-700 transition-colors">
                {title}
              </h4>
              <p className="mt-1 text-[11px] leading-relaxed text-slate-500">{desc}</p>
            </div>
            <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-slate-400 group-hover:text-slate-900 transition-colors">
              <span>Open tool</span>
              <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
            </div>
          </button>
        ))}
      </div>

      {/* GovTech Architecture & Transparency Note */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-4 bg-slate-50/70 border-slate-200/80">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
            <Database size={15} className="text-slate-600" />
            Deterministic Rule-Based Matching
          </div>
          <p className="mt-1.5 text-[11px] leading-relaxed text-slate-600">
            Scheme guidelines, cutoff turnover bands, age criteria, and document requirements are computed deterministically against structured rules. No AI guessing is used for statutory eligibility.
          </p>
        </Card>
        <Card className="p-4 bg-slate-50/70 border-slate-200/80">
          <div className="flex items-center gap-2 text-xs font-bold text-brand-900">
            <Sparkles size={15} className="text-brand-600" />
            Natural Language AI Layer
          </div>
          <p className="mt-1.5 text-[11px] leading-relaxed text-slate-600">
            Plain-language explanations, jargon simplification, alternative matching paths, and customized application summaries are synthesized to help citizens understand bureaucratic terms.
          </p>
        </Card>
      </div>
    </div>
  );
}
