import { Users, UploadCloud, Cpu, ShieldCheck } from 'lucide-react';

const cards = [
  { label: 'Total Users', value: '256', icon: Users },
  { label: 'Total Uploads', value: '124', icon: UploadCloud },
  { label: 'Total Predictions', value: '1,280', icon: Cpu },
  { label: 'Admin Status', value: 'Active', icon: ShieldCheck }
];

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-10">
      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold">Admin dashboard</h1>
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.label} className="rounded-2xl border border-slate-200 p-5">
                <Icon className="h-8 w-8 text-cyan-600" />
                <p className="mt-4 text-sm text-slate-500">{card.label}</p>
                <p className="mt-2 text-2xl font-semibold">{card.value}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
