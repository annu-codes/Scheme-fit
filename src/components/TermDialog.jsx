import { Sparkles, X, BookOpen, Check } from 'lucide-react';
import { AiTag, Button } from './ui';

export default function TermDialog({ term, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={`${term.term} in simple language`}
    >
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity" onClick={onClose} />
      <div className="relative w-full max-w-sm animate-fade-up rounded-2xl bg-white p-6 shadow-2xl border border-slate-200">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3.5 top-3.5 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
        >
          <X size={18} />
        </button>

        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
          Statutory Clause Definition
        </span>

        <h2 className="mt-1 text-lg font-bold text-slate-900 flex items-center gap-2">
          <span>{term.term}</span>
        </h2>

        <div className="mt-3.5 rounded-xl border border-brand-200/90 bg-brand-50/70 p-3.5 text-xs text-brand-950 font-medium leading-relaxed">
          <p className="font-bold text-brand-900 text-[11px] uppercase tracking-wider flex items-center gap-1.5 mb-1">
            <Sparkles size={12} className="text-brand-600" />
            Plain Citizen Translation
          </p>
          <p>{term.simple || term.brief}</p>
        </div>

        <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-[11px] text-slate-600 leading-relaxed font-mono">
          <span className="font-bold text-slate-700 block mb-0.5">Gazette Technical Language:</span>
          "{term.technical}"
        </div>

        <div className="mt-4 flex items-center justify-between">
          <AiTag />
          <Button size="sm" onClick={onClose} className="text-xs">
            Understood
          </Button>
        </div>
      </div>
    </div>
  );
}
