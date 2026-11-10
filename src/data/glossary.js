// Demo glossary for the Term Simplifier. Plain-language text is written for the
// prototype; replace with reviewed definitions before production.
export const GLOSSARY = [
  { term: 'Collateral', brief: 'A valuable asset that may be required as security for a loan.', technical: 'An asset pledged as security for a loan.', simple: 'A valuable property or asset that a lender may ask you to provide as security when taking a loan.' },
  { term: 'Subsidy', brief: 'Government money that covers part of your cost.', technical: 'A financial contribution by the government that reduces the cost borne by a beneficiary.', simple: 'Money the government pays towards part of your cost, so you pay less yourself.' },
  { term: 'Moratorium', brief: 'A waiting period before you must start repaying a loan.', technical: 'A period during which repayment of principal or interest is deferred.', simple: 'A waiting period after you take a loan when you do not have to pay anything back yet.' },
  { term: 'Interest subvention', brief: 'The government pays part of your loan interest.', technical: 'A reduction in the effective interest rate borne by the borrower, funded by the government.', simple: 'The government covers a part of the interest, so your loan costs less.' },
  { term: 'Turnover', brief: 'Total sales your business makes in a year.', technical: 'Total revenue generated from business operations over a financial year.', simple: 'All the money your business earned from sales in a year, before costs.' },
  { term: 'Working capital', brief: 'Cash used for everyday business running costs.', technical: 'Funds required to finance day-to-day operational expenses.', simple: 'Money to run the business daily — buying stock, paying wages and bills.' },
  { term: 'Credit guarantee', brief: 'A backup promise to the lender, so you may not need collateral.', technical: 'An assurance to the lender that a portion of default losses will be covered by a third party.', simple: 'A backup promise to the bank that it will be repaid part of the money if you cannot pay, so it is easier for you to get a loan without collateral.' },
  { term: 'Incubation', brief: 'Help for new businesses: workspace, mentor and contacts.', technical: 'A structured programme providing mentoring, workspace and networks to early-stage ventures.', simple: 'Support for a new business: a place to work, a mentor and useful contacts.' },
  { term: 'Eligibility criteria', brief: 'The rules you must meet to be allowed to apply.', technical: 'The set of conditions an applicant must satisfy to qualify for a scheme.', simple: 'The checklist of rules you must meet to be allowed to apply.' },
];

// Terms likely to appear for each scheme category (shown on Scheme Details).
const BY_CATEGORY = {
  Loan: ['Collateral', 'Moratorium', 'Interest subvention', 'Credit guarantee'],
  Funding: ['Working capital', 'Turnover'],
  Subsidy: ['Subsidy', 'Turnover'],
  Training: ['Incubation'],
  Infrastructure: ['Subsidy', 'Working capital'],
};

export const termsForCategory = (category) =>
  [...(BY_CATEGORY[category] || []), 'Eligibility criteria']
    .map((t) => GLOSSARY.find((g) => g.term === t))
    .filter(Boolean);
