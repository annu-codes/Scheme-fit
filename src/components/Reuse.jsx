import { CheckCircle2, Upload, FileCheck2, UserCheck, Check, ArrowRight } from 'lucide-react';
import { Button, Card, StatusIcon } from './ui';
import { DOCUMENTS } from '../data/schemes';
import { labelOf } from '../lib/matching';

export function DocReuse({ ctx, s }) {
  const ready = s.documents.filter((d) => ctx.docs[d]);
  const reused = ctx.reused[s.id];

  return (
    <Card className="p-5 flex flex-col justify-between shadow-card">
      <div>
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
              <FileCheck2 size={16} />
            </span>
            <h3 className="text-xs font-bold text-slate-900">Document Reuse Engine</h3>
          </div>
          <span className="font-mono text-xs font-bold text-slate-700">
            {ready.length}/{s.documents.length} Ready
          </span>
        </div>

        <ul className="space-y-2.5 text-xs">
          {s.documents.map((d) => {
            const has = ctx.docs[d];
            return (
              <li
                key={d}
                className="flex items-center justify-between gap-2 p-2 rounded-lg bg-slate-50/70 border border-slate-100"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <StatusIcon status={has ? 'met' : 'warn'} size={15} />
                  <div className="min-w-0">
                    <span className="font-semibold text-slate-900 block truncate">{DOCUMENTS[d].label}</span>
                    <span className={`text-[10px] font-medium block ${has ? 'text-emerald-700' : 'text-amber-700'}`}>
                      {has ? 'Available from Profile' : 'Not uploaded yet'}
                    </span>
                  </div>
                </div>

                {!has && (
                  <button
                    onClick={() => ctx.setDoc(d, true)}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-700 hover:text-brand-900 bg-white border border-slate-200 px-2 py-1 rounded-md shrink-0 shadow-2xs"
                  >
                    <Upload size={11} />
                    <span>Upload</span>
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
        {reused ? (
          <div className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 p-2.5 text-xs font-semibold text-emerald-900 animate-fade-in">
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
            <span>Documents successfully bound to this application.</span>
          </div>
        ) : (
          <Button
            size="sm"
            className="w-full text-xs font-semibold"
            disabled={!ready.length}
            onClick={() => ctx.markReused(s.id)}
            icon={Check}
          >
            Attach Saved Documents ({ready.length})
          </Button>
        )}
        <Button
          variant="ghost"
          size="sm"
          className="w-full text-xs text-slate-500 hover:text-slate-900"
          onClick={() => ctx.go('documents')}
        >
          Manage All Documents →
        </Button>
      </div>
    </Card>
  );
}

export function AutoFill({ ctx, s }) {
  const p = ctx.profile;
  const rows = [
    ['Enterprise Structure', labelOf('businessType', p.businessType)],
    ['State of Incorporation', p.state],
    ['Industry Sector', labelOf('industry', p.industry)],
    ['Statutory Registration', p.registered === 'yes' ? 'Registered MSME' : 'Not registered'],
    ['Turnover Bracket', labelOf('turnover', p.turnover)],
  ];

  const autofilled = ctx.autofilled[s.id];

  return (
    <Card className="p-5 flex flex-col justify-between shadow-card">
      <div>
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-brand-50 text-brand-600">
              <UserCheck size={16} />
            </span>
            <h3 className="text-xs font-bold text-slate-900">Application Auto-Fill</h3>
          </div>
          <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-semibold">
            Ready
          </span>
        </div>

        <p className="text-[11px] text-slate-500 mb-2.5">
          Credentials ready to map directly into the official ministry form:
        </p>

        <ul className="space-y-2 text-xs">
          {rows.map(([k, v]) => (
            <li
              key={k}
              className="flex items-center justify-between gap-2 p-2 rounded-lg bg-slate-50/70 border border-slate-100"
            >
              <span className="text-slate-500 font-medium">{k}:</span>
              <span className="font-semibold text-slate-900 truncate">{v || '—'}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100">
        {autofilled ? (
          <div className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 p-2.5 text-xs font-semibold text-emerald-900 animate-fade-in">
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
            <span>Profile credentials pre-filled into draft form.</span>
          </div>
        ) : (
          <Button
            variant="secondary"
            size="sm"
            className="w-full text-xs font-semibold"
            onClick={() => ctx.markAutofill(s.id)}
            icon={UserCheck}
          >
            Auto-fill Portal Form
          </Button>
        )}
      </div>
    </Card>
  );
}
