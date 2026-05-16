import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="home-wrapper font-body-md antialiased pb-24 pt-20">
      {/* TopAppBar Component */}
      <header className="flex justify-between items-center px-container-margin-mobile h-16 w-full fixed top-0 z-50 bg-surface/95 backdrop-blur-md border-b-2 border-surface-variant shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
        <Link to="/profile" className="flex items-center gap-4 hover:bg-surface-container-high transition-colors active:scale-95 duration-150 rounded-full p-1 cursor-pointer">
          <img 
            alt="User Profile" 
            className="w-10 h-10 rounded-full object-cover border border-surface-variant" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6RU31ilW_fSr-rCffKTmMrkINqTG2Guo9xJw-_YOEcneqTmtUQqEiDGhBCByBJ3PdiczagSDDMy1Z4R0dqwXJOvmBs-_N511k9NlcACfvoIAQjDpBHc7TrgROglCPzlV_Y3TQH-4ECuGbZedCacCFEK7aXKtYZ1msjuvP5y9DafC5kMtUWtqazJhzbqG0REPWzSd-GlXaa6d7iADhsmS11k2sL9YTGIysyN31J30oNzImpBE1hcla4bFxf5XsZ3o53sxRUg08yUM"
          />
        </Link>
        <h1 className="font-display-lg-mobile text-headline-md-mobile font-black text-primary-fixed-dim uppercase tracking-tighter truncate max-w-[60%] text-center">
            Barbearia do Poçam
        </h1>
        <button className="w-10 h-10 flex items-center justify-center text-primary-fixed-dim hover:bg-surface-container-high transition-colors active:scale-95 duration-150 rounded-full">
          <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>notifications</span>
        </button>
      </header>

      {/* Main Content Canvas */}
      <main className="px-container-margin-mobile flex flex-col gap-10 mt-4 max-w-lg mx-auto">
        
        {/* Welcome & Quick Action Section */}
        <section className="flex flex-col gap-6">
          <div>
            <p className="font-body-md text-on-surface-variant">Bem-vindo de volta,</p>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">Alexandre</h2>
          </div>
          <Link to="/schedule" style={{textDecoration: 'none'}} className="w-full bg-primary-fixed-dim text-[#0A0A0A] py-5 px-6 rounded-lg font-headline-md text-[20px] tracking-wide uppercase hard-shadow flex items-center justify-between group">
            <span>AGENDAR AGORA</span>
            <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
          </Link>
        </section>

        {/* Next Appointment Card (Bento Style) */}
        <section>
          <h3 className="font-label-md text-label-md text-primary-fixed-dim uppercase tracking-widest mb-4">PRÓXIMO AGENDAMENTO</h3>
          <div className="bg-surface-container-low border-2 border-surface-variant rounded-xl p-6 relative overflow-hidden flex flex-col gap-4">
            {/* Tonal accent rail */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-fixed-dim"></div>
            <div className="flex justify-between items-start">
              <div>
                <p className="font-headline-md text-[22px] text-on-surface mb-1">Degradê e Barba</p>
                <p className="font-body-md text-on-surface-variant flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                  Sexta, 27 de Out
                </p>
              </div>
              <div className="bg-surface-variant px-3 py-1 rounded-md text-primary-fixed-dim font-label-md">
                  14:30
              </div>
            </div>
            <hr className="border-surface-variant border-t-2 my-2"/>
            <div className="flex items-center gap-3">
              <img 
                alt="Barber" 
                className="w-12 h-12 rounded-full object-cover grayscale opacity-80" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNKpciB7iRgmEcG7gThwtDudiq7VumnNSJ3qBzC873JblZAiZy5rn-9ZXMAnY9soFESzt4Ixg5uWfSH1UwQJCTWXuwsC3PW_AQVj5WGtFZO2JwBPeRN09MkRUs4EPWY64eqjjBqxgyyD-yubcUPrj_kcAjNRWk1djGBk-JEtXeUsCReJVOqI2W5ynYd6zfpGBcSYsWnFkYBZVJKEs2SxOLj8HUrXaBPfJolj75HcYTH1s5B81x6fX1LD7KTXWUtrF9bLPda589hLM"
              />
              <div>
                <p className="font-caption text-on-surface-variant uppercase tracking-wider">COM O MESTRE</p>
                <p className="font-body-md text-on-surface font-semibold">Poçam</p>
              </div>
            </div>
          </div>
        </section>

        {/* Loyalty System Section */}
        <section className="bg-[#181818] border border-outline-variant rounded-xl p-6 flex flex-col gap-6 shadow-[0_8px_30px_rgba(0,0,0,0.8)] relative z-10">
          <div className="flex justify-between items-center">
            <h3 className="font-headline-md text-headline-md text-on-surface">Suas Moedas</h3>
            <span className="bg-surface-variant text-primary-fixed-dim px-3 py-1 rounded-full font-label-md text-xs">3/5</span>
          </div>
          <p className="font-body-md text-on-surface-variant opacity-80 text-sm">
            Complete um corte para ganhar uma moeda e obter descontos.
          </p>
          
          {/* Coins Visual Display */}
          <div className="flex justify-between items-center mt-2 px-2">
            <div className="w-12 h-12 rounded-full bg-primary-fixed-dim flex items-center justify-center shadow-[0_0_15px_rgba(245,191,0,0.4)]">
              <span className="material-symbols-outlined text-[#0A0A0A]" style={{fontVariationSettings: "'FILL' 1"}}>stars</span>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary-fixed-dim flex items-center justify-center shadow-[0_0_15px_rgba(245,191,0,0.4)]">
              <span className="material-symbols-outlined text-[#0A0A0A]" style={{fontVariationSettings: "'FILL' 1"}}>stars</span>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary-fixed-dim flex items-center justify-center shadow-[0_0_15px_rgba(245,191,0,0.4)]">
              <span className="material-symbols-outlined text-[#0A0A0A]" style={{fontVariationSettings: "'FILL' 1"}}>stars</span>
            </div>
            <div className="w-12 h-12 rounded-full border-2 border-surface-variant bg-surface flex items-center justify-center opacity-50">
              <span className="material-symbols-outlined text-surface-variant">stars</span>
            </div>
            <div className="w-12 h-12 rounded-full border-2 border-surface-variant bg-surface flex items-center justify-center opacity-50">
              <span className="material-symbols-outlined text-surface-variant">stars</span>
            </div>
          </div>
        </section>
      </main>

      {/* BottomNavBar Component */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 bg-surface-container/98 border-t-2 border-surface-variant shadow-[0_-4px_10px_rgba(0,0,0,0.5)]">
        {/* Tab 1: Home (ACTIVE) */}
        <Link to="/home" style={{textDecoration: 'none'}} className="flex flex-col items-center justify-center text-primary-fixed-dim bg-on-primary-fixed-variant/20 rounded-xl px-4 py-1 active:scale-90 duration-200 ease-out">
          <span className="material-symbols-outlined mb-1" style={{fontVariationSettings: "'FILL' 1"}}>home</span>
          <span className="font-label-md text-label-md uppercase tracking-widest text-[10px]">Início</span>
        </Link>
        {/* Tab 2: Schedule (INACTIVE) */}
        <Link to="/schedule" style={{textDecoration: 'none'}} className="flex flex-col items-center justify-center text-secondary opacity-70 hover:text-primary-fixed transition-all active:scale-90 duration-200 ease-out px-4 py-1">
          <span className="material-symbols-outlined mb-1">calendar_month</span>
          <span className="font-label-md text-label-md uppercase tracking-widest text-[10px]">Agenda</span>
        </Link>
        {/* Tab 3: Plans (INACTIVE) */}
        <Link to="/plans" style={{textDecoration: 'none'}} className="flex flex-col items-center justify-center text-secondary opacity-70 hover:text-primary-fixed transition-all active:scale-90 duration-200 ease-out px-4 py-1">
          <span className="material-symbols-outlined mb-1">loyalty</span>
          <span className="font-label-md text-label-md uppercase tracking-widest text-[10px]">Planos</span>
        </Link>
        {/* Tab 4: Profile (INACTIVE) */}
        <Link to="/profile" style={{textDecoration: 'none'}} className="flex flex-col items-center justify-center text-secondary opacity-70 hover:text-primary-fixed transition-all active:scale-90 duration-200 ease-out px-4 py-1">
          <span className="material-symbols-outlined mb-1">person</span>
          <span className="font-label-md text-label-md uppercase tracking-widest text-[10px]">Perfil</span>
        </Link>
      </nav>
    </div>
  );
}
