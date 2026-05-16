import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const fallbackPhoto =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuA6RU31ilW_fSr-rCffKTmMrkINqTG2Guo9xJw-_YOEcneqTmtUQqEiDGhBCByBJ3PdiczagSDDMy1Z4R0dqwXJOvmBs-_N511k9NlcACfvoIAQjDpBHc7TrgROglCPzlV_Y3TQH-4ECuGbZedCacCFEK7aXKtYZ1msjuvP5y9DafC5kMtUWtqazJhzbqG0REPWzSd-GlXaa6d7iADhsmS11k2sL9YTGIysyN31J30oNzImpBE1hcla4bFxf5XsZ3o53sxRUg08yUM';

export default function Profile() {
  const navigate = useNavigate();
  const { user, profile, saveProfile, uploadProfilePhoto, logout } = useAuth();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({ displayName: '', phone: '', photoURL: '' });
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState('');
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showAddCardForm, setShowAddCardForm] = useState(false);

  useEffect(() => {
    setFormData({
      displayName: profile?.displayName || user?.displayName || '',
      phone: profile?.phone || '',
      photoURL: profile?.photoURL || user?.photoURL || '',
    });
  }, [profile, user]);

  useEffect(() => {
    if (!photoFile) {
      setPhotoPreview('');
      return undefined;
    }

    const previewUrl = URL.createObjectURL(photoFile);
    setPhotoPreview(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  }, [photoFile]);

  const coins = profile?.coins ?? 0;
  const progress = Math.min((coins / 500) * 100, 100);
  const displayName = profile?.displayName || user?.displayName || 'Cliente';
  const email = profile?.email || user?.email || '';
  const photoURL = photoPreview || profile?.photoURL || user?.photoURL || fallbackPhoto;

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];
    setMessage('');

    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      setMessage('Selecione um arquivo de imagem.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage('A imagem precisa ter no máximo 5 MB.');
      return;
    }

    setPhotoFile(file);
    setEditing(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      let nextProfile = formData;

      if (photoFile) {
        const photoURL = await uploadProfilePhoto(photoFile);
        nextProfile = { ...formData, photoURL };
      }

      await saveProfile(nextProfile);
      setPhotoFile(null);
      setEditing(false);
      setMessage('Perfil atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar perfil:', error);
      setMessage('Erro ao salvar perfil. Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="profile-wrapper font-body-md antialiased pb-24 pt-20 min-h-screen bg-background">
      <header className="flex justify-between items-center px-container-margin-mobile h-16 w-full fixed top-0 z-50 bg-surface/95 backdrop-blur-md border-b-2 border-surface-variant shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-4">
          <Link to="/home" className="text-primary-fixed-dim">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
        </div>
        <h1 className="font-display-lg-mobile text-headline-md-mobile font-black text-primary-fixed-dim uppercase tracking-tighter truncate max-w-[60%] text-center">
          Meu Perfil
        </h1>
        <button
          type="button"
          onClick={() => setEditing((current) => !current)}
          className="w-10 h-10 flex items-center justify-center text-primary-fixed-dim hover:bg-surface-container-high transition-colors active:scale-95 duration-150 rounded-full"
          aria-label="Editar perfil"
        >
          <span className="material-symbols-outlined">{editing ? 'close' : 'settings'}</span>
        </button>
      </header>

      <main className="px-container-margin-mobile flex flex-col gap-8 mt-4 max-w-lg mx-auto">
        <section className="flex flex-col items-center gap-4 py-6">
          <div className="relative">
            <img
              alt="User Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-primary-fixed-dim shadow-[0_0_20px_rgba(245,191,0,0.3)]"
              src={photoURL}
            />
            <label
              className="absolute bottom-0 right-0 bg-primary-fixed-dim text-[#0A0A0A] p-1.5 rounded-full border-2 border-surface shadow-lg cursor-pointer"
              aria-label="Selecionar foto de perfil"
            >
              <input type="file" accept="image/*" onChange={handlePhotoChange} className="sr-only" />
              <span className="material-symbols-outlined text-sm block">edit</span>
            </label>
          </div>
          <div className="text-center">
            <h2 className="font-headline-lg text-2xl text-on-surface">{displayName}</h2>
            <p className="font-body-md text-on-surface-variant">{email}</p>
            {profile?.phone && <p className="font-body-md text-on-surface-variant">{profile.phone}</p>}
          </div>
        </section>

        {editing && (
          <form onSubmit={handleSubmit} className="bg-[#181818] border border-surface-variant rounded-xl p-6 flex flex-col gap-4">
            <h3 className="font-headline-md text-headline-md text-primary-fixed-dim uppercase">Editar dados</h3>

            <label className="form-group">
              <span className="mono form-label">Nome</span>
              <input
                required
                type="text"
                value={formData.displayName}
                onChange={(event) => setFormData({ ...formData, displayName: event.target.value })}
                className="form-input rounded-md"
              />
            </label>

            <label className="form-group">
              <span className="mono form-label">Telefone / WhatsApp</span>
              <input
                type="tel"
                value={formData.phone}
                onChange={(event) => setFormData({ ...formData, phone: event.target.value })}
                className="form-input rounded-md"
                placeholder="(00) 00000-0000"
              />
            </label>

            <label className="form-group">
              <span className="mono form-label">Foto do perfil</span>
              <input type="file" accept="image/*" onChange={handlePhotoChange} className="form-input rounded-md" />
              <span className="font-body-md text-xs text-on-surface-variant">PNG, JPG ou WebP até 5 MB.</span>
            </label>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="bg-primary-fixed-dim text-[#0A0A0A] font-headline-md uppercase px-5 py-3 rounded-md hard-shadow-hover flex-1 disabled:opacity-60"
              >
                {saving ? 'Salvando...' : 'Salvar'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setPhotoFile(null);
                  setEditing(false);
                }}
                className="bg-transparent border border-surface-variant text-on-surface font-headline-md uppercase px-5 py-3 rounded-md flex-1"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}

        {message && (
          <p className="text-center text-primary-fixed-dim font-body-md" role="status">
            {message}
          </p>
        )}

        <section className="bg-primary-fixed-dim p-6 rounded-xl hard-shadow text-[#0A0A0A] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <span className="material-symbols-outlined text-6xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              stars
            </span>
          </div>
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="font-label-md uppercase tracking-widest opacity-80 text-xs mb-1">Status de Fidelidade</p>
              <h3 className="font-display-lg text-4xl font-black">
                {coins} <span className="text-xl">Coins</span>
              </h3>
            </div>
            <span className="bg-[#0A0A0A]/10 px-3 py-1 rounded-full font-label-md text-xs font-bold border border-[#0A0A0A]/20">
              {profile?.planId === 'free' ? 'Cliente' : profile?.planId || 'Cliente'}
            </span>
          </div>
          <p className="text-sm font-medium mb-4">Faltam {Math.max(500 - coins, 0)} coins para resgatar um Corte Signature grátis!</p>
          <div className="w-full bg-[#0A0A0A]/20 h-2 rounded-full overflow-hidden">
            <div className="bg-[#0A0A0A] h-full" style={{ width: `${progress}%` }}></div>
          </div>
        </section>

        <section className="flex flex-col gap-2">
          <button onClick={() => setShowHistoryModal(true)} className="w-full bg-[#181818] border border-surface-variant p-4 rounded-xl flex items-center gap-4 hover:bg-surface-container-high transition-colors">
            <span className="material-symbols-outlined text-primary-fixed-dim">history</span>
            <span className="flex-grow text-left font-headline-md text-sm uppercase">Histórico de Cortes</span>
            <span className="material-symbols-outlined text-on-surface-variant">chevron_right</span>
          </button>
          <button onClick={() => setShowPaymentModal(true)} className="w-full bg-[#181818] border border-surface-variant p-4 rounded-xl flex items-center gap-4 hover:bg-surface-container-high transition-colors">
            <span className="material-symbols-outlined text-primary-fixed-dim">payments</span>
            <span className="flex-grow text-left font-headline-md text-sm uppercase">Métodos de Pagamento</span>
            <span className="material-symbols-outlined text-on-surface-variant">chevron_right</span>
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full bg-[#181818] border border-surface-variant p-4 rounded-xl flex items-center gap-4 hover:bg-surface-container-high transition-colors text-error"
          >
            <span className="material-symbols-outlined">logout</span>
            <span className="flex-grow text-left font-headline-md text-sm uppercase">Sair da Conta</span>
          </button>
        </section>
      </main>

      {/* Modal de Histórico */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-[100] bg-[#0A0A0A]/80 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity">
          <div className="bg-[#181818] border border-surface-variant rounded-2xl w-full max-w-md overflow-hidden shadow-2xl scale-100 transition-transform">
            <div className="flex justify-between items-center p-6 border-b border-surface-variant">
              <h2 className="font-headline-md text-xl text-primary-fixed-dim uppercase flex items-center gap-2">
                <span className="material-symbols-outlined">history</span> Histórico
              </h2>
              <button onClick={() => setShowHistoryModal(false)} className="w-8 h-8 flex items-center justify-center rounded-full text-on-surface-variant hover:text-primary-fixed-dim hover:bg-surface-container-high transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6 max-h-[60vh] overflow-y-auto flex flex-col gap-4">
              <div className="text-center py-10 opacity-70">
                <span className="material-symbols-outlined text-5xl mb-3 text-primary-fixed-dim/50">event_busy</span>
                <p className="font-body-md text-on-surface-variant text-sm">Nenhum histórico encontrado ainda.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Pagamentos */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-[100] bg-[#0A0A0A]/80 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity">
          <div className="bg-[#181818] border border-surface-variant rounded-2xl w-full max-w-md overflow-hidden shadow-2xl scale-100 transition-transform flex flex-col max-h-[85vh]">
            <div className="flex justify-between items-center p-6 border-b border-surface-variant shrink-0">
              <h2 className="font-headline-md text-xl text-primary-fixed-dim uppercase flex items-center gap-2">
                <span className="material-symbols-outlined">{showAddCardForm ? 'add_card' : 'payments'}</span> 
                {showAddCardForm ? 'Novo Cartão' : 'Pagamentos'}
              </h2>
              <button onClick={() => { setShowPaymentModal(false); setShowAddCardForm(false); }} className="w-8 h-8 flex items-center justify-center rounded-full text-on-surface-variant hover:text-primary-fixed-dim hover:bg-surface-container-high transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-grow flex flex-col gap-4">
              {showAddCardForm ? (
                <form className="flex flex-col gap-4 animate-in fade-in slide-in-from-right-4 duration-300" onSubmit={(e) => { e.preventDefault(); setShowAddCardForm(false); alert('Cartão adicionado com sucesso!'); }}>
                  <label className="flex flex-col gap-1">
                    <span className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider">Número do Cartão</span>
                    <input type="text" placeholder="0000 0000 0000 0000" className="bg-[#0A0A0A]/40 border border-surface-variant rounded-lg p-3 text-on-surface font-body-md focus:border-primary-fixed-dim focus:outline-none transition-colors" required maxLength="19" />
                  </label>
                  
                  <label className="flex flex-col gap-1">
                    <span className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider">Nome no Cartão</span>
                    <input type="text" placeholder="Como impresso no cartão" className="bg-[#0A0A0A]/40 border border-surface-variant rounded-lg p-3 text-on-surface font-body-md focus:border-primary-fixed-dim focus:outline-none transition-colors" required />
                  </label>

                  <div className="flex gap-4">
                    <label className="flex flex-col gap-1 flex-1">
                      <span className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider">Validade</span>
                      <input type="text" placeholder="MM/AA" className="bg-[#0A0A0A]/40 border border-surface-variant rounded-lg p-3 text-on-surface font-body-md focus:border-primary-fixed-dim focus:outline-none transition-colors" required maxLength="5" />
                    </label>
                    <label className="flex flex-col gap-1 flex-1">
                      <span className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider">CVV</span>
                      <input type="text" placeholder="123" className="bg-[#0A0A0A]/40 border border-surface-variant rounded-lg p-3 text-on-surface font-body-md focus:border-primary-fixed-dim focus:outline-none transition-colors" required maxLength="4" />
                    </label>
                  </div>

                  <div className="flex gap-3 mt-4">
                    <button type="submit" className="flex-1 bg-primary-fixed-dim text-[#0A0A0A] font-headline-md text-sm uppercase py-3 rounded-lg hard-shadow-hover transition-transform active:scale-95">
                      Salvar Cartão
                    </button>
                    <button type="button" onClick={() => setShowAddCardForm(false)} className="flex-1 bg-transparent border border-surface-variant text-on-surface font-headline-md text-sm uppercase py-3 rounded-lg hover:bg-surface-container-high transition-colors active:scale-95">
                      Voltar
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-left-4 duration-300">
                  <div className="text-center py-6 opacity-70">
                    <span className="material-symbols-outlined text-5xl mb-3 text-primary-fixed-dim/50">credit_card_off</span>
                    <p className="font-body-md text-on-surface-variant text-sm">Nenhum método de pagamento cadastrado.</p>
                  </div>
                  <button onClick={() => setShowAddCardForm(true)} className="w-full border border-dashed border-primary-fixed-dim/50 text-primary-fixed-dim p-4 rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-primary-fixed-dim/10 transition-colors group">
                    <span className="material-symbols-outlined group-hover:scale-110 transition-transform">add_circle</span>
                    <span className="font-headline-md text-sm uppercase">Adicionar Cartão</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 bg-surface-container/98 border-t-2 border-surface-variant shadow-[0_-4px_10px_rgba(0,0,0,0.5)]">
        <Link to="/home" style={{ textDecoration: 'none' }} className="flex flex-col items-center justify-center text-secondary opacity-70 hover:text-primary-fixed transition-all active:scale-90 duration-200 ease-out px-4 py-1">
          <span className="material-symbols-outlined mb-1">home</span>
          <span className="font-label-md text-label-md uppercase tracking-widest text-[10px]">Início</span>
        </Link>
        <Link to="/schedule" style={{ textDecoration: 'none' }} className="flex flex-col items-center justify-center text-secondary opacity-70 hover:text-primary-fixed transition-all active:scale-90 duration-200 ease-out px-4 py-1">
          <span className="material-symbols-outlined mb-1">calendar_month</span>
          <span className="font-label-md text-label-md uppercase tracking-widest text-[10px]">Agenda</span>
        </Link>
        <Link to="/plans" style={{ textDecoration: 'none' }} className="flex flex-col items-center justify-center text-secondary opacity-70 hover:text-primary-fixed transition-all active:scale-90 duration-200 ease-out px-4 py-1">
          <span className="material-symbols-outlined mb-1">loyalty</span>
          <span className="font-label-md text-label-md uppercase tracking-widest text-[10px]">Planos</span>
        </Link>
        <Link to="/profile" style={{ textDecoration: 'none' }} className="flex flex-col items-center justify-center text-primary-fixed-dim bg-on-primary-fixed-variant/20 rounded-xl px-4 py-1 active:scale-90 duration-200 ease-out">
          <span className="material-symbols-outlined mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>
            person
          </span>
          <span className="font-label-md text-label-md uppercase tracking-widest text-[10px]">Perfil</span>
        </Link>
      </nav>
    </div>
  );
}
