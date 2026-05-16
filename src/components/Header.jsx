import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="header-logo" style={{textDecoration: 'none'}}>POÇAM <span className="text-accent">GROOMING</span></Link>
        <nav className="nav-menu">
          <Link to="/barbers" className="nav-link">Profissionais</Link>
          <Link to="/plans" className="nav-link">Planos</Link>
          <Link to="/profile" className="nav-link">Meu Perfil</Link>
        </nav>
        <Link to="/schedule" className="btn-primary" style={{padding: '0.5rem 1.5rem', fontSize: '0.875rem'}}>Agendar</Link>
      </div>
    </header>
  );
}
