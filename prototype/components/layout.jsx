import { BRAND_NAME } from '../constants/brand';

export function Sidebar({ navItems, activeRoute, onRouteChange }) {
  return (
    <aside className="hidden w-72 flex-col border-r border-white/10 bg-slate-900/80 backdrop-blur-xl lg:flex">
      <div className="border-b border-white/10 px-6 py-6">
        <div className="text-xs uppercase tracking-[0.22em] text-cyan-300">ASI</div>
        <h1 className="mt-2 text-2xl font-semibold">{BRAND_NAME}</h1>
        <p className="mt-2 text-sm text-slate-400">AI Organization OS Dashboard</p>
      </div>

      <nav className="space-y-2 px-4 py-5">
        {navItems.map((item) => (
          <button
            key={item}
            onClick={() => onRouteChange(item)}
            className={`w-full rounded-2xl px-4 py-3 text-left text-sm transition ${
              item === activeRoute ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            {item}
          </button>
        ))}
      </nav>
    </aside>
  );
}

export function Header({ activeRoute }) {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 lg:px-8">
        <div>
          <div className="text-xs uppercase tracking-[0.22em] text-slate-400">Executive Control Layer</div>
          <div className="text-xl font-semibold">Homepage / {activeRoute}</div>
        </div>
        <button className="rounded-2xl bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:opacity-90">
          New Workflow
        </button>
      </div>
    </header>
  );
}
