import { useState } from 'react';
import { UploadCloud, Download, Table2 } from 'lucide-react';
import { auth } from '../firebase/config';
import { uploadCsv } from '../services/api';

const requiredColumns = ['ph', 'Hardness', 'Solids', 'Chloramines', 'Sulfate', 'Conductivity', 'Organic_carbon', 'Trihalomethanes', 'Turbidity'];

function predictRow(row) {
  const ranges = {
    ph: [6.5, 8.5],
    Hardness: [60, 120],
    Solids: [0, 500],
    Chloramines: [0, 4],
    Sulfate: [0, 250],
    Conductivity: [0, 800],
    Organic_carbon: [0, 15],
    Trihalomethanes: [0, 80],
    Turbidity: [0, 5]
  };

  const entries = Object.entries(ranges);
  const isSafe = entries.every(([key, [min, max]]) => {
    const value = Number(row[key]);
    return !Number.isNaN(value) && value >= min && value <= max;
  });

  return isSafe ? 'Safe' : 'Unsafe';
}

export default function AnalysisPage() {
  const [file, setFile] = useState(null);
  const [rows, setRows] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleUpload(e) {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const currentUser = auth.currentUser;
    if (!currentUser?.email && !currentUser?.uid) {
      setFile(selectedFile);
      setMessage('Please sign in before uploading a CSV.');
      return;
    }

    setFile(selectedFile);
    setLoading(true);
    setMessage('');
    try {
      const data = await uploadCsv(selectedFile, { email: currentUser.email, uid: currentUser.uid });
      const parsedRows = data.rows || [];
      const withPrediction = parsedRows.map((row) => ({ ...row, Prediction: predictRow(row) }));
      setRows(withPrediction);
      setMessage(data.message || 'Analysis complete');
    } catch (error) {
      setRows([]);
      setMessage(error.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  }

  function downloadResults() {
    const header = ['ph', 'Hardness', 'Solids', 'Chloramines', 'Sulfate', 'Conductivity', 'Organic_carbon', 'Trihalomethanes', 'Turbidity', 'Prediction'];
    const csv = [header.join(','), ...rows.map((row) => header.map((key) => row[key] ?? row.Prediction).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'hydro-guardian-results.csv';
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-10">
      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-600">Water Analysis</p>
            <h1 className="text-3xl font-semibold">Upload and predict water quality</h1>
          </div>
          <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-cyan-300 bg-cyan-50 px-5 py-4 text-cyan-700">
            <UploadCloud className="h-6 w-6" />
            <span>{file ? file.name : 'Upload CSV file'}</span>
            <input type="file" accept=".csv" className="hidden" onChange={handleUpload} />
          </label>
        </div>

        {message && <p className={`mt-4 rounded-xl p-3 text-sm ${message.toLowerCase().includes('sign in') || message.toLowerCase().includes('not found') || message.toLowerCase().includes('failed') ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-700'}`}>{message}</p>}
        {loading && <p className="mt-4 text-sm text-cyan-600">Analyzing rows...</p>}

        {rows.length > 0 && (
          <div className="mt-8">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-600">
                <Table2 className="h-5 w-5" /> Uploaded data preview
              </div>
              <button onClick={downloadResults} className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-white">
                <Download className="h-4 w-4" /> Download Results
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-slate-100 text-left">
                    {requiredColumns.map((col) => <th key={col} className="px-3 py-2">{col}</th>)}
                    <th className="px-3 py-2">Prediction</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.slice(0, 10).map((row, idx) => (
                    <tr key={idx} className="border-b border-slate-200">
                      {requiredColumns.map((col) => <td key={col} className="px-3 py-2">{row[col]}</td>)}
                      <td className={`px-3 py-2 font-semibold ${row.Prediction === 'Safe' ? 'text-emerald-600' : 'text-rose-600'}`}>{row.Prediction}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
