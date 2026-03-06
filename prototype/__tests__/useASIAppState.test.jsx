import { renderHook, act } from '@testing-library/react';
import { useASIAppState } from '../state/useASIAppState';

const NAV_ITEMS = ['overview', 'departments', 'decisions'];

describe('useASIAppState', () => {
  afterEach(() => {
    window.location.hash = '';
  });

  it('defaults to overview when hash is empty', () => {
    window.location.hash = '';

    const { result } = renderHook(() => useASIAppState(NAV_ITEMS));

    expect(result.current.routeState.activeRoute).toBe('overview');
  });

  it('falls back to overview for unknown hash routes', () => {
    window.location.hash = '#unknown';

    const { result } = renderHook(() => useASIAppState(NAV_ITEMS));

    expect(result.current.routeState.activeRoute).toBe('overview');
  });

  it('updates activeRoute on hashchange for known routes', () => {
    const { result } = renderHook(() => useASIAppState(NAV_ITEMS));

    act(() => {
      window.location.hash = '#departments';
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    });

    expect(result.current.routeState.activeRoute).toBe('departments');
  });

  it('resets to overview on hashchange for unknown routes', () => {
    const { result } = renderHook(() => useASIAppState(NAV_ITEMS));

    act(() => {
      window.location.hash = '#decisions';
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    });

    expect(result.current.routeState.activeRoute).toBe('decisions');

    act(() => {
      window.location.hash = '#invalid-route';
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    });

    expect(result.current.routeState.activeRoute).toBe('overview');
  });

  it('changes route and hash only for known routes through setRoute', () => {
    const { result } = renderHook(() => useASIAppState(NAV_ITEMS));

    act(() => {
      result.current.routeState.setRoute('decisions');
    });

    expect(result.current.routeState.activeRoute).toBe('decisions');
    expect(window.location.hash).toBe('#decisions');

    act(() => {
      result.current.routeState.setRoute('invalid-route');
    });

    expect(result.current.routeState.activeRoute).toBe('decisions');
    expect(window.location.hash).toBe('#decisions');
  });
});
