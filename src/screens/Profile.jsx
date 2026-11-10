import { useState } from 'react';
import {
  ArrowRight,
  Check,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Wand2,
  Building2,
  User,
  ShieldCheck,
  UploadCloud,
  FileCheck2,
  ChevronLeft,
} from 'lucide-react';
import { Button, Card, PageHeader, Badge } from '../components/ui';
import { DOCUMENTS, OPTIONS, SAMPLE_PROFILE } from '../data/schemes';
import { labelOf } from '../lib/matching';

const inputCls =
  'mt-1.5 w-full rounded-xl border border-slate-200/90 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100 shadow-2xs transition-all';

function Field({ label, hint, children }) {
  return (
    <label className="block text-xs font-semibold text-slate-700">
      <div className="flex items-center justify-between">
        <span>{label}</span>
        {hint && <span className="text-[11px] font-normal text-slate-400">{hint}</span>}
      </div>
      {children}
    </label>
  );
}

function Select({ label, value, onChange, options, placeholder, hint }) {
  return (
    <Field label={label} hint={hint}>
      <select className={inputCls} value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">{placeholder || 'Select option…'}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </Field>
  );
}

function ChoiceCards({ label, value, onChange, options, cols = 'sm:grid-cols-2', hint }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-semibold text-slate-700">{label}</span>
        {hint && <span className="text-[11px] text-slate-400">{hint}</span>}
      </div>
      <div className={`grid gap-2.5 ${cols}`} role="radiogroup" aria-label={label}>
        {options.map((o) => {
          const on = value === o.value;
          return (
            <button
              key={o.value}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => onChange(o.value)}
              className={`group flex items-start justify-between rounded-xl border p-3 text-left transition-all duration-150 ${
                on
                  ? 'border-brand-600 bg-brand-50/60 ring-1 ring-brand-600 shadow-2xs'
                  : 'border-slate-200/90 bg-white hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div>
                <span className={`block text-xs font-bold ${on ? 'text-brand-900' : 'text-slate-800'}`}>
                  {o.label}
                </span>
                {o.hint && (
                  <span className={`block text-[11px] mt-0.5 ${on ? 'text-brand-700' : 'text-slate-500'}`}>
                    {o.hint}
                  </span>
                )}
              </div>
              <span
                className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors ${
                  on ? 'border-brand-600 bg-brand-600 text-white' : 'border-slate-300 bg-white'
                }`}
              >
                {on && <Check size={10} className="stroke-[3]" />}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

const Section = ({ title, desc, children }) => (
  <Card className="space-y-4 p-5 sm:p-6">
    <div className="border-b border-slate-100 pb-3">
      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">{title}</h2>
      {desc && <p className="mt-0.5 text-xs text-slate-500">{desc}</p>}
    </div>
    {children}
  </Card>
);

const FILES = {
  registration: 'Business_Registration_Certificate.pdf',
  identity: 'Proprietor_Aadhaar_PAN_Proof.pdf',
  bank: 'Bank_Account_Statement_6M.pdf',
  sector: 'Trade_License_Sector_Certificate.pdf',
  income: 'Income_Tax_GST_Return.pdf',
  category: 'Category_Affidavit_Certificate.pdf',
};

function ReusableProfile({ profile: p, docs, setDoc }) {
  const info = [
    ['Entrepreneur Name', p.name],
    ['Jurisdiction / State', p.state],
    ['Social Category', labelOf('category', p.category)],
    ['Business Enterprise Type', labelOf('businessType', p.businessType)],
    ['Industry Sector', labelOf('industry', p.industry)],
    ['Annual Turnover Band', labelOf('turnover', p.turnover)],
    ['Registration Age', p.registered === 'yes' ? `${p.registrationMonths || 0} months active` : 'Not registered'],
    ['Location Type', labelOf('location', p.location)],
  ];

  return (
    <div className="mb-8 space-y-4">
      <div className="rounded-xl border border-brand-200 bg-brand-50/50 p-4">
        <h3 className="text-sm font-bold text-brand-900">Reusable Profile Engine (Enter Once → Reuse Everywhere)</h3>
        <p className="mt-1 text-xs text-brand-700">
          Your saved information automatically matches all central and state schemes without repetitive form filing.
        </p>
      </div>

      <Card className="p-5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-2">
          Current Saved Profile Credentials
        </h3>
        <ul className="mt-3.5 grid gap-3 sm:grid-cols-2">
          {info.map(([k, v]) => (
            <li key={k} className="flex items-center justify-between gap-2 text-xs">
              <span className="text-slate-500 font-medium">{k}:</span>
              <span className="font-semibold text-slate-900 truncate">{v || '—'}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card className="p-5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-2">
          Reusable Compliance Documents
        </h3>
        <div className="mt-3.5 grid gap-3 sm:grid-cols-2">
          {Object.keys(DOCUMENTS).map((d) => {
            const up = docs[d];
            return (
              <div
                key={d}
                className="flex items-center justify-between gap-3 rounded-xl border border-slate-200/80 p-3 bg-white"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className={`p-2 rounded-lg ${up ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                    <FileText size={16} />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-slate-900">{DOCUMENTS[d].label}</p>
                    <p className="text-[10px] text-slate-400 truncate">{FILES[d]}</p>
                  </div>
                </div>
                <button
                  onClick={() => setDoc(d, !up)}
                  className={`text-xs font-semibold px-2 py-1 rounded transition-colors ${
                    up
                      ? 'text-rose-600 hover:bg-rose-50'
                      : 'text-brand-600 bg-brand-50 hover:bg-brand-100'
                  }`}
                >
                  {up ? 'Remove' : 'Mark Ready'}
                </button>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

export default function Profile({ profile, setProfile, onSubmit, editing, docs, setDoc }) {
  const [step, setStep] = useState(1);
  const [tried, setTried] = useState(false);
  const set = (k) => (v) => setProfile((p) => ({ ...p, [k]: v }));
  const p = profile;

  const step1Ok =
    p.name.trim() &&
    p.state &&
    p.category &&
    p.businessType &&
    p.industry &&
    p.stage &&
    p.turnover &&
    p.location &&
    p.registered &&
    (p.registered === 'no' || (p.registrationMonths !== '' && Number(p.registrationMonths) >= 0));

  const step2Ok = p.support.length > 0;

  const toggleSupport = (v) =>
    setProfile((pr) => ({
      ...pr,
      support: pr.support.includes(v) ? pr.support.filter((s) => s !== v) : [...pr.support, v],
    }));

  const next = () => {
    setTried(true);
    if (step1Ok) {
      setStep(2);
      setTried(false);
      window.scrollTo({ top: 0 });
    }
  };

  const next2 = () => {
    setTried(true);
    if (step2Ok) {
      setStep(3);
      setTried(false);
      window.scrollTo({ top: 0 });
    }
  };

  const STEPS_NAV = [
    { n: 1, title: 'Enterprise Details' },
    { n: 2, title: 'Support Requirements' },
    { n: 3, title: 'Verified Documents' },
  ];

  return (
    <div className="mx-auto max-w-2xl animate-fade-in">
      {/* Visual Stepper */}
      <div className="mb-8">
        <div className="grid grid-cols-3 gap-2">
          {STEPS_NAV.map((s) => {
            const isDone = s.n < step;
            const isCurr = s.n === step;
            return (
              <div
                key={s.n}
                className={`relative rounded-xl border p-2.5 sm:p-3 text-left transition-all ${
                  isCurr
                    ? 'border-slate-900 bg-white shadow-xs'
                    : isDone
                    ? 'border-emerald-200 bg-emerald-50/50'
                    : 'border-slate-200/80 bg-slate-50/70 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                    Step {s.n}
                  </span>
                  {isDone ? (
                    <CheckCircle2 size={13} className="text-emerald-600" />
                  ) : isCurr ? (
                    <span className="h-2 w-2 rounded-full bg-brand-600" />
                  ) : null}
                </div>
                <p className="text-xs font-bold text-slate-800 truncate">{s.title}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Editing existing profile banner */}
      {editing && <ReusableProfile profile={profile} docs={docs} setDoc={setDoc} />}

      {/* Page Header */}
      <PageHeader
        title={editing ? 'Update Business Profile' : 'Tell Us About Your Business'}
        subtitle="Your inputs are processed locally to compute deterministic scheme eligibility."
      >
        <Button
          variant="secondary"
          size="sm"
          icon={Wand2}
          onClick={() => {
            setProfile(SAMPLE_PROFILE);
            setTried(false);
          }}
        >
          Load Demo Sample
        </Button>
      </PageHeader>

      {/* Step 1: Enterprise Profile */}
      {step === 1 && (
        <div className="animate-fade-up space-y-5">
          <Section title="Applicant Identity" desc="Official name and beneficiary classification">
            <Field label="Full Legal Name / Business Representative">
              <input
                className={inputCls}
                value={p.name}
                onChange={(e) => set('name')(e.target.value)}
                placeholder="e.g. Priya Sharma"
              />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Select
                label="State / Union Territory"
                value={p.state}
                onChange={set('state')}
                options={OPTIONS.state}
              />
              <Select
                label="Entrepreneur Category"
                value={p.category}
                onChange={set('category')}
                options={OPTIONS.category}
              />
            </div>
          </Section>

          <Section title="Business Classification" desc="Operational stage, structure, and revenue scale">
            <ChoiceCards
              label="Enterprise Constitution"
              value={p.businessType}
              onChange={set('businessType')}
              options={OPTIONS.businessType}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <Select
                label="Industry Sector"
                value={p.industry}
                onChange={set('industry')}
                options={OPTIONS.industry}
              />
              <Select
                label="Business Maturity Stage"
                value={p.stage}
                onChange={set('stage')}
                options={OPTIONS.stage}
              />
              <Select
                label="Annual Turnover Range"
                value={p.turnover}
                onChange={set('turnover')}
                options={OPTIONS.turnover}
              />
            </div>

            <ChoiceCards
              label="Location Classification"
              value={p.location}
              onChange={set('location')}
              options={OPTIONS.location}
              cols="grid-cols-3"
            />

            <ChoiceCards
              label="Statutory Registration Status"
              value={p.registered}
              onChange={set('registered')}
              options={[
                { value: 'yes', label: 'Registered Enterprise', hint: 'Udyam / MSME / GST' },
                { value: 'no', label: 'Unregistered / In Progress', hint: 'Solo or informal unit' },
              ]}
            />

            {p.registered === 'yes' && (
              <Field label="Continuous Registration Period (Months)" hint="Used to verify scheme minimum age cutoffs">
                <input
                  type="number"
                  min="0"
                  className={inputCls}
                  value={p.registrationMonths}
                  onChange={(e) => set('registrationMonths')(e.target.value)}
                  placeholder="e.g. 12"
                />
              </Field>
            )}
          </Section>

          {tried && !step1Ok && (
            <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-medium text-rose-700">
              <AlertTriangle size={15} className="shrink-0" />
              <span>Please complete all required fields or click "Load Demo Sample" to proceed.</span>
            </div>
          )}

          <div className="flex justify-end pt-2">
            <Button size="lg" onClick={next} iconRight={ArrowRight}>
              Continue: Support Requirements
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Support Requirements */}
      {step === 2 && (
        <div className="animate-fade-up space-y-5">
          <Section
            title="Assistance Required"
            desc="Select all government support mechanisms your enterprise seeks"
          >
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {OPTIONS.support.map((o) => {
                const on = p.support.includes(o.value);
                return (
                  <button
                    key={o.value}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggleSupport(o.value)}
                    className={`relative rounded-xl border p-3.5 text-left transition-all ${
                      on
                        ? 'border-brand-600 bg-brand-50/70 ring-1 ring-brand-600 shadow-2xs'
                        : 'border-slate-200/90 bg-white hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-xs font-bold ${on ? 'text-brand-900' : 'text-slate-800'}`}>
                        {o.label}
                      </span>
                      <span
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                          on ? 'border-brand-600 bg-brand-600 text-white' : 'border-slate-300 bg-white'
                        }`}
                      >
                        {on && <Check size={10} className="stroke-[3]" />}
                      </span>
                    </div>
                    <span className={`block text-[11px] leading-tight ${on ? 'text-brand-700' : 'text-slate-500'}`}>
                      {o.hint}
                    </span>
                  </button>
                );
              })}
            </div>
          </Section>

          {tried && !step2Ok && (
            <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-medium text-rose-700">
              <AlertTriangle size={15} className="shrink-0" />
              <span>Please select at least one type of support to calculate scheme match.</span>
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <Button variant="secondary" onClick={() => setStep(1)} icon={ChevronLeft}>
              Back
            </Button>
            <Button size="lg" onClick={next2} iconRight={ArrowRight}>
              Continue: Document Verification
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Verified Documents */}
      {step === 3 && (
        <div className="animate-fade-up space-y-5">
          <Section
            title="Available Documents"
            desc="Toggle the statutory documents you currently have available. They will automatically be reused across all scheme applications."
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {Object.keys(DOCUMENTS).map((d) => {
                const up = docs[d];
                return (
                  <div
                    key={d}
                    className="flex items-center justify-between gap-3 rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-2xs"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className={`p-2 rounded-lg ${up ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                        <FileText size={18} />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-xs font-bold text-slate-900">{DOCUMENTS[d].label}</p>
                        <p className="text-[10px] text-slate-500 truncate">{DOCUMENTS[d].hint}</p>
                        <span className={`mt-0.5 inline-flex items-center gap-1 text-[10px] font-semibold ${up ? 'text-emerald-700' : 'text-amber-700'}`}>
                          {up ? <><Check size={10} />Ready on file</> : <><AlertTriangle size={10} />Missing</>}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setDoc(d, !up)}
                      className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg border transition-colors ${
                        up
                          ? 'border-slate-200 text-slate-600 hover:bg-slate-50'
                          : 'border-brand-500 bg-brand-50 text-brand-700 hover:bg-brand-100'
                      }`}
                    >
                      {up ? 'Undo' : 'Mark Ready'}
                    </button>
                  </div>
                );
              })}
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              Note: This is a hackathon simulation. No real files are transmitted or stored on remote servers.
            </p>
          </Section>

          <div className="flex items-center justify-between pt-2">
            <Button variant="secondary" onClick={() => setStep(2)} icon={ChevronLeft}>
              Back
            </Button>
            <Button size="lg" variant="brand" onClick={onSubmit} iconRight={ArrowRight}>
              Run Deterministic Scheme Evaluation
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
