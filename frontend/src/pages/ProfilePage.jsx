import { UserCircle2, Mail, ShieldCheck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-600">Profile</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">Your account details</h1>
          </div>
          <div className="inline-flex items-center gap-3 rounded-3xl bg-slate-100 px-5 py-4">
            <UserCircle2 className="h-10 w-10 text-cyan-600" />
            <div>
              <p className="font-semibold text-slate-900">{user?.displayName || 'Water Guardian'}</p>
              <p className="text-sm text-slate-500">Member since 2026</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 text-cyan-600">
            <Mail className="h-5 w-5" />
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Email</p>
          </div>
          <p className="mt-4 text-lg font-semibold text-slate-900">{user?.email || 'Not available'}</p>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 text-cyan-600">
            <ShieldCheck className="h-5 w-5" />
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Account status</p>
          </div>
          <p className="mt-4 text-lg font-semibold text-slate-900">Active</p>
          <p className="mt-2 text-sm text-slate-500">Your profile is synced with Firebase authentication.</p>
        </div>
      </div>

      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">About your dashboard</h2>
        <p className="mt-4 text-slate-600">This workspace keeps your sidebar visible at all times while navigating between dashboard pages. Use the navigation menu to access analysis, history, and report views without a reload of the layout shell.</p>
      </div>
    </div>
  );
}
