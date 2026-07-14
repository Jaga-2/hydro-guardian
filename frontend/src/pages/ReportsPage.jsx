import { Download } from 'lucide-react';

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-10">
      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-600">Reports</p>
            <h1 className="text-3xl font-semibold">Summary and PDF exports</h1>
          </div>
          <button className="flex items-center gap-2 rounded-2xl bg-cyan-600 px-5 py-3 text-white">
            <Download className="h-5 w-5" /> Generate PDF
          </button>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 p-5">
            <p className="text-sm text-slate-500">Total Samples</p>
            <p className="mt-2 text-3xl font-semibold">120</p>
          </div>
          <div className="rounded-2xl border border-slate-200 p-5">
            <p className="text-sm text-slate-500">Safe Samples</p>
            <p className="mt-2 text-3xl font-semibold">84</p>
          </div>
          <div className="rounded-2xl border border-slate-200 p-5">
            <p className="text-sm text-slate-500">Accuracy</p>
            <p className="mt-2 text-3xl font-semibold">98.7%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
