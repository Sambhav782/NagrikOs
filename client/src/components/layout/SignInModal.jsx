import { useState } from 'react';
import { ArrowRight, LockKeyhole, ShieldCheck, X } from 'lucide-react';
import { useApp } from '../../context/AppContext.jsx';

// This sign-in is intended for presentation use, not secure production authentication.
export default function SignInModal({ onClose }) {
  const { signIn, t } = useApp();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = (event) => {
    event.preventDefault();
    if (!signIn(username, password)) {
      setError(t.loginError);
      return;
    }
    setError('');
    onClose();
  };

  return (
    <div className="modal-backdrop login-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="login-modal" role="dialog" aria-modal="true" aria-labelledby="login-title">
        <button className="modal-close" type="button" aria-label={t.closeSignIn} onClick={onClose}><X size={17} /></button>
        <div className="login-icon"><LockKeyhole size={23} /></div>
        <span className="section-eyebrow">{t.loginEyebrow}</span>
        <h2 id="login-title">{t.loginTitle}</h2>
        <p>{t.loginIntro}</p>
        <form className="login-form" onSubmit={submit}>
          <label className="field"><span>{t.username}</span><input autoComplete="username" value={username} onChange={(event) => setUsername(event.target.value)} placeholder={t.usernamePlaceholder} required /></label>
          <label className="field"><span>{t.password}</span><input autoComplete="current-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder={t.passwordPlaceholder} required /></label>
          {error && <p className="login-error" role="alert">{error}</p>}
          <button className="btn-primary login-submit" type="submit">{t.signIn} <ArrowRight size={16} /></button>
        </form>
        <p className="login-security-note"><ShieldCheck size={15} /> {t.loginSecurityNote}</p>
      </section>
    </div>
  );
}
