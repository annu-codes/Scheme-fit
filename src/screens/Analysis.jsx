import { useEffect, useState } from 'react';
import { Check, Loader2, Sparkles, ShieldCheck, Database, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button, Card } from '../components/ui';

const STEPS = [
  {
    title: 'Reading Business Profile',
    desc: 'Parsing turnover band, stage, registration age, and sector requirements',
  },
  {
    title: 'Executing Deterministic Matching',
    desc: 'Evaluating hard and soft criteria against active scheme criteria',
  },
  {
    title: 'Calculating Eligibility Fit Scores',
    desc: 'Ranking by exact qualification percentage and prioritizing best fits',
  },
  {
    title: 'Analyzing Gaps & Alternative Routes',
    desc: 'Synthesizing plain-language guidance and document checklists',
  },
];

export default function Analysis({ onDone }) {
  const [done, setDone] = useState(0);

  useEffect(() => {
    if (done >= STEPS.length) return undefined;
    const t = setTimeout(() => setDone((d) => d + 1), 750);
    return () => clearTimeout(t);
  }, [done]);

  const finished = done >= STEPS.length;
  const progressPct = Math.round((done / STEPS.length) * 100);

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-12 sm:py-16 text-center animate-fade-in">
      {/* Central Indicator */}
      <div className="relative mb-6">
        <div
          className={`flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-300 shadow-md ${
            finished
              ? 'bg-emerald-600 text-white shadow-emerald-200'
              : 'bg-slate-900 text-brand-400 shadow-slate-300'
          }`}
        >
          {finished ? (
            <Check size={32} className="stroke-[2.5]" />
          ) : (
            <Sparkles size={28} className="animate-pulse" />
          )}
        </div>
      </div>

      <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        {finished ? 'Eligibility Analysis Complete' : 'Evaluating Your Schemes'}
      </h1>

      <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-sm">
        {finished
          ? 'Your personalized scheme recommendations and action plans are ready.'
          : 'Running local deterministic evaluation across central & state schemes.'}
      </p>

      {/* Progress & Steps Card */}
      <Card className="mt-8 w-full p-6 text-left shadow-card">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-xs font-semibold text-slate-600 mb-2">
            <span>Overall Evaluation Progress</span>
            <span className="font-mono">{progressPct}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                finished ? 'bg-emerald-500' : 'bg-brand-600'
              }`}
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Step Items */}
        <ul className="space-y-4">
          {STEPS.map((step, i) => {
            const isDone = i < done;
            const isActive = i === done;
            const isPending = i > done;

            return (
              <li
                key={step.title}
                className={`flex items-start gap-3 transition-opacity duration-300 ${
                  isPending ? 'opacity-35' : 'opacity-100'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isDone ? (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white">
                      <Check size={12} className="stroke-[3]" />
                    </span>
                  ) : isActive ? (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-50 border border-brand-200 text-brand-600">
                      <Loader2 size={12} className="animate-spin text-brand-600" />
                    </span>
                  ) : (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-300" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-900 leading-tight">
                    {step.title}
                  </p>
                  <p className="mt-0.5 text-[11px] text-slate-500 leading-snug">
                    {step.desc}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Audit footer */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={13} className="text-emerald-600" />
            100% In-Browser Privacy
          </span>
          <span className="font-mono">8 Schemes Analyzed</span>
        </div>
      </Card>

      {/* Primary Action Button */}
      <div className="mt-6 w-full">
        <Button
          size="lg"
          className="w-full font-semibold text-sm shadow-md"
          disabled={!finished}
          onClick={onDone}
          iconRight={ArrowRight}
        >
          {finished ? 'View Scheme Matches & Next Steps' : 'Analyzing...'}
        </Button>
      </div>
    </div>
  );
}
