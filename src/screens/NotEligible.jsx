import { AlertTriangle, ArrowRight, BookOpen, ChevronRight, HelpCircle } from 'lucide-react';
import { BackLink, Button, Card, DemoBanner, PageHeader, Badge } from '../components/ui';
import { EligibilityTracker, MissingExplainer } from '../components/Eligibility';

export default function NotEligible({ ctx }) {
  const s = ctx.selected;
  if (!s) return null;

  return (
    <div className="mx-auto max-w-2xl animate-fade-in space-y-6">
      <div>
        <BackLink onClick={() => ctx.go('matches')}>Back to Matches</BackLink>
        <div className="flex items-center gap-2 mb-1.5">
          <Badge tone="red">Eligibility Gap Detected</Badge>
          <span className="text-xs text-slate-500 font-mono">{s.score}% Match</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Qualification & Gap Breakdown
        </h1>
        <p className="mt-1 text-xs text-slate-500">
          Analysis for: <span className="font-semibold text-slate-800">{s.name}</span>
        </p>
      </div>

      <div className="rounded-xl border border-amber-200/90 bg-amber-50/70 p-4 text-xs text-amber-900 leading-relaxed">
        <div className="flex items-center gap-2 font-bold mb-1">
          <AlertTriangle size={15} className="text-amber-700 shrink-0" />
          <span>Why is this flagged as not eligible?</span>
        </div>
        <p>
          Government schemes enforce statutory eligibility thresholds (e.g. registration duration, turnover limits, or enterprise constitution). Review the exact shortfalls below to understand what is needed before applying.
        </p>
      </div>

      <div className="space-y-4">
        <EligibilityTracker s={s} />
        <MissingExplainer ctx={ctx} s={s} />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Button
          variant="secondary"
          onClick={() => ctx.go('details')}
          iconRight={ArrowRight}
        >
          View Full Scheme Specifications
        </Button>
        <Button
          onClick={() => ctx.go('alternatives', { from: s.id })}
          iconRight={ArrowRight}
        >
          Explore Qualified Alternatives
        </Button>
      </div>

      <DemoBanner />
    </div>
  );
}
