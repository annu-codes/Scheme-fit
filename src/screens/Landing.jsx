import {
  ArrowRight,
  ClipboardList,
  Cpu,
  ListChecks,
  Sparkles,
  ShieldCheck,
  Footprints,
  CheckCircle2,
  Building2,
  FileCheck2,
  HelpCircle,
  TrendingUp,
} from 'lucide-react';
import { Button, Card, DemoBanner } from '../components/ui';

const FLOW = [
  {
    step: '01',
    icon: ClipboardList,
    title: 'Your Business Profile',
    desc: 'Provide your business size, sector, turnover, and support requirements in 60 seconds.',
  },
  {
    step: '02',
    icon: Cpu,
    title: 'Rule-Based Evaluation',
    desc: 'Our deterministic algorithm cross-references eligibility conditions across government schemes.',
  },
  {
    step: '03',
    icon: ListChecks,
    title: 'Precision Scheme Fit',
    desc: 'Receive ranked matches, clear gap analyses, document requirements, and application guides.',
  },
];

const FEATURES = [
  {
    icon: Sparkles,
    title: 'Explainable AI Matching',
    desc: 'No black-box hallucination. Transparent mathematical fit scores and human-readable criteria verification.',
  },
  {
    icon: ShieldCheck,
    title: 'Gap & Eligibility Analysis',
    desc: 'Know why a scheme doesn’t fit yet and get intelligent alternative suggestions tailored to your stage.',
  },
  {
    icon: FileCheck2,
    title: 'Document Reuse & Auto-Fill',
    desc: 'Input registration and financial documents once. Reuse them across every eligible state & central scheme.',
  },
];

const STATS = [
  { label: 'Scheme Criteria Evaluated', value: '100% Deterministic' },
  { label: 'Data Privacy', value: 'Zero Server Storage' },
  { label: 'Time Saved per Search', value: '~4 Hours' },
];

export default function Landing({ go }) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12 animate-fade-in">
      {/* Hero Section */}
      <section className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/90 bg-white px-3.5 py-1 text-xs font-semibold text-slate-700 shadow-2xs">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>National Citizen & MSME Scheme Discovery</span>
        </div>

        <h1 className="mx-auto mt-6 max-w-3xl text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl sm:leading-[1.15]">
          Find Government Schemes That Fit Your Business With Confidence
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base text-slate-600 sm:text-lg leading-relaxed">
          Demystify central and state entrepreneurship initiatives. Enter your business details once to receive verified compatibility, plain-language criteria explanations, and step-by-step application guidance.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            size="lg"
            className="w-full sm:w-auto px-6 py-3 font-semibold text-sm"
            onClick={() => go('profile')}
            iconRight={ArrowRight}
          >
            Start Eligibility Match
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto px-6 py-3 text-sm font-semibold"
            onClick={() => go('explore')}
          >
            Explore Scheme Catalog
          </Button>
        </div>

        {/* Quick Highlights / Stats */}
        <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 divide-y divide-slate-200/80 rounded-2xl border border-slate-200/90 bg-white shadow-card sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {STATS.map((s) => (
            <div key={s.label} className="p-4 sm:p-5 text-center">
              <p className="text-lg font-bold text-slate-900 font-mono tracking-tight">{s.value}</p>
              <p className="mt-0.5 text-xs font-medium text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3-Step Process */}
      <section className="mt-16 sm:mt-24">
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-wider text-brand-700">How It Works</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            A Transparent 3-Step Discovery Engine
          </h2>
          <p className="mt-2 text-sm text-slate-600 max-w-xl mx-auto">
            From initial business input to an actionable submission roadmap in under two minutes.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {FLOW.map(({ step, icon: Icon, title, desc }) => (
            <div
              key={step}
              className="relative rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card hover:shadow-card-hover transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-brand-400 font-mono font-bold text-sm">
                  <Icon size={18} />
                </span>
                <span className="text-2xl font-mono font-extrabold text-slate-300">
                  {step}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900">{title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Value Pillars */}
      <section className="mt-16 sm:mt-24">
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-wider text-brand-700">Enterprise Capabilities</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Engineered For Clarity and Trust
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <Card key={title} hover className="flex flex-col justify-between p-6">
              <div>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 border border-brand-100 text-brand-700">
                  <Icon size={20} />
                </span>
                <h3 className="mt-4 text-base font-bold text-slate-900">{title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">{desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Bottom CTA Box */}
      <section className="mt-16 sm:mt-20 rounded-2xl border border-slate-900 bg-slate-900 p-8 sm:p-10 text-white text-center shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold sm:text-3xl tracking-tight">
            Ready to find the support your business qualifies for?
          </h2>
          <p className="mt-3 text-sm text-slate-300 leading-relaxed">
            Try with your own business credentials or click below to launch instantly with our pre-loaded sample profile.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              variant="brand"
              size="lg"
              className="w-full sm:w-auto px-6 py-2.5 font-semibold text-sm"
              onClick={() => go('profile')}
              iconRight={ArrowRight}
            >
              Get Started Now
            </Button>
          </div>
        </div>
      </section>

      {/* Demo notice banner */}
      <div className="mt-12">
        <DemoBanner />
      </div>
    </div>
  );
}
