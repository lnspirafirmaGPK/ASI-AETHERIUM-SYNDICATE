import { useEffect, useMemo, useState } from 'react';

const DEFAULT_ROUTE = 'overview';

function normalizeHash(hashValue) {
  const route = hashValue?.replace('#', '').trim().toLowerCase();
  return route || DEFAULT_ROUTE;
}

function isBrowser() {
  return typeof window !== 'undefined';
}

function getInitialRoute(navItems) {
  const routeFromHash = isBrowser() ? normalizeHash(window.location.hash) : DEFAULT_ROUTE;
  return navItems.includes(routeFromHash) ? routeFromHash : DEFAULT_ROUTE;
}

export function useASIAppState(navItems) {
  const [activeRoute, setActiveRoute] = useState(() => getInitialRoute(navItems));
  const [selectedDecisionId, setSelectedDecisionId] = useState('DEC-1042');

  useEffect(() => {
    if (!isBrowser()) return undefined;

    const onHashChange = () => {
      const route = normalizeHash(window.location.hash);
      setActiveRoute(navItems.includes(route) ? route : DEFAULT_ROUTE);
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [navItems]);

  const routeState = useMemo(
    () => ({
      activeRoute,
      setRoute: (route) => {
        if (!navItems.includes(route)) return;
        if (isBrowser()) {
          window.location.hash = route;
        }
        setActiveRoute(route);
      },
    }),
    [activeRoute, navItems],
  );

  return {
    routeState,
    selectedDecisionId,
    setSelectedDecisionId,
  };
}
