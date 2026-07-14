import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await register(email, password);
      navigate('/dashboard');
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-sky-950 to-cyan-700 p-6 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-2xl backdrop-blur">
        <h2 className="text-3xl font-semibold">Create account</h2>
        <p className="mt-2 text-slate-400">Join Hydro Guardian</p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <input className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button className="w-full rounded-xl bg-cyan-400 py-3 font-semibold text-slate-950">Register</button>
        </form>
        {message && <p className="mt-4 text-sm text-cyan-300">{message}</p>}
        <p className="mt-6 text-sm text-slate-400">Already have an account? <Link to="/login" className="text-cyan-300">Login</Link></p>
      </div>
    </div>
  );
}
