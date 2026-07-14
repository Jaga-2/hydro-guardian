import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const distributionData = [
  { name: 'pH', value: 7.2 },
  { name: 'Hardness', value: 80 },
  { name: 'Conductivity', value: 450 },
  { name: 'Turbidity', value: 3.2 }
];

const safetyData = [
  { name: 'Safe', value: 72 },
  { name: 'Unsafe', value: 28 }
];

const pieColors = ['#06b6d4', '#fb7185'];

export default function VisualizationPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-10">
      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold">Water quality insights</h1>
        <p className="mt-2 text-slate-500">Visual analysis for your uploaded water samples.</p>
        <div className="mt-8 grid gap-6 xl:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 p-4">
            <h2 className="mb-4 font-semibold">Parameter Distribution</h2>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={distributionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 p-4">
            <h2 className="mb-4 font-semibold">Safe vs Unsafe</h2>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={safetyData} dataKey="value" nameKey="name" innerRadius={70} outerRadius={110} paddingAngle={2}>
                    {safetyData.map((entry, idx) => <Cell key={entry.name} fill={pieColors[idx % pieColors.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 p-4 xl:col-span-2">
            <h2 className="mb-4 font-semibold">Trend Overview</h2>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={distributionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#0891b2" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
