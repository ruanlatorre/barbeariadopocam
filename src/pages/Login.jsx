import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { user, loading: authLoading, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('Use o botão do Google para entrar nesta versão.');
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setError('');

    try {
      await loginWithGoogle();
      navigate('/home');
    } catch (loginError) {
      console.error('Erro no login com Google:', loginError);
      setError('Não foi possível entrar com Google. Verifique se o provedor Google está ativado no Firebase.');
    } finally {
      setGoogleLoading(false);
    }
  };

  if (!authLoading && user) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="login-wrapper">
      {/* Global Noise Overlay */}
      <div className="bg-noise"></div>
      
      {/* Main Content Container */}
      <main className="login-main">
        
        {/* Logo Header */}
        <div className="login-header">
          <img 
            alt="Barbearia do Poçam Logo" 
            className="login-logo" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJEF5s9dq7CrL23rSAsIj3RxQw95oG5tRv74RncXk1hctpzj0sqmKVPx1QM3Hsxx4B9WxbQvhrk_cMvMHZaFdCnxuotJ1_gCZlyQvPnNCQRTjynn8WHltp253I5MCUDFJoLkPmzlBs8t8_86EFLZNap7O282IRrozpvqs_3oPRveIqHZ46s18V9VvuQrfIFn-BBvSpHsH7P6ncu9d6MNF-B8S73G0-cismGQjG-CBqIqnLiMuC3z-PYUmMe4qTHq_z3siPTzWh_0c"
          />
          <h1 className="login-title">
            Barbearia<br/>do Poçam
          </h1>
          <p className="login-subtitle">Estética Urbana de Luxo</p>
        </div>

        {/* Login Form Card */}
        <div className="login-card">
          
          {/* Google OAuth Button */}
          <button type="button" onClick={handleGoogleLogin} disabled={googleLoading || authLoading} className="google-btn group disabled:opacity-60 disabled:cursor-not-allowed">
            <svg className="google-icon" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
            </svg>
            {googleLoading || authLoading ? 'Entrando...' : 'Continuar com Google'}
          </button>

          {error && (
            <p className="font-body-md text-sm text-error text-center" role="alert">
              {error}
            </p>
          )}

          {/* Divider */}
          <div className="login-divider">
            <div className="login-divider-line"></div>
            <span className="login-divider-text">ou e-mail</span>
            <div className="login-divider-line"></div>
          </div>

          {/* Credentials Form */}
          <form className="login-form" onSubmit={handleLogin}>
            
            {/* Email Field */}
            <div className="login-input-group">
              <label className="sr-only" htmlFor="email">E-mail</label>
              <input 
                id="email" 
                type="email" 
                required 
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="login-input"
              />
            </div>

            {/* Password Field */}
            <div className="login-input-group">
              <label className="sr-only" htmlFor="password">Senha</label>
              <input 
                id="password" 
                type="password" 
                required 
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
              />
            </div>

            {/* Forgot Password Link */}
            <div className="login-forgot-wrapper">
              <a href="#" className="login-forgot-link">Esqueceu a senha?</a>
            </div>

            {/* Submit Button */}
            <button type="submit" className="login-submit-btn hard-shadow">
              Entrar <span>→</span>
            </button>
          </form>
        </div>

        {/* Create Account Link */}
        <div className="login-footer">
          <p className="login-footer-text">
            Novo por aqui? 
            <a href="#" className="login-footer-link">Criar Conta</a>
          </p>
        </div>

      </main>
    </div>
  );
}
