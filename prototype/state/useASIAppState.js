import { useEffect, useMemo, useState } from 'react';

const DEFAULT_ROUTE = 'overview';

function normalizeHash(hashValue) {
  const route = hashValue?.replace('#', '').trim().toLowerCase();
  return route || DEFAULT_ROUTE;
}

export function useASIAppState(navItems) {
  const [activeRoute, setActiveRoute] = useState(() => normalizeHash(window.location.hash));
  const [selectedDecisionId, setSelectedDecisionId] = useState('DEC-1042');

  useEffect(() => {
    const onHashChange = () => {
      const route = normalizeHash(window.location.hash);
      if (navItems.includes(route)) {
        setActiveRoute(route);
      }
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [navItems]);

  const routeState = useMemo(
    () => ({
      activeRoute,
      setRoute: (route) => {
        if (!navItems.includes(route)) return;
        window.location.hash = route;
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
