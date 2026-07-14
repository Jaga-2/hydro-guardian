import { ArrowRight, Droplets, ShieldCheck, BarChart3, FlaskConical } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { label: 'Active Users', value: '4.8k+' },
  { label: 'Analyses Today', value: '1.2k' },
  { label: 'Accuracy', value: '98.7%' },
  { label: 'Reports Generated', value: '9.3k' }
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-sky-950 to-cyan-700 text-white">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
        <div className="flex items-center gap-2 text-xl font-semibold">
          <Droplets className="h-6 w-6 text-cyan-300" /> Hydro Guardian
        </div>
        <nav className="flex gap-4 text-sm">
          <Link to="/login" className="rounded-full border border-white/20 px-4 py-2 hover:bg-white/10">Login</Link>
          <Link to="/register" className="rounded-full bg-cyan-400 px-4 py-2 font-medium text-slate-950">Get Started</Link>
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <section className="grid items-center gap-12 py-16 lg:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-200">
              AI-powered water quality monitoring
            </div>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">Predict drinking water safety with confidence.</h1>
            <p className="mt-6 max-w-xl text-lg text-slate-300">Hydro Guardian helps communities and organizations analyze water samples with intelligent predictions, clear visualizations, and downloadable reports.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/register" className="rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950">Start Free</Link>
              <Link to="/dashboard" className="rounded-full border border-white/20 px-6 py-3 font-semibold">View Demo</Link>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-950/40 p-4">
                <ShieldCheck className="mb-3 h-8 w-8 text-cyan-300" />
                <p className="text-sm text-slate-400">Safe Prediction</p>
                <p className="text-2xl font-semibold">98.7%</p>
              </div>
              <div className="rounded-2xl bg-slate-950/40 p-4">
                <BarChart3 className="mb-3 h-8 w-8 text-cyan-300" />
                <p className="text-sm text-slate-400">Live Insights</p>
                <p className="text-2xl font-semibold">Interactive</p>
              </div>
              <div className="rounded-2xl bg-slate-950/40 p-4 sm:col-span-2">
                <FlaskConical className="mb-3 h-8 w-8 text-cyan-300" />
                <p className="text-sm text-slate-400">CSV Analysis</p>
                <p className="text-2xl font-semibold">Upload, Predict, Report</p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="rounded-2xl border border-white/10 bg-white/10 p-5 text-center backdrop-blur">
              <p className="text-3xl font-semibold">{item.value}</p>
              <p className="mt-2 text-sm text-slate-300">{item.label}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
