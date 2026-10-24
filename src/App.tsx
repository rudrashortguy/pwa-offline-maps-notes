import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Wifi, WifiOff } from 'lucide-react';

export default function App() {
  const [items, setItems] = useState<string[]>(['Welcome to GeoNotes', 'Add your first item below', 'Works offline!']);
  const [input, setInput] = useState('');
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const saved = localStorage.getItem('pwa_01-offline-maps-notes_items');
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch {}
    }

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('pwa_01-offline-maps-notes_items', JSON.stringify(items));
  }, [items]);

  const addItem = () => {
    if (input.trim()) {
      setItems([...items, input.trim()]);
      setInput('');
    }
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center p-6">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">GeoNotes</h1>
          <div className="flex items-center gap-1 text-sm">
            {isOnline ? <Wifi size=16 className="text-green-500" /> : <WifiOff size=16 className="text-red-500" />}
            <span className="text-slate-400">{isOnline ? 'Online' : 'Offline'}</span>
          </div>
        </div>

        <div className="bg-slate-900 rounded-2xl p-4 mb-4">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addItem()}
              placeholder="Add new item..."
              className="flex-1 bg-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-10B981"
            />
            <button onClick={addItem} className="bg-10B981 hover:opacity-80 p-3 rounded-xl transition">
              <Plus />
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {items.map((item, i) => (
            <div key={i} className="bg-slate-900 rounded-xl p-4 flex items-center justify-between">
              <span>{item}</span>
              <button onClick={() => removeItem(i)} className="text-slate-500 hover:text-red-500">
                <Trash2 size=16 />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
