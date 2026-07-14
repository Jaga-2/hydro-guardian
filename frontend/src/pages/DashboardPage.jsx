import { UploadCloud, BarChart3, UserCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <div className="rounded-3xl bg-gradient-to-r from-sky-600 to-cyan-500 p-8 text-white shadow-xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-100">Dashboard</p>
            <h1 className="mt-2 text-3xl font-semibold">Welcome back, {user?.email || 'guest'}</h1>
            <p className="mt-3 max-w-2xl text-sky-100/90">Monitor water quality insights, upload new reports, and review past analysis with a modern, responsive dashboard.</p>
          </div>
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-white/20 text-white shadow-lg">
            <UserCircle2 className="h-10 w-10" />
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Uploads</p>
          <p className="mt-4 text-3xl font-semibold text-slate-900">24</p>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Predictions</p>
          <p className="mt-4 text-3xl font-semibold text-slate-900">128</p>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Safe Results</p>
          <p className="mt-4 text-3xl font-semibold text-slate-900">83%</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Quick Actions</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Link to="/upload" className="rounded-3xl border border-slate-200 p-5 transition hover:bg-slate-50">
              <UploadCloud className="h-8 w-8 text-cyan-600" />
              <p className="mt-4 text-base font-semibold text-slate-900">Upload CSV</p>
              <p className="mt-2 text-sm text-slate-500">Start a new water quality analysis.</p>
            </Link>
            <Link to="/visualization" className="rounded-3xl border border-slate-200 p-5 transition hover:bg-slate-50">
              <BarChart3 className="h-8 w-8 text-cyan-600" />
              <p className="mt-4 text-base font-semibold text-slate-900">View Insights</p>
              <p className="mt-2 text-sm text-slate-500">Explore your latest tracking charts.</p>
            </Link>
          </div>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Recent Analyses</h2>
          <ul className="mt-6 space-y-3">
            <li className="rounded-2xl bg-slate-50 p-4">River Sample - Safe</li>
            <li className="rounded-2xl bg-slate-50 p-4">Well Water - Unsafe</li>
            <li className="rounded-2xl bg-slate-50 p-4">Community Supply - Safe</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
