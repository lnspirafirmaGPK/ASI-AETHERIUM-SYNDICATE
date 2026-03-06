
import React, { useState } from 'react';

// Mock chat data - in a real app, this would be managed by a state management library
const mockChatThread = {
  threadId: 'global-chat-1',
  messages: [
    { role: 'assistant', content: 'สวัสดีครับ มีอะไรให้ช่วย' },
  ],
};

export default function Chat({ onClose }) {
  const [messages, setMessages] = useState(mockChatThread.messages);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { role: 'user', content: input }]);
      // Simulate an AI response
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'assistant', content: 'ขออภัย, ฉันยังไม่สามารถประมวลผลคำขอนี้ได้' }]);
      }, 1000);
      setInput('');
    }
  };

  return (
    <div className="fixed bottom-20 right-6 z-40 w-96 rounded-[28px] border border-white/10 bg-slate-900/80 shadow-2xl backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-white/10 p-4">
        <h3 className="text-lg font-semibold">Universal Assistant</h3>
        <button onClick={onClose} className="text-slate-400 hover:text-white">Close</button>
      </div>
      <div className="h-96 space-y-3 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
              message.role === 'assistant'
                ? 'border border-white/10 bg-white/5 text-slate-200'
                : 'ml-auto bg-cyan-400 text-slate-950'
            }`}
          >
            {message.content}
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 p-4">
        <input
          className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm placeholder:text-slate-500"
          placeholder="Ask AI..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
      </div>
    </div>
  );
}
