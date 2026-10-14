import { useState } from 'react';
import { ArrowRight, LockKeyhole, ShieldCheck, X } from 'lucide-react';
import { useApp } from '../../context/AppContext.jsx';

// This is intentionally a hardcoded demo sign-in, not secure production authentication.
export default function DemoLoginModal({ onClose }) {
  const { loginDemo } = useApp();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = (event) => {
    event.preventDefault();
    if (!loginDemo(username, password)) {
      setError('That demo ID or password is incorrect. Try the credentials shown below.');
      return;
    }
    setError('');
    onClose();
  };

  return (
    <div className="modal-backdrop login-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="login-modal" role="dialog" aria-modal="true" aria-labelledby="login-title">
        <button className="modal-close" type="button" aria-label="Close sign in" onClick={onClose}><X size={17} /></button>
        <div className="login-icon"><LockKeyhole size={23} /></div>
        <span className="section-eyebrow">WELCOME TO NAGRIKOS</span>
        <h2 id="login-title">Sign in to your demo account</h2>
        <p>Use the sample account to preview a personalised student dashboard.</p>
        <div className="demo-credentials"><strong>Demo ID</strong><code>Sambhav</code><strong>Password</strong><code>123456</code></div>
        <form className="login-form" onSubmit={submit}>
          <label className="field"><span>Username</span><input autoComplete="username" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Enter demo ID" required /></label>
          <label className="field"><span>Password</span><input autoComplete="current-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter password" required /></label>
          {error && <p className="login-error" role="alert">{error}</p>}
          <button className="btn-primary login-submit" type="submit">Sign in <ArrowRight size={16} /></button>
        </form>
        <p className="login-security-note"><ShieldCheck size={15} /> Demo only: credentials are hardcoded in the frontend and must not be used for real accounts.</p>
      </section>
    </div>
  );
}
