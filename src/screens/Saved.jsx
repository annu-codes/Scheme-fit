import { Bookmark, BookmarkCheck, ArrowRight, BookOpenCheck } from 'lucide-react';
import { Button, Card, DemoBanner, PageHeader } from '../components/ui';
import { CompareBar, SchemeGrid } from './Matches';

export default function Saved({ ctx }) {
  const items = ctx.schemes.filter((s) => ctx.saved.includes(s.id));

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Saved Schemes"
        subtitle="Bookmarked schemes for fast review, comparison, and preparation."
      >
        <Button variant="secondary" size="sm" onClick={() => ctx.go('matches')}>
          Browse All Matches
        </Button>
      </PageHeader>

      <DemoBanner />

      {items.length === 0 ? (
        <Card className="flex flex-col items-center justify-center py-16 text-center border-dashed border-2 border-slate-200">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 mb-4 border border-amber-200">
            <Bookmark size={24} />
          </div>
          <h3 className="text-base font-bold text-slate-900">No saved schemes yet</h3>
          <p className="mt-1 text-xs text-slate-500 max-w-sm leading-relaxed">
            While reviewing your matches, tap the bookmark icon on any scheme card to save it to your personal shortlist.
          </p>
          <Button
            size="md"
            className="mt-5"
            onClick={() => ctx.go('matches')}
            iconRight={ArrowRight}
          >
            Explore Scheme Matches
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>{items.length} bookmarked scheme{items.length > 1 ? 's' : ''} in your shortlist</span>
          </div>
          <SchemeGrid items={items} ctx={ctx} />
        </div>
      )}

      <CompareBar ctx={ctx} />
    </div>
  );
}
