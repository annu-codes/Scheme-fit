import { OPTIONS, SCHEMES, TURNOVER_ORDER } from '../data/schemes';

export const labelOf = (field, value) =>
  (OPTIONS[field] || []).find((o) => o.value === value)?.label || '';

export const STATUS = {
  best: { label: 'Best Match', tone: 'brand' },
  eligible: { label: 'Eligible', tone: 'green' },
  almost: { label: 'Almost Eligible', tone: 'amber' },
  not: { label: 'Not Eligible', tone: 'red' },
};

const idx = (t) => TURNOVER_ORDER.indexOf(t);

function check(c, p) {
  switch (c.type) {
    case 'oneOf': {
      const ok = c.values.includes(p[c.field]);
      return { status: ok ? 'met' : 'unmet', yours: labelOf(c.field, p[c.field]) || '—', gap: ok ? null : `Requires: ${c.requirement}` };
    }
    case 'registered': {
      const ok = p.registered === 'yes';
      return { status: ok ? 'met' : 'unmet', yours: ok ? 'Registered' : 'Not registered', gap: ok ? null : 'Business registration is required' };
    }
    case 'minMonths': {
      const registered = p.registered === 'yes';
      const months = registered ? Number(p.registrationMonths) || 0 : 0;
      const ok = registered && months >= c.months;
      const missing = c.months - months;
      return {
        status: ok ? 'met' : 'unmet',
        yours: registered ? `Business registered for: ${months} months` : 'Not registered',
        gap: ok ? null : registered
          ? `${missing} more month${missing === 1 ? '' : 's'} of registration history required`
          : `Register your business, then build ${c.months} months of history`,
        progress: { current: months, required: c.months, unit: 'months' },
      };
    }
    case 'turnover': {
      const i = idx(p.turnover);
      const lo = c.min ? idx(c.min) : 0;
      const hi = c.max ? idx(c.max) : TURNOVER_ORDER.length - 1;
      const ok = i >= lo && i <= hi;
      return {
        status: ok ? 'met' : 'unmet',
        yours: labelOf('turnover', p.turnover) || '—',
        gap: ok ? null : i < lo ? 'Annual turnover is below the minimum band' : 'Annual turnover is above the maximum band',
      };
    }
    case 'support': {
      const picked = p.support || [];
      const ok = picked.some((s) => c.anyOf.includes(s));
      return {
        status: ok ? 'met' : 'unmet',
        yours: picked.length ? picked.map((s) => labelOf('support', s)).join(', ') : 'None selected',
        gap: ok ? null : 'This scheme offers a different kind of support than you selected',
      };
    }
    default:
      return { status: 'met', yours: '—', gap: null };
  }
}

export function evaluate(scheme, profile, docsReady = {}) {
  const criteria = scheme.criteria.map((c) => ({ ...c, ...check(c, profile) }));
  let total = 0;
  let got = 0;
  criteria.forEach((c) => {
    const w = c.hard ? 20 : 10;
    total += w;
    if (c.status === 'met') got += w;
  });
  const score = total ? Math.round((got / total) * 100) : 0;
  const failed = criteria.filter((c) => c.hard && c.status === 'unmet');
  const status = failed.length === 0 ? (score >= 90 ? 'best' : 'eligible') : failed.length === 1 ? 'almost' : 'not';
  const missingDocs = scheme.documents.filter((d) => !docsReady[d]);
  const matched = criteria.filter((c) => c.status === 'met' && c.type !== 'support').map((c) => c.label.toLowerCase());
  const reason = matched.length
    ? `Matches your ${matched.length > 1 ? `${matched.slice(0, -1).join(', ')} and ${matched[matched.length - 1]}` : matched[0]}`
    : 'Offers the kind of support you asked for';
  return {
    ...scheme,
    reason,
    criteria,
    score,
    status,
    missing: criteria.filter((c) => c.status === 'unmet'),
    missingDocs,
    readyDocs: scheme.documents.filter((d) => docsReady[d]),
  };
}

export function evaluateAll(profile, docsReady) {
  return SCHEMES.map((s) => evaluate(s, profile, docsReady)).sort((a, b) => b.score - a.score);
}

// Documents the entrepreneur likely already has, derived from the profile.
export function defaultDocs(profile) {
  return { identity: true, registration: profile.registered === 'yes' };
}

export function alternativesFor(all, excludeId) {
  return all.filter((s) => s.id !== excludeId && (s.status === 'best' || s.status === 'eligible')).slice(0, 3);
}
