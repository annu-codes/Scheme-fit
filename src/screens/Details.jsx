import { useState } from 'react';
import {
  ArrowRight,
  Link2,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  X,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  AlertTriangle,
  Info,
  ArrowLeftRight,
} from 'lucide-react';
import {
  AiTag,
  BENEFIT_ICONS,
  BackLink,
  Badge,
  Button,
  Card,
  DemoBanner,
  ScoreRing,
  StatusIcon,
  TrafficStatus,
} from '../components/ui';
import { APPLICATION_STEPS } from '../data/schemes';
import { EligibilityTracker, MissingExplainer } from '../components/Eligibility';
import { AutoFill, DocReuse } from '../components/Reuse';
import TermDialog from '../components/TermDialog';
import { termsForCategory } from '../data/glossary';

export function SourceDialog({ scheme, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs" onClick={onClose} />
      <div className="relative w-full max-w-md animate-fade-up rounded-2xl bg-white p-6 shadow-2xl border border-slate-200">
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-2 mb-2 text-brand-600">
          <ShieldCheck size={20} />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Official Verification Source</span>
        </div>

        <h2 className="text-lg font-bold text-slate-900 leading-snug">{scheme.name}</h2>

        <p className="mt-2 text-xs leading-relaxed text-slate-600">
          {scheme.officialSource
            ? 'Open the official government gazette or portal entry for this scheme to verify the latest filing dates and operational guidelines.'
            : 'This is a hackathon prototype demo scheme. In production, this link opens the certified Ministry or National Single Window portal URL.'}
        </p>

        <div className="mt-4 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-3.5 text-xs text-slate-600 font-mono">
          {scheme.officialSource || (
            <span className="text-slate-400">
              Verified Source: https://www.india.gov.in/schemes/msme/{scheme.id}
            </span>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-2.5">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Close
          </Button>
          {scheme.officialSource && (
            <a
              href={scheme.officialSource}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white hover:bg-slate-800"
            >
              <span>Open Portal</span>
              <ExternalLink size={13} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

const SectionHeading = ({ number, title, subtitle }) => (
  <div className="mb-3.5 flex items-start gap-3">
    {number && (
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-brand-400 font-mono text-[11px] font-bold">
        {number}
      </span>
    )}
    <div>
      <h2 className="text-sm font-bold text-slate-900 tracking-tight">{title}</h2>
      {subtitle && <p className="text-[11px] text-slate-500">{subtitle}</p>}
    </div>
  </div>
);

export default function Details({ ctx }) {
  const s = ctx.selected;
  const [showSource, setShowSource] = useState(false);
  const [term, setTerm] = useState(null);

  if (!s) return null;

  const met = s.criteria.filter((c) => c.status === 'met');
  const saved = ctx.saved.includes(s.id);
  const compared = ctx.compare.includes(s.id);
  const terms = termsForCategory(s.category);

  return (
    <div className="mx-auto max-w-3xl animate-fade-in space-y-7">
      <div className="flex items-center justify-between">
        <BackLink onClick={() => ctx.go('matches')}>Back to Matches</BackLink>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => ctx.toggleCompare(s.id)}
            icon={ArrowLeftRight}
            className={compared ? 'border-brand-600 bg-brand-50 text-brand-700' : ''}
          >
            {compared ? 'Compared' : 'Compare'}
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => ctx.toggleSave(s.id)}
            icon={saved ? BookmarkCheck : Bookmark}
            className={saved ? 'border-amber-400 bg-amber-50 text-amber-800' : ''}
          >
            {saved ? 'Saved' : 'Save Scheme'}
          </Button>
        </div>
      </div>

      {/* 1. Scheme Master Overview Card */}
      <Card className="p-6 border-slate-200/90 shadow-card">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-5 border-b border-slate-100">
          <ScoreRing score={s.score} status={s.status} size={68} />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="text-sm font-bold font-mono text-slate-900">
                {s.score}% Match Score
              </span>
              <span className="text-slate-300">•</span>
              <TrafficStatus status={s.status} />
              <Badge tone="slate">{s.category}</Badge>
              <Badge tone="amber">Demo Scheme</Badge>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              {s.name}
            </h1>
            <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
              {s.description}
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs">
          <AiTag />
          <button
            onClick={() => setShowSource(true)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 underline underline-offset-2"
          >
            <ShieldCheck size={14} className="text-emerald-600" />
            <span>Verify Official Source & Guidelines</span>
          </button>
        </div>
      </Card>

      {/* 2. Why this matches you */}
      <section>
        <SectionHeading
          number="01"
          title="Match Rationale & Qualification Overview"
          subtitle="How your business credentials map to the scheme's criteria"
        />
        <Card className="p-5">
          <ul className="space-y-3 text-xs">
            {met.map((c) => (
              <li key={c.label} className="flex items-center gap-2.5 text-slate-800">
                <StatusIcon status="met" size={17} />
                <span className="font-semibold text-slate-900">{c.label}:</span>
                <span className="text-slate-600">{c.yours} satisfies requirement ({c.requirement})</span>
              </li>
            ))}
            {s.missing.map((c) => (
              <li key={c.label} className="flex items-start gap-2.5 text-amber-900">
                <StatusIcon status="warn" size={17} />
                <div>
                  <span className="font-semibold">{c.label} Gap: </span>
                  <span className="text-amber-800">{c.gap}</span>
                </div>
              </li>
            ))}
            {s.missingDocs.length > 0 && (
              <li className="flex items-center gap-2.5 text-amber-900">
                <StatusIcon status="warn" size={17} />
                <span>{s.missingDocs.length} required statutory document(s) still needed before filing</span>
              </li>
            )}
          </ul>
        </Card>
      </section>

      {/* 3. Detailed Eligibility Tracker */}
      <section className="space-y-4">
        <SectionHeading
          number="02"
          title="Deterministic Eligibility Breakdown"
          subtitle="Detailed criteria matrix comparing your profile against statutory rules"
        />
        <EligibilityTracker s={s} />
        <MissingExplainer ctx={ctx} s={s} />
      </section>

      {/* 4. Scheme Benefits & Subsidies */}
      <section>
        <SectionHeading
          number="03"
          title="Financial & Non-Financial Benefits"
          subtitle="Specific incentives, interest subventions, or equipment grants offered"
        />
        <div className="grid gap-3.5 sm:grid-cols-3">
          {s.benefits.map((b) => {
            const Icon = BENEFIT_ICONS[b.icon] || BENEFIT_ICONS.check;
            return (
              <Card key={b.title} className="p-4 flex flex-col justify-between">
                <div>
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 border border-brand-100 text-brand-700 mb-3">
                    <Icon size={16} />
                  </span>
                  <p className="text-xs font-bold text-slate-900">{b.title}</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-slate-500">{b.text}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* 5. Required Documents (+ profile auto-fill) */}
      <section>
        <SectionHeading
          number="04"
          title="Application Readiness & Profile Reuse"
          subtitle="Cross-check documents and pre-fill credentials to avoid redundant paperwork"
        />
        <div className="grid gap-4 md:grid-cols-2">
          <DocReuse ctx={ctx} s={s} />
          <AutoFill ctx={ctx} s={s} />
        </div>
      </section>

      {/* 6. Scheme compatibility */}
      <section>
        <SectionHeading
          number="05"
          title="Multi-Scheme Compatibility Rule Check"
          subtitle="Verify if claiming this scheme restricts or complements other government grants"
        />
        <Card className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="max-w-md">
            <h3 className="text-xs font-bold text-slate-900">Can you pair this with other schemes?</h3>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed">
              Check for double-dipping restrictions on capital subsidies and credit guarantee caps.
            </p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            icon={Link2}
            onClick={() => ctx.go('compatibility', { compatA: s.id })}
            className="shrink-0"
          >
            Run Compatibility Test →
          </Button>
        </Card>
      </section>

      {/* 7. Difficult terms */}
      <section>
        <SectionHeading
          number="06"
          title="Government Term Simplifier"
          subtitle="Complex terminology in this scheme translated into plain language"
        />
        <Card className="p-5">
          <ul className="divide-y divide-slate-100">
            {terms.map((t) => (
              <li
                key={t.term}
                className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
              >
                <div>
                  <span className="text-xs font-bold text-slate-900">{t.term}</span>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{t.brief}</p>
                </div>
                <button
                  onClick={() => setTerm(t)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-brand-200 bg-brand-50/80 px-2.5 py-1 text-xs font-semibold text-brand-700 hover:bg-brand-100 transition-colors shrink-0"
                >
                  <Sparkles size={12} />
                  <span>Explain Term</span>
                </button>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      {/* 8. Application roadmap */}
      <section>
        <SectionHeading
          number="07"
          title="Application Roadmap & Next Steps"
          subtitle="Sequential procedure to submit and track your file"
        />
        <Card className="p-5">
          <ol className="space-y-3.5 text-xs">
            {APPLICATION_STEPS.map((st, i) => (
              <li key={st.title} className="flex items-start gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-900 text-[10px] font-mono font-bold text-brand-400 mt-0.5">
                  {i + 1}
                </span>
                <div>
                  <p className="font-bold text-slate-900">{st.title}</p>
                  <p className="text-slate-500 mt-0.5 leading-relaxed">{st.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap gap-2.5">
            <Button size="sm" onClick={() => ctx.go('guide')} iconRight={ArrowRight}>
              Detailed Application Guide
            </Button>
            <Button
              variant="secondary"
              size="sm"
              icon={ExternalLink}
              onClick={() => setShowSource(true)}
            >
              Official Portal Link
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => ctx.go('alternatives', { from: s.id })}
            >
              Alternative Schemes →
            </Button>
          </div>
        </Card>
      </section>

      <DemoBanner />

      {showSource && <SourceDialog scheme={s} onClose={() => setShowSource(false)} />}
      {term && <TermDialog term={term} onClose={() => setTerm(null)} />}
    </div>
  );
}
