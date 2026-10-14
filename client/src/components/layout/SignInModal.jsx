import { useState } from 'react';
import { ArrowRight, LockKeyhole, ShieldCheck, X } from 'lucide-react';
import { useApp } from '../../context/AppContext.jsx';

// This sign-in is intended for presentation use, not secure production authentication.
export default function SignInModal({ onClose }) {
  const { signIn } = useApp();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = (event) => {
    event.preventDefault();
    if (!signIn(username, password)) {
      setError('The username or password is incorrect. Please try again.');
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
        <h2 id="login-title">Sign in to your account</h2>
        <p>Sign in to view personalised scholarship recommendations.</p>
        <form className="login-form" onSubmit={submit}>
          <label className="field"><span>Username</span><input autoComplete="username" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Enter username" required /></label>
          <label className="field"><span>Password</span><input autoComplete="current-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter password" required /></label>
          {error && <p className="login-error" role="alert">{error}</p>}
          <button className="btn-primary login-submit" type="submit">Sign in <ArrowRight size={16} /></button>
        </form>
        <p className="login-security-note"><ShieldCheck size={15} /> This sign-in is for presentation purposes only and is not secure authentication.</p>
      </section>
    </div>
  );
}
