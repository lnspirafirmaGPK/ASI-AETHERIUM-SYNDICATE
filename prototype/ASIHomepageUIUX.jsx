export default function ASIHomepageUIUX() {
  const navItems = ["Overview", "Departments", "Decisions", "Governance", "Lineage", "Settings"];
  const quickActions = [
    {
      title: "เริ่มคำขอใหม่",
      desc: "สร้าง workflow ใหม่ เช่น Budget Reallocation, Risk Review, Policy Override",
    },
    {
      title: "ดูการตัดสินใจที่รออนุมัติ",
      desc: "รายการที่ต้องการ Executive Oversight หรือการ approve จากผู้มีอำนาจ",
    },
    {
      title: "ตรวจสอบ Drift / Alert",
      desc: "ดูสัญญาณ risk, policy drift, และ intervention ที่กำลังทำงาน",
    },
    {
      title: "เปิด Audit & Lineage",
      desc: "เรียกดู decision trail, proof, event chain และ replay",
    },
  ];

  const deptCards = [
    { name: "Finance AI", status: "Stable", tasks: 24, ai: "Chat AI" },
    { name: "Legal AI", status: "Review", tasks: 9, ai: "Chat AI" },
    { name: "Strategy AI", status: "Active", tasks: 18, ai: "Chat AI" },
    { name: "Operations AI", status: "Stable", tasks: 31, ai: "Chat AI" },
  ];

  const decisionFeed = [
    {
      id: "DEC-1042",
      title: "Budget Reallocation",
      owner: "Finance AI",
      state: "Awaiting CFO Approval",
      risk: "Medium",
    },
    { id: "DEC-1041", title: "Vendor Risk Flag", owner: "Risk AI", state: "Escalated", risk: "High" },
    {
      id: "DEC-1038",
      title: "Ops Schedule Adjustment",
      owner: "Operations AI",
      state: "Approved",
      risk: "Low",
    },
  ];

  const settingGroups = [
    {
      title: "Workspace Settings",
      items: ["Brand / Theme", "Language", "Time Zone", "Notification Rules"],
    },
    {
      title: "AI Governance Settings",
      items: ["Approval Thresholds", "Autonomy Bands", "Policy Scope", "Human Escalation Rules"],
    },
    {
      title: "Security & Access",
      items: ["SSO / Identity", "Role Permissions", "Session Controls", "Audit Access"],
    },
    {
      title: "AI Chat Controls",
      items: ["Default Assistant Persona", "Sidebar Chat", "Inline Section Chat", "Pinned Command Shortcuts"],
    },
  ];

  const chatPositions = [
    { area: "Global Floating Chat", detail: "มุมขวาล่าง ใช้ถามคำถามข้ามระบบทั้งหมด" },
    { area: "Hero Inline Chat", detail: "ใต้ช่องค้นหา/command bar สำหรับเริ่มงานใหม่อย่างรวดเร็ว" },
    { area: "Department Card Chat", detail: "ปุ่ม Chat AI บนแต่ละแผนกเพื่อเจาะงานเฉพาะ domain" },
    { area: "Decision Panel Chat", detail: "ใน card ของ decision เพื่อถามเหตุผล, policy, risk และ lineage" },
    {
      area: "Settings Assistant",
      detail: "ในหน้าตั้งค่าเพื่อช่วย configure system และอธิบายผลกระทบ",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 flex-col border-r border-white/10 bg-slate-900/80 backdrop-blur-xl lg:flex">
          <div className="border-b border-white/10 px-6 py-6">
            <div className="text-xs uppercase tracking-[0.22em] text-cyan-300">ASI</div>
            <h1 className="mt-2 text-2xl font-semibold">Aetherium Syndicate Inspectra</h1>
            <p className="mt-2 text-sm text-slate-400">AI Organization OS Dashboard</p>
          </div>

          <nav className="space-y-2 px-4 py-5">
            {navItems.map((item) => (
              <button
                key={item}
                className="w-full rounded-2xl px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="mt-auto p-4">
            <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-4 shadow-xl">
              <div className="text-sm font-medium">Global AI Chat</div>
              <p className="mt-2 text-xs leading-6 text-slate-300">
                ผู้ช่วยหลักของระบบ ใช้ถามภาพรวมองค์กร, ค้นหา decision, เริ่ม workflow, และอธิบาย lineage
              </p>
              <button className="mt-4 w-full rounded-2xl bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:opacity-90">
                เปิดแชทหลัก
              </button>
            </div>
          </div>
        </aside>

        <main className="flex-1">
          <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 lg:px-8">
              <div>
                <div className="text-xs uppercase tracking-[0.22em] text-slate-400">Executive Control Layer</div>
                <div className="text-xl font-semibold">Homepage / Service Front Door</div>
              </div>
              <div className="flex items-center gap-3">
                <button className="rounded-2xl border border-white/10 px-4 py-2 text-sm text-slate-200 hover:bg-white/5">
                  Command Palette
                </button>
                <button className="rounded-2xl bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:opacity-90">
                  New Workflow
                </button>
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 lg:px-8">
            <section className="grid gap-6 xl:grid-cols-[1.5fr_0.9fr]">
              <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-6 shadow-2xl">
                <div className="max-w-3xl">
                  <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-300">
                    Autonomous Enterprise Operating System
                  </div>
                  <h2 className="mt-4 text-3xl font-semibold leading-tight lg:text-5xl">
                    หน้าแรกสำหรับควบคุมองค์กร AI-native พร้อม AI Chat ทุกจุดสำคัญ
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 lg:text-base">
                    ออกแบบให้เป็นจุดเริ่มต้นของบริการทั้งหมด: เริ่มงานใหม่, ดูการตัดสินใจ, ตรวจ governance, ตรวจสอบ
                    lineage, และสนทนากับ AI ได้ทั้งในระดับ global, section และ domain-specific
                  </p>
                </div>

                <div className="mt-6 rounded-[24px] border border-white/10 bg-black/20 p-4">
                  <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Hero Inline Chat / Command Input</div>
                  <div className="mt-3 flex flex-col gap-3 lg:flex-row">
                    <input
                      className="flex-1 rounded-2xl border border-white/10 bg-slate-900/90 px-4 py-4 text-sm outline-none ring-0 placeholder:text-slate-500"
                      placeholder="ถาม AI เช่น: สรุป decisions ที่ต้องอนุมัติวันนี้ / เริ่ม Budget Reallocation / เปิด lineage ของ DEC-1042"
                    />
                    <button className="rounded-2xl bg-white px-5 py-4 text-sm font-semibold text-slate-900">Ask AI</button>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {quickActions.map((item) => (
                    <div key={item.title} className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                      <div className="text-base font-medium">{item.title}</div>
                      <p className="mt-2 text-sm leading-6 text-slate-400">{item.desc}</p>
                      <button className="mt-4 rounded-xl border border-white/10 px-3 py-2 text-xs text-slate-200 hover:bg-white/5">
                        เปิดด้วย AI Assistant
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-slate-900/90 p-6 shadow-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Global AI Chat Window</div>
                    <h3 className="mt-1 text-xl font-semibold">Universal Assistant</h3>
                  </div>
                  <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
                    Online
                  </span>
                </div>

                <div className="mt-5 space-y-3 rounded-[24px] border border-white/10 bg-slate-950/70 p-4">
                  <div className="ml-auto max-w-[85%] rounded-2xl bg-cyan-400 px-4 py-3 text-sm text-slate-950">
                    วันนี้มี decision ใดบ้างที่รออนุมัติระดับผู้บริหาร?
                  </div>
                  <div className="max-w-[92%] rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm leading-6 text-slate-200">
                    พบ 3 รายการ: Budget Reallocation (Finance AI), Vendor Risk Flag (Risk AI), Policy Override Request
                    (Governance). คุณสามารถเปิด panel รายการเหล่านี้ด้านล่างหรือสั่งให้ฉันกรองเฉพาะรายการที่ต้องการ CFO
                    approval ได้
                  </div>
                </div>

                <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
                  {["/start workflow", "/pending approvals", "/drift alerts", "/open lineage"].map((cmd) => (
                    <button
                      key={cmd}
                      className="whitespace-nowrap rounded-full border border-white/10 px-3 py-2 text-xs text-slate-300 hover:bg-white/5"
                    >
                      {cmd}
                    </button>
                  ))}
                </div>

                <div className="mt-4">
                  <input
                    className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm placeholder:text-slate-500"
                    placeholder="พิมพ์คำสั่งหรือคำถามถึง Global AI..."
                  />
                </div>
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Department Layer</div>
                    <h3 className="mt-1 text-2xl font-semibold">AI Departments</h3>
                  </div>
                  <button className="rounded-2xl border border-white/10 px-4 py-2 text-sm text-slate-200 hover:bg-white/5">
                    View All Departments
                  </button>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {deptCards.map((dept) => (
                    <div key={dept.name} className="rounded-[24px] border border-white/10 bg-white/5 p-5 shadow-lg">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-lg font-medium">{dept.name}</div>
                          <div className="mt-2 text-sm text-slate-400">Active tasks: {dept.tasks}</div>
                        </div>
                        <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-slate-300">
                          {dept.status}
                        </span>
                      </div>
                      <div className="mt-5 flex gap-2">
                        <button className="rounded-xl bg-white px-3 py-2 text-xs font-medium text-slate-900">
                          {dept.ai}
                        </button>
                        <button className="rounded-xl border border-white/10 px-3 py-2 text-xs text-slate-200">
                          Open Dashboard
                        </button>
                        <button className="rounded-xl border border-white/10 px-3 py-2 text-xs text-slate-200">
                          Policies
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-6">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Section AI Chat</div>
                <h3 className="mt-1 text-2xl font-semibold">Department Assistant</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  ผู้ช่วยเฉพาะส่วน ใช้ถามคำถามเชิงแผนก เช่น “Finance AI มีงานไหนติด approval”, “Legal AI review policy
                  ไหนค้างอยู่”
                </p>
                <div className="mt-5 space-y-3 rounded-[24px] border border-white/10 bg-slate-950/70 p-4">
                  <div className="rounded-2xl bg-white/5 px-4 py-3 text-sm text-slate-200">
                    Finance AI ตอนนี้มี 2 รายการที่เกิน threshold และ 1 รายการที่ต้อง CFO review
                  </div>
                  <div className="ml-auto rounded-2xl bg-cyan-400 px-4 py-3 text-sm text-slate-950">
                    เปิดรายการที่ต้อง CFO review ให้หน่อย
                  </div>
                </div>
                <input
                  className="mt-4 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm placeholder:text-slate-500"
                  placeholder="ถามผู้ช่วยประจำ section นี้..."
                />
              </div>
            </section>

            <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Decision Center</div>
                    <h3 className="mt-1 text-2xl font-semibold">Pending & Recent Decisions</h3>
                  </div>
                  <button className="rounded-2xl border border-white/10 px-4 py-2 text-sm text-slate-200 hover:bg-white/5">
                    Open Decision Board
                  </button>
                </div>

                <div className="mt-5 space-y-4">
                  {decisionFeed.map((item) => (
                    <div key={item.id} className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                          <div className="text-sm text-slate-400">{item.id}</div>
                          <div className="mt-1 text-lg font-medium">{item.title}</div>
                          <div className="mt-2 text-sm text-slate-400">
                            Owner: {item.owner} · State: {item.state} · Risk: {item.risk}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <button className="rounded-xl bg-white px-3 py-2 text-xs font-medium text-slate-900">Open</button>
                          <button className="rounded-xl border border-white/10 px-3 py-2 text-xs text-slate-200">
                            Explain with AI
                          </button>
                          <button className="rounded-xl border border-white/10 px-3 py-2 text-xs text-slate-200">
                            View Lineage
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-6">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Decision Panel Chat</div>
                <h3 className="mt-1 text-2xl font-semibold">Decision AI Explainer</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  แชทนี้ฝังอยู่ใน decision detail panel ทุกใบ ใช้ถามเหตุผล, policy ที่เกี่ยวข้อง, confidence, risk, และ
                  lineage proof
                </p>
                <div className="mt-5 rounded-[24px] border border-white/10 bg-slate-950/70 p-4">
                  <div className="rounded-2xl bg-white/5 px-4 py-3 text-sm text-slate-200">
                    DEC-1042 ถูกตั้งเป็น Awaiting CFO Approval เพราะ amount_delta เกิน policy threshold POL-FIN-001 และ
                    Risk AI ให้ระดับ Medium
                  </div>
                </div>
                <input
                  className="mt-4 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm placeholder:text-slate-500"
                  placeholder="ถามเกี่ยวกับ decision นี้..."
                />
              </div>
            </section>

            <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
              <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-6">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Lineage & Audit</div>
                <h3 className="mt-1 text-2xl font-semibold">Proof, Replay, and Event Chain</h3>
                <div className="mt-5 rounded-[24px] border border-white/10 bg-slate-950/70 p-5 text-sm leading-7 text-slate-300">
                  ทุก decision material ต้องเปิด lineage ได้ด้วยปุ่มเดียว พร้อม AI helper สำหรับอธิบาย event chain
                  แบบภาษาธรรมดาให้ผู้บริหารเข้าใจง่าย
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button className="rounded-xl bg-white px-3 py-2 text-xs font-medium text-slate-900">Open Proof Viewer</button>
                  <button className="rounded-xl border border-white/10 px-3 py-2 text-xs text-slate-200">Replay Audit</button>
                  <button className="rounded-xl border border-white/10 px-3 py-2 text-xs text-slate-200">Ask Audit AI</button>
                </div>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-6">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Settings Overview</div>
                <h3 className="mt-1 text-2xl font-semibold">System Configuration</h3>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {settingGroups.map((group) => (
                    <div key={group.title} className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                      <div className="text-base font-medium">{group.title}</div>
                      <ul className="mt-3 space-y-2 text-sm text-slate-400">
                        {group.items.map((item) => (
                          <li key={item}>• {item}</li>
                        ))}
                      </ul>
                      <button className="mt-4 rounded-xl border border-white/10 px-3 py-2 text-xs text-slate-200">
                        Configure
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="rounded-[28px] border border-white/10 bg-slate-900/80 p-6">
              <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Chat Placement Map</div>
                  <h3 className="mt-1 text-2xl font-semibold">ตำแหน่งหน้าต่าง AI Chat ทั้งระบบ</h3>
                </div>
                <button className="rounded-2xl border border-white/10 px-4 py-2 text-sm text-slate-200 hover:bg-white/5">
                  Open Full Chat Architecture
                </button>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                {chatPositions.map((chat) => (
                  <div key={chat.area} className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                    <div className="text-base font-medium">{chat.area}</div>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{chat.detail}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>

      <button className="fixed bottom-6 right-6 z-30 rounded-full bg-cyan-400 px-5 py-4 text-sm font-semibold text-slate-950 shadow-2xl shadow-cyan-500/30 hover:opacity-90">
        AI Chat
      </button>
    </div>
  );
}
