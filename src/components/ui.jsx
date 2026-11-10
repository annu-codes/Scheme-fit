import {
  AlertTriangle, Banknote, BookOpen, Building2, CheckCircle2, Circle, Clock, FileText, Percent,
  Store, TrendingUp, Users, Info, Sparkles, Check, Bookmark, BookmarkCheck, ArrowLeftRight, XCircle,
  ShieldCheck, ArrowRight, CheckCircle, ChevronRight, HelpCircle
} from 'lucide-react';
import { STATUS } from '../lib/matching';
import { DEMO_NOTICE } from '../data/schemes';

export const BENEFIT_ICONS = {
  wallet: Banknote,
  percent: Percent,
  trending: TrendingUp,
  file: FileText,
  users: Users,
  store: Store,
  building: Building2,
  book: BookOpen,
  clock: Clock,
  check: CheckCircle2,
};

const cx = (...a) => a.filter(Boolean).join(' ');

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  iconRight: IconRight,
  children,
  ...rest
}) {
  const base = 'inline-flex items-center justify-center font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 select-none active:scale-[0.985]';

  const sizes = {
    sm: 'text-xs px-2.5 py-1.5 rounded-lg gap-1.5',
    md: 'text-sm px-3.5 py-2 rounded-lg gap-2',
    lg: 'text-base px-5 py-2.5 rounded-xl gap-2.5 shadow-sm',
  };

  const variants = {
    primary:
      'bg-slate-900 text-white hover:bg-slate-800 shadow-[0_1px_2px_rgba(15,23,42,0.12)] border border-slate-900 focus-visible:ring-slate-900',
    brand:
      'bg-brand-600 text-white hover:bg-brand-700 shadow-sm border border-brand-600 focus-visible:ring-brand-500',
    secondary:
      'bg-white text-slate-700 border border-slate-200/90 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 shadow-xs focus-visible:ring-slate-400',
    ghost:
      'text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-slate-400 border border-transparent',
    outline:
      'bg-transparent text-slate-700 border border-slate-300 hover:bg-slate-50 focus-visible:ring-slate-400',
    success:
      'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm border border-emerald-600 focus-visible:ring-emerald-500',
  };

  return (
    <button
      className={cx(base, sizes[size] || sizes.md, variants[variant] || variants.primary, className)}
      {...rest}
    >
      {Icon && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} className="shrink-0" />}
      {children}
      {IconRight && <IconRight size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} className="shrink-0" />}
    </button>
  );
}

const TONES = {
  brand: 'bg-brand-50 text-brand-700 ring-brand-300/70 border-brand-200/60',
  green: 'bg-emerald-50 text-emerald-700 ring-emerald-300/70 border-emerald-200/60',
  amber: 'bg-amber-50 text-amber-800 ring-amber-300/70 border-amber-200/60',
  red: 'bg-rose-50 text-rose-700 ring-rose-300/70 border-rose-200/60',
  slate: 'bg-slate-100/90 text-slate-700 ring-slate-300/60 border-slate-200/60',
  navy: 'bg-slate-900 text-slate-100 ring-slate-700 border-slate-800',
};

export const Badge = ({ tone = 'slate', children, className = '' }) => (
  <span
    className={cx(
      'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium tracking-tight ring-1 ring-inset transition-colors',
      TONES[tone] || TONES.slate,
      className,
    )}
  >
    {children}
  </span>
);

export const StatusBadge = ({ status }) => {
  const s = STATUS[status] || STATUS.not;
  return (
    <Badge tone={s.tone} className="font-semibold shadow-2xs">
      <span className={cx('h-1.5 w-1.5 rounded-full', {
        'bg-brand-600': s.tone === 'brand',
        'bg-emerald-500': s.tone === 'green',
        'bg-amber-500': s.tone === 'amber',
        'bg-rose-500': s.tone === 'red',
        'bg-slate-500': s.tone === 'slate',
      })} />
      {s.label}
    </Badge>
  );
};

export const Card = ({ className = '', hover = false, children, ...rest }) => (
  <div
    className={cx(
      'rounded-xl border border-slate-200/80 bg-white p-5 shadow-card transition-all duration-200',
      hover && 'hover:shadow-card-hover hover:border-slate-300/90',
      className,
    )}
    {...rest}
  >
    {children}
  </div>
);

const RING = {
  brand: { stroke: '#0284c7', bg: '#e0f2fe' },
  green: { stroke: '#059669', bg: '#d1fae5' },
  amber: { stroke: '#d97706', bg: '#fef3c7' },
  red: { stroke: '#e11d48', bg: '#ffe4e6' },
  slate: { stroke: '#64748b', bg: '#f1f5f9' },
};

export function ScoreRing({ score, status = 'best', size = 56 }) {
  const r = size / 2 - 4.5;
  const c = 2 * Math.PI * r;
  const tone = STATUS[status]?.tone || 'slate';
  const colors = RING[tone] || RING.slate;

  return (
    <div
      className="relative shrink-0 flex items-center justify-center select-none"
      style={{ width: size, height: size }}
      aria-label={`${score}% match score`}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#f1f5f9"
          strokeWidth="4"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={colors.stroke}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - score / 100)}
          style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xs font-bold tracking-tight text-slate-800 font-mono">
          {score}%
        </span>
      </div>
    </div>
  );
}

export const DemoBanner = ({ className = '' }) => (
  <div
    className={cx(
      'flex items-start gap-2.5 rounded-lg border border-amber-200/90 bg-amber-50/70 px-3.5 py-2.5 text-xs text-amber-900 shadow-2xs',
      className,
    )}
  >
    <ShieldCheck size={16} className="mt-0.5 shrink-0 text-amber-700" />
    <div className="leading-relaxed">
      <span className="font-semibold text-amber-950 uppercase tracking-wide text-[11px] mr-1">
        GovTech Prototype Environment •
      </span>
      <span>
        {DEMO_NOTICE} Production version connects directly with National Single Window & API Setu for verified live scheme data.
      </span>
    </div>
  </div>
);

export const AiTag = ({ className = '' }) => (
  <span
    className={cx(
      'inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-600 bg-slate-100/90 border border-slate-200/90 px-2 py-0.5 rounded-md',
      className,
    )}
  >
    <Sparkles size={11} className="text-brand-600 shrink-0" />
    <span>Rule-based AI Matcher</span>
  </span>
);

export const PageHeader = ({ title, subtitle, badge, children }) => (
  <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200/70 pb-4">
    <div>
      {badge && <div className="mb-2">{badge}</div>}
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-1.5 text-sm text-slate-600 max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
    {children && <div className="flex items-center gap-2.5 shrink-0">{children}</div>}
  </div>
);

export const StatusIcon = ({ status, size = 18 }) => {
  if (status === 'met') return <CheckCircle2 size={size} className="shrink-0 text-emerald-600" />;
  if (status === 'warn') return <AlertTriangle size={size} className="shrink-0 text-amber-600" />;
  if (status === 'unmet') return <XCircle size={size} className="shrink-0 text-rose-600" />;
  return <Circle size={size} className="shrink-0 text-slate-300" />;
};

export const BackLink = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="group mb-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-colors"
  >
    <span className="transition-transform group-hover:-translate-x-0.5">←</span>
    <span>{children}</span>
  </button>
);

const DOT = {
  best: 'bg-brand-600',
  eligible: 'bg-emerald-500',
  almost: 'bg-amber-500',
  not: 'bg-rose-500',
};

const TRAFFIC = {
  best: 'Best Match',
  eligible: 'Fully Eligible',
  almost: 'Almost Eligible',
  not: 'Not Eligible',
};

export const TrafficStatus = ({ status }) => (
  <span className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700">
    <span className={cx('h-2 w-2 rounded-full', DOT[status] || DOT.not)} />
    {TRAFFIC[status] || status}
  </span>
);

export function SchemeCard({
  scheme,
  onView,
  onWhy,
  saved,
  onSave,
  compared,
  onCompare,
  variant = 'result',
}) {
  const isAlt = variant === 'alt';
  const keyReq = scheme.criteria?.find((c) => c.hard) || scheme.criteria?.[0];
  const missingN = scheme.missing?.length || 0;

  return (
    <Card
      hover
      className="group flex flex-col justify-between border-slate-200/90 bg-white transition-all duration-200 hover:-translate-y-0.5"
    >
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3.5">
          <div className="flex items-center gap-3">
            <ScoreRing score={scheme.score} status={scheme.status} size={50} />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-slate-900 font-mono tracking-tight">
                  {scheme.score}% Match
                </span>
                <span className="text-slate-300">•</span>
                <TrafficStatus status={scheme.status} />
              </div>
              <div className="mt-1 flex items-center gap-1.5">
                <Badge tone="slate" className="text-[10px] py-0 px-1.5 font-medium">
                  {scheme.category}
                </Badge>
                {scheme.status === 'best' && (
                  <Badge tone="brand" className="text-[10px] py-0 px-1.5 font-semibold">
                    ★ Best Fit
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {onCompare && (
              <button
                onClick={onCompare}
                title={compared ? 'Remove from compare' : 'Add to compare'}
                className={cx(
                  'rounded-lg p-1.5 text-xs font-medium transition-colors border',
                  compared
                    ? 'border-brand-500 bg-brand-50 text-brand-700'
                    : 'border-slate-200 text-slate-400 hover:border-slate-300 hover:text-slate-600',
                )}
              >
                <ArrowLeftRight size={15} />
              </button>
            )}
            {onSave && (
              <button
                onClick={onSave}
                aria-label={saved ? 'Remove from saved' : 'Save scheme'}
                className={cx(
                  'rounded-lg p-1.5 text-xs transition-colors border',
                  saved
                    ? 'border-amber-400 bg-amber-50 text-amber-700'
                    : 'border-slate-200 text-slate-400 hover:border-slate-300 hover:text-slate-600',
                )}
              >
                {saved ? <BookmarkCheck size={15} className="text-amber-600" /> : <Bookmark size={15} />}
              </button>
            )}
          </div>
        </div>

        {/* Scheme Title & Description */}
        <div className="mt-3.5">
          <h3 className="text-base font-semibold leading-snug text-slate-900 group-hover:text-brand-700 transition-colors">
            {scheme.name}
          </h3>
          <p className="mt-1.5 text-xs leading-relaxed text-slate-600 line-clamp-2">
            {scheme.description}
          </p>
        </div>

        {/* Dynamic Context / Fit Highlight */}
        {isAlt ? (
          <div className="mt-3.5 rounded-lg border border-emerald-200/80 bg-emerald-50/70 p-2.5 text-xs text-emerald-900">
            <span className="block font-semibold uppercase tracking-wider text-[10px] text-emerald-800">
              Why this fits better
            </span>
            <p className="mt-0.5 leading-relaxed">{scheme.fitNote}</p>
          </div>
        ) : (
          <div className="mt-3.5 rounded-lg border border-slate-100 bg-slate-50/70 p-2.5 text-xs text-slate-600">
            <span className="font-semibold text-slate-800">Match Reason: </span>
            <span>{scheme.reason}</span>
          </div>
        )}

        {/* Criteria status chips */}
        <div className="mt-3.5 space-y-1.5 text-xs text-slate-600">
          {keyReq && (
            <div className="flex items-center gap-1.5 truncate">
              <span className="font-medium text-slate-700 shrink-0">Key Requirement:</span>
              <span className="truncate text-slate-500">{keyReq.requirement}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 truncate">
            <span className="font-medium text-slate-700 shrink-0">Benefit:</span>
            <span className="truncate text-slate-500">{scheme.benefitSummary}</span>
          </div>
          {missingN > 0 && (
            <div className="pt-1 flex items-center gap-1.5 text-amber-700 font-medium">
              <AlertTriangle size={13} className="shrink-0" />
              <span>{missingN} requirement{missingN > 1 ? 's' : ''} not met currently</span>
            </div>
          )}
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="mt-5 border-t border-slate-100 pt-3.5 flex flex-wrap items-center gap-2">
        <Button
          variant="primary"
          size="sm"
          className="flex-1"
          onClick={onView}
        >
          {isAlt ? 'View Scheme' : 'View Details'}
          <ArrowRight size={13} />
        </Button>

        {onWhy && (
          <Button
            variant="secondary"
            size="sm"
            onClick={onWhy}
            className="text-xs"
          >
            Why this?
          </Button>
        )}
      </div>
    </Card>
  );
}
