import { INITIAL_DOCS_READY } from '../data/schemes';

const KEY = 'schemefit-demo-v1';

export const freshStore = () => ({
  profile: null,
  hasResults: false,
  saved: [],
  docsReady: { ...INITIAL_DOCS_READY },
});

export function loadStore() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return freshStore();
    return { ...freshStore(), ...JSON.parse(raw) };
  } catch {
    return freshStore();
  }
}

export function saveStore(store) {
  try {
    localStorage.setItem(KEY, JSON.stringify(store));
  } catch {
    /* storage unavailable — prototype keeps working in memory */
  }
}

export function clearStore() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}
