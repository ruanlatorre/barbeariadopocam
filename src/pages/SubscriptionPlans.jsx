import { Link } from 'react-router-dom';

export default function SubscriptionPlans() {
  return (
    <div className="plans-wrapper font-body-md antialiased flex flex-col relative overflow-x-hidden">
      {/* TopAppBar */}
      <header className="bg-surface dark:bg-surface border-b-2 border-surface-variant flex justify-between items-center px-container-margin-mobile md:px-container-margin-desktop h-16 w-full fixed top-0 z-50 bg-surface/95 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <Link to="/profile">
            <div className="h-10 w-10 rounded-full bg-surface-container-high overflow-hidden border border-surface-variant flex items-center justify-center">
              <span className="material-symbols-outlined text-primary-fixed-dim" style={{fontVariationSettings: "'FILL' 1"}}>person</span>
            </div>
          </Link>
          <h1 className="font-display-lg-mobile text-headline-md-mobile font-black text-primary-fixed-dim uppercase tracking-tighter">Barbearia do Poçam</h1>
        </div>
        <button className="text-primary-fixed-dim hover:bg-surface-container-high transition-colors active:scale-95 duration-150 p-2 rounded-full hidden md:block">
          <span className="material-symbols-outlined">notifications</span>
        </button>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-grow flex flex-col px-container-margin-mobile md:px-container-margin-desktop pt-24 md:pt-32 pb-[120px] md:pb-[90px]">
        {/* Page Header */}
        <div className="mb-12 md:mb-16 max-w-3xl">
          <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface uppercase mb-4">Status <span className="text-primary-fixed-dim">Elite</span></h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">Eleve seu ritual de cuidado. Nossos planos de assinatura oferecem acesso exclusivo, prioridade em agendamentos e qualidade premium para o cavalheiro moderno.</p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter lg:gap-8">
          {/* Silver Plan Card */}
          <article className="bg-[#181818] rounded-xl border border-surface-variant overflow-hidden flex flex-col relative h-full">
            <div className="p-8 flex-grow flex flex-col">
              <div className="mb-6">
                <span className="font-label-md text-label-md uppercase tracking-widest text-on-surface-variant border border-surface-variant px-3 py-1 rounded-sm">Essencial</span>
                <h3 className="font-headline-lg text-headline-lg text-on-surface mt-4">Silver</h3>
                <div className="flex items-baseline mt-2">
                  <span className="font-display-lg-mobile text-display-lg-mobile text-primary-fixed-dim">$45</span>
                  <span className="font-body-md text-body-md text-on-surface-variant ml-2">/ mês</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary-fixed-dim mt-0.5" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                  <span className="font-body-md text-body-md text-on-surface">2 Cortes Assinatura por mês</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary-fixed-dim mt-0.5" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                  <span className="font-body-md text-body-md text-on-surface">1 Aparo de Barba</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary-fixed-dim mt-0.5" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                  <span className="font-body-md text-body-md text-on-surface">Bebida de Cortesia</span>
                </li>
              </ul>
              <button className="w-full bg-transparent border-2 border-surface-variant text-on-surface font-label-md text-label-md uppercase tracking-widest py-4 rounded-sm hover:border-primary-fixed-dim hover:text-primary-fixed-dim transition-colors cursor-pointer">Selecionar Prata</button>
            </div>
          </article>

          {/* Gold Plan Card (Highlighted) */}
          <article className="bg-[#181818] rounded-xl border-2 border-primary-fixed-dim overflow-hidden flex flex-col relative h-full transform md:-translate-y-4 shadow-[0_10px_30px_rgba(245,191,0,0.15)] z-10">
            <div className="absolute top-0 left-0 w-full h-1 bg-primary-fixed-dim"></div>
            <div className="bg-primary-fixed-dim text-[#0A0A0A] font-label-md text-label-md uppercase tracking-widest py-2 text-center font-bold">Mais Popular</div>
            <div className="p-8 flex-grow flex flex-col">
              <div className="mb-6">
                <span className="font-label-md text-label-md uppercase tracking-widest text-primary-fixed-dim border border-primary-fixed-dim/30 px-3 py-1 rounded-sm bg-primary-fixed-dim/10">Premium</span>
                <h3 className="font-headline-lg text-headline-lg text-on-surface mt-4">Gold</h3>
                <div className="flex items-baseline mt-2">
                  <span className="font-display-lg-mobile text-display-lg-mobile text-primary-fixed-dim">$85</span>
                  <span className="font-body-md text-body-md text-on-surface-variant ml-2">/ mês</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary-fixed-dim mt-0.5" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                  <span className="font-body-md text-body-md text-on-surface font-bold">Cortes Assinatura Ilimitados</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary-fixed-dim mt-0.5" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                  <span className="font-body-md text-body-md text-on-surface">Barba Ilimitada</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary-fixed-dim mt-0.5" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                  <span className="font-body-md text-body-md text-on-surface">Prioridade no Agendamento</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary-fixed-dim mt-0.5" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                  <span className="font-body-md text-body-md text-on-surface">Bebidas Premium</span>
                </li>
              </ul>
              <button className="w-full bg-primary-fixed-dim text-[#0A0A0A] font-label-md text-label-md uppercase tracking-widest py-4 rounded-sm hard-shadow font-bold cursor-pointer border-none">Assinar Ouro</button>
            </div>
          </article>

          {/* Platinum Plan Card */}
          <article className="bg-[#181818] rounded-xl border border-surface-variant overflow-hidden flex flex-col relative h-full">
            <div className="p-8 flex-grow flex flex-col">
              <div className="mb-6">
                <span className="font-label-md text-label-md uppercase tracking-widest text-on-surface-variant border border-surface-variant px-3 py-1 rounded-sm">Executivo</span>
                <h3 className="font-headline-lg text-headline-lg text-on-surface mt-4">Platinum</h3>
                <div className="flex items-baseline mt-2">
                  <span className="font-display-lg-mobile text-display-lg-mobile text-primary-fixed-dim">$150</span>
                  <span className="font-body-md text-body-md text-on-surface-variant ml-2">/ mês</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary-fixed-dim mt-0.5" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                  <span className="font-body-md text-body-md text-on-surface">Tudo do plano Gold</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary-fixed-dim mt-0.5" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                  <span className="font-body-md text-body-md text-on-surface">Barba com Toalha Quente Semanal</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary-fixed-dim mt-0.5" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                  <span className="font-body-md text-body-md text-on-surface">Acesso ao Lounge VIP Exclusivo</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary-fixed-dim mt-0.5" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                  <span className="font-body-md text-body-md text-on-surface">20% de Desconto em Produtos</span>
                </li>
              </ul>
              <button className="w-full bg-transparent border-2 border-surface-variant text-on-surface font-label-md text-label-md uppercase tracking-widest py-4 rounded-sm hover:border-primary-fixed-dim hover:text-primary-fixed-dim transition-colors cursor-pointer">Selecionar Platina</button>
            </div>
          </article>
        </div>
      </main>

      {/* BottomNavBar (Mobile Only) */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 bg-surface-container/98 border-t-2 border-surface-variant shadow-[0_-4px_10px_rgba(0,0,0,0.5)] rounded-t-xl">
        <Link to="/home" className="flex flex-col items-center justify-center text-secondary opacity-70 hover:text-primary-fixed transition-all active:scale-90 duration-200 ease-out p-2" style={{textDecoration: 'none'}}>
          <span className="material-symbols-outlined text-2xl mb-1">home</span>
          <span className="font-label-md text-label-md uppercase tracking-widest text-[10px]">Home</span>
        </Link>
        <Link to="/schedule" className="flex flex-col items-center justify-center text-secondary opacity-70 hover:text-primary-fixed transition-all active:scale-90 duration-200 ease-out p-2" style={{textDecoration: 'none'}}>
          <span className="material-symbols-outlined text-2xl mb-1">calendar_month</span>
          <span className="font-label-md text-label-md uppercase tracking-widest text-[10px]">Schedule</span>
        </Link>
        <Link to="/plans" className="flex flex-col items-center justify-center text-primary-fixed-dim bg-on-primary-fixed-variant/20 rounded-xl px-4 py-1 hover:text-primary-fixed transition-all active:scale-90 duration-200 ease-out" style={{textDecoration: 'none'}}>
          <span className="material-symbols-outlined text-2xl mb-1" style={{fontVariationSettings: "'FILL' 1"}}>loyalty</span>
          <span className="font-label-md text-label-md uppercase tracking-widest text-[10px] font-bold">Plans</span>
        </Link>
        <Link to="/profile" className="flex flex-col items-center justify-center text-secondary opacity-70 hover:text-primary-fixed transition-all active:scale-90 duration-200 ease-out p-2" style={{textDecoration: 'none'}}>
          <span className="material-symbols-outlined text-2xl mb-1">person</span>
          <span className="font-label-md text-label-md uppercase tracking-widest text-[10px]">Profile</span>
        </Link>
      </nav>
    </div>
  );
}
