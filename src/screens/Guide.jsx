import { useState } from 'react';
import { AlertTriangle, ExternalLink, ArrowRight, CheckCircle2, ShieldCheck, ChevronRight } from 'lucide-react';
import { Button, PageHeader, Card, DemoBanner, Badge } from '../components/ui';
import { APPLICATION_STEPS } from '../data/schemes';
import { SchemePicker } from './Documents';
import { SourceDialog } from './Details';

export default function Guide({ ctx }) {
  const s = ctx.active;
  const [showSource, setShowSource] = useState(false);

  return (
    <div className="mx-auto max-w-2xl animate-fade-in space-y-6">
      <PageHeader
        title="Application Filing Roadmap"
        subtitle={`Standard 5-step government submission and tracking procedure for ${s.short}.`}
      >
        <Button
          variant="secondary"
          size="sm"
          icon={ExternalLink}
          onClick={() => setShowSource(true)}
        >
          Official Portal
        </Button>
      </PageHeader>

      <SchemePicker ctx={ctx} />

      {/* Timeline Steps Card */}
      <Card className="p-6">
        <ol className="relative space-y-6">
          {APPLICATION_STEPS.map((st, i) => {
            const isFirst = i === 0;
            const hasGaps = i === 0 && s.missing.length > 0;
            const hasMissingDocs = i === 1 && s.missingDocs.length > 0;

            return (
              <li key={st.title} className="relative flex gap-4 last:pb-0">
                {/* Vertical connecting line */}
                {i < APPLICATION_STEPS.length - 1 && (
                  <span
                    className="absolute left-4 top-8 h-full w-0.5 bg-slate-200"
                    aria-hidden="true"
                  />
                )}

                {/* Step badge */}
                <span className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-xs font-mono font-bold text-brand-400 shadow-2xs">
                  0{i + 1}
                </span>

                <div className="flex-1 pt-0.5 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-bold text-slate-900">{st.title}</p>
                    {hasGaps && (
                      <Badge tone="amber" className="text-[10px]">Action Needed</Badge>
                    )}
                    {hasMissingDocs && (
                      <Badge tone="amber" className="text-[10px]">Docs Incomplete</Badge>
                    )}
                  </div>

                  <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                    {i === 0 && s.missing.length
                      ? `${s.missing.length} statutory condition(s) currently unmet. Review eligibility details before filing.`
                      : i === 1 && s.missingDocs.length
                      ? `${s.missingDocs.length} required document(s) still missing from your profile.`
                      : st.text}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </Card>

      {/* Official Government Advisory Notice */}
      <div className="flex items-start gap-3 rounded-xl border border-amber-200/90 bg-amber-50/70 p-4 text-xs text-amber-900 leading-relaxed shadow-2xs">
        <AlertTriangle size={18} className="mt-0.5 shrink-0 text-amber-700" />
        <div>
          <span className="font-bold text-amber-950 block mb-0.5">Statutory Filing Disclaimer</span>
          Always cross-reference the latest application dates, gazette circulars, and nodal bank guidelines on the official portal before initiating financial commitments.
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-1">
        <Button onClick={() => ctx.go('dashboard')} iconRight={ArrowRight}>
          Return to Dashboard
        </Button>
        <Button variant="secondary" onClick={() => ctx.go('documents')}>
          Review Required Documents
        </Button>
      </div>

      <DemoBanner />
      {showSource && <SourceDialog scheme={s} onClose={() => setShowSource(false)} />}
    </div>
  );
}
