# 🗺️ GeoNotes - Offline Maps & Field Notes

**GeoNotes** - Offline-first map-taking app with Geolocation and IndexedDB persistence.

Built with **Vite + React + TypeScript + Tailwind CSS + Workbox** (`vite-plugin-pwa`).
Installable, offline-first, localStorage backed.

## Features

- **Offline tile caching**
- **Geo-tagged notes**
- **Radius search**
- **Export GeoJSON**

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # emits dist/ + service worker
```

The service worker uses `registerType: 'autoUpdate'` with a Workbox
precache and a `NetworkFirst` runtime cache, so repeat visits work offline.

## Repo

`pwa-offline-maps-notes` - part of the 2026 Portfolio PWA Mobile Suite.
