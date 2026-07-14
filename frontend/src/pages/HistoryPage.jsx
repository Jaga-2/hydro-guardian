import { useState } from 'react';
import { Search, Trash2 } from 'lucide-react';

const historyEntries = [
  { id: 1, fileName: 'spring-water.csv', date: '2026-07-01', status: 'Safe' },
  { id: 2, fileName: 'municipal.csv', date: '2026-06-28', status: 'Unsafe' },
  { id: 3, fileName: 'well-water.csv', date: '2026-06-20', status: 'Safe' }
];

export default function HistoryPage() {
  const [query, setQuery] = useState('');
  const [entries, setEntries] = useState(historyEntries);

  const filtered = entries.filter((item) => item.fileName.toLowerCase().includes(query.toLowerCase()));

  function removeEntry(id) {
    setEntries((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-10">
      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-600">History</p>
            <h1 className="text-3xl font-semibold">Past uploads and reports</h1>
          </div>
          <div className="flex items-center gap-2 rounded-2xl border border-slate-200 px-3 py-2">
            <Search className="h-4 w-4 text-slate-400" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search reports" className="outline-none" />
          </div>
        </div>

        <div className="mt-8 space-y-3">
          {filtered.map((entry) => (
            <div key={entry.id} className="flex items-center justify-between rounded-2xl border border-slate-200 p-4">
              <div>
                <p className="font-medium">{entry.fileName}</p>
                <p className="text-sm text-slate-500">{entry.date}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className={`rounded-full px-3 py-1 text-sm ${entry.status === 'Safe' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>{entry.status}</span>
                <button onClick={() => removeEntry(entry.id)} className="rounded-full p-2 text-slate-500 hover:bg-slate-100">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
