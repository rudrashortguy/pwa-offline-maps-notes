import { useState, useEffect } from 'react'
import { Plus, Trash2, Wifi, WifiOff } from 'lucide-react'

const STORAGE_KEY = 'pwa_01-offline-maps-notes_items';

export default function App() {
  const [items, setItems] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : ['GeoNotes', 'Tap below to add new entries', 'Everything is stored locally and works offline'];
    } catch {
      return ['GeoNotes'];
    }
  });
  const [input, setInput] = useState('');
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const up = () => setIsOnline(true);
    const down = () => setIsOnline(false);
    window.addEventListener('online', up);
    window.addEventListener('offline', down);
    return () => {
      window.removeEventListener('online', up);
      window.removeEventListener('offline', down);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setItems([input.trim(), ...items]);
    setInput('');
  };

  const removeItem = (i: number) => setItems(items.filter((_, idx) => idx !== i));

  return (
    <div className="container">
      <header>
        <div>
          <h1>GeoNotes</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            Offline-first map-taking app with Geolocation and IndexedDB persistence.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
          <span className="badge">🗺️ GeoNotes</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: isOnline ? '#4ade80' : '#f87171' }}>
            {isOnline ? <Wifi size={14} /> : <WifiOff size={14} />}
            {isOnline ? 'Online' : 'Offline Mode'}
          </span>
        </div>
      </header>

      <div className="card">
        <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Interactive Workspace</h3>
        <form onSubmit={addItem} style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add new entry..."
            style={{ marginBottom: 0, flex: 1 }}
          />
          <button type="submit"><Plus size={16} /> Add</button>
        </form>
      </div>

      <div className="card" style={{ flex: 1 }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Stored Entries ({items.length})</h3>
        {items.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem 0' }}>
            No items yet. Add one above!
          </p>
        ) : (
          <ul>
            {items.map((item, idx) => (
              <li key={idx}>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
                  {item}
                </span>
                <button
                  onClick={() => removeItem(idx)}
                  style={{ background: 'transparent', color: '#f87171', padding: '0.25rem 0.5rem' }}
                >
                  <Trash2 size={16} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <footer>
        <p>GeoNotes &bull; Built with Vite, TypeScript &amp; Workbox PWA</p>
      </footer>
    </div>
  );
}
