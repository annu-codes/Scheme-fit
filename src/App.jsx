import { useEffect, useMemo, useState } from 'react';
import { AppShell, PublicHeader } from './components/Layout';
import { EMPTY_PROFILE } from './data/schemes';
import { defaultDocs, evaluateAll } from './lib/matching';
import Landing from './screens/Landing';
import Explore from './screens/Explore';
import Profile from './screens/Profile';
import Analysis from './screens/Analysis';
import Dashboard from './screens/Dashboard';
import Matches from './screens/Matches';
import Saved from './screens/Saved';
import Details from './screens/Details';
import NotEligible from './screens/NotEligible';
import Alternatives from './screens/Alternatives';
import Documents from './screens/Documents';
import Guide from './screens/Guide';
import Compare from './screens/Compare';
import Compatibility from './screens/Compatibility';
import Simplifier from './screens/Simplifier';
import EligibilityPage from './screens/EligibilityPage';
import WhyMatch from './components/WhyMatch';

const KEY = 'schemefit.prototype.v1';
const PUBLIC = ['landing', 'explore', 'analysis'];
const APP = ['dashboard', 'matches', 'saved', 'details', 'noteligible', 'alternatives', 'documents', 'guide', 'compare', 'profile', 'compatibility', 'simplifier', 'eligibility'];

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {};
  } catch {
    return {};
  }
}

export default function App() {
  const saved0 = useMemo(load, []);
  const [screen, setScreen] = useState(saved0.analyzed && saved0.screen ? saved0.screen : 'landing');
  const [profile, setProfile] = useState({ ...EMPTY_PROFILE, ...(saved0.profile || {}) });
  const [analyzed, setAnalyzed] = useState(Boolean(saved0.analyzed));
  const [selectedId, setSelectedId] = useState(saved0.selectedId || null);
  const [fromId, setFromId] = useState(null);
  const [saved, setSaved] = useState(saved0.saved || []);
  const [compare, setCompare] = useState(saved0.compare || []);
  const [docOverrides, setDocOverrides] = useState(saved0.docOverrides || {});
  const [reused, setReused] = useState(saved0.reused || {});
  const [autofilled, setAutofilled] = useState(saved0.autofilled || {});
  const [whyId, setWhyId] = useState(null);
  const [compatA, setCompatA] = useState('');
  const [compatChecks, setCompatChecks] = useState(saved0.compatChecks || 0);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ screen, profile, analyzed, selectedId, saved, compare, docOverrides, reused, autofilled, compatChecks }));
    } catch { /* storage unavailable — prototype still works in memory */ }
  }, [screen, profile, analyzed, selectedId, saved, compare, docOverrides, reused, autofilled, compatChecks]);

  useEffect(() => { window.scrollTo({ top: 0 }); }, [screen]);

  const docs = useMemo(() => ({ ...defaultDocs(profile), ...docOverrides }), [profile, docOverrides]);
  const schemes = useMemo(() => evaluateAll(profile, docs), [profile, docs]);
  const selected = schemes.find((s) => s.id === selectedId) || null;
  const active = selected || schemes.find((s) => s.status === 'best' || s.status === 'eligible') || schemes[0];

  const go = (to, opts = {}) => {
    if (opts.id) setSelectedId(opts.id);
    if ('from' in opts) setFromId(opts.from);
    if ('compatA' in opts) setCompatA(opts.compatA);
    setScreen(to);
  };

  const ctx = {
    profile, schemes, docs, saved, compare, selected, active, fromId, go,
    fromScheme: fromId ? schemes.find((x) => x.id === fromId) : null,
    setSelectedId,
    openScheme: (id) => {
      const s = schemes.find((x) => x.id === id);
      go(s && s.status === 'not' ? 'noteligible' : 'details', { id });
    },
    toggleSave: (id) => setSaved((l) => (l.includes(id) ? l.filter((x) => x !== id) : [...l, id])),
    toggleCompare: (id) => setCompare((l) => (l.includes(id) ? l.filter((x) => x !== id) : l.length >= 3 ? l : [...l, id])),
    clearCompare: () => setCompare([]),
    reused, autofilled, setWhyId, compatA, compatChecks,
    countCompat: () => setCompatChecks((n) => n + 1),
    setDoc: (d, v) => setDocOverrides((o) => ({ ...o, [d]: v })),
    markReused: (id) => setReused((r) => ({ ...r, [id]: true })),
    markAutofill: (id) => setAutofilled((r) => ({ ...r, [id]: true })),
    toggleDoc: (d) => setDocOverrides((o) => ({ ...o, [d]: !docs[d] })),
  };

  const reset = () => {
    try { localStorage.removeItem(KEY); } catch { /* ignore */ }
    setProfile(EMPTY_PROFILE); setAnalyzed(false); setSelectedId(null); setFromId(null);
    setSaved([]); setCompare([]); setDocOverrides({}); setReused({}); setAutofilled({}); setWhyId(null); setCompatA(''); setCompatChecks(0); setScreen('landing');
  };

  // Screens that need results fall back to the profile form until analysis has run.
  const needsProfile = APP.includes(screen) && !analyzed;
  const current = needsProfile ? 'profile' : screen;

  const profileScreen = (
    <Profile profile={profile} setProfile={setProfile} editing={analyzed} docs={docs} setDoc={ctx.setDoc} onSubmit={() => go('analysis')} />
  );

  if (PUBLIC.includes(current) || (current === 'profile' && !analyzed)) {
    return (
      <>
        <PublicHeader go={go} onReset={reset} showReset />
        {current === 'landing' && <Landing go={go} />}
        {current === 'explore' && <Explore go={go} />}
        {current === 'profile' && <div className="px-4 py-8">{profileScreen}</div>}
        {current === 'analysis' && <Analysis onDone={() => { setAnalyzed(true); go('matches'); }} />}
      </>
    );
  }

  const views = {
    profile: profileScreen,
    dashboard: <Dashboard ctx={ctx} />,
    matches: <Matches ctx={ctx} />,
    saved: <Saved ctx={ctx} />,
    details: <Details ctx={ctx} />,
    noteligible: <NotEligible ctx={ctx} />,
    alternatives: <Alternatives ctx={ctx} />,
    documents: <Documents ctx={ctx} />,
    guide: <Guide ctx={ctx} />,
    compare: <Compare ctx={ctx} />,
    compatibility: <Compatibility key={compatA} ctx={ctx} />,
    simplifier: <Simplifier />,
    eligibility: <EligibilityPage ctx={ctx} />,
  };

  return (
    <AppShell screen={current} go={go} onReset={reset} savedCount={saved.length}>
      {views[current] || views.matches}
      {whyId && schemes.find((x) => x.id === whyId) && (
        <WhyMatch scheme={schemes.find((x) => x.id === whyId)} onClose={() => setWhyId(null)}
          onView={() => { const id = whyId; setWhyId(null); ctx.openScheme(id); }} />
      )}
    </AppShell>
  );
}
