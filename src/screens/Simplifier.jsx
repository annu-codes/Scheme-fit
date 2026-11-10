import { useState } from 'react';
import { Loader2, Sparkles, BookOpen, Search, ArrowRight, Check, HelpCircle } from 'lucide-react';
import { AiTag, Badge, Button, Card, DemoBanner, PageHeader } from '../components/ui';
import { GLOSSARY } from '../data/glossary';

const findTerms = (text) => {
  const t = text.toLowerCase();
  return GLOSSARY.filter((g) => t.includes(g.term.toLowerCase()));
};

export default function Simplifier() {
  const [term, setTerm] = useState(GLOSSARY[0]);
  const [state, setState] = useState('done'); // Default to done so user immediately sees rich content
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const pick = (g) => {
    setTerm(g);
    setState('done');
  };

  const simplify = () => {
    setState('working');
    setTimeout(() => setState('done'), 500);
  };

  const submit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setResult(findTerms(input));
  };

  return (
    <div className="mx-auto max-w-2xl animate-fade-in space-y-6">
      <PageHeader
        title="Government Jargon Simplifier"
        subtitle="Translate complex bureaucratic policy terminology and scheme gazette language into clear, citizen-friendly explanations."
      />

      {/* Term Quick Selector Pills */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Common Scheme Terminology:
          </span>
          <span className="text-[11px] text-slate-400 font-mono">{GLOSSARY.length} terms</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {GLOSSARY.map((g) => {
            const isSelected = term.term === g.term;
            return (
              <button
                key={g.term}
                onClick={() => pick(g)}
                className={`rounded-full px-3 py-1 text-xs font-semibold border transition-all ${
                  isSelected
                    ? 'border-brand-600 bg-brand-50 text-brand-900 ring-1 ring-brand-500 shadow-2xs'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {g.term}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Term Breakdown Card */}
      <Card className="p-6">
        <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
              Selected Statutory Term
            </span>
            <h2 className="text-xl font-bold text-slate-900 leading-snug">{term.term}</h2>
          </div>
          <Badge tone="slate">Glossary Entry</Badge>
        </div>

        {/* Technical Definition */}
        <div className="mt-4">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Official Technical Definition
          </p>
          <blockquote className="mt-1.5 rounded-xl border border-slate-200 bg-slate-50/80 p-3.5 text-xs font-medium text-slate-700 leading-relaxed font-mono">
            "{term.technical}"
          </blockquote>
        </div>

        {/* Plain-Language Explanation */}
        <div className="mt-4">
          {state === 'done' ? (
            <div className="animate-fade-up rounded-xl border border-brand-200/90 bg-brand-50/70 p-4 shadow-2xs">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-900">
                  <Sparkles size={13} className="text-brand-600" />
                  Plain Citizen Language
                </span>
                <AiTag />
              </div>
              <p className="mt-2 text-xs font-semibold leading-relaxed text-brand-950 sm:text-sm">
                {term.simple}
              </p>
              <div className="mt-3 pt-2.5 border-t border-brand-200/60 text-[11px] text-brand-700 flex items-center gap-1.5">
                <Check size={12} className="stroke-[3]" />
                <span>Summary takeaway: {term.brief}</span>
              </div>
            </div>
          ) : (
            <Button size="sm" onClick={simplify} disabled={state === 'working'}>
              {state === 'working' ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Translating...
                </>
              ) : (
                <>
                  <Sparkles size={14} />
                  Explain in Plain Language
                </>
              )}
            </Button>
          )}
        </div>
      </Card>

      {/* Freeform Query Box */}
      <Card className="p-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Search Any Term or Clause
        </h3>
        <p className="mt-0.5 text-xs text-slate-500">
          Paste a clause or type a keyword (e.g., "moratorium", "subvention", "collateral")
        </p>

        <form onSubmit={submit} className="mt-3.5 flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setResult(null);
              }}
              placeholder="e.g. What does credit guarantee mean?"
              aria-label="Enter a term or sentence"
              className="w-full rounded-xl border border-slate-200/90 bg-white pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100 shadow-2xs"
            />
          </div>
          <Button type="submit" disabled={!input.trim()} icon={Sparkles}>
            Translate
          </Button>
        </form>

        {result && (
          <div className="mt-4 space-y-3 animate-fade-up">
            {result.length === 0 ? (
              <p className="text-xs text-slate-500 p-3 rounded-lg bg-slate-50 border border-slate-200">
                No predefined translation found for "{input}". Try terms from the glossary above like "collateral" or "moratorium".
              </p>
            ) : (
              result.map((g) => (
                <div
                  key={g.term}
                  className="rounded-xl border border-brand-200 bg-brand-50/70 p-4 text-xs shadow-2xs"
                >
                  <p className="font-bold text-brand-900 text-sm mb-1">{g.term}</p>
                  <p className="text-brand-950 leading-relaxed font-medium">{g.simple}</p>
                  <p className="mt-2 text-[11px] text-brand-700 italic border-t border-brand-200/50 pt-2">
                    Official technical meaning: "{g.technical}"
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </Card>

      <DemoBanner />
    </div>
  );
}
