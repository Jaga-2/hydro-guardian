import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Sidebar />
      <div className="ml-0 min-h-screen sm:ml-72">
        <div className="sticky top-0 z-10 border-b border-slate-200/80 bg-slate-100/80 px-4 py-4 shadow-sm shadow-slate-900/5 backdrop-blur-md sm:px-8">
          <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Hydro Guardian</p>
              <h1 className="text-xl font-semibold text-slate-900">Water Quality Dashboard</h1>
            </div>
          </div>
        </div>

        <main className="mx-auto max-w-[1440px] px-4 py-6 sm:px-8 lg:px-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
