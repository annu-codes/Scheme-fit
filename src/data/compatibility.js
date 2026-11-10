// ───────────────────────────────────────────────────────────────
// DEMO COMPATIBILITY RULES — invented for the prototype only.
// They do NOT reflect any real government rule.
// Production version will use verified official government scheme rules.
// ───────────────────────────────────────────────────────────────

export const COMPAT_DISCLAIMER = 'Prototype only. Production version will use verified official government scheme rules.';

export const RESULTS = {
  compatible: { label: 'Compatible', tone: 'green', message: 'These schemes can potentially be used together according to the demo compatibility rules.' },
  conflict: { label: 'Potential Conflict', tone: 'red', message: 'Applying for one scheme may affect eligibility for the other scheme.' },
  conditional: { label: 'Conditional', tone: 'amber', message: 'Compatibility depends on specific conditions.' },
};

const RULES = [
  { pair: ['udyam-growth', 'micro-finance'], result: 'conflict', why: 'Demo rule: both provide credit for the same working-capital need, so taking one may reduce eligibility for the other.' },
  { pair: ['rural-development', 'cluster-infra'], result: 'conflict', why: 'Demo rule: both subsidise shared infrastructure for the same unit, so only one can be claimed at a time.' },
  { pair: ['women-entrepreneur', 'skill-mentorship'], result: 'compatible', why: 'Demo rule: one gives funding and the other gives training, so they cover different needs.' },
  { pair: ['women-entrepreneur', 'startup-seed'], result: 'conditional', why: 'Demo rule: both give seed funding. You may need to declare the first grant and keep the combined amount under a cap.' },
  { pair: ['inclusive-credit', 'micro-finance'], result: 'conditional', why: 'Demo rule: both are loans. Allowed only if the first loan is repaid or the total borrowing stays within a limit.' },
  { pair: ['micro-finance', 'skill-mentorship'], result: 'compatible', why: 'Demo rule: a loan and a training programme do not overlap.' },
];

const CREDIT = ['Funding', 'Loan', 'Subsidy'];

export function checkCompatibility(a, b) {
  const rule = RULES.find((r) => r.pair.includes(a.id) && r.pair.includes(b.id));
  if (rule) return { result: rule.result, why: rule.why };
  if (a.category === b.category && CREDIT.includes(a.category)) {
    return { result: 'conditional', why: `Demo rule: both schemes offer ${a.category.toLowerCase()} support. You may need to declare the other benefit when applying.` };
  }
  return { result: 'compatible', why: 'Demo rule: these schemes offer different kinds of support and no overlap was found.' };
}
