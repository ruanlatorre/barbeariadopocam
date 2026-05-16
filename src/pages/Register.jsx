import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Register() {
  const navigate = useNavigate();
  const { user, loading: authLoading, loginWithGoogle, registerWithEmail } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [emailLoading, setEmailLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');

  const getRegisterErrorMessage = (registerError) => {
    if (registerError.code === 'auth/email-already-in-use') {
      return 'Este e-mail já está cadastrado. Entre na sua conta ou use outro e-mail.';
    }

    if (registerError.code === 'auth/invalid-email') {
      return 'Digite um e-mail válido.';
    }

    if (registerError.code === 'auth/weak-password') {
      return 'Sua senha precisa ter pelo menos 6 caracteres.';
    }

    if (registerError.code === 'auth/operation-not-allowed') {
      return 'Ative o cadastro por e-mail e senha no Firebase Authentication.';
    }

    return 'Não foi possível criar sua conta. Tente novamente.';
  };

  const getGoogleRegisterErrorMessage = (registerError) => {
    if (registerError.code === 'auth/operation-not-allowed') {
      return 'O login com Google está desativado no Firebase Authentication.';
    }

    if (registerError.code === 'auth/unauthorized-domain') {
      return 'Este domínio não está autorizado no Firebase. Use localhost ou adicione este domínio em Authentication > Settings > Authorized domains.';
    }

    if (registerError.code === 'auth/popup-blocked') {
      return 'O navegador bloqueou o popup do Google. Libere popups para este site e tente novamente.';
    }

    if (registerError.code === 'auth/popup-closed-by-user') {
      return 'A janela do Google foi fechada antes de concluir o cadastro.';
    }

    if (registerError.code === 'permission-denied') {
      return 'O Google autenticou, mas o Firestore bloqueou a criação/leitura do perfil. Verifique as regras da coleção users.';
    }

    return `Não foi possível continuar com Google${registerError.code ? ` (${registerError.code})` : ''}.`;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== passwordConfirmation) {
      setError('As senhas não conferem.');
      return;
    }

    setEmailLoading(true);

    try {
      await registerWithEmail({
        displayName,
        email,
        password,
        phone,
      });
      navigate('/home');
    } catch (registerError) {
      console.error('Erro no cadastro com e-mail:', registerError);
      setError(getRegisterErrorMessage(registerError));
    } finally {
      setEmailLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setGoogleLoading(true);
    setError('');

    try {
      await loginWithGoogle();
      navigate('/home');
    } catch (registerError) {
      console.error('Erro no cadastro com Google:', registerError);
      setError(getGoogleRegisterErrorMessage(registerError));
    } finally {
      setGoogleLoading(false);
    }
  };

  if (!authLoading && user) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="login-wrapper">
      <div className="bg-noise"></div>

      <main className="login-main">
        <div className="login-header">
          <img
            alt="Barbearia do Poçam Logo"
            className="login-logo"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJEF5s9dq7CrL23rSAsIj3RxQw95oG5tRv74RncXk1hctpzj0sqmKVPx1QM3Hsxx4B9WxbQvhrk_cMvMHZaFdCnxuotJ1_gCZlyQvPnNCQRTjynn8WHltp253I5MCUDFJoLkPmzlBs8t8_86EFLZNap7O282IRrozpvqs_3oPRveIqHZ46s18V9VvuQrfIFn-BBvSpHsH7P6ncu9d6MNF-B8S73G0-cismGQjG-CBqIqnLiMuC3z-PYUmMe4qTHq_z3siPTzWh_0c"
          />
          <h1 className="login-title">
            Crie sua<br />conta
          </h1>
          <p className="login-subtitle">Entre para o clube da Barbearia do Poçam</p>
        </div>

        <div className="login-card">
          <button
            type="button"
            onClick={handleGoogleRegister}
            disabled={googleLoading || authLoading || emailLoading}
            className="google-btn group disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <svg className="google-icon" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
            </svg>
            {googleLoading || authLoading ? 'Criando conta...' : 'Cadastrar com Google'}
          </button>

          {error && (
            <p className="font-body-md text-sm text-error text-center" role="alert">
              {error}
            </p>
          )}

          <div className="login-divider">
            <div className="login-divider-line"></div>
            <span className="login-divider-text">ou e-mail</span>
            <div className="login-divider-line"></div>
          </div>

          <form className="login-form" onSubmit={handleRegister}>
            <div className="login-input-group">
              <label className="sr-only" htmlFor="displayName">Nome</label>
              <input
                id="displayName"
                type="text"
                required
                placeholder="Nome completo"
                autoComplete="name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="login-input"
              />
            </div>

            <div className="login-input-group">
              <label className="sr-only" htmlFor="registerEmail">E-mail</label>
              <input
                id="registerEmail"
                type="email"
                required
                placeholder="E-mail"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="login-input"
              />
            </div>

            <div className="login-input-group">
              <label className="sr-only" htmlFor="phone">WhatsApp</label>
              <input
                id="phone"
                type="tel"
                placeholder="WhatsApp"
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="login-input"
              />
            </div>

            <div className="login-input-group">
              <label className="sr-only" htmlFor="registerPassword">Senha</label>
              <input
                id="registerPassword"
                type="password"
                required
                minLength="6"
                placeholder="Senha"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
              />
            </div>

            <div className="login-input-group">
              <label className="sr-only" htmlFor="passwordConfirmation">Confirmar senha</label>
              <input
                id="passwordConfirmation"
                type="password"
                required
                minLength="6"
                placeholder="Confirmar senha"
                autoComplete="new-password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                className="login-input"
              />
            </div>

            <button
              type="submit"
              disabled={emailLoading || authLoading || googleLoading}
              className="login-submit-btn hard-shadow disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {emailLoading ? 'Criando...' : 'Cadastrar'} <span>→</span>
            </button>
          </form>
        </div>

        <div className="login-footer">
          <p className="login-footer-text">
            Já tem conta?
            <Link to="/login" className="login-footer-link">Entrar</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
