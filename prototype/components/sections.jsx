import { apiContracts } from '../contracts/apiContracts';

export function OverviewSection({ quickActions }) {
  return (
    <section className="rounded-[28px] border border-white/10 bg-slate-900/80 p-6">
      <h3 className="text-2xl font-semibold">Quick Actions</h3>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {quickActions.map((action) => (
          <div key={action.title} className="rounded-[24px] border border-white/10 bg-white/5 p-5">
            <div className="text-base font-medium">{action.title}</div>
            <p className="mt-2 text-sm text-slate-400">{action.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function DepartmentsSection({ departments, chat }) {
  return (
    <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-6">
        <h3 className="text-2xl font-semibold">AI Departments</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {departments.map((dept) => (
            <div key={dept.name} className="rounded-[24px] border border-white/10 bg-white/5 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-medium">{dept.name}</div>
                  <div className="text-sm text-slate-400">Active tasks: {dept.tasks}</div>
                </div>
                <span className="text-xs text-slate-300">{dept.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ChatPanel title="Department Assistant" thread={chat} />
    </section>
  );
}

export function DecisionsSection({ decisions, selectedDecisionId, onSelectDecision }) {
  return (
    <section className="rounded-[28px] border border-white/10 bg-slate-900/80 p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-semibold">Pending & Recent Decisions</h3>
        <div className="text-xs text-slate-400">
          API: {apiContracts.decisions.method} {apiContracts.decisions.path}
        </div>
      </div>
      <div className="mt-5 space-y-4">
        {decisions.map((decision) => (
          <button
            key={decision.id}
            onClick={() => onSelectDecision(decision.id)}
            className={`w-full rounded-[24px] border p-5 text-left ${
              selectedDecisionId === decision.id ? 'border-cyan-400/40 bg-cyan-400/10' : 'border-white/10 bg-white/5'
            }`}
          >
            <div className="text-sm text-slate-400">{decision.id}</div>
            <div className="text-lg font-medium">{decision.title}</div>
            <div className="text-sm text-slate-400">
              Owner: {decision.owner} · State: {decision.state} · Risk: {decision.risk}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

export function GovernanceSection({ policies }) {
  return (
    <section className="rounded-[28px] border border-white/10 bg-slate-900/80 p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-semibold">Governance Policies</h3>
        <div className="text-xs text-slate-400">
          API: {apiContracts.governance.method} {apiContracts.governance.path}
        </div>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {policies.map((policy) => (
          <div key={policy.id} className="rounded-[24px] border border-white/10 bg-white/5 p-5">
            <div className="text-base font-medium">{policy.title}</div>
            <div className="text-xs uppercase text-slate-400">{policy.lifecycle}</div>
            <ul className="mt-2 space-y-1 text-sm text-slate-300">
              {policy.controls.map((control) => (
                <li key={control}>• {control}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export function LineageSection({ lineageItems, selectedDecisionId }) {
  const selected = lineageItems.find((item) => item.decisionId === selectedDecisionId) || lineageItems[0];

  return (
    <section className="rounded-[28px] border border-white/10 bg-slate-900/80 p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-semibold">Lineage & Audit</h3>
        <div className="text-xs text-slate-400">
          API: {apiContracts.lineage.method} {apiContracts.lineage.path}
        </div>
      </div>
      <div className="mt-4 text-sm text-slate-300">Decision: {selected.decisionId}</div>
      <ul className="mt-4 rounded-[20px] border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
        {selected.events.map((event) => (
          <li key={event}>• {event}</li>
        ))}
      </ul>
      <div className="mt-3 text-xs text-slate-400">
        proof_uri: {selected.proofUri} · replay_job: {selected.replayJob}
      </div>
    </section>
  );
}

export function ChatSection({ chat }) {
  return (
    <section className="rounded-[28px] border border-white/10 bg-slate-900/80 p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-semibold">Universal Assistant</h3>
        <div className="text-xs text-slate-400">
          API: {apiContracts.chat.method} {apiContracts.chat.path}
        </div>
      </div>
      <ChatPanel title="Global Chat" thread={chat} />
    </section>
  );
}

export function SettingsSection({ settingGroups }) {
  return (
    <section className="rounded-[28px] border border-white/10 bg-slate-900/80 p-6">
      <h3 className="text-2xl font-semibold">System Configuration</h3>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {settingGroups.map((group) => (
          <div key={group.title} className="rounded-[24px] border border-white/10 bg-white/5 p-5">
            <div className="text-base font-medium">{group.title}</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              {group.items.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function ChatPanel({ title, thread }) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-6">
      <div className="text-xl font-semibold">{title}</div>
      <div className="mt-4 space-y-3 rounded-[24px] border border-white/10 bg-slate-950/70 p-4">
        {thread.messages.map((message, index) => (
          <div
            key={`${thread.threadId}-${index}`}
            className={`max-w-[92%] rounded-2xl px-4 py-3 text-sm ${
              message.role === 'assistant'
                ? 'border border-white/10 bg-white/5 text-slate-200'
                : 'ml-auto bg-cyan-400 text-slate-950'
            }`}
          >
            {message.content}
          </div>
        ))}
      </div>
    </div>
  );
}
