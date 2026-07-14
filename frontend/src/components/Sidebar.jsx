import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, UploadCloud, History, FileText, UserCircle2, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'Upload Analysis', icon: UploadCloud, path: '/upload' },
  { label: 'Analysis History', icon: History, path: '/history' },
  { label: 'Reports', icon: FileText, path: '/reports' },
  { label: 'Profile', icon: UserCircle2, path: '/profile' }
];

export default function Sidebar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate('/login');
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-20 w-64 overflow-y-auto border-r border-slate-800/80 bg-slate-950 px-4 py-6 text-slate-100 shadow-2xl shadow-slate-950/20 sm:w-72">
      <div className="flex items-center gap-3 px-2 pb-8">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-500 text-white shadow-lg shadow-cyan-500/20">
          <LayoutDashboard className="h-5 w-5" />
        </div>
        <div>
          <p className="text-lg font-semibold text-white">Hydro Guardian</p>
          <p className="text-sm text-slate-400">Water quality analytics</p>
        </div>
      </div>

      <div className="space-y-1 px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? 'bg-cyan-500/10 text-cyan-200 shadow-inner shadow-cyan-500/10'
                  : 'text-slate-300 hover:bg-slate-900/80 hover:text-white'
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>

      <div className="mt-8 rounded-3xl border border-slate-800/70 bg-slate-900/70 p-4 text-slate-300">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Signed in as</p>
        <p className="mt-3 truncate text-sm font-medium text-white">{user?.email || 'User'}</p>
      </div>

      <div className="mt-8 px-2">
        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-3xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-cyan-400"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
