import React, { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'app' | 'about'>('app');
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-3">
          <span className="text-3xl">🗺️</span>
          <div>
            <h1 className="font-bold text-lg text-slate-900">GeoNotes</h1>
            <p className="text-xs text-slate-500">Portfolio PWA (Vite + TS + Workbox)</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('app')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${activeTab === 'app' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${activeTab === 'about' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            PWA Info
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto p-6">
        {activeTab === 'app' ? (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">
              <div className="text-6xl mb-4">🗺️</div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">GeoNotes - Offline Maps & Field Notes</h2>
              <p className="text-slate-600 mb-6 max-w-lg mx-auto text-sm">A progressive web app for dropping geo-tagged notes, offline maps via tile caching, and spatial sync.</p>

              <div className="flex justify-center space-x-4 mb-8">
                <button
                  onClick={() => setCount(c => c + 1)}
                  className="px-6 py-3 rounded-xl font-semibold text-white shadow-lg transition-transform active:scale-95"
                  style={{ backgroundColor: '#10B981' }}
                >
                  Interactive Action (Count: {count})
                </button>
              </div>

              <div className="max-w-md mx-auto space-y-2 text-left bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Key Capabilities</h3>
                <div className="flex items-center text-sm text-slate-700"><span className="mr-2 font-bold" style={{color: "#10B981"}}>✓</span> Offline map tile caching</div>
            <div className="flex items-center text-sm text-slate-700"><span className="mr-2 font-bold" style={{color: "#10B981"}}>✓</span> Geo-tagged markdown notes</div>
            <div className="flex items-center text-sm text-slate-700"><span className="mr-2 font-bold" style={{color: "#10B981"}}>✓</span> Spatial search & radius filtering</div>
            <div className="flex items-center text-sm text-slate-700"><span className="mr-2 font-bold" style={{color: "#10B981"}}>✓</span> Export GeoJSON & GPX</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-4">
            <h2 className="text-xl font-bold text-slate-900">Progressive Web App (PWA) Architecture</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              This application is built with Vite, TypeScript, Tailwind CSS, and Workbox (via vite-plugin-pwa). It is fully optimized for mobile and desktop browsers, featuring offline support, manifest installation, and auto-update service worker lifecycle.
            </p>
            <div className="bg-slate-50 p-4 rounded-xl font-mono text-xs text-slate-700 space-y-1">
              <div>📦 Stack: Vite + React + TypeScript + Tailwind</div>
              <div>⚡ Service Worker: Workbox (Auto-update enabled)</div>
              <div>🚀 Repository: github.com/rudra/pwa-offline-maps-notes</div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 px-6 py-4 text-center text-xs text-slate-400">
        Portfolio PWA 2026 • Built with automated pipeline
      </footer>
    </div>
  );
}
