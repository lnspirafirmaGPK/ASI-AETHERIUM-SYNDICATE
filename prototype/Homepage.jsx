
import React, { useState } from 'react';
import { Sidebar, Header } from './components/layout';
import { OverviewSection, DepartmentsSection, DecisionsSection } from './components/sections';
import Chat from './Chat';

// Mock Data - In a real application, this would come from an API
const mockData = {
  navItems: ["Overview", "Departments", "Decisions", "Governance", "Lineage", "Settings"],
  quickActions: [
    { title: "เริ่มคำขอใหม่", desc: "สร้าง workflow ใหม่ เช่น Budget Reallocation, Risk Review, Policy Override" },
    { title: "ดูการตัดสินใจที่รออนุมัติ", desc: "รายการที่ต้องการ Executive Oversight หรือการ approve จากผู้มีอำนาจ" },
    { title: "ตรวจสอบ Drift / Alert", desc: "ดูสัญญาณ risk, policy drift, และ intervention ที่กำลังทำงาน" },
    { title: "เปิด Audit & Lineage", desc: "เรียกดู decision trail, proof, event chain และ replay" },
  ],
  departments: [
    { name: "Finance AI", status: "Stable", tasks: 24, ai: "Chat AI" },
    { name: "Legal AI", status: "Review", tasks: 9, ai: "Chat AI" },
    { name: "Strategy AI", status: "Active", tasks: 18, ai: "Chat AI" },
  ],
  decisions: [
    { id: "DEC-1042", title: "Budget Reallocation", owner: "Finance AI", state: "Awaiting CFO Approval", risk: "Medium" },
    { id: "DEC-1041", title: "Vendor Risk Flag", owner: "Risk AI", state: "Escalated", risk: "High" },
  ],
  chat: {
    threadId: 'dept-assistant-1',
    messages: [
      { role: 'assistant', content: 'Finance AI ตอนนี้มี 2 รายการที่เกิน threshold และ 1 รายการที่ต้อง CFO review' },
      { role: 'user', content: 'เปิดรายการที่ต้อง CFO review ให้หน่อย' }
    ]
  }
};

export default function Homepage() {
  const [activeRoute, setActiveRoute] = useState('Overview');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleRouteChange = (route) => {
    setActiveRoute(route);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex min-h-screen">
        <Sidebar navItems={mockData.navItems} activeRoute={activeRoute} onRouteChange={handleRouteChange} />
        <main className="flex-1">
          <Header activeRoute={activeRoute} />
          <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 lg:px-8">
            <OverviewSection quickActions={mockData.quickActions} />
            <DepartmentsSection departments={mockData.departments} chat={mockData.chat} />
            <DecisionsSection decisions={mockData.decisions} selectedDecisionId={null} onSelectDecision={() => {}} />
          </div>
        </main>
      </div>

      {isChatOpen && <Chat onClose={toggleChat} />}

      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-30 rounded-full bg-cyan-400 px-5 py-4 text-sm font-semibold text-slate-950 shadow-2xl shadow-cyan-500/30 hover:opacity-90"
      >
        AI Chat
      </button>
    </div>
  );
}
