import { Sidebar, Header } from './components/layout';
import {
  ChatSection,
  DecisionsSection,
  EmotionalIntelligenceSection,
  DepartmentsSection,
  GovernanceSection,
  LineageSection,
  MAERISection,
  OverviewSection,
  SettingsSection,
} from './components/sections';
import {
  chatThreads,
  decisions,
  departments,
  governancePolicies,
  lineageItems,
  modelSwitchModes,
  navItems,
  quickActions,
  trustPlaneSignals,
  settingsGroups,
  interactionPrompts,
} from './data/mockData';
import { useASIAppState } from './state/useASIAppState';

export default function ASIHomepageUIUX() {
  const { routeState, selectedDecisionId, setSelectedDecisionId } = useASIAppState(navItems);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex min-h-screen">
        <Sidebar navItems={navItems} activeRoute={routeState.activeRoute} onRouteChange={routeState.setRoute} />

        <main className="flex-1">
          <Header activeRoute={routeState.activeRoute} />

          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 lg:px-8 lg:py-8">
            {(routeState.activeRoute === 'overview' || routeState.activeRoute === 'departments') && (
              <OverviewSection quickActions={quickActions} />
            )}

            {(routeState.activeRoute === 'overview' || routeState.activeRoute === 'departments') && (
              <DepartmentsSection departments={departments} chat={chatThreads.department} />
            )}

            {(routeState.activeRoute === 'overview' || routeState.activeRoute === 'decisions') && (
              <DecisionsSection
                decisions={decisions}
                selectedDecisionId={selectedDecisionId}
                onSelectDecision={setSelectedDecisionId}
              />
            )}

            {(routeState.activeRoute === 'overview' || routeState.activeRoute === 'governance') && (
              <GovernanceSection policies={governancePolicies} />
            )}

            {(routeState.activeRoute === 'overview' || routeState.activeRoute === 'lineage') && (
              <LineageSection lineageItems={lineageItems} selectedDecisionId={selectedDecisionId} />
            )}

            {routeState.activeRoute === 'overview' && (
              <EmotionalIntelligenceSection trustPlaneSignals={trustPlaneSignals} />
            )}

            {routeState.activeRoute === 'overview' && (
              <MAERISection modelSwitchModes={modelSwitchModes} interactionPrompts={interactionPrompts} />
            )}

            {(routeState.activeRoute === 'overview' || routeState.activeRoute === 'chat') && (
              <ChatSection chat={chatThreads.global} />
            )}

            {(routeState.activeRoute === 'overview' || routeState.activeRoute === 'settings') && (
              <SettingsSection settingGroups={settingsGroups} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
