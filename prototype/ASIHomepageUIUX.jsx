import React from 'react';
import { OverviewSection, DepartmentsSection, DecisionsSection, GovernanceSection, LineageSection, ArchitectureSection, EmotionalIntelligenceSection, MAERISection, SettingsSection, ChatSection } from './components/sections';
import { mockData } from './data/mockData';


export default function ComponentGallery() {


  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
        <main className="flex-1">
          <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 lg:px-8">
            <OverviewSection quickActions={mockData.quickActions} />
            <ArchitectureSection layers={mockData.architecture.layers} principles={mockData.architecture.principles} driftPipeline={mockData.architecture.driftPipeline} />
            <DepartmentsSection departments={mockData.departments} chat={mockData.chatThreads.departments} />
            <DecisionsSection decisions={mockData.decisions} selectedDecisionId={mockData.decisions[0].id} onSelectDecision={() => {}} />
            <GovernanceSection policies={mockData.governance} />
            <LineageSection lineageItems={mockData.lineage} selectedDecisionId={mockData.decisions[1].id} />
            <ChatSection chat={mockData.chatThreads.global} />
            <EmotionalIntelligenceSection trustPlaneSignals={mockData.trustSignals} />
            <MAERISection modelSwitchModes={mockData.maeRi.modelSwitchModes} interactionPrompts={mockData.maeRi.interactionPrompts} />
            <SettingsSection settingGroups={mockData.settings} />
          </div>
        </main>
    </div>
  );
}
