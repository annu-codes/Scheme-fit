import { AlertTriangle, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { AiTag, BackLink, DemoBanner, PageHeader, Card, Badge } from '../components/ui';
import { alternativesFor } from '../lib/matching';
import { CompareBar, SchemeGrid } from './Matches';

export default function Alternatives({ ctx }) {
  const items = alternativesFor(ctx.schemes, ctx.fromId);

  return (
    <div className="space-y-6 animate-fade-in">
      <BackLink
        onClick={() =>
          ctx.fromId ? ctx.go('details', { id: ctx.fromId }) : ctx.go('matches')
        }
      >
        {ctx.fromId ? 'Back to Scheme Details' : 'Back to Matches'}
      </BackLink>

      {ctx.fromScheme && ctx.fromScheme.score < 90 && (
        <div className="rounded-xl border border-amber-200/90 bg-amber-50/70 p-4 shadow-2xs">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
            <AlertTriangle size={15} className="text-amber-700" />
            <span>Target Scheme Status: {ctx.fromScheme.short}</span>
          </div>
          <p className="mt-1 text-xs text-amber-800 leading-relaxed">
            {ctx.fromScheme.score}% Match with {ctx.fromScheme.missing.length} unmet statutory condition{ctx.fromScheme.missing.length === 1 ? '' : 's'}. We recommend reviewing the alternative schemes below which match your current enterprise maturity.
          </p>
        </div>
      )}

      <PageHeader
        title={
          ctx.fromScheme && ctx.fromScheme.score < 90
            ? 'Recommended Alternative Schemes'
            : 'Better Matches for Your Enterprise'
        }
        subtitle="These government initiatives have eligibility criteria aligned directly with your current business structure, sector, and turnover."
      >
        <AiTag />
      </PageHeader>

      <SchemeGrid items={items} ctx={ctx} variant="alt" />

      <DemoBanner />
      <CompareBar ctx={ctx} />
    </div>
  );
}
